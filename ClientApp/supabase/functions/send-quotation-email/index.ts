// Placeholder send-quotation-email edge function.
// TODO: Replace the fetch block below with your .NET API endpoint.
// The payload schema + rendered HTML are the contract.

import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const payload = await req.json();
    const html = renderEmail(payload);
    const subject = `Your Bhumivox journey quotation · ₹${Number(payload?.quotation?.amount ?? 0).toLocaleString("en-IN")}`;

    // === REPLACE BLOCK: call your .NET API here ===
    // const DOTNET_URL = Deno.env.get("DOTNET_EMAIL_API_URL")!;
    // const resp = await fetch(DOTNET_URL, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ to: payload.to, subject, html, attachment: payload.attachment, payload }),
    // });
    // if (!resp.ok) throw new Error(`Email API responded ${resp.status}`);

    console.log("[send-quotation-email] subject:", subject);
    console.log("[send-quotation-email] to:", payload?.to);
    console.log("[send-quotation-email] payload:", JSON.stringify(payload, null, 2));
    console.log("[send-quotation-email] html:\n", html);
    // === END REPLACE BLOCK ===

    return new Response(JSON.stringify({ ok: true, simulated: true, subject, html }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (e) {
    console.error("[send-quotation-email] error:", e);
    return new Response(JSON.stringify({ ok: false, error: String(e) }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function renderEmail(p: any): string {
  const name = esc(p?.to?.name);
  const amount = Number(p?.quotation?.amount ?? 0).toLocaleString("en-IN");
  const currency = esc(p?.quotation?.currency ?? "INR");
  const link = esc(p?.quotation?.payment_link ?? "#");
  const notes = p?.quotation?.notes ? esc(p.quotation.notes) : "";
  const destinations = Array.isArray(p?.request?.destinations) ? p.request.destinations.map(esc).join(" · ") : "";
  const month = esc(p?.request?.travel_month ?? "—");
  const companions = esc(p?.request?.companions ?? "—");
  const style = p?.request?.style ?? {};
  const styleTags = [
    style.sattvik && "Sattvik",
    style.premium && "Premium",
    style.chandru_led && "Chandru-led",
  ].filter(Boolean).map((t) => `<span style="display:inline-block;border:1px solid #c9a84c;color:#c9a84c;padding:4px 10px;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin-right:6px;margin-top:6px;">${esc(t)}</span>`).join("");
  const attachment = p?.attachment?.url
    ? `<p style="margin:24px 0 0;font-size:14px;color:#9aa0a6;">📎 Attached document: <a href="${esc(p.attachment.url)}" style="color:#c9a84c;text-decoration:none;">${esc(p.attachment.name)}</a></p>`
    : "";

  return `<!doctype html>
<html><head><meta charset="utf-8"><title>Bhumivox quotation</title></head>
<body style="margin:0;padding:0;background:#0d0d0d;font-family:Georgia,'Times New Roman',serif;color:#e8e4dd;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0d0d0d;padding:40px 16px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#141414;border:1px solid #2a2a2a;">
        <tr><td style="padding:40px 40px 24px;border-bottom:1px solid #2a2a2a;">
          <div style="font-family:'Courier New',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#c9a84c;">Bhumivox · Studio</div>
          <h1 style="margin:16px 0 0;font-size:28px;font-weight:400;color:#f5f0e0;letter-spacing:0.5px;">Your journey quotation</h1>
        </td></tr>

        <tr><td style="padding:32px 40px 8px;font-family:Georgia,serif;font-size:16px;line-height:1.7;color:#e8e4dd;">
          <p style="margin:0 0 16px;">Dear ${name || "traveller"},</p>
          <p style="margin:0 0 16px;">Thank you for entrusting Bhumivox with the design of your journey. Below is the curated quotation for the experience we have shaped around your intent.</p>
        </td></tr>

        <tr><td style="padding:8px 40px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #c9a84c;background:#0d0d0d;">
            <tr><td style="padding:28px 32px;text-align:center;">
              <div style="font-family:'Courier New',monospace;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#9aa0a6;">Total investment</div>
              <div style="margin-top:10px;font-size:40px;color:#c9a84c;font-weight:400;letter-spacing:1px;">₹${amount}</div>
              <div style="margin-top:4px;font-size:11px;color:#9aa0a6;letter-spacing:2px;text-transform:uppercase;">${currency}</div>
            </td></tr>
          </table>
        </td></tr>

        <tr><td style="padding:8px 40px 24px;text-align:center;">
          <a href="${link}" style="display:inline-block;background:#c9a84c;color:#0d0d0d;padding:16px 40px;text-decoration:none;font-family:'Courier New',monospace;font-size:12px;letter-spacing:4px;text-transform:uppercase;">Complete payment →</a>
          <p style="margin:14px 0 0;font-size:11px;color:#9aa0a6;font-family:'Courier New',monospace;letter-spacing:2px;text-transform:uppercase;">Secured by Razorpay</p>
        </td></tr>

        <tr><td style="padding:8px 40px 32px;">
          <div style="font-family:'Courier New',monospace;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#9aa0a6;border-top:1px solid #2a2a2a;padding-top:24px;">Journey details</div>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:14px;font-size:14px;color:#e8e4dd;">
            <tr><td style="padding:8px 0;color:#9aa0a6;width:40%;">Destinations</td><td style="padding:8px 0;color:#f5f0e0;">${destinations || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#9aa0a6;">Travel month</td><td style="padding:8px 0;color:#f5f0e0;">${month}</td></tr>
            <tr><td style="padding:8px 0;color:#9aa0a6;">Companions</td><td style="padding:8px 0;color:#f5f0e0;">${companions}</td></tr>
          </table>
          ${styleTags ? `<div style="margin-top:14px;">${styleTags}</div>` : ""}
          ${notes ? `<div style="margin-top:24px;padding:16px;border-left:2px solid #c9a84c;background:#0d0d0d;font-style:italic;color:#e8e4dd;font-size:14px;line-height:1.6;">${notes}</div>` : ""}
          ${attachment}
        </td></tr>

        <tr><td style="padding:24px 40px 40px;border-top:1px solid #2a2a2a;font-size:12px;color:#9aa0a6;line-height:1.7;">
          <p style="margin:0;">Should you wish to refine any detail before confirming, simply reply to this message — the studio will respond personally.</p>
          <p style="margin:16px 0 0;font-family:'Courier New',monospace;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#c9a84c;">Bhumivox Studio · studio@bhumivox.com</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}
