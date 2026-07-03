import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { RequireAdmin } from "@/components/admin/RequireAdmin";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { QuotationForm } from "@/components/admin/QuotationForm";
import { RefundPanel } from "@/components/admin/RefundPanel";
import { useSeo } from "@/hooks/useSeo";

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
  status: string;
  submitted_at: string;
  quotation_id: string | null;
};

const STATUSES = ["new", "contacted", "closed", "refund", "archived"] as const;

function AdminRequestsInner() {
  const [rows, setRows] = useState<JourneyRequest[]>([]);
  const [selected, setSelected] = useState<JourneyRequest | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("journey_requests")
      .select("*")
      .order("submitted_at", { ascending: false });
    setRows((data as JourneyRequest[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("journey_requests").update({ status }).eq("id", id);
    setRows((r) => r.map((row) => (row.id === id ? { ...row, status } : row)));
    setSelected((s) => (s && s.id === id ? { ...s, status } : s));
  };

  return (
    <main className="px-6 py-8 md:px-10 md:py-10">
      <div className="mb-8">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.32em] text-primary">Studio</span>
        <h1 className="mt-2 font-serif text-3xl text-ivory">Journey Requests</h1>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="text-muted-foreground">No requests yet.</p>
      ) : (
        <div className="overflow-x-auto border border-border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-obsidian font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Submitted</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Destinations</th>
                <th className="px-4 py-3">Month</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Quoted</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr
                  key={r.id}
                  onClick={() => setSelected(r)}
                  className="cursor-pointer border-b border-border/60 transition-colors hover:bg-obsidian"
                >
                  <td className="px-4 py-3 text-muted-foreground">{new Date(r.submitted_at).toLocaleString()}</td>
                  <td className="px-4 py-3 text-ivory">{r.name}</td>
                  <td className="px-4 py-3">{r.email}</td>
                  <td className="px-4 py-3">{r.phone}</td>
                  <td className="px-4 py-3">{r.destinations.join(", ")}</td>
                  <td className="px-4 py-3">{r.travel_month ?? "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block border px-2 py-1 text-[0.65rem] uppercase tracking-[0.2em] ${
                      r.status === "new" ? "border-primary text-primary"
                      : r.status === "contacted" ? "border-gold text-gold"
                      : "border-border text-muted-foreground"
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{r.quotation_id ? <span className="text-gold">✓</span> : <span className="text-muted-foreground">—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-stretch justify-end bg-black/50" onClick={() => setSelected(null)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg overflow-y-auto bg-background p-8 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-primary">Request</span>
                <h2 className="mt-2 font-serif text-2xl text-ivory">{selected.name}</h2>
              </div>
              <button onClick={() => setSelected(null)} className="text-2xl text-muted-foreground hover:text-ivory">×</button>
            </div>

            <dl className="mt-8 space-y-3 text-sm">
              <Row label="Email" value={selected.email} />
              <Row label="Phone" value={selected.phone} />
              <Row label="Submitted" value={new Date(selected.submitted_at).toLocaleString()} />
              <Row label="Destinations" value={selected.destinations.join(", ") || "—"} />
              <Row label="Travel month" value={selected.travel_month ?? "—"} />
              <Row label="Companions" value={selected.companions ?? "—"} />
              <Row label="Sattvik" value={selected.sattvik ? "Yes" : "No"} />
              <Row label="Premium" value={selected.premium ? "Yes" : "No"} />
              <Row label="Chandru-led" value={selected.chandru_led ? "Yes" : "No"} />
              <Row label="Notes" value={selected.notes || "—"} />
            </dl>

            <div className="mt-8">
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">Status</span>
              <div className="mt-3 flex gap-2">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(selected.id, s)}
                    className={`border px-3 py-2 text-[0.65rem] uppercase tracking-[0.24em] ${
                      selected.status === s
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <QuotationForm request={selected} onSent={load} />
            <RefundPanel requestId={selected.id} onRefunded={load} />
          </div>
        </div>
      )}
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-6 border-b border-border/40 pb-2">
      <dt className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-muted-foreground">{label}</dt>
      <dd className="text-right text-ivory">{value}</dd>
    </div>
  );
}

export default function AdminRequestsPage() {
  useSeo({ title: "Journey Requests — Bhumivox Studio", description: "Studio admin." });
  return (
    <RequireAdmin>
      <AdminLayout>
        <AdminRequestsInner />
      </AdminLayout>
    </RequireAdmin>
  );
}
