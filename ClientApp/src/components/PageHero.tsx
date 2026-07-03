import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  image: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate flex min-h-[78vh] items-end overflow-hidden">
      <img
        src={image}
        alt=""
        width={1920}
        height={1080}
        className="absolute inset-0 -z-10 h-full w-full object-cover slow-zoom"
      />
      <div className="absolute inset-0 -z-10 gradient-hero" />
      <div className="absolute inset-0 -z-10 grain" />
      <div className="mx-auto w-full max-w-[1400px] px-6 pb-24 pt-40 lg:px-12">
        <p className="eyebrow cine-rise">{eyebrow}</p>
        <h1 className="cine-rise mt-6 max-w-4xl font-serif text-5xl leading-[1.05] text-balance text-white md:text-7xl lg:text-8xl">
          {title}
        </h1>
        {intro && (
          <p
            className="cine-rise mt-8 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg"
            style={{ animationDelay: "0.15s" }}
          >
            {intro}
          </p>
        )}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
