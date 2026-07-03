import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function RefundPanel({ requestId, onRefunded }: { requestId: string; onRefunded: () => void }) {
  const [loading, setLoading] = useState(false);
  const [refunding, setRefunding] = useState(false);
  const [payment, setPayment] = useState<any | null>(null);
  const [refund, setRefund] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const lookup = async () => {
    setError(null); setRefund(null); setLoading(true);
    const { data, error: fnErr } = await supabase.functions.invoke("razorpay-refund", {
      body: { request_id: requestId, mode: "lookup" },
    });
    setLoading(false);
    console.group("[Refund] Payment lookup");
    console.log("request_id:", requestId);
    console.log("raw response:", data);
    console.log("payment (full):", data?.payment);
    if (data?.payment) {
      console.table({
        id: data.payment.id,
        status: data.payment.status,
        amount: data.payment.amount,
        currency: data.payment.currency,
        method: data.payment.method,
        email: data.payment.email,
        contact: data.payment.contact,
        card_last4: data.payment.card?.last4,
        card_network: data.payment.card?.network,
        vpa: data.payment.vpa,
        bank: data.payment.bank,
        wallet: data.payment.wallet,
        order_id: data.payment.order_id,
        created_at: data.payment.created_at,
      });
    }
    if (fnErr) console.error("function error:", fnErr);
    console.groupEnd();
    if (fnErr || data?.ok === false) {
      setError(data?.error || fnErr?.message || "Lookup failed.");
      return;
    }
    setPayment(data.payment);
  };

  const doRefund = async () => {
    if (!window.confirm("Refund this payment to the original method? This cannot be undone.")) return;
    setError(null); setRefunding(true);
    const { data, error: fnErr } = await supabase.functions.invoke("razorpay-refund", {
      body: { request_id: requestId, mode: "refund" },
    });
    setRefunding(false);
    if (fnErr || data?.ok === false) {
      setError(data?.error || fnErr?.message || "Refund failed.");
      return;
    }
    setRefund(data.refund);
    onRefunded();
  };

  return (
    <div className="mt-10 border-t border-border pt-8">
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-primary">Refund</span>
      <h3 className="mt-2 font-serif text-xl text-ivory">Issue refund</h3>
      <p className="mt-2 text-xs text-muted-foreground">
        Fetch the original Razorpay payment details, then refund to the same method.
      </p>

      <button
        type="button"
        onClick={lookup}
        disabled={loading}
        className="mt-4 border border-border px-4 py-2 text-[0.65rem] uppercase tracking-[0.24em] text-ivory hover:border-primary disabled:opacity-50"
      >
        {loading ? "Fetching…" : payment ? "Refresh payment details" : "Fetch payment details"}
      </button>

      {payment && (
        <div className="mt-4 border border-border/60 p-3 text-xs">
          <Row k="Payment ID" v={payment.id} />
          <Row k="Status" v={payment.status} />
          <Row k="Amount" v={`₹${(Number(payment.amount ?? 0) / 100).toLocaleString("en-IN")} ${payment.currency ?? ""}`} />
          <Row k="Method" v={payment.method} />
          {payment.card && <Row k="Card" v={`${payment.card.network ?? ""} •••• ${payment.card.last4 ?? ""}`} />}
          {payment.vpa && <Row k="UPI" v={payment.vpa} />}
          {payment.bank && <Row k="Bank" v={payment.bank} />}
          {payment.wallet && <Row k="Wallet" v={payment.wallet} />}
          {payment.email && <Row k="Email" v={payment.email} />}
          {payment.contact && <Row k="Contact" v={payment.contact} />}

          <button
            type="button"
            onClick={doRefund}
            disabled={refunding || payment.status !== "captured"}
            className="mt-4 w-full bg-primary px-4 py-2 text-[0.65rem] uppercase tracking-[0.28em] text-primary-foreground hover:bg-gold disabled:opacity-50"
          >
            {refunding ? "Refunding…" : payment.status !== "captured" ? "Not refundable" : `Refund ₹${(Number(payment.amount ?? 0) / 100).toLocaleString("en-IN")} to same method`}
          </button>
        </div>
      )}

      {refund && (
        <div className="mt-4 border border-gold/60 p-3 text-xs text-gold">
          ✓ Refund {refund.status} · {refund.id} · ₹{(Number(refund.amount ?? 0) / 100).toLocaleString("en-IN")}
        </div>
      )}

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-border/40 py-1">
      <span className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">{k}</span>
      <span className="text-right text-ivory break-all">{v}</span>
    </div>
  );
}
