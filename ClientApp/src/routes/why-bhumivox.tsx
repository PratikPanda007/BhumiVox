import { Link } from "react-router-dom";
import { PageHero } from "@/components/PageHero";
import { Section, SectionLabel } from "@/components/Section";
import { ArrowRight } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";
import chandruImg from "@/assets/chandru-portrait.jpg";
import heroImg from "@/assets/journey-ayodhya.jpg";

export default function WhyPage() {
  useSeo({
    title: "Why Bhumivox — Travel With Chandru Ramesh",
    description:
      "The intellectual moat of Bhumivox — historian-led, research-grade, civilizational travel.",
    ogTitle: "Why Bhumivox",
    ogDescription: "Travel with Chandru Ramesh. Understand Bharat like never before.",
  });
  return (
    <>
      <PageHero
        eyebrow="Why Bhumivox"
        title={
          <>
            Travel with Chandru Ramesh.
            <span className="block italic text-primary">Understand Bharat like never before.</span>
          </>
        }
        intro="A civilization this old does not yield to a tour bus. It yields to attention, scholarship, and a slower kind of seeing."
        image={heroImg}
      />

      <Section>
        <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
          <img src={chandruImg} alt="Chandru Ramesh" loading="lazy" className="aspect-[4/5] w-full object-cover grayscale-[0.1]" />
          <div>
            <p className="eyebrow">Who is Chandru Ramesh</p>
            <h2 className="mt-5 font-serif text-4xl leading-tight text-ivory md:text-5xl">
              Historian of the land,
              <span className="italic text-primary"> storyteller of its civilization.</span>
            </h2>
            <p className="mt-8 text-base leading-relaxed text-ivory/85 md:text-lg">
              Chandru has spent two decades reading Bharat as one continuous manuscript —
              from the granite temples of Tamil Nadu to the paleo-channels of the Saraswati.
              He brings to every journey a working historian's discipline and a storyteller's
              cadence.
            </p>
            <div className="hairline my-10" />
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {[
                ["Civilizational storytelling", "Itihasa as living text, not nostalgia."],
                ["Archaeology & sacred geography", "Site chronology meets tirtha networks."],
                ["Research-led immersion", "Every itinerary built on field notes."],
                ["Heritage intelligence", "LiDAR, GIS and satellite as standard kit."],
              ].map(([t, d]) => (
                <li key={t}>
                  <h4 className="font-serif text-xl text-ivory">{t}</h4>
                  <p className="mt-2 text-sm text-muted-foreground">{d}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Comparison */}
      <section className="bg-obsidian">
        <Section>
          <SectionLabel
            eyebrow="The Difference"
            title={<>Normal tourism <span className="italic text-primary">vs Bhumivox.</span></>}
          />
          <div className="mt-12 grid gap-px bg-border/60 md:grid-cols-2">
            <div className="bg-obsidian p-10">
              <span className="eyebrow text-muted-foreground">Normal Tourism</span>
              <ul className="mt-6 space-y-4 text-sm text-muted-foreground">
                {["Bus circuit · photo stops","Guide reads a brochure","Sites visited, not read","Crowded, transactional","Surface devotion or souvenir hunting","Generic vegetarian buffets"].map(x => (
                  <li key={x} className="border-b border-border/40 pb-3">— {x}</li>
                ))}
              </ul>
            </div>
            <div className="bg-card p-10">
              <span className="eyebrow text-gold">Bhumivox</span>
              <ul className="mt-6 space-y-4 text-sm text-ivory/90">
                {["Private vehicles · slow time on each site","Historian leads · field-grade scholarship","Sites read in layers — text, terrain, chronology","Intimate parties · 8–14 travellers","Civilizational understanding, not nostalgia","Curated sattvik kitchens, premium comfort"].map(x => (
                  <li key={x} className="border-b border-border/40 pb-3">— {x}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      </section>

      <Section>
        <SectionLabel eyebrow="Upcoming · CR-Led" title="Three journeys, one season." />
        <div className="mt-12 grid gap-px bg-border/60 md:grid-cols-3">
          {[
            { t: "Braj Winter Field Study", d: "Nov · 8 nights · 12 seats" },
            { t: "Dwarka Marine Expedition", d: "Jan · 6 nights · 10 seats" },
            { t: "Ayodhya — Chitrakoot Arc", d: "Mar · 10 nights · 14 seats" },
          ].map(({ t, d }) => (
            <div key={t} className="bg-background p-10">
              <h3 className="font-serif text-2xl text-ivory">{t}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{d}</p>
              <Link to="/plan" className="mt-8 inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.28em] text-primary link-underline">
                Request Place <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
