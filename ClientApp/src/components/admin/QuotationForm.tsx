import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type JourneyRequest = {
  id: string;
  name: string;
  email: string;
  phone: string;
  destinations: string[];
  travel_month: string | null;
  companions: string | null;
  sattvik: boolean;
  premium: boolean;
  chandru_led: boolean;
  notes: string | null;
};

type Quotation = {
  id: string;
  amount: number;
  currency: string;
  payment_link: string | null;
  link_source: string;
  document_url: string | null;
  document_name: string | null;
  notes: string | null;
  email_status: string;
  created_at: string;
};

export function QuotationForm({ request, onSent }: { request: JourneyRequest; onSent: () => void }) {
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState<"auto" | "manual">("manual");
  const [manualLink, setManualLink] = useState("");
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [generatedLinkId, setGeneratedLinkId] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [generating, setGenerating] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<Quotation[]>([]);

  const loadHistory = async () => {
    const { data } = await supabase
      .from("quotations")
      .select("id,amount,currency,payment_link,link_source,document_url,document_name,notes,email_status,created_at")
      .eq("request_id", request.id)
      .order("created_at", { ascending: false });
    setHistory((data as Quotation[]) ?? []);
  };

  useEffect(() => {
    loadHistory();
  }, [request.id]);

  const generateLink = async () => {
    setError(null);
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) {
      setError("Enter a valid amount first.");
      return;
    }
    setGenerating(true);
    const { data, error: fnErr } = await supabase.functions.invoke("create-razorpay-link", {
      body: {
        amount: amt,
        request_id: request.id,
        customer: { name: request.name, email: request.email, contact: request.phone },
      },
    });
    setGenerating(false);
    if (fnErr || !data?.short_url) {
      setError(data?.error || fnErr?.message || "Failed to generate link.");
      return;
    }
    setGeneratedLink(data.short_url);
    setGeneratedLinkId(data.id ?? null);
  };

  const uploadDoc = async (): Promise<{ url: string; name: string; mime: string } | null> => {
    if (!file) return null;
    const path = `${request.id}/${crypto.randomUUID()}-${file.name}`;
    const { error: upErr } = await supabase.storage.from("quotation-docs").upload(path, file, {
      contentType: file.type,
      upsert: false,
    });
    if (upErr) throw upErr;
    const { data: pub } = supabase.storage.from("quotation-docs").getPublicUrl(path);
    return { url: pub.publicUrl, name: file.name, mime: file.type };
  };

  const handleSend = async () => {
    setError(null);
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) return setError("Enter a valid amount.");
    const link = mode === "auto" ? generatedLink : manualLink.trim();
    if (!link) return setError(mode === "auto" ? "Generate the payment link first." : "Paste a payment link.");

    setSending(true);
    try {
      const attachment = await uploadDoc();
      const { data: { session } } = await supabase.auth.getSession();

      const { data: inserted, error: insErr } = await supabase
        .from("quotations")
        .insert({
          request_id: request.id,
          amount: amt,
          currency: "INR",
          payment_link: link,
          link_source: mode,
          razorpay_link_id: mode === "auto" ? generatedLinkId : null,
          document_url: attachment?.url ?? null,
          document_name: attachment?.name ?? null,
          document_mime: attachment?.mime ?? null,
          notes: notes || null,
          created_by: session?.user.id ?? null,
        })
        .select()
        .single();
      if (insErr || !inserted) throw insErr ?? new Error("Failed to save quotation.");

      const payload = {
        to: { name: request.name, email: request.email, phone: request.phone },
        request: {
          id: request.id,
          destinations: request.destinations,
          travel_month: request.travel_month,
          companions: request.companions,
          style: {
            sattvik: request.sattvik,
            premium: request.premium,
            chandru_led: request.chandru_led,
          },
          notes: request.notes,
        },
        quotation: {
          id: inserted.id,
          amount: amt,
          currency: "INR",
          payment_link: link,
          notes: notes || null,
        },
        attachment,
        branding: { studio: "Bhumivox", from: "studio@bhumivox.com" },
        sentAt: new Date().toISOString(),
      };

      console.log("[Quotation Email] payload →", payload);

      const { data: emailRes, error: emailErr } = await supabase.functions.invoke("send-quotation-email", {
        body: payload,
      });

      if (emailRes?.html) {
        console.log("[Quotation Email] rendered HTML →\n", emailRes.html);
        console.log("[Quotation Email] preview (open in console as data URL):",
          "data:text/html;base64," + btoa(unescape(encodeURIComponent(emailRes.html))));
      }
      console.log("[Quotation Email] function response →", { emailRes, emailErr });

      const status = emailErr || emailRes?.ok === false ? "failed" : "sent";
      await supabase
        .from("quotations")
        .update({ email_status: status, email_payload: payload })
        .eq("id", inserted.id);

      if (status === "sent") {
        await supabase
          .from("journey_requests")
          .update({ status: "contacted", quotation_id: inserted.id })
          .eq("id", request.id);
      }

      // Reset form
      setAmount("");
      setManualLink("");
      setGeneratedLink(null);
      setGeneratedLinkId(null);
      setNotes("");
      setFile(null);
      await loadHistory();
      onSent();
    } catch (e: any) {
      setError(e.message ?? String(e));
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="mt-10 border-t border-border pt-8">
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-primary">Quotation</span>
      <h3 className="mt-2 font-serif text-xl text-ivory">Send quotation</h3>

      <label className="mt-6 block">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">Amount (₹)</span>
        <input
          type="number"
          min="1"
          step="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-2 w-full border-b border-border bg-transparent py-2 text-base text-ivory outline-none focus:border-primary"
        />
      </label>

      <div className="mt-6">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">Payment link</span>
        <div className="mt-2 flex gap-2">
          {(["auto", "manual"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`border px-3 py-2 text-[0.65rem] uppercase tracking-[0.22em] ${
                mode === m ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"
              }`}
            >
              {m === "auto" ? "Auto-generate" : "Paste link"}
            </button>
          ))}
        </div>

        {mode === "auto" ? (
          <div className="mt-3">
            <button
              type="button"
              onClick={generateLink}
              disabled={generating}
              className="border border-border px-4 py-2 text-[0.65rem] uppercase tracking-[0.24em] text-ivory hover:border-primary disabled:opacity-50"
            >
              {generating ? "Generating…" : generatedLink ? "Regenerate" : "Generate Razorpay link"}
            </button>
            {generatedLink && (
              <p className="mt-2 break-all text-xs text-gold">{generatedLink}</p>
            )}
          </div>
        ) : (
          <input
            type="url"
            placeholder="https://rzp.io/i/..."
            value={manualLink}
            onChange={(e) => setManualLink(e.target.value)}
            className="mt-3 w-full border-b border-border bg-transparent py-2 text-sm text-ivory outline-none focus:border-primary"
          />
        )}
      </div>

      <label className="mt-6 block">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">Notes (optional)</span>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="mt-2 w-full border border-border bg-transparent p-2 text-sm text-ivory outline-none focus:border-primary"
        />
      </label>

      <label className="mt-6 block">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">
          Attachment (PDF or image, optional)
        </span>
        <input
          type="file"
          accept=".pdf,image/*"
          onChange={(e) => {
            const f = e.target.files?.[0] ?? null;
            if (f && f.size > 10 * 1024 * 1024) {
              setError("File must be under 10MB.");
              return;
            }
            setFile(f);
          }}
          className="mt-2 block w-full text-xs text-muted-foreground file:mr-3 file:border file:border-border file:bg-transparent file:px-3 file:py-2 file:text-[0.65rem] file:uppercase file:tracking-[0.24em] file:text-ivory"
        />
        {file && <p className="mt-2 text-xs text-muted-foreground">{file.name} · {(file.size / 1024).toFixed(0)} KB</p>}
      </label>

      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

      <button
        type="button"
        onClick={handleSend}
        disabled={sending}
        className="mt-6 w-full bg-primary px-6 py-3 text-[0.7rem] uppercase tracking-[0.3em] text-primary-foreground hover:bg-gold disabled:opacity-50"
      >
        {sending ? "Sending…" : "Send quotation email"}
      </button>

      {history.length > 0 && (
        <div className="mt-10">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">History</span>
          <ul className="mt-3 space-y-3">
            {history.map((q) => (
              <li key={q.id} className="border border-border/60 p-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-ivory">₹{Number(q.amount).toLocaleString("en-IN")}</span>
                  <span className={`font-mono text-[0.6rem] uppercase tracking-[0.2em] ${
                    q.email_status === "sent" ? "text-gold" : q.email_status === "failed" ? "text-destructive" : "text-muted-foreground"
                  }`}>
                    {q.email_status}
                  </span>
                </div>
                <p className="mt-1 text-muted-foreground">{new Date(q.created_at).toLocaleString()}</p>
                {q.payment_link && (
                  <a href={q.payment_link} target="_blank" rel="noreferrer" className="mt-1 block break-all text-primary hover:text-gold">
                    {q.payment_link}
                  </a>
                )}
                {q.document_url && (
                  <a href={q.document_url} target="_blank" rel="noreferrer" className="mt-1 block break-all text-muted-foreground hover:text-ivory">
                    📎 {q.document_name}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
