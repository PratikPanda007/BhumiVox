import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { RequireAdmin } from "@/components/admin/RequireAdmin";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useSeo } from "@/hooks/useSeo";

type Req = {
  id: string;
  name: string;
  email: string;
  destinations: string[];
  status: string;
  submitted_at: string;
  quotation_id: string | null;
};

function Stat({ label, value, accent }: { label: string; value: number | string; accent?: string }) {
  return (
    <div className="border border-border bg-card p-6">
      <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-muted-foreground">{label}</p>
      <p className={`mt-3 font-serif text-3xl ${accent ?? "text-ivory"}`}>{value}</p>
    </div>
  );
}

function DashboardInner() {
  const [rows, setRows] = useState<Req[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("journey_requests")
        .select("id,name,email,destinations,status,submitted_at,quotation_id")
        .order("submitted_at", { ascending: false });
      setRows((data as Req[]) ?? []);
      setLoading(false);
    })();
  }, []);

  const stats = useMemo(() => {
    const c = { total: rows.length, new: 0, contacted: 0, archived: 0, quoted: 0 };
    rows.forEach((r) => {
      if (r.status === "new") c.new++;
      else if (r.status === "contacted") c.contacted++;
      else if (r.status === "archived") c.archived++;
      if (r.quotation_id) c.quoted++;
    });
    return c;
  }, [rows]);

  const chartData = useMemo(() => {
    const days: { date: string; count: number }[] = [];
    const map = new Map<string, number>();
    const now = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      map.set(key, 0);
      days.push({ date: key, count: 0 });
    }
    rows.forEach((r) => {
      const key = r.submitted_at.slice(0, 10);
      if (map.has(key)) map.set(key, (map.get(key) ?? 0) + 1);
    });
    return days.map((d) => ({ date: d.date.slice(5), count: map.get(d.date) ?? 0 }));
  }, [rows]);

  const topDestinations = useMemo(() => {
    const counts = new Map<string, number>();
    rows.forEach((r) => r.destinations.forEach((d) => counts.set(d, (counts.get(d) ?? 0) + 1)));
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [rows]);

  const recent = rows.slice(0, 5);
  const maxDest = topDestinations[0]?.[1] ?? 1;

  return (
    <main className="px-6 py-8 md:px-10 md:py-10">
      <div className="mb-8">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.32em] text-primary">Overview</span>
        <h1 className="mt-2 font-serif text-3xl text-ivory">Dashboard</h1>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            <Stat label="Total" value={stats.total} />
            <Stat label="New" value={stats.new} accent="text-primary" />
            <Stat label="Contacted" value={stats.contacted} accent="text-gold" />
            <Stat label="Archived" value={stats.archived} />
            <Stat label="Quoted" value={stats.quoted} accent="text-gold" />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="border border-border bg-card p-6 lg:col-span-2">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-muted-foreground">
                Requests — last 30 days
              </p>
              <div className="mt-4 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ left: -20, right: 10, top: 10, bottom: 0 }}>
                    <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} allowDecimals={false} />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        fontSize: 12,
                      }}
                    />
                    <Line type="monotone" dataKey="count" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="border border-border bg-card p-6">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-muted-foreground">
                Top destinations
              </p>
              {topDestinations.length === 0 ? (
                <p className="mt-4 text-sm text-muted-foreground">No data yet.</p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {topDestinations.map(([name, count]) => (
                    <li key={name}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-ivory">{name}</span>
                        <span className="font-mono text-xs text-muted-foreground">{count}</span>
                      </div>
                      <div className="mt-2 h-1 bg-obsidian">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${(count / maxDest) * 100}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="mt-8 border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-muted-foreground">
                Recent requests
              </p>
              <Link to="/admin/requests" className="text-[0.65rem] uppercase tracking-[0.28em] text-primary hover:text-gold">
                View all →
              </Link>
            </div>
            {recent.length === 0 ? (
              <p className="px-6 py-6 text-sm text-muted-foreground">No requests yet.</p>
            ) : (
              <ul className="divide-y divide-border/60">
                {recent.map((r) => (
                  <li key={r.id} className="flex flex-wrap items-center justify-between gap-2 px-6 py-4">
                    <div>
                      <p className="text-sm text-ivory">{r.name}</p>
                      <p className="text-xs text-muted-foreground">{r.email}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{r.destinations.join(", ") || "—"}</p>
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                      {new Date(r.submitted_at).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </main>
  );
}

export default function AdminDashboardPage() {
  useSeo({ title: "Dashboard — Bhumivox Studio", description: "Studio admin." });
  return (
    <RequireAdmin>
      <AdminLayout>
        <DashboardInner />
      </AdminLayout>
    </RequireAdmin>
  );
}
