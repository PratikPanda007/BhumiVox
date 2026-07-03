import { Link, useParams } from "react-router-dom";
import { Clock, Users, MapPin, Utensils, BedDouble, Compass, ChevronDown } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section, SectionLabel } from "@/components/Section";
import { getJourney, JOURNEYS, type JourneyDetail } from "@/data/journeys";
import { useSeo } from "@/hooks/useSeo";

// ---------- helpers ----------
function deriveHighlights(j: JourneyDetail): string[] {
  if (j.highlights?.length) return j.highlights;
  return j.itinerary.slice(0, 5).map((d) => d.title);
}

function deriveWhyMatters(j: JourneyDetail): string {
  return (
    j.whyMatters ??
    `${j.region} is not a destination — it is a text written on land. This journey reads that text slowly, with scholars who have spent decades inside it, so you leave with understanding rather than photographs.`
  );
}

function deriveWhyBhumivox(j: JourneyDetail): string[] {
  return (
    j.whyBhumivox ?? [
      "Research-led itineraries informed by Bhumivox's heritage intelligence archive.",
      "Access to scholars, custodians and sites that are rarely opened to travellers.",
      "Small groups, slow pace, and conservation-aligned operations through Historika Foundations.",
    ]
  );
}

function deriveWhoFor(j: JourneyDetail): string[] {
  return (
    j.whoFor ?? [
      j.bestFor,
      "Travellers who prefer depth over checklist sightseeing.",
      "Guests comfortable with early mornings, walking, and contemplative pacing.",
    ]
  );
}

function deriveFaq(j: JourneyDetail): { q: string; a: string }[] {
  return (
    j.faq ?? [
      {
        q: "How physically demanding is this journey?",
        a: "Moderate. Expect early mornings, walking on uneven ghats or temple precincts, and one or two longer drives. Suitable for fit guests of most ages.",
      },
      {
        q: "Can this journey be run privately for my family or group?",
        a: "Yes. Every Bhumivox journey can be designed as a private departure with custom dates, pacing, and additions. Request a callback to begin.",
      },
      {
        q: "What is the booking and cancellation process?",
        a: "We work inquiry-first. After a conversation, a 25% retainer confirms your seat. Full terms are shared in the journey brief.",
      },
      {
        q: "Are international guests and NRI families well supported?",
        a: "Yes — Bhumivox specialises in NRI Bharat journeys with airport reception, visa guidance, and bilingual scholar-guides.",
      },
    ]
  );
}

function deriveRoute(j: JourneyDetail): string[] {
  if (j.routePoints?.length) return j.routePoints;
  // pick up to 5 short titles from itinerary
  return j.itinerary.slice(0, 5).map((d) =>
    d.title.length > 18 ? d.title.split(/[ —&]/)[0] : d.title,
  );
}

// ---------- subcomponents ----------
function MetaIcon({ icon: Icon, label, value }: { icon: typeof Clock; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 border-l border-border/60 pl-4">
      <Icon className="mt-1 h-4 w-4 text-primary" />
      <div>
        <p className="text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">{label}</p>
        <p className="mt-1 font-serif text-base text-ivory">{value}</p>
      </div>
    </div>
  );
}

function RouteMap({ points }: { points: string[] }) {
  return (
    <div className="relative overflow-hidden border border-border/60 bg-card p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(212,164,90,0.08),transparent_60%)]" />
      <p className="eyebrow relative">Route</p>
      <div className="relative mt-6 flex items-center gap-2 overflow-x-auto pb-2">
        {points.map((p, i) => (
          <div key={i} className="flex flex-shrink-0 items-center gap-2">
            <div className="flex flex-col items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="whitespace-nowrap font-serif text-sm text-ivory">{p}</span>
            </div>
            {i < points.length - 1 && (
              <span className="mx-1 h-px w-12 bg-gradient-to-r from-primary/60 to-primary/10" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group border-b border-border/60 py-5">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
        <span className="font-serif text-lg text-ivory">{q}</span>
        <ChevronDown className="h-4 w-4 text-primary transition-transform group-open:rotate-180" />
      </summary>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a}</p>
    </details>
  );
}

// ---------- page ----------
export default function JourneyDetailPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const j = getJourney(slug);

  useSeo({
    title: j ? `${j.title} — Bhumivox` : "Journey — Bhumivox",
    description: j?.overview ?? "A civilizational journey across sacred Bharat.",
    ogImage: j?.hero,
  });

  if (!j) {
    return (
      <div className="mx-auto max-w-xl px-6 py-40 text-center">
        <p className="eyebrow">Not Found</p>
        <h1 className="mt-4 font-serif text-4xl text-ivory">
          This journey isn't published yet.
        </h1>
        <Link
          to="/journeys"
          className="mt-6 inline-block text-sm uppercase tracking-[0.28em] text-primary"
        >
          ← Browse all journeys
        </Link>
      </div>
    );
  }

  const highlights = deriveHighlights(j);
  const whyMatters = deriveWhyMatters(j);
  const whyBhumivox = deriveWhyBhumivox(j);
  const whoFor = deriveWhoFor(j);
  const faq = deriveFaq(j);
  const route = deriveRoute(j);
  const groupSize = j.groupSize ?? `${j.departures[0]?.totalSeats ?? 12} guests max`;
  const guideType = j.tags.includes("Chandru Ramesh-Led") ? "Chandru Ramesh-Led" : "Bhumivox Scholar-Guide";
  const priceFrom = j.departures[0]?.priceFrom ?? "On request";

  return (
    <>
      <PageHero
        eyebrow={`${j.region} · ${j.duration} · ${guideType}`}
        title={<>{j.title}</>}
        intro={j.blurb}
        image={j.hero}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/plan"
            className="bg-primary px-6 py-3 text-[0.7rem] uppercase tracking-[0.28em] text-primary-foreground hover:bg-primary/90"
          >
            Request Journey Plan
          </Link>
          <Link
            to="/contact"
            className="border border-border px-6 py-3 text-[0.7rem] uppercase tracking-[0.28em] text-ivory hover:border-primary"
          >
            Request Callback
          </Link>
          <a
            href="#departures"
            className="border border-border px-6 py-3 text-[0.7rem] uppercase tracking-[0.28em] text-ivory hover:border-primary"
          >
            See Departures
          </a>
        </div>
      </PageHero>

      {/* Meta strip */}
      <Section className="!py-12">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          <MetaIcon icon={Clock} label="Duration" value={j.duration} />
          <MetaIcon icon={Users} label="Group" value={groupSize} />
          <MetaIcon icon={MapPin} label="Region" value={j.region} />
          <MetaIcon icon={BedDouble} label="Stay" value="Heritage" />
          <MetaIcon icon={Utensils} label="Food" value="Sattvik" />
          <MetaIcon icon={Compass} label="Guide" value={guideType} />
        </div>
      </Section>

      {/* Overview + Why this matters */}
      <Section className="!pt-0">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <SectionLabel eyebrow="Overview" title={<>The journey.</>} />
            <p className="mt-6 text-base leading-relaxed text-ivory/85">{j.overview}</p>
          </div>
          <div>
            <SectionLabel eyebrow="Why this matters" title={<>The civilizational lens.</>} />
            <p className="mt-6 text-base leading-relaxed text-ivory/85">{whyMatters}</p>
          </div>
        </div>
      </Section>

      {/* Highlights */}
      <Section className="!pt-0">
        <SectionLabel eyebrow="Highlights" title={<>What you'll carry home.</>} />
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {highlights.map((h, i) => (
            <div key={i} className="border border-border/60 bg-card p-6">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-gold">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-3 font-serif text-lg leading-snug text-ivory">{h}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Route map */}
      <Section className="!pt-0">
        <RouteMap points={route} />
      </Section>

      {/* Itinerary */}
      <Section className="!pt-0">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SectionLabel eyebrow="Itinerary" title={<>Day by day.</>} />
            <ol className="mt-10 space-y-6 border-l border-border/60 pl-6">
              {j.itinerary.map((d, i) => (
                <li key={d.day} className="relative">
                  <span className="absolute -left-[31px] top-2 h-2 w-2 rounded-full bg-primary" />
                  <p className="eyebrow text-gold">{d.day}</p>
                  <h3 className="mt-1 font-serif text-2xl text-ivory">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.detail}</p>
                  {j.gallery[i % j.gallery.length] && i < 3 && (
                    <div className="mt-4 aspect-[16/8] overflow-hidden border border-border/40">
                      <img
                        src={j.gallery[i % j.gallery.length]}
                        alt=""
                        className="h-full w-full object-cover opacity-90"
                      />
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </div>

          <aside className="space-y-8">
            <div className="border border-border/60 bg-card p-6">
              <p className="eyebrow">Your Guide</p>
              <h3 className="mt-3 font-serif text-2xl text-ivory">{j.guideInfo.name}</h3>
              <p className="mt-1 text-xs uppercase tracking-[0.22em] text-gold">{j.guideInfo.role}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{j.guideInfo.bio}</p>
            </div>
            <div className="border border-border/60 bg-card p-6">
              <p className="eyebrow">Stay</p>
              <p className="mt-3 text-sm leading-relaxed text-ivory/85">{j.stay}</p>
            </div>
            <div className="border border-border/60 bg-card p-6">
              <p className="eyebrow">Food</p>
              <p className="mt-3 text-sm leading-relaxed text-ivory/85">{j.food}</p>
            </div>
          </aside>
        </div>
      </Section>

      {/* What makes this Bhumivox */}
      <Section className="!pt-0">
        <SectionLabel eyebrow="The Bhumivox Difference" title={<>What makes this journey ours.</>} />
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {whyBhumivox.map((line, i) => (
            <div key={i} className="border-t border-primary/40 pt-6">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-gold">
                0{i + 1}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ivory/85">{line}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Gallery */}
      <Section className="!pt-0">
        <SectionLabel eyebrow="Gallery" title={<>Frames from the field.</>} />
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {j.gallery.map((src, i) => (
            <div key={i} className="aspect-[4/5] overflow-hidden border border-border/60">
              <img src={src} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </Section>

      {/* Inclusions / Exclusions / Who for */}
      <Section className="!pt-0">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div>
            <p className="eyebrow">Inclusions</p>
            <ul className="mt-6 space-y-3">
              {j.inclusions.map((x) => (
                <li key={x} className="flex gap-3 text-sm text-ivory/85">
                  <span className="mt-2 h-px w-4 flex-shrink-0 bg-primary" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Exclusions</p>
            <ul className="mt-6 space-y-3">
              {j.exclusions.map((x) => (
                <li key={x} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="mt-2 h-px w-4 flex-shrink-0 bg-border" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Who this is for</p>
            <ul className="mt-6 space-y-3">
              {whoFor.map((x, i) => (
                <li key={i} className="flex gap-3 text-sm text-ivory/85">
                  <span className="mt-2 h-px w-4 flex-shrink-0 bg-gold" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Departures */}
      <Section id="departures" className="!pt-0">
        <SectionLabel
          eyebrow="Departures"
          title={
            <>
              Upcoming arcs.
              <span className="italic text-primary"> Limited seats.</span>
            </>
          }
        />
        <div className="mt-10 space-y-3">
          {j.departures.map((d) => {
            const urgent = d.seatsLeft <= 3;
            return (
              <div
                key={d.date}
                className="flex flex-col gap-4 border border-border/60 bg-card p-5 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <h4 className="font-serif text-xl text-ivory">{d.label}</h4>
                  <p className="mt-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                    {j.duration} · From {d.priceFrom}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.22em] ${
                      urgent
                        ? "bg-primary text-primary-foreground"
                        : "border border-border text-muted-foreground"
                    }`}
                  >
                    {d.seatsLeft} of {d.totalSeats} seats left
                  </span>
                  <Link
                    to="/plan"
                    className="border border-primary px-4 py-2 text-[0.65rem] uppercase tracking-[0.28em] text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    Reserve
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Price / Inquiry */}
      <Section className="!pt-0">
        <div className="grid grid-cols-1 gap-10 border border-primary/30 bg-card p-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="eyebrow">Investment</p>
            <p className="mt-3 font-serif text-4xl text-ivory">From {priceFrom}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Per guest · twin sharing · all-inclusive of stay, meals, scholars and ground operations.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link
              to="/plan"
              className="bg-primary px-6 py-3 text-[0.7rem] uppercase tracking-[0.28em] text-primary-foreground hover:bg-primary/90"
            >
              Request Journey Plan
            </Link>
            <Link
              to="/contact"
              className="border border-border px-6 py-3 text-[0.7rem] uppercase tracking-[0.28em] text-ivory hover:border-primary"
            >
              Request Callback
            </Link>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="!pt-0">
        <SectionLabel eyebrow="FAQ" title={<>Questions, answered.</>} />
        <div className="mt-10 max-w-3xl">
          {faq.map((f, i) => (
            <FaqItem key={i} q={f.q} a={f.a} />
          ))}
        </div>
      </Section>

      {/* Related */}
      <Section className="!pt-0">
        <p className="eyebrow">Other Journeys</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {JOURNEYS.filter((o) => o.slug !== j.slug)
            .slice(0, 4)
            .map((o) => (
              <Link
                key={o.slug}
                to={`/journeys/${o.slug}`}
                className="border border-border px-4 py-2 text-xs uppercase tracking-[0.22em] text-muted-foreground hover:border-primary hover:text-ivory"
              >
                {o.title}
              </Link>
            ))}
        </div>
      </Section>
    </>
  );
}
