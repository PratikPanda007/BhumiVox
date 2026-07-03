import { Link } from "react-router-dom";
import { ArrowRight, Compass, Layers, MapPin, ScrollText, Telescope } from "lucide-react";
import heroImg from "@/assets/hero-civilization.jpg";
import chandruImg from "@/assets/chandru-portrait.jpg";
import intelMap from "@/assets/intelligence-map.jpg";
import { IndiaMap } from "@/components/IndiaMap";
import { JourneyCard } from "@/components/JourneyCard";
import { JOURNEYS } from "@/data/journeys";
import { Section, SectionLabel } from "@/components/Section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhatIsSection />
      <FeaturedJourneys />
      <ChandruSection />
      <IntelligenceSection />
      <ExperienceTypes />
      <JournalPreview />
      <FinalCTA />
    </>
  );
}

/* ----------------------------- HERO ----------------------------- */
function HeroSection() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden">
      <img
        src={heroImg}
        alt="Ancient temple complex at dusk with sacred route lines glowing across the terrain"
        width={1920}
        height={1080}
        fetchPriority="high"
        className="absolute inset-0 -z-10 h-full w-full object-cover slow-zoom"
      />
      <div className="absolute inset-0 -z-10 gradient-hero" />
      <div className="absolute inset-0 -z-10 grain" />

      <div className="mx-auto grid min-h-screen max-w-[1400px] grid-cols-1 items-end gap-12 px-6 pb-20 pt-36 lg:grid-cols-[1.4fr_1fr] lg:px-12 lg:pb-28">
        <div>
          <p className="eyebrow cine-rise">A Civilizational Travel House · Est. Bharat</p>
          <h1
            className="cine-rise mt-8 max-w-3xl font-serif text-6xl leading-[0.98] text-balance text-white md:text-[5.5rem] lg:text-[6.5rem]"
            style={{ animationDelay: "0.05s" }}
          >
            Where Civilizations
            <span className="block italic text-primary">Come Alive.</span>
          </h1>
          <p
            className="cine-rise mt-10 max-w-xl text-base leading-relaxed text-white/80 md:text-lg"
            style={{ animationDelay: "0.2s" }}
          >
            Bhumivox crafts research-led journeys across sacred Bharat — read through
            archaeology, sacred geography, and the slow intelligence of land.
            This is not tourism. This is civilizational travel.
          </p>

          <div
            className="cine-rise mt-12 flex flex-wrap items-center gap-5"
            style={{ animationDelay: "0.35s" }}
          >
            <Link
              to="/plan"
              className="group inline-flex items-center gap-3 bg-primary px-7 py-4 text-[0.7rem] uppercase tracking-[0.32em] text-primary-foreground transition-all hover:bg-gold hover:gap-5"
            >
              Plan Your Journey
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/journeys"
              className="link-underline text-[0.75rem] uppercase tracking-[0.32em] text-white"
            >
              Explore Journeys
            </Link>
          </div>
        </div>

        {/* Sacred geography panel */}
        <aside
          className="cine-rise relative hidden lg:block"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="relative border border-border/60 bg-obsidian/40 p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <span className="eyebrow">Living Map · Bharat</span>
              <span className="font-mono text-[0.6rem] tracking-[0.22em] text-muted-foreground">
                12 SACRED NODES
              </span>
            </div>
            <IndiaMap className="mt-4 h-[420px] w-full" />
            <div className="mt-3 flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground">
              <span>Lat 23.5° N</span>
              <span>Long 80.0° E</span>
              <span className="text-gold">● Active</span>
            </div>
          </div>
        </aside>
      </div>

      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 font-mono text-[0.6rem] uppercase tracking-[0.32em] text-muted-foreground md:block">
        Scroll · The civilization is still speaking
      </div>
    </section>
  );
}

/* --------------------------- WHAT IS --------------------------- */
function WhatIsSection() {
  const pillars = [
    { icon: ScrollText, label: "Sacred Text",  copy: "Itihasa and Purana read on the ground they describe." },
    { icon: Layers,     label: "Archaeology",  copy: "Excavation reports, dated chronology, material culture." },
    { icon: MapPin,     label: "Geography",    copy: "Paleo-channels, tirthas, terrain — Bharat as one body." },
    { icon: Telescope,  label: "Intelligence", copy: "LiDAR, GIS and satellite layered over living tradition." },
  ];

  return (
    <Section className="relative">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
        <SectionLabel
          eyebrow="What is Bhumivox"
          title={
            <>
              A travel house at the
              <em className="not-italic text-primary"> intersection of memory </em>
              and method.
            </>
          }
          intro="We do not curate destinations. We reconstruct civilizations — assembling sacred geography, archaeology, manuscript study and contemporary heritage intelligence into journeys that are intellectually serious and emotionally cinematic."
        />
        <div className="grid grid-cols-1 gap-px bg-border/60 sm:grid-cols-2">
          {pillars.map(({ icon: Icon, label, copy }) => (
            <div key={label} className="group bg-background p-8">
              <Icon className="text-primary transition-transform duration-700 group-hover:rotate-6" size={28} strokeWidth={1.25} />
              <h3 className="mt-6 font-serif text-2xl text-ivory">{label}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ----------------------- FEATURED JOURNEYS ----------------------- */
function FeaturedJourneys() {
  return (
    <Section>
      <div className="flex flex-wrap items-end justify-between gap-8">
        <SectionLabel
          eyebrow="Featured Journeys"
          title={
            <>
              Six civilizational arcs.
              <br />
              <span className="text-muted-foreground">One Bharat.</span>
            </>
          }
        />
        <Link to="/journeys" className="link-underline text-[0.7rem] uppercase tracking-[0.32em] text-ivory">
          All Journeys →
        </Link>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {JOURNEYS.map((j) => (
          <JourneyCard key={j.slug} j={j} />
        ))}
      </div>
    </Section>
  );
}

/* ----------------------- CHANDRU RAMESH ----------------------- */
function ChandruSection() {
  return (
    <section className="relative isolate overflow-hidden bg-obsidian">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-0 lg:grid-cols-[1fr_1.1fr]">
        <div className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[760px]">
          <img
            src={chandruImg}
            alt="Historian Chandru Ramesh holding an ancient manuscript"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover grayscale-[0.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-obsidian via-obsidian/40 to-transparent" />
          <div className="absolute bottom-8 left-8 max-w-xs border-l border-primary pl-5">
            <p className="font-serif text-2xl italic text-white">
              "We don't visit a site. We listen to what it remembers."
            </p>
            <p className="mt-4 eyebrow">— Chandru Ramesh</p>
          </div>
        </div>

        <div className="flex items-center px-6 py-24 lg:px-16 lg:py-32">
          <div>
            <p className="eyebrow">Travel With</p>
            <h2 className="mt-5 font-serif text-5xl leading-[1.05] text-ivory md:text-6xl">
              Chandru <span className="italic text-primary">Ramesh.</span>
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Historian. Archaeologist. Sacred geography researcher. Storyteller.
            </p>

            <div className="hairline my-10" />

            <p className="text-base leading-relaxed text-ivory/85 md:text-lg">
              Two decades in the field — from temple villages of Tamil Nadu to the
              paleo-channels of the Saraswati — Chandru leads a small number of
              private and group journeys each year, designed for travellers who want
              to understand Bharat, not merely photograph it.
            </p>

            <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
              {[
                "20+ years field research",
                "Published heritage scholar",
                "Sacred geography specialist",
                "Trustee, Historika Foundations",
              ].map((s) => (
                <li key={s} className="flex items-start gap-3 text-ivory/80">
                  <span className="mt-2 h-px w-4 flex-none bg-primary" />
                  {s}
                </li>
              ))}
            </ul>

            <Link
              to="/why-bhumivox"
              className="mt-12 inline-flex items-center gap-3 border border-primary/60 px-7 py-4 text-[0.7rem] uppercase tracking-[0.32em] text-ivory transition-all hover:bg-primary hover:text-primary-foreground"
            >
              Travel with Chandru Ramesh <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------- INTELLIGENCE ----------------------- */
function IntelligenceSection() {
  return (
    <Section>
      <div className="grid gap-16 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
        <div>
          <p className="eyebrow">Bhumivox Intelligence</p>
          <h2 className="mt-5 font-serif text-5xl leading-tight text-ivory md:text-6xl">
            The land,
            <br />
            <span className="italic text-primary">read in layers.</span>
          </h2>
          <p className="mt-8 text-base leading-relaxed text-muted-foreground md:text-lg">
            LiDAR. GIS. Drone-mapped sites. Satellite terrain. Sacred geography
            overlaid on archaeological grids. Every Bhumivox journey is built on a
            research workspace most travellers never see.
          </p>
          <div className="mt-10 space-y-5">
            {[
              ["LiDAR", "Sub-canopy site mapping"],
              ["GIS", "Tirtha networks & paleo-channels"],
              ["Satellite", "Multispectral terrain analysis"],
              ["Field Archaeology", "Excavation chronology"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between border-b border-border/60 pb-4">
                <span className="font-mono text-xs uppercase tracking-[0.28em] text-primary">{k}</span>
                <span className="text-sm text-ivory/80">{v}</span>
              </div>
            ))}
          </div>
          <Link
            to="/intelligence"
            className="mt-10 inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-ivory link-underline"
          >
            Enter the Intelligence Layer <ArrowRight size={14} />
          </Link>
        </div>

        <div className="relative border border-border/60 bg-obsidian">
          <img
            src={intelMap}
            alt="Geospatial dashboard of sacred sites across Bharat"
            loading="lazy"
            className="h-full w-full object-cover opacity-90"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent" />
          <div className="absolute left-4 top-4 flex items-center gap-2 border border-border bg-obsidian/70 px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-gold">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
            Live · Sacred Geography Index
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ----------------------- EXPERIENCE TYPES ----------------------- */
function ExperienceTypes() {
  const types = [
    { t: "Vaishnav Heritage",        d: "Multi-generation pilgrimages with curatorial depth." },
    { t: "Temple Trails",            d: "Living temple culture across South & North." },
    { t: "Archaeology Discovery",    d: "Restricted-access digs with field archaeologists." },
    { t: "Family Heritage Journeys", d: "Slow, premium itineraries for three generations." },
    { t: "NRI Bharat Reconnection",  d: "For those returning to a Bharat they half-remember." },
    { t: "Premium Vegetarian Travel",d: "Strict sattvik kitchens, luxury comfort, no compromise." },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-obsidian">
      <Section className="!py-32">
        <SectionLabel
          eyebrow="Experience Types"
          title={
            <>
              Six ways to enter
              <span className="italic text-primary"> the same civilization.</span>
            </>
          }
        />
        <div className="mt-16 grid grid-cols-1 gap-px bg-border/60 md:grid-cols-2 lg:grid-cols-3">
          {types.map(({ t, d }, i) => (
            <article key={t} className="group relative bg-obsidian p-10 transition-colors hover:bg-card">
              <Compass size={22} strokeWidth={1.25} className="text-primary" />
              <span className="absolute right-8 top-8 font-mono text-[0.65rem] tracking-[0.22em] text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-10 font-serif text-2xl text-ivory">{t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d}</p>
              <div className="mt-8 h-px w-10 bg-primary transition-all duration-500 group-hover:w-24" />
            </article>
          ))}
        </div>
      </Section>
    </section>
  );
}

/* ----------------------- JOURNAL PREVIEW ----------------------- */
function JournalPreview() {
  const posts = [
    { tag: "Sacred Geography", title: "The Forgotten Saraswati: tracing a river through satellite",  date: "Field Notes · 02" },
    { tag: "Archaeology",      title: "What Dwarka's submerged stones still refuse to tell us",       date: "Field Notes · 07" },
    { tag: "Founder's Notes",  title: "On listening to a temple before reading it",                   date: "Field Notes · 11" },
  ];

  return (
    <Section>
      <div className="flex flex-wrap items-end justify-between gap-8">
        <SectionLabel eyebrow="The Journal" title="Long-form field writing." />
        <Link to="/journal" className="link-underline text-[0.7rem] uppercase tracking-[0.32em] text-ivory">
          Read the Journal →
        </Link>
      </div>
      <div className="mt-16 grid gap-px bg-border/60 md:grid-cols-3">
        {posts.map((p) => (
          <article key={p.title} className="group cursor-pointer bg-background p-10 transition-colors hover:bg-card">
            <span className="eyebrow text-gold">{p.tag}</span>
            <h3 className="mt-8 font-serif text-3xl leading-tight text-ivory transition-colors group-hover:text-primary">
              {p.title}
            </h3>
            <p className="mt-10 font-mono text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">
              {p.date}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ----------------------- FINAL CTA ----------------------- */
function FinalCTA() {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={heroImg}
        alt=""
        loading="lazy"
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-50 slow-zoom"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/85 to-background" />
      <div className="absolute inset-0 -z-10 grain" />

      <div className="mx-auto max-w-5xl px-6 py-40 text-center lg:py-56">
        <p className="eyebrow">An Invitation</p>
        <h2 className="mt-8 font-serif text-5xl leading-[1.02] text-balance text-ivory md:text-7xl lg:text-8xl">
          The civilization is still speaking.
          <span className="block italic text-primary">Will you explore it?</span>
        </h2>
        <div className="mt-14 flex flex-wrap justify-center gap-5">
          <Link
            to="/plan"
            className="inline-flex items-center gap-3 bg-primary px-9 py-5 text-[0.7rem] uppercase tracking-[0.32em] text-primary-foreground transition-all hover:bg-gold"
          >
            Plan Your Journey <ArrowRight size={14} />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 border border-border px-9 py-5 text-[0.7rem] uppercase tracking-[0.32em] text-ivory transition-colors hover:border-primary"
          >
            Speak With Us
          </Link>
        </div>
      </div>
    </section>
  );
}
