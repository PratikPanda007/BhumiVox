import { Link } from "react-router-dom";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border bg-obsidian">
      <div className="mx-auto grid max-w-[1400px] gap-16 px-6 py-24 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-12">
        <div>
          <div className="flex items-center gap-3">
            <span className="inline-block h-2 w-2 rounded-full bg-primary glow-bronze" />
            <span className="font-serif text-2xl text-ivory">
              Bhumi<span className="text-primary">vox</span>
            </span>
          </div>
          <p className="mt-6 max-w-sm font-serif text-lg italic text-muted-foreground">
            Where civilizations come alive.
          </p>
          <p className="mt-8 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Research-led journeys across sacred Bharat — combining sacred geography,
            archaeology, and heritage intelligence into premium, deeply Indian travel.
          </p>
        </div>

        <FooterCol
          title="Explore"
          links={[
            { to: "/journeys", label: "Journeys" },
            { to: "/destinations", label: "Destinations" },
            { to: "/experiences", label: "Experiences" },
            { to: "/intelligence", label: "Intelligence" },
          ]}
        />
        <FooterCol
          title="Read"
          links={[
            { to: "/journal", label: "Journal" },
            { to: "/why-bhumivox", label: "Why Bhumivox" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
          ]}
        />
        <div>
          <h4 className="eyebrow">Reach Us</h4>
          <p className="mt-5 text-sm text-ivory">studio@bhumivox.in</p>
          <p className="mt-1 text-sm text-muted-foreground">+91 80 0000 0000</p>
          <p className="mt-6 text-xs text-muted-foreground">
            Heritage conservation partner — Historika Foundations
          </p>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-3 px-6 py-6 text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground md:flex-row md:items-center lg:px-12">
          <span>© {new Date().getFullYear()} Bhumivox · Bharat</span>
          <span>Documentary travel · Civilizational intelligence</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { to: string; label: string }[];
}) {
  return (
    <div>
      <h4 className="eyebrow">{title}</h4>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l.to}>
            <Link
              to={l.to}
              className="text-sm text-ivory/80 transition-colors hover:text-primary"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
