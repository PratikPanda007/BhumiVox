import { PageHero } from "@/components/PageHero";
import { Section, SectionLabel } from "@/components/Section";
import { useSeo } from "@/hooks/useSeo";
import heroImg from "@/assets/journey-kurukshetra.jpg";

export default function AboutPage() {
  useSeo({
    title: "About — Bhumivox",
    description:
      "A travel house at the intersection of memory and method — the philosophy and partnerships behind Bhumivox.",
    ogDescription:
      "Founder's vision, philosophy and conservation partnerships behind Bhumivox.",
  });
  return (
    <>
      <PageHero
        eyebrow="About"
        title={<>A studio for <span className="italic text-primary">civilizational travel.</span></>}
        intro="Bhumivox exists because Bharat deserves to be travelled the way it deserves to be read — slowly, intelligently, and with deep respect."
        image={heroImg}
      />

      <Section>
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr] lg:gap-24">
          <SectionLabel eyebrow="Founder's Vision" title="Memory, made walkable." />
          <div className="space-y-6 text-base leading-relaxed text-ivory/85 md:text-lg">
            <p>
              The founding question of Bhumivox is simple: what would Indian travel look
              like if it were designed by a historian, not a marketer? Every itinerary,
              every meal, every silence on the bus — answered from that single brief.
            </p>
            <p>
              We don't compete with tourism. We work in a different category.
              Civilizational travel is research, hospitality and storytelling, in
              that order, and at the highest grade we can sustain.
            </p>
          </div>
        </div>
      </Section>

      <section className="bg-obsidian">
        <Section>
          <div className="grid gap-16 lg:grid-cols-3">
            {[
              { t: "Philosophy", d: "Itihasa is not nostalgia. It is the operating system of a living civilization." },
              { t: "Research-driven travel", d: "Field studies precede first traveller; nothing is improvised at the site." },
              { t: "Heritage conservation", d: "Partnered with Historika Foundations — every journey contributes to active conservation work." },
            ].map((b) => (
              <div key={b.t}>
                <span className="eyebrow text-gold">·</span>
                <h3 className="mt-4 font-serif text-3xl text-ivory">{b.t}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{b.d}</p>
              </div>
            ))}
          </div>
        </Section>
      </section>
    </>
  );
}
