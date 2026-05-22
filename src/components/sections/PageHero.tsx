import { GoldDivider } from "@/components/visual/GoldDivider";

export function PageHero({
  eyebrow,
  title,
  body,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-cream-radial" />
      <div className="particle-bg absolute inset-0 opacity-40" />
      <div className="container-x relative flex flex-col items-center gap-5 py-24 text-center md:py-32">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="font-serif text-4xl font-medium leading-tight sm:text-5xl lg:text-6xl">
          <span className="gold-text">{title}</span>
        </h1>
        <GoldDivider />
        {body && (
          <p className="max-w-2xl text-base leading-relaxed text-charcoal/75 sm:text-lg">
            {body}
          </p>
        )}
      </div>
    </section>
  );
}
