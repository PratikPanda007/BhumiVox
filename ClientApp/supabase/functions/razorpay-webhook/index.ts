// Razorpay webhook → auto-close journey requests when payment is captured.
// Configure in Razorpay Dashboard → Webhooks:
//   URL:    https://<project-ref>.functions.supabase.co/razorpay-webhook
//   Events: payment_link.paid  (also: payment.captured for safety)
//   Secret: set RAZORPAY_WEBHOOK_SECRET in Lovable Cloud secrets

import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const raw = await req.text();
  const signature = req.headers.get("x-razorpay-signature") ?? "";
  const secret = Deno.env.get("RAZORPAY_WEBHOOK_SECRET");

  if (!secret) {
    console.error("[razorpay-webhook] RAZORPAY_WEBHOOK_SECRET not set");
    return new Response("Misconfigured", { status: 500 });
  }

  // Verify HMAC SHA256
  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" }, false, ["sign"],
  );
  const sigBuf = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(raw));
  const expected = Array.from(new Uint8Array(sigBuf)).map((b) => b.toString(16).padStart(2, "0")).join("");
  if (expected !== signature) {
    console.error("[razorpay-webhook] Invalid signature");
    return new Response("Invalid signature", { status: 401 });
  }

  const event = JSON.parse(raw);
  console.log("[razorpay-webhook] event:", event.event);

  // Extract the payment link id from supported events
  const linkId: string | undefined =
    event?.payload?.payment_link?.entity?.id ??
    event?.payload?.payment?.entity?.notes?.payment_link_id;

  const isPaid =
    event.event === "payment_link.paid" ||
    (event.event === "payment.captured" && !!linkId);

  if (!isPaid || !linkId) {
    return new Response(JSON.stringify({ ok: true, ignored: true }), {
      headers: { "Content-Type": "application/json" }, status: 200,
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const { data: q } = await supabase
    .from("quotations").select("id, request_id")
    .eq("razorpay_link_id", linkId).maybeSingle();

  if (!q) {
    console.warn("[razorpay-webhook] No quotation for link", linkId);
    return new Response(JSON.stringify({ ok: true, matched: false }), {
      headers: { "Content-Type": "application/json" }, status: 200,
    });
  }

  await supabase.from("quotations").update({ email_status: "paid" }).eq("id", q.id);
  await supabase.from("journey_requests").update({ status: "closed" }).eq("id", q.request_id);

  console.log("[razorpay-webhook] closed request", q.request_id);
  return new Response(JSON.stringify({ ok: true, closed: q.request_id }), {
    headers: { "Content-Type": "application/json" }, status: 200,
  });
});
