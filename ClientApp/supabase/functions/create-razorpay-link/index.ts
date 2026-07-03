// Creates a Razorpay Payment Link for a given amount.
// Requires RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET secrets.

import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    // Auth: must be a signed-in admin
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return json({ error: "Unauthorized" }, 401);
    }
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );
    const token = authHeader.replace("Bearer ", "");
    const { data: claims } = await supabase.auth.getClaims(token);
    if (!claims?.claims?.sub) return json({ error: "Unauthorized" }, 401);

    const { data: isAdmin } = await supabase.rpc("is_admin", { _user_id: claims.claims.sub });
    if (!isAdmin) return json({ error: "Forbidden" }, 403);

    const KEY_ID = Deno.env.get("RAZORPAY_KEY_ID");
    const KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET");
    if (!KEY_ID || !KEY_SECRET) {
      return json({ error: "Razorpay keys not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET secrets." }, 500);
    }

    const { amount, request_id, customer } = await req.json();
    if (!amount || amount <= 0) return json({ error: "Invalid amount" }, 400);

    const body = {
      amount: Math.round(Number(amount) * 100), // paise
      currency: "INR",
      accept_partial: false,
      description: `Bhumivox journey quotation${request_id ? ` · ${request_id.slice(0, 8)}` : ""}`,
      customer: {
        name: customer?.name,
        email: customer?.email,
        contact: customer?.contact,
      },
      notify: { sms: false, email: false },
      reminder_enable: true,
      notes: { request_id: request_id ?? "" },
    };

    const auth = btoa(`${KEY_ID}:${KEY_SECRET}`);
    const resp = await fetch("https://api.razorpay.com/v1/payment_links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify(body),
    });
    const data = await resp.json();
    if (!resp.ok) {
      return json({ error: data?.error?.description || "Razorpay error", details: data }, resp.status);
    }
    return json({ short_url: data.short_url, id: data.id });
  } catch (e) {
    console.error("[create-razorpay-link]", e);
    return json({ error: String(e) }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status,
  });
}
