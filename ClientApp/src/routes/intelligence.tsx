import { PageHero } from "@/components/PageHero";
import { Section, SectionLabel } from "@/components/Section";
import { useSeo } from "@/hooks/useSeo";
import intelImg from "@/assets/intelligence-map.jpg";

export default function IntelPage() {
  useSeo({
    title: "Bhumivox Intelligence — Heritage Geospatial Layer",
    description:
      "LiDAR, GIS, satellite, drone — the heritage intelligence engine behind every Bhumivox journey.",
    ogTitle: "Bhumivox Intelligence",
    ogDescription:
      "The geospatial research workspace behind our civilizational journeys.",
  });
  const layers = [
    { k: "LiDAR",        d: "Penetrates jungle canopy; reveals temple footprints and lost step-wells." },
    { k: "GIS",          d: "Tirtha networks, pilgrim routes and paleo-river systems plotted as one graph." },
    { k: "Satellite",    d: "Multispectral imagery for vegetation, salinity, ancient settlement traces." },
    { k: "Drone",        d: "Centimetre-grade orthomosaics of restricted-access sites." },
    { k: "Manuscript",   d: "Digitised primary texts cross-referenced to terrain." },
    { k: "Excavation",   d: "ASI reports and field chronologies, normalised to a single timeline." },
  ];

  return (
    <>
      <PageHero
        eyebrow="Bhumivox Intelligence"
        title={
          <>
            A research workspace
            <span className="italic text-primary"> beneath every journey.</span>
          </>
        }
        intro="We do not arrive at a site cold. Every Bhumivox itinerary sits on six intelligence layers — geospatial, archaeological, textual — assembled long before the first traveller boards a flight."
        image={intelImg}
      />

      <Section>
        <SectionLabel
          eyebrow="Six Layers"
          title={<>The land, <span className="italic text-primary">read in stack.</span></>}
        />
        <div className="mt-16 grid gap-px bg-border/60 md:grid-cols-2 lg:grid-cols-3">
          {layers.map((l, i) => (
            <div key={l.k} className="bg-background p-10">
              <span className="font-mono text-[0.65rem] tracking-[0.22em] text-muted-foreground">L · {String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-6 font-serif text-3xl text-ivory">{l.k}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{l.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="!pt-0">
        <div className="relative border border-border/60 bg-obsidian">
          <img src={intelImg} alt="Geospatial dashboard" loading="lazy" className="h-[560px] w-full object-cover opacity-90" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 max-w-md">
            <p className="font-serif text-2xl text-ivory md:text-3xl">
              "Heritage intelligence is not a feature. It's the floor we build on."
            </p>
            <p className="mt-4 eyebrow">— Bhumivox Studio</p>
          </div>
        </div>
      </Section>
    </>
  );
}
