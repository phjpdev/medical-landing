import Image from "next/image";
import { useTranslations } from "next-intl";
import { SectionEyebrow } from "@/components/visual/SectionEyebrow";
import { RevealOnScroll } from "@/components/visual/RevealOnScroll";

export function TipsShowcase() {
  const t = useTranslations("density.tips");
  const items = t.raw("items") as { name: string; subtitle: string; body: string }[];

  return (
    <section className="bg-beige/60 py-24">
      <div className="container-x">
        <SectionEyebrow
          eyebrow="TIP TECHNOLOGY"
          title={t("title")}
          body={t("subtitle")}
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {items.map((tip, i) => (
            <RevealOnScroll key={tip.name} index={i}>
              <article className="gold-glow-card flex h-full flex-col gap-6 rounded-3xl p-8 lg:flex-row">
                <div className="relative h-40 w-40 shrink-0 self-center overflow-hidden rounded-2xl gold-border bg-white">
                  <Image
                    src="/images/density/02-tips-and-issues.jpg"
                    alt={tip.name}
                    fill
                    sizes="160px"
                    className="object-cover"
                    style={{
                      objectPosition: i === 0 ? "8% 18%" : "8% 52%",
                      transform: "scale(2.2)",
                    }}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <span className="inline-flex w-fit rounded-full bg-gold-gradient px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-ink">
                    {tip.name}
                  </span>
                  <h3 className="font-serif text-xl font-medium text-charcoal sm:text-2xl">
                    {tip.subtitle}
                  </h3>
                  <p className="text-sm leading-relaxed text-charcoal/75">{tip.body}</p>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
