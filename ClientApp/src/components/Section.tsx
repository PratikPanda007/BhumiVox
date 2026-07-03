import type { ReactNode } from "react";

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`mx-auto max-w-[1400px] px-6 py-28 md:py-36 lg:px-12 ${className}`}
    >
      {children}
    </section>
  );
}

export function SectionLabel({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <header
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-5 font-serif text-4xl leading-tight text-balance text-ivory md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {intro && (
        <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          {intro}
        </p>
      )}
    </header>
  );
}
