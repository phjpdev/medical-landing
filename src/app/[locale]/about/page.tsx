import { setRequestLocale, getTranslations } from "next-intl/server";
import { ShieldCheck, Award, UserCog, Lock } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { SectionEyebrow } from "@/components/visual/SectionEyebrow";
import { RevealOnScroll } from "@/components/visual/RevealOnScroll";
import { CTABanner } from "@/components/sections/CTABanner";

const WHY_ICONS = [ShieldCheck, Award, UserCog, Lock];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const tCta = await getTranslations("home.ctaBanner");

  const mvv = t.raw("mvv.items") as { title: string; body: string }[];
  const why = t.raw("why.items") as { title: string; body: string }[];

  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} body={t("hero.body")} />

      {/* Mission / Vision / Values */}
      <section className="container-x py-20">
        <SectionEyebrow eyebrow="PHILOSOPHY" title={t("mvv.title")} />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {mvv.map((m, i) => (
            <RevealOnScroll key={m.title} index={i}>
              <article className="gold-glow-card h-full rounded-3xl p-8">
                <div className="font-serif text-2xl font-medium leading-tight text-charcoal">
                  {m.title}
                </div>
                <div className="mt-4 h-px w-10 bg-gold-primary" />
                <p className="mt-4 text-sm leading-relaxed text-charcoal/75">{m.body}</p>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-cream-radial" />
        <div className="container-x relative">
          <SectionEyebrow eyebrow="WHY US" title={t("why.title")} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {why.map((w, i) => {
              const Icon = WHY_ICONS[i] ?? ShieldCheck;
              return (
                <RevealOnScroll key={w.title} index={i}>
                  <div className="flex h-full flex-col items-start gap-4 rounded-2xl gold-border bg-white/85 p-6 backdrop-blur">
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-gold-gradient text-ink">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-serif text-lg font-medium leading-tight">{w.title}</h3>
                    <p className="text-sm leading-relaxed text-charcoal/70">{w.body}</p>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      <CTABanner title={tCta("title")} body={tCta("body")} cta={tCta("cta")} />
    </>
  );
}
