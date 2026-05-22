import { useTranslations } from "next-intl";
import { Quote } from "lucide-react";
import { SectionEyebrow } from "@/components/visual/SectionEyebrow";
import { RevealOnScroll } from "@/components/visual/RevealOnScroll";

export function Testimonials() {
  const t = useTranslations("home.testimonials");
  const items = t.raw("items") as { quote: string; author: string; meta: string }[];

  return (
    <section className="container-x py-20 md:py-28">
      <SectionEyebrow eyebrow="VOICES" title={t("title")} body={t("subtitle")} />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {items.map((it, i) => (
          <RevealOnScroll key={it.author} index={i}>
            <figure className="gold-glow-card relative h-full rounded-3xl p-8">
              <Quote className="absolute right-6 top-6 h-7 w-7 text-gold-primary/40" />
              <blockquote className="font-serif text-lg leading-relaxed text-charcoal/90">
                &ldquo;{it.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gold-gradient font-serif text-sm font-semibold text-ink">
                  {it.author.replace(/^Ms\.\s*/, "").charAt(0)}
                </span>
                <div>
                  <div className="text-sm font-medium text-charcoal">{it.author}</div>
                  <div className="text-xs text-charcoal/55">{it.meta}</div>
                </div>
              </figcaption>
            </figure>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
