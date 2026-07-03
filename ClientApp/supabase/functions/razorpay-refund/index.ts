// Auto-refund the latest paid quotation for a journey request via Razorpay.
// Body: { request_id: string }
// Looks up the most recent quotation with a razorpay_link_id, fetches the
// captured payment from that link, then issues a full refund to the same method.

import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";

const RZP_BASE = "https://api.razorpay.com/v1";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = await req.json();
    const { request_id, mode = "refund" } = body as { request_id?: string; mode?: "lookup" | "refund" };
    if (!request_id) {
      return json({ ok: false, error: "request_id required" }, 400);
    }

    const keyId = Deno.env.get("RAZORPAY_KEY_ID");
    const keySecret = Deno.env.get("RAZORPAY_KEY_SECRET");
    if (!keyId || !keySecret) {
      return json({ ok: false, error: "Razorpay keys not configured" }, 500);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Most recent quotation with an auto-generated Razorpay link
    const { data: q, error: qErr } = await supabase
      .from("quotations")
      .select("id, razorpay_link_id, amount")
      .eq("request_id", request_id)
      .not("razorpay_link_id", "is", null)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (qErr) throw qErr;
    if (!q?.razorpay_link_id) {
      return json({ ok: false, error: "No Razorpay payment link found for this request. Manual refund required." }, 404);
    }

    const auth = "Basic " + btoa(`${keyId}:${keySecret}`);

    // Fetch the payment link to find the captured payment
    const linkRes = await fetch(`${RZP_BASE}/payment_links/${q.razorpay_link_id}`, {
      headers: { Authorization: auth },
    });
    const linkData = await linkRes.json();
    if (!linkRes.ok) {
      return json({ ok: false, error: "Razorpay link lookup failed", details: linkData }, 502);
    }

    const paymentId: string | undefined =
      linkData?.payments?.find?.((p: any) => p.status === "captured")?.payment_id ??
      linkData?.payments?.[0]?.payment_id;

    if (!paymentId) {
      return json({ ok: false, error: "No captured payment on this link yet — nothing to refund." }, 409);
    }

    // Fetch full payment details (method, card last4, vpa, bank, etc.)
    const payRes = await fetch(`${RZP_BASE}/payments/${paymentId}`, {
      headers: { Authorization: auth },
    });
    const payData = await payRes.json();

    if (mode === "lookup") {
      return json({
        ok: true,
        quotation_id: q.id,
        payment: payData,
      });
    }

    // Issue full refund (to original payment method by default)
    const refundRes = await fetch(`${RZP_BASE}/payments/${paymentId}/refund`, {
      method: "POST",
      headers: { Authorization: auth, "Content-Type": "application/json" },
      body: JSON.stringify({
        speed: "normal",
        notes: { request_id, quotation_id: q.id },
      }),
    });
    const refundData = await refundRes.json();
    if (!refundRes.ok) {
      await supabase.from("quotations")
        .update({ refund_status: "failed", refund_payload: refundData })
        .eq("id", q.id);
      return json({ ok: false, error: "Refund failed", details: refundData }, 502);
    }

    await supabase.from("quotations").update({
      refund_id: refundData.id,
      refund_status: refundData.status ?? "processed",
      refund_amount: Number(refundData.amount ?? 0) / 100,
      refund_payload: refundData,
    }).eq("id", q.id);

    await supabase.from("journey_requests")
      .update({ status: "refund" })
      .eq("id", request_id);

    return json({ ok: true, refund: refundData });
  } catch (e) {
    console.error("[razorpay-refund]", e);
    return json({ ok: false, error: (e as Error).message }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
