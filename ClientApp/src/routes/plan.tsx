import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { useState } from "react";
import { useSeo } from "@/hooks/useSeo";
import { supabase } from "@/integrations/supabase/client";
import heroImg from "@/assets/journey-braj.jpg";

const STEPS = [
  { n: "01", t: "Destination", d: "Where does Bharat call you?" },
  { n: "02", t: "Travel Window", d: "When can you give us your time?" },
  { n: "03", t: "Companions", d: "Who travels with you?" },
  { n: "04", t: "Style", d: "Tell us how you want to travel." },
  { n: "05", t: "Contact", d: "How can the studio reach you?" },
] as const;

const DESTINATIONS = ["Braj","Kashi","Ayodhya","Dwarka","Kurukshetra","Sri Lanka","Tamil Temple","Open"] as const;
const PARTIES = ["Solo","Couple","Family · 3 gen","Small group"] as const;

type FormState = {
  destinations: string[];
  travelMonth: string;
  party: string;
  sattvik: boolean;
  premium: boolean;
  chandruLed: boolean;
  notes: string;
  name: string;
  email: string;
  phone: string;
};

export default function PlanPage() {
  useSeo({
    title: "Plan Your Journey — Bhumivox",
    description:
      "A five-step civilizational journey planner — destination, dates, companions, style, contact.",
    ogTitle: "Plan Your Journey — Bhumivox",
    ogDescription: "Begin a private, research-led journey across sacred Bharat.",
  });
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>({
    destinations: [],
    travelMonth: "",
    party: "",
    sattvik: false,
    premium: false,
    chandruLed: false,
    notes: "",
    name: "",
    email: "",
    phone: "",
  });

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleDestination = (d: string) => {
    setForm((f) => ({
      ...f,
      destinations: f.destinations.includes(d)
        ? f.destinations.filter((x) => x !== d)
        : [...f.destinations, d],
    }));
  };

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      alert("Please fill in your name, email, and phone number.");
      return;
    }
    const payload = {
      destinations: form.destinations,
      travelMonth: form.travelMonth,
      companions: form.party,
      style: {
        sattvik: form.sattvik,
        premium: form.premium,
        chandruLed: form.chandruLed,
        notes: form.notes,
      },
      contact: {
        name: form.name,
        email: form.email,
        phone: form.phone,
      },
      submittedAt: new Date().toISOString(),
    };
    console.log("Journey Plan Request:", JSON.stringify(payload, null, 2));

    setSubmitting(true);
    const { error } = await supabase.from("journey_requests").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      destinations: form.destinations,
      travel_month: form.travelMonth || null,
      companions: form.party || null,
      sattvik: form.sattvik,
      premium: form.premium,
      chandru_led: form.chandruLed,
      notes: form.notes || null,
    });
    setSubmitting(false);

    if (error) {
      console.error("Failed to save journey request:", error);
      alert("Sorry, we couldn't submit your request. Please try again.");
      return;
    }
    alert("Thank you — the studio will draft your journey within 48 hours.");
  };


  return (
    <>
      <PageHero
        eyebrow="Plan Your Journey"
        title={<>A quiet five-step <span className="italic text-primary">beginning.</span></>}
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
                  <span className={`absolute -left-[37px] top-1 h-2 w-2 rounded-full ${i === step ? "bg-primary glow-bronze" : "bg-border"}`} />
                  <span className="font-mono text-[0.65rem] tracking-[0.28em]">{s.n}</span>
                  <h4 className="mt-1 font-serif text-2xl">{s.t}</h4>
                  <p className="mt-1 text-sm">{s.d}</p>
                </li>
              ))}
            </ol>
          </aside>

          <form
            className="border border-border/60 bg-obsidian p-10 md:p-14"
            onSubmit={handleSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.target as HTMLElement).tagName !== "TEXTAREA" && step < STEPS.length - 1) {
                e.preventDefault();
              }
            }}
          >
            <span className="eyebrow text-gold">Step {STEPS[step].n}</span>
            <h2 className="mt-4 font-serif text-4xl text-ivory md:text-5xl">{STEPS[step].t}</h2>

            <div className="mt-10 space-y-6">
              {step === 0 && (
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {DESTINATIONS.map((d) => {
                    const selected = form.destinations.includes(d);
                    return (
                      <button
                        type="button"
                        key={d}
                        onClick={() => toggleDestination(d)}
                        className={`border px-4 py-4 text-center text-sm transition-colors ${
                          selected
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border/60 text-ivory hover:border-primary"
                        }`}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>
              )}
              {step === 1 && (
                <input
                  type="month"
                  value={form.travelMonth}
                  onChange={(e) => update("travelMonth", e.target.value)}
                  className="w-full border-b border-border bg-transparent py-3 text-base text-ivory outline-none focus:border-primary"
                />
              )}
              {step === 2 && (
                <div className="grid grid-cols-2 gap-3">
                  {PARTIES.map((d) => {
                    const selected = form.party === d;
                    return (
                      <button
                        type="button"
                        key={d}
                        onClick={() => update("party", d)}
                        className={`border px-4 py-4 text-center text-sm transition-colors ${
                          selected
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border/60 text-ivory hover:border-primary"
                        }`}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>
              )}
              {step === 3 && (
                <div className="space-y-6">
                  <Toggle label="Strict sattvik kitchen" checked={form.sattvik} onChange={(v) => update("sattvik", v)} />
                  <Toggle label="Premium comfort & private vehicles" checked={form.premium} onChange={(v) => update("premium", v)} />
                  <Toggle label="Chandru Ramesh-led preferred" checked={form.chandruLed} onChange={(v) => update("chandruLed", v)} />
                  <textarea
                    rows={4}
                    value={form.notes}
                    onChange={(e) => update("notes", e.target.value)}
                    placeholder="Anything else we should know…"
                    className="mt-2 w-full border-b border-border bg-transparent py-3 text-sm text-ivory outline-none focus:border-primary"
                  />
                </div>
              )}
              {step === 4 && (
                <div className="space-y-6">
                  <Field label="Full Name" type="text" value={form.name} onChange={(v) => update("name", v)} placeholder="Your name" />
                  <Field label="Email" type="email" value={form.email} onChange={(v) => update("email", v)} placeholder="you@example.com" />
                  <Field label="Phone" type="tel" value={form.phone} onChange={(v) => update("phone", v)} placeholder="+91 98765 43210" />
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
                  disabled={submitting}
                  className="bg-primary px-8 py-4 text-[0.7rem] uppercase tracking-[0.32em] text-primary-foreground hover:bg-gold disabled:opacity-50"
                >
                  {submitting ? "Submitting…" : "Request Journey Plan"}
                </button>
              )}
            </div>
          </form>
        </div>
      </Section>
    </>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center justify-between border-b border-border/60 py-3 text-sm text-ivory">
      <span>{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-primary"
      />
    </label>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full border-b border-border bg-transparent py-3 text-base text-ivory outline-none focus:border-primary"
        required
      />
    </label>
  );
}
