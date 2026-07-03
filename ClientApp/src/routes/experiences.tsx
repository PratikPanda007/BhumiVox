import { PageHero } from "@/components/PageHero";
import { Section, SectionLabel } from "@/components/Section";
import { useSeo } from "@/hooks/useSeo";
import heroImg from "@/assets/journey-braj.jpg";

const TYPES = [
  { t: "Vaishnav Heritage",         d: "Multi-generation Vaishnav pilgrimages with curatorial depth and strict sampradaya etiquette." },
  { t: "Temple Trails",             d: "Living temple culture — South, North, East — read through liturgy and stone." },
  { t: "Archaeology Discovery",     d: "Restricted-access digs led by field archaeologists; chronology over photo-ops." },
  { t: "Family Heritage Journeys",  d: "Slow, premium itineraries designed for three generations to travel and learn together." },
  { t: "NRI Bharat Reconnection",   d: "For travellers returning to a Bharat they half-remember and wish to fully understand." },
  { t: "Premium Vegetarian Travel", d: "Strict sattvik kitchens, luxury comfort, no compromise on either side." },
];

export default function ExpPage() {
  useSeo({
    title: "Experience Types — Bhumivox",
    description:
      "Six ways to enter the same civilization — Vaishnav, family, archaeological, NRI, temple and sattvik travel.",
    ogTitle: "Experience Types — Bhumivox",
    ogDescription:
      "Vaishnav, family, archaeology, NRI, temple and sattvik experiences across sacred Bharat.",
  });
  return (
    <>
      <PageHero
        eyebrow="Experience Types"
        title={<>Six ways to enter <span className="italic text-primary">the same civilization.</span></>}
        intro="The same temple looks different to a Vaishnav family, to a returning NRI, to an archaeologist. We design accordingly."
        image={heroImg}
      />
      <Section>
        <div className="grid gap-px bg-border/60 md:grid-cols-2">
          {TYPES.map((x, i) => (
            <article key={x.t} className="bg-background p-12">
              <span className="font-mono text-[0.65rem] tracking-[0.22em] text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-6 font-serif text-3xl text-ivory md:text-4xl">{x.t}</h3>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">{x.d}</p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
