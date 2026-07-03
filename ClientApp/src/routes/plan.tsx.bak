import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { useState } from "react";
import { useSeo } from "@/hooks/useSeo";
import heroImg from "@/assets/journey-braj.jpg";

const STEPS = [
  { n: "01", t: "Destination", d: "Where does Bharat call you?" },
  { n: "02", t: "Travel Window", d: "When can you give us your time?" },
  { n: "03", t: "Companions", d: "Who travels with you?" },
  { n: "04", t: "Style", d: "Tell us how you want to travel." },
] as const;

export default function PlanPage() {
  useSeo({
    title: "Plan Your Journey — Bhumivox",
    description:
      "A four-step civilizational journey planner — destination, dates, companions, style.",
    ogTitle: "Plan Your Journey — Bhumivox",
    ogDescription: "Begin a private, research-led journey across sacred Bharat.",
  });
  const [step, setStep] = useState(0);

  return (
    <>
      <PageHero
        eyebrow="Plan Your Journey"
        title={
          <>
            A quiet four-step <span className="italic text-primary">beginning.</span>
          </>
        }
        intro="No instant booking. A studio conversation, shaped by what you tell us here."
        image={heroImg}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-24">
          <aside>
            <ol className="space-y-6 border-l border-border pl-8">
              {STEPS.map((s, i) => (
                <li
                  key={s.n}
                  className={`relative cursor-pointer transition-colors ${i === step ? "text-ivory" : "text-muted-foreground"}`}
                  onClick={() => setStep(i)}
                >
                  <span
                    className={`absolute -left-[37px] top-1 h-2 w-2 rounded-full ${i === step ? "bg-primary glow-bronze" : "bg-border"}`}
                  />
                  <span className="font-mono text-[0.65rem] tracking-[0.28em]">{s.n}</span>
                  <h4 className="mt-1 font-serif text-2xl">{s.t}</h4>
                  <p className="mt-1 text-sm">{s.d}</p>
                </li>
              ))}
            </ol>
          </aside>

          <form
            className="border border-border/60 bg-obsidian p-10 md:p-14"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you — the studio will draft your journey within 48 hours.");
            }}
          >
            <span className="eyebrow text-gold">Step {STEPS[step].n}</span>
            <h2 className="mt-4 font-serif text-4xl text-ivory md:text-5xl">{STEPS[step].t}</h2>

            <div className="mt-10 space-y-6">
              {step === 0 && (
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {[
                    "Braj",
                    "Kashi",
                    "Ayodhya",
                    "Dwarka",
                    "Kurukshetra",
                    "Sri Lanka",
                    "Tamil Temple",
                    "Open",
                  ].map((d) => (
                    <label
                      key={d}
                      className="cursor-pointer border border-border/60 px-4 py-4 text-center text-sm text-ivory transition-colors hover:border-primary"
                    >
                      <input type="checkbox" name="dest" value={d} className="sr-only peer" />
                      <span className="peer-checked:text-primary">{d}</span>
                    </label>
                  ))}
                </div>
              )}
              {step === 1 && (
                <input
                  type="month"
                  className="w-full border-b border-border bg-transparent py-3 text-base text-ivory outline-none focus:border-primary"
                  required
                />
              )}
              {step === 2 && (
                <div className="grid grid-cols-2 gap-3">
                  {["Solo", "Couple", "Family · 3 gen", "Small group"].map((d) => (
                    <label
                      key={d}
                      className="cursor-pointer border border-border/60 px-4 py-4 text-center text-sm text-ivory transition-colors hover:border-primary"
                    >
                      <input type="radio" name="party" value={d} className="sr-only" />
                      {d}
                    </label>
                  ))}
                </div>
              )}
              {step === 3 && (
                <div className="space-y-6">
                  <Toggle label="Strict sattvik kitchen" />
                  <Toggle label="Premium comfort & private vehicles" />
                  <Toggle label="Chandru Ramesh-led preferred" />
                  <textarea
                    rows={4}
                    placeholder="Anything else we should know…"
                    className="mt-2 w-full border-b border-border bg-transparent py-3 text-sm text-ivory outline-none focus:border-primary"
                  />
                </div>
              )}
            </div>

            <div className="mt-12 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                className="text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground hover:text-ivory disabled:opacity-30"
                disabled={step === 0}
              >
                ← Back
              </button>
              {step < STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
                  className="bg-primary px-8 py-4 text-[0.7rem] uppercase tracking-[0.32em] text-primary-foreground hover:bg-gold"
                >
                  Continue →
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-primary px-8 py-4 text-[0.7rem] uppercase tracking-[0.32em] text-primary-foreground hover:bg-gold"
                >
                  Request Journey Plan
                </button>
              )}
            </div>
          </form>
        </div>
      </Section>
    </>
  );
}

function Toggle({ label }: { label: string }) {
  return (
    <label className="flex cursor-pointer items-center justify-between border-b border-border/60 py-3 text-sm text-ivory">
      <span>{label}</span>
      <input type="checkbox" className="h-4 w-4 accent-primary" />
    </label>
  );
}
