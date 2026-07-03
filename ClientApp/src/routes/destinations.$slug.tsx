import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section, SectionLabel } from "@/components/Section";
import { getDestination, DESTINATIONS } from "@/data/destinations";
import { getJourney } from "@/data/journeys";
import { useSeo } from "@/hooks/useSeo";

export default function DestinationDetailPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const d = getDestination(slug);

  useSeo({
    title: d ? `${d.name} — ${d.circuit} · Bhumivox` : "Destination — Bhumivox",
    description: (d?.significance ?? "A sacred geography of Bharat.").slice(0, 158),
    ogImage: d?.image,
  });

  if (!d) {
    return (
      <div className="mx-auto max-w-xl px-6 py-40 text-center">
        <p className="eyebrow">Not Found</p>
        <h1 className="mt-4 font-serif text-4xl text-ivory">
          This destination isn't published yet.
        </h1>
        <Link
          to="/destinations"
          className="mt-6 inline-block text-sm uppercase tracking-[0.28em] text-primary"
        >
          ← Browse all destinations
        </Link>
      </div>
    );
  }

  const related = d.relatedJourneys.map(getJourney).filter(Boolean);
  const others = DESTINATIONS.filter(
    (o) => o.slug !== d.slug && o.circuit === d.circuit,
  ).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={`${d.circuit} · ${d.region}`}
        title={<>{d.name}</>}
        intro={d.tagline}
        image={d.image}
      >
        <div className="flex flex-wrap items-center gap-3">
          {related.length > 0 && (
            <Link
              to={`/journeys/${related[0]!.slug}`}
              className="bg-primary px-6 py-3 text-[0.7rem] uppercase tracking-[0.28em] text-primary-foreground hover:bg-primary/90"
            >
              See Journeys Here
            </Link>
          )}
          <Link
            to="/plan"
            className="border border-border px-6 py-3 text-[0.7rem] uppercase tracking-[0.28em] text-ivory hover:border-primary"
          >
            Plan a Private Visit
          </Link>
        </div>
      </PageHero>

      {/* Significance + Geography */}
      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <p className="eyebrow">Significance</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight text-ivory md:text-4xl">
                Why this place matters.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-ivory/85 md:text-lg">
                {d.significance}
              </p>
            </div>

            <div>
              <p className="eyebrow">Sacred Geography</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight text-ivory md:text-4xl">
                How the land is read.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-ivory/85 md:text-lg">
                {d.geography}
              </p>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="border border-border/60 bg-card p-6">
              <p className="eyebrow">Best Time to Visit</p>
              <p className="mt-3 text-sm leading-relaxed text-ivory/85">{d.bestTime}</p>
            </div>
            <div className="border border-border/60 bg-card p-6">
              <p className="eyebrow">Circuit</p>
              <p className="mt-3 font-serif text-xl text-ivory">{d.circuit}</p>
              <Link
                to="/destinations"
                className="mt-4 inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.28em] text-primary"
              >
                See all in this circuit
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="border border-border/60 bg-card p-6">
              <p className="eyebrow">Highlights</p>
              <ul className="mt-4 space-y-3">
                {d.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm text-ivory/85">
                    <span className="mt-2 h-px w-4 flex-shrink-0 bg-primary" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      {/* Gallery */}
      <Section className="!pt-0">
        <SectionLabel eyebrow="Gallery" title={<>Frames from the field.</>} />
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {d.gallery.map((src, i) => (
            <div key={i} className="aspect-[4/5] overflow-hidden border border-border/60">
              <img src={src} alt={`${d.name} ${i + 1}`} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </Section>

      {/* Related Journeys */}
      {related.length > 0 && (
        <Section className="!pt-0">
          <SectionLabel
            eyebrow="Journeys Here"
            title={
              <>
                Walk this geography with
                <span className="italic text-primary"> a historian.</span>
              </>
            }
          />
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {related.map((j) => (
              <Link
                key={j!.slug}
                to={`/journeys/${j!.slug}`}
                className="group relative isolate flex aspect-[16/10] flex-col justify-end overflow-hidden border border-border/60"
              >
                <img
                  src={j!.image}
                  alt={j!.title}
                  className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-obsidian via-obsidian/70 to-transparent" />
                <div className="p-6">
                  <p className="eyebrow text-gold">{j!.duration}</p>
                  <h3 className="mt-2 font-serif text-2xl text-ivory">{j!.title}</h3>
                  <p className="mt-2 text-sm text-ivory/75 line-clamp-2">{j!.blurb}</p>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* More in this circuit */}
      {others.length > 0 && (
        <Section className="!pt-0">
          <p className="eyebrow">More in {d.circuit}</p>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                to={`/destinations/${o.slug}`}
                className="group border border-border/60 bg-card p-5 transition-colors hover:border-primary"
              >
                <p className="font-serif text-xl text-ivory group-hover:text-primary">{o.name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  {o.region}
                </p>
                <p className="mt-3 text-sm text-ivory/75">{o.tagline}</p>
              </Link>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
