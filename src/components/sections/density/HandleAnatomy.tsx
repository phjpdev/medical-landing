import Image from "next/image";
import { useTranslations } from "next-intl";
import { SectionEyebrow } from "@/components/visual/SectionEyebrow";
import { RevealOnScroll } from "@/components/visual/RevealOnScroll";

export function HandleAnatomy() {
  const t = useTranslations("density.handle");
  const controls = t.raw("controls") as { label: string; body: string }[];

  return (
    <section className="relative overflow-hidden py-24">
      <div className="container-x relative">
        <SectionEyebrow
          eyebrow="HANDPIECE"
          title={t("title")}
          body={t("subtitle")}
          withBackground
        />

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <RevealOnScroll className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gold-radial opacity-50" />
            <div className="relative overflow-hidden rounded-3xl gold-border bg-white shadow-gold-lg">
              <Image
                src="/images/density/handle.png"
                alt="DENSITY handpiece anatomy"
                width={1080}
                height={1350}
                sizes="(max-width: 1024px) 80vw, 40vw"
                className="h-auto w-full"
              />
            </div>
          </RevealOnScroll>

          <div className="flex flex-col gap-4">
            {controls.map((c, i) => (
              <RevealOnScroll key={c.label} index={i}>
                <div className="flex items-start gap-4 rounded-2xl gold-border bg-white/95 p-5 shadow-soft">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold-gradient font-serif text-sm font-semibold text-ink shadow-sm">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-serif text-lg font-medium text-charcoal">{c.label}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-charcoal/70">{c.body}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
