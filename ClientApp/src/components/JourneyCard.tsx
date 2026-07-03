import { Link } from "react-router-dom";

export interface Journey {
  slug: string;
  title: string;
  region: string;
  duration: string;
  image: string;
  blurb: string;
  guide?: string;
}

export function JourneyCard({ j, large = false }: { j: Journey; large?: boolean }) {
  return (
    <Link
      to={`/journeys/${j.slug}`}
      className={`card-cinema group relative block overflow-hidden border border-border/60 bg-card ${
        large ? "aspect-[4/5] md:aspect-[5/6]" : "aspect-[3/4]"
      }`}
    >
      <img
        src={j.image}
        alt={j.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 gradient-card" />
      <div className="absolute inset-0 flex flex-col justify-between p-7">
        <div className="flex items-center justify-between">
          <span className="eyebrow text-gold">{j.region}</span>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-white/70">
            {j.duration}
          </span>
        </div>
        <div>
          <h3 className="font-serif text-3xl text-white md:text-4xl">{j.title}</h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75">
            {j.blurb}
          </p>
          <div className="mt-6 flex items-center gap-3">
            <span className="h-px w-10 bg-primary transition-all duration-500 group-hover:w-20" />
            <span className="text-[0.7rem] uppercase tracking-[0.28em] text-white">
              Explore Journey
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
