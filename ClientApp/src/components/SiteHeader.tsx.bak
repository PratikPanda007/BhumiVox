import { NavLink as Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/journeys", label: "Journeys" },
  { to: "/destinations", label: "Destinations" },
  { to: "/experiences", label: "Experiences" },
  { to: "/intelligence", label: "Bhumivox Intelligence" },
  { to: "/journal", label: "Journal" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 lg:px-12">
        <Link to="/" className="group flex items-center gap-3">
          <span className="inline-block h-2 w-2 rounded-full bg-primary glow-bronze" />
          <span className="font-serif text-xl tracking-wide text-ivory">
            Bhumi<span className="text-primary">vox</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.slice(1, 7).map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `link-underline text-xs uppercase tracking-[0.22em] transition-colors hover:text-ivory ${
                  isActive ? "text-ivory" : "text-muted-foreground"
                }`
              }
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/plan"
            className="hidden rounded-none border border-primary/60 px-5 py-2.5 text-[0.7rem] uppercase tracking-[0.28em] text-ivory transition-all hover:bg-primary hover:text-primary-foreground md:inline-block"
          >
            Plan Your Journey
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="rounded-none border border-border p-2 text-ivory lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-obsidian/95 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto flex max-w-[1400px] flex-col px-6 py-6">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="border-b border-border/40 py-4 text-sm uppercase tracking-[0.22em] text-ivory"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/plan"
              onClick={() => setOpen(false)}
              className="mt-6 border border-primary px-5 py-3 text-center text-[0.7rem] uppercase tracking-[0.28em] text-ivory"
            >
              Plan Your Journey
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
