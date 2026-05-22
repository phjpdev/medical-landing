import { useTranslations } from "next-intl";
import { GoldDivider } from "@/components/visual/GoldDivider";
import { RevealOnScroll } from "@/components/visual/RevealOnScroll";

export function BrandIntro() {
  const t = useTranslations("home.intro");
  const stats = t.raw("stats") as { value: string; label: string }[];

  return (
    <section className="container-x py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <RevealOnScroll className="flex flex-col items-start gap-5">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="font-serif text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <GoldDivider className="!justify-start" />
          <p className="max-w-xl text-base leading-relaxed text-charcoal/75 sm:text-lg">
            {t("body")}
          </p>
        </RevealOnScroll>

        <RevealOnScroll className="flex flex-col gap-4 lg:pt-12">
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="gold-glow-card flex flex-col items-center justify-center gap-1 rounded-2xl p-6 text-center"
              >
                <span className="gold-text font-serif text-4xl font-medium">{s.value}</span>
                <span className="text-xs uppercase tracking-[0.18em] text-charcoal/60">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
