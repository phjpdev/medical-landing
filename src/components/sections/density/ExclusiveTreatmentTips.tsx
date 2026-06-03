import { useTranslations } from "next-intl";
import { SectionEyebrow } from "@/components/visual/SectionEyebrow";
import { RevealOnScroll } from "@/components/visual/RevealOnScroll";

export function ExclusiveTreatmentTips() {
  const t = useTranslations("density.handle");
  const tipList = t.raw("tipList") as { name: string; body: string }[];

  return (
    <section className="container-x py-12 lg:py-16">
      <SectionEyebrow title={t("tipsTitle")} withBackground className="max-w-xl" />
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {tipList.map((tp, i) => (
          <RevealOnScroll key={tp.name} index={i}>
            <div className="rounded-2xl gold-border bg-white/95 p-6 text-center shadow-soft transition-shadow hover:shadow-gold">
              <div className="font-serif text-xl text-gold-deep">{tp.name}</div>
              <div className="mx-auto mt-3 h-px w-12 bg-gold-primary/50" />
              <p className="mt-3 text-sm leading-relaxed text-charcoal/75">{tp.body}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
