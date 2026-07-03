import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setEmail(session?.user.email ?? "");
    })();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin", { replace: true });
  };

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-3 text-[0.72rem] uppercase tracking-[0.24em] border-l-2 transition-colors ${
      isActive
        ? "border-primary bg-obsidian text-ivory"
        : "border-transparent text-muted-foreground hover:text-ivory hover:border-border"
    }`;

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="hidden w-60 shrink-0 border-r border-border md:flex md:flex-col">
        <div className="border-b border-border px-6 py-6">
          <Link to="/admin/dashboard">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-primary">Bhumivox</span>
            <h2 className="mt-1 font-serif text-lg text-ivory">Studio Console</h2>
          </Link>
        </div>
        <nav className="flex-1 py-4">
          <NavLink to="/admin/dashboard" className={linkCls}>Dashboard</NavLink>
          <NavLink to="/admin/requests" className={linkCls}>Requests</NavLink>
        </nav>
        <div className="border-t border-border px-6 py-5">
          <p className="truncate text-xs text-muted-foreground">{email}</p>
          <button onClick={signOut} className="mt-3 text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground hover:text-ivory">
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="flex items-center justify-between border-b border-border px-6 py-4 md:hidden">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-primary">Bhumivox · Studio</span>
          <button onClick={signOut} className="text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">
            Sign out
          </button>
        </header>
        <div className="flex gap-2 border-b border-border px-4 py-2 md:hidden">
          <NavLink to="/admin/dashboard" className={linkCls}>Dashboard</NavLink>
          <NavLink to="/admin/requests" className={linkCls}>Requests</NavLink>
        </div>
        {children}
      </div>
    </div>
  );
}
