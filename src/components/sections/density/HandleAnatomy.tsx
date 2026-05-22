import Image from "next/image";
import { useTranslations } from "next-intl";
import { SectionEyebrow } from "@/components/visual/SectionEyebrow";
import { RevealOnScroll } from "@/components/visual/RevealOnScroll";

export function HandleAnatomy() {
  const t = useTranslations("density.handle");
  const controls = t.raw("controls") as { label: string; body: string }[];
  const tipList = t.raw("tipList") as { name: string; body: string }[];

  return (
    <section className="bg-ink py-24 text-cream">
      <div className="container-x">
        <SectionEyebrow
          eyebrow="HANDPIECE"
          title={t("title")}
          body={t("subtitle")}
          tone="dark"
        />

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
          <RevealOnScroll className="relative mx-auto w-full max-w-md">
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl gold-border bg-ink">
              <Image
                src="/images/density/07-handle-anatomy.jpg"
                alt="DENSITY handpiece anatomy"
                fill
                sizes="(max-width: 1024px) 80vw, 40vw"
                className="object-contain"
              />
            </div>
          </RevealOnScroll>

          <div className="flex flex-col gap-4">
            {controls.map((c, i) => (
              <RevealOnScroll key={c.label} index={i}>
                <div className="flex items-start gap-4 rounded-2xl gold-border bg-white/[0.03] p-5 backdrop-blur">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold-gradient font-serif text-sm font-semibold text-ink">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-serif text-lg font-medium text-gold-light">{c.label}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-cream/70">{c.body}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <h3 className="text-center font-serif text-2xl font-medium text-gold-light">
            {t("tipsTitle")}
          </h3>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {tipList.map((tp, i) => (
              <RevealOnScroll key={tp.name} index={i}>
                <div className="rounded-2xl gold-border bg-white/[0.04] p-6 text-center backdrop-blur transition-all hover:bg-white/[0.07]">
                  <div className="font-serif text-xl text-gold-light">{tp.name}</div>
                  <div className="mt-3 h-px w-12 mx-auto bg-gold-primary/40" />
                  <p className="mt-3 text-sm leading-relaxed text-cream/70">{tp.body}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
