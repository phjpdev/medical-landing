import { useTranslations } from "next-intl";
import { Quote } from "lucide-react";
import { SectionEyebrow } from "@/components/visual/SectionEyebrow";
import { RevealOnScroll } from "@/components/visual/RevealOnScroll";
import { AvatarPortrait } from "@/components/visual/AvatarPortrait";

export function Testimonials() {
  const t = useTranslations("home.testimonials");
  const items = t.raw("items") as { quote: string; author: string; meta: string }[];

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-cream-radial" />
      <div className="container-x relative">
        <SectionEyebrow eyebrow="VOICES" title={t("title")} body={t("subtitle")} />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <RevealOnScroll key={it.author} index={i}>
              <figure className="gold-glow-card relative flex h-full flex-col items-center rounded-3xl p-8 text-center">
                <div className="relative -mt-16 mb-4">
                  <div className="absolute -inset-2 rounded-full bg-gold-radial blur-md" />
                  <AvatarPortrait
                    seed={i}
                    size={104}
                    className="relative drop-shadow-md"
                  />
                </div>
                <Quote className="h-6 w-6 text-gold-primary/40" />
                <blockquote className="mt-3 font-serif text-base leading-relaxed text-charcoal/90 sm:text-lg">
                  &ldquo;{it.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex flex-col items-center gap-1 border-t border-gold-primary/20 pt-4 w-full">
                  <div className="text-sm font-medium text-charcoal">{it.author}</div>
                  <div className="text-xs uppercase tracking-[0.18em] text-gold-deep">{it.meta}</div>
                </figcaption>
              </figure>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
