import { useTranslations } from "next-intl";
import { Droplets, FlaskRound, Sun } from "lucide-react";
import { SectionEyebrow } from "@/components/visual/SectionEyebrow";
import { RevealOnScroll } from "@/components/visual/RevealOnScroll";

const ICONS = [Droplets, FlaskRound, Sun];

export function Aftercare() {
  const t = useTranslations("density.aftercare");
  const items = t.raw("items") as { title: string; body: string }[];

  return (
    <section className="container-x py-24">
      <SectionEyebrow eyebrow="AFTERCARE" title={t("title")} />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {items.map((it, i) => {
          const Icon = ICONS[i] ?? Droplets;
          return (
            <RevealOnScroll key={it.title} index={i}>
              <article className="gold-glow-card flex h-full flex-col items-start gap-5 rounded-3xl p-8">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gold-gradient text-ink shadow-sm">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-xl font-medium leading-tight sm:text-2xl">
                  {it.title}
                </h3>
                <p className="text-sm leading-relaxed text-charcoal/75">{it.body}</p>
              </article>
            </RevealOnScroll>
          );
        })}
      </div>

      <p className="mx-auto mt-10 max-w-3xl text-center text-sm leading-relaxed text-charcoal/65">
        {t("footer")}
      </p>
    </section>
  );
}
