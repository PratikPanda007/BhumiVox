import { Link } from "react-router-dom";
import { PageHero } from "@/components/PageHero";
import { Section, SectionLabel } from "@/components/Section";
import { JourneyCard } from "@/components/JourneyCard";
import { JOURNEYS, type JourneyTag } from "@/data/journeys";
import heroImg from "@/assets/journey-kashi.jpg";
import chandruPortrait from "@/assets/chandru-portrait.jpg";
import { useMemo, useState } from "react";
import { ArrowRight, Search, Calendar } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";

const FILTERS: ("All" | JourneyTag)[] = [
  "All",
  "Featured",
  "Group",
  "Private",
  "Chandru Ramesh-Led",
  "Family",
  "NRI Bharat",
  "Vaishnav",
  "Archaeology",
];

export default function JourneysPage() {
  useSeo({
    title: "Journeys — Bhumivox",
    description:
      "Research-led journeys across sacred Bharat — featured, group, private, family, NRI Bharat, Vaishnav and archaeology trails curated by Bhumivox.",
    ogTitle: "Journeys — Bhumivox",
    ogDescription:
      "Research-led journeys across sacred Bharat. Curated, small-group and private civilizational expeditions.",
  });
  const [active, setActive] = useState<(typeof FILTERS)[number]>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return JOURNEYS.filter((j) => {
      const matchesFilter = active === "All" || j.tags.includes(active);
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        j.title.toLowerCase().includes(q) ||
        j.region.toLowerCase().includes(q) ||
        j.blurb.toLowerCase().includes(q) ||
        j.bestFor.toLowerCase().includes(q) ||
        j.tags.some((t) => t.toLowerCase().includes(q));
      return matchesFilter && matchesQuery;
    });
  }, [active, query]);

  const upcoming = useMemo(() => {
    return JOURNEYS.flatMap((j) =>
      j.departures.map((d) => ({ journey: j, departure: d })),
    )
      .sort((a, b) => a.departure.date.localeCompare(b.departure.date))
      .slice(0, 4);
  }, []);

  const crLed = useMemo(() => {
    return JOURNEYS.filter((j) => j.tags.includes("Chandru Ramesh-Led"))
      .flatMap((j) => j.departures.map((d) => ({ journey: j, departure: d })))
      .sort((a, b) => a.departure.date.localeCompare(b.departure.date));
  }, []);

  return (
    <>
      <PageHero
        eyebrow="The Journeys"
        title={
          <>
            Research-led journeys across
            <span className="italic text-primary"> sacred Bharat.</span>
          </>
        }
        intro="Curated civilizational expeditions — featured, group, private, family, NRI Bharat, Vaishnav and archaeology trails. Each one slow-built, scholar-led, and intentionally small."
        image={heroImg}
      />

      <Section>
        <div className="flex flex-wrap items-center gap-3 border-y border-border py-6">
          <span className="eyebrow mr-2">Filter</span>
          <div className="flex flex-wrap items-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-4 py-2 text-[0.7rem] uppercase tracking-[0.28em] transition-colors ${
                  active === f
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-ivory"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="relative ml-auto w-full max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search journeys, regions, themes…"
              className="w-full border border-border bg-transparent py-2 pl-9 pr-3 text-sm text-ivory placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-16 text-center text-muted-foreground">
            No journeys match your filters yet — try another theme or contact our studio.
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((j) => (
              <div key={j.slug} className="flex flex-col gap-3">
                <JourneyCard j={j} />
                <div className="flex items-start justify-between gap-3 px-1">
                  <div className="text-xs text-muted-foreground">
                    <span className="text-ivory/80">Best for · </span>
                    {j.bestFor}
                  </div>
                  <span className="whitespace-nowrap font-mono text-[0.65rem] uppercase tracking-[0.22em] text-gold">
                    From {j.departures[0]?.priceFrom ?? "On request"}
                  </span>
                </div>
                <div className="flex gap-3 px-1">
                  <Link
                    to={`/journeys/${j.slug}`}
                    className="text-[0.7rem] uppercase tracking-[0.28em] text-ivory underline-offset-4 hover:underline"
                  >
                    View Journey
                  </Link>
                  <span className="text-muted-foreground">·</span>
                  <Link
                    to="/plan"
                    className="text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground hover:text-ivory"
                  >
                    Request Callback
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section className="!pt-0">
        <SectionLabel
          eyebrow="Upcoming Departures"
          title={
            <>
              Limited seats.
              <span className="italic text-primary"> Slow-built journeys.</span>
            </>
          }
          intro="Each departure is intentionally small — twelve travellers or fewer. Once a seat is taken, it is gone for that arc of the year."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          {upcoming.map(({ journey, departure }) => {
            const urgent = departure.seatsLeft <= 3;
            return (
              <Link
                key={journey.slug + departure.date}
                to={`/journeys/${journey.slug}`}
                className="group relative flex cursor-pointer items-center gap-5 border border-border/60 bg-card p-5 transition-colors hover:border-primary"
              >
                <img
                  src={journey.image}
                  alt={journey.title}
                  className="h-24 w-24 flex-shrink-0 object-cover transition-transform duration-500 group-hover:scale-105 md:h-28 md:w-28"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="eyebrow text-gold">{journey.region}</span>
                    <span
                      className={`px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] ${
                        urgent
                          ? "bg-primary text-primary-foreground"
                          : "border border-border text-muted-foreground"
                      }`}
                    >
                      {departure.seatsLeft} {departure.seatsLeft === 1 ? "seat" : "seats"} left
                    </span>
                  </div>
                  <h3 className="mt-2 font-serif text-xl text-ivory md:text-2xl">
                    {journey.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span>{departure.label}</span>
                    <span>·</span>
                    <span>{journey.duration}</span>
                    <span>·</span>
                    <span className="text-ivory/80">From {departure.priceFrom}</span>
                  </div>
                  <div className="mt-3 h-1 w-full bg-border/40">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{
                        width: `${
                          ((departure.totalSeats - departure.seatsLeft) /
                            departure.totalSeats) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
                <div className="hidden items-center pr-4 md:flex">
                  <ArrowRight
                    size={18}
                    className="text-ivory/0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-ivory/60"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* Chandru Ramesh-Led Journeys */}
      <Section className="!pt-0">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="relative">
            <div className="relative overflow-hidden border border-border/60">
              <img
                src={chandruPortrait}
                alt="Chandru Ramesh — Historian"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="eyebrow text-gold">Travel with</span>
                <p className="mt-2 font-serif text-3xl text-ivory">
                  Chandru Ramesh
                </p>
                <p className="mt-1 text-xs text-ivory/70">
                  Historian & Lead Guide
                </p>
              </div>
            </div>
          </div>

          <div>
            <SectionLabel
              eyebrow="Chandru Ramesh-Led Journeys"
              title={
                <>
                  A small calendar.
                  <span className="italic text-primary"> Personally led.</span>
                </>
              }
              intro="A handful of departures each year, walked alongside Chandru — historian, writer, and lead voice of Bhumivox. Invitations are limited; the calendar below reflects what is currently open."
            />

            <ul className="mt-10 divide-y divide-border/60 border-y border-border/60">
              {crLed.map(({ journey, departure }) => {
                const month = new Date(departure.date).toLocaleString("en-IN", {
                  month: "short",
                  year: "numeric",
                });
                const status =
                  departure.seatsLeft === 0
                    ? "Closed"
                    : departure.seatsLeft <= 2
                      ? "Waitlist"
                      : "Open";
                return (
                  <li
                    key={journey.slug + departure.date}
                    className="grid grid-cols-[80px_1fr_auto] items-center gap-4 py-5"
                  >
                    <div className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-gold">
                      <Calendar className="mb-1 inline h-3 w-3" /> {month}
                    </div>
                    <div>
                      <Link
                        to={`/journeys/${journey.slug}`}
                        className="font-serif text-lg text-ivory hover:text-primary"
                      >
                        {journey.title}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {journey.region} · {journey.duration}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.22em] ${
                        status === "Open"
                          ? "border border-border text-ivory/80"
                          : status === "Waitlist"
                            ? "bg-gold/20 text-gold"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {status}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/plan"
                className="border border-primary bg-primary px-6 py-3 text-[0.7rem] uppercase tracking-[0.28em] text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Request Invite
              </Link>
              <Link
                to="/contact"
                className="border border-border px-6 py-3 text-[0.7rem] uppercase tracking-[0.28em] text-ivory transition-colors hover:border-primary"
              >
                Request Callback
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Private Journey teaser */}
      <Section className="!pt-0">
        <div className="relative overflow-hidden border border-border/60 bg-card p-10 md:p-16">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1.2fr_1fr]">
            <div>
              <span className="eyebrow text-gold">Private Journeys</span>
              <h2 className="mt-4 font-serif text-3xl text-ivory md:text-5xl">
                Designed in <span className="italic text-primary">thirty days</span>,
                walked at your own pace.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
                Tell us where the land is calling you — a single temple, a circuit,
                or an arc across regions. Our studio designs one-off, fully private
                civilizational journeys for families, scholars and small parties,
                with a thirty-day design window and a dedicated historian.
              </p>
              <ul className="mt-6 grid grid-cols-1 gap-2 text-sm text-ivory/80 sm:grid-cols-2">
                <li>· Dedicated scholar guide</li>
                <li>· Custom 30-day design</li>
                <li>· Heritage-only stays</li>
                <li>· Inquiry-based, no online booking</li>
              </ul>
            </div>
            <div className="flex flex-col gap-4 md:items-end">
              <Link
                to="/plan"
                className="inline-flex items-center gap-3 border border-primary bg-primary px-7 py-4 text-[0.7rem] uppercase tracking-[0.28em] text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Plan Your Journey <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground hover:text-ivory"
              >
                Or speak to the studio
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
