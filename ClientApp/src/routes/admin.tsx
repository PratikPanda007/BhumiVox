import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useSeo } from "@/hooks/useSeo";

export default function AdminLogin() {
  useSeo({ title: "Admin — Bhumivox", description: "Studio access." });
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", session.user.id);
      if (data && data.length > 0) navigate("/admin/dashboard", { replace: true });
    })();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError || !data.session) {
      setError(signInError?.message ?? "Sign in failed.");
      setLoading(false);
      return;
    }
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", data.session.user.id);
    if (!roles || roles.length === 0) {
      await supabase.auth.signOut();
      setError("This account does not have admin access.");
      setLoading(false);
      return;
    }
    navigate("/admin/dashboard", { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <form onSubmit={handleLogin} className="w-full max-w-sm border border-border bg-card p-10">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.32em] text-primary">Studio</span>
        <h1 className="mt-3 font-serif text-3xl text-ivory">Admin Sign-in</h1>
        <p className="mt-2 text-sm text-muted-foreground">Restricted area.</p>

        <label className="mt-8 block">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-2 w-full border-b border-border bg-transparent py-3 text-base text-ivory outline-none focus:border-primary"
          />
        </label>
        <label className="mt-6 block">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-2 w-full border-b border-border bg-transparent py-3 text-base text-ivory outline-none focus:border-primary"
          />
        </label>

        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-8 w-full bg-primary px-8 py-4 text-[0.7rem] uppercase tracking-[0.32em] text-primary-foreground hover:bg-gold disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
