import { useTranslations } from "next-intl";
import { Atom, Snowflake, FlaskConical, Sparkles } from "lucide-react";
import { SectionEyebrow } from "@/components/visual/SectionEyebrow";
import { RevealOnScroll } from "@/components/visual/RevealOnScroll";

const ICONS = [Atom, Snowflake, FlaskConical, Sparkles];

export function DensityFeatures() {
  const t = useTranslations("density.features");
  const items = t.raw("items") as { title: string; subtitle: string }[];

  return (
    <section className="bg-beige/60 py-24">
      <div className="container-x">
        <SectionEyebrow eyebrow={t("eyebrow")} title={t("title")} />

        <div className="mt-14 grid gap-4">
          {items.map((it, i) => {
            const Icon = ICONS[i] ?? Sparkles;
            return (
              <RevealOnScroll key={it.title} index={i}>
                <div className="group flex items-center gap-6 rounded-full gold-border bg-white/85 p-4 pr-10 transition-all hover:shadow-gold">
                  <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gold-gradient text-ink shadow-sm">
                    <Icon className="h-7 w-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl font-medium leading-tight sm:text-2xl">
                      {it.title}
                    </h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-charcoal/55">
                      {it.subtitle}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
