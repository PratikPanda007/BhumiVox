import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";
import heroImg from "@/assets/journey-ayodhya.jpg";

export default function ContactPage() {
  useSeo({
    title: "Contact — Bhumivox",
    description:
      "Speak with the Bhumivox studio about a private or upcoming civilizational journey.",
    ogDescription: "Reach the Bhumivox studio — WhatsApp, callback or inquiry.",
  });
  return (
    <>
      <PageHero
        eyebrow="Contact the Studio"
        title={<>Begin a <span className="italic text-primary">quiet conversation.</span></>}
        intro="The best journeys begin not with a booking, but with a long talk about why."
        image={heroImg}
      />

      <Section>
        <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
          <form
            className="space-y-8"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you — the studio will reach out within 24 hours.");
            }}
          >
            <Field label="Your Name" id="name" />
            <Field label="Email" id="email" type="email" />
            <Field label="WhatsApp / Phone" id="phone" />
            <div>
              <label htmlFor="msg" className="eyebrow">
                What kind of journey calls you?
              </label>
              <textarea
                id="msg"
                rows={5}
                required
                className="mt-3 w-full border-b border-border bg-transparent px-0 py-3 text-base text-ivory outline-none transition-colors focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="bg-primary px-8 py-4 text-[0.7rem] uppercase tracking-[0.32em] text-primary-foreground transition-colors hover:bg-gold"
            >
              Send to Studio
            </button>
          </form>

          <aside className="space-y-8 border border-border/60 bg-obsidian p-10">
            <div>
              <span className="eyebrow">Studio</span>
              <p className="mt-3 font-serif text-2xl text-ivory">Bhumivox · Bharat</p>
              <p className="text-sm text-muted-foreground">By appointment only.</p>
            </div>
            <Channel icon={Mail} label="studio@bhumivox.in" />
            <Channel icon={Phone} label="+91 80 0000 0000" />
            <Channel icon={MessageCircle} label="WhatsApp the studio" />
            <div className="hairline" />
            <p className="text-xs leading-relaxed text-muted-foreground">
              Replies within 24 hours, often the same evening from the field.
            </p>
          </aside>
        </div>
      </Section>
    </>
  );
}

function Field({ label, id, type = "text" }: { label: string; id: string; type?: string }) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow">{label}</label>
      <input
        id={id}
        type={type}
        required
        className="mt-3 w-full border-b border-border bg-transparent px-0 py-3 text-base text-ivory outline-none transition-colors focus:border-primary"
      />
    </div>
  );
}

function Channel({ icon: Icon, label }: { icon: typeof Mail; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <Icon size={18} className="text-primary" strokeWidth={1.25} />
      <span className="text-sm text-ivory">{label}</span>
    </div>
  );
}
