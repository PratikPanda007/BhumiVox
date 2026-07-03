import { PageHero } from "@/components/PageHero";
import { Section, SectionLabel } from "@/components/Section";
import { useSeo } from "@/hooks/useSeo";
import heroImg from "@/assets/journey-lanka.jpg";

const POSTS = [
  { tag: "Sacred Geography", title: "The Forgotten Saraswati: tracing a river through satellite", date: "Field Notes · 02", excerpt: "From Adi Badri to the Rann — what the radar still remembers about a river the maps have forgotten." },
  { tag: "Archaeology",      title: "What Dwarka's submerged stones still refuse to tell us",      date: "Field Notes · 07", excerpt: "Three submerged citadels, four hypotheses, one continuing question about a city under the sea." },
  { tag: "Founder's Notes",  title: "On listening to a temple before reading it",                  date: "Field Notes · 11", excerpt: "Why every Bhumivox journey begins with sixty silent minutes inside the garbhagriha." },
  { tag: "Temple Stories",   title: "The granite economy of the early Cholas",                     date: "Field Notes · 14", excerpt: "How a single river basin built a thousand temples in two hundred years." },
  { tag: "Heritage Travel",  title: "Why slow travel is the only travel left",                     date: "Field Notes · 16", excerpt: "Two weeks in Braj — and what fourteen days do that fourteen hours never can." },
  { tag: "Vaishnav Tradition", title: "The eight maths of Udupi, and what they cook",              date: "Field Notes · 19", excerpt: "Madhva's sattvik logistics, eight centuries on." },
];

export default function JournalPage() {
  useSeo({
    title: "The Journal — Bhumivox",
    description:
      "Long-form field writing on sacred geography, archaeology and heritage travel from the Bhumivox studio.",
    ogTitle: "The Journal — Bhumivox",
    ogDescription:
      "Field notes from researchers, archaeologists and travellers across sacred Bharat.",
  });
  return (
    <>
      <PageHero
        eyebrow="The Journal"
        title={<>Long-form writing from <span className="italic text-primary">the field.</span></>}
        intro="Not a blog. A working notebook from a studio that travels for a living."
        image={heroImg}
      />
      <Section>
        <div className="grid gap-px bg-border/60 md:grid-cols-2">
          {POSTS.map((p) => (
            <article key={p.title} className="group cursor-pointer bg-background p-12 transition-colors hover:bg-card">
              <div className="flex items-center justify-between">
                <span className="eyebrow text-gold">{p.tag}</span>
                <span className="font-mono text-[0.65rem] tracking-[0.22em] text-muted-foreground">{p.date}</span>
              </div>
              <h3 className="mt-8 font-serif text-3xl leading-tight text-ivory transition-colors group-hover:text-primary md:text-4xl">
                {p.title}
              </h3>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
              <span className="mt-10 block h-px w-12 bg-primary transition-all duration-500 group-hover:w-24" />
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
