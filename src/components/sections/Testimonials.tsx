"use client";

import { useTranslations } from "next-intl";
import { Quote } from "lucide-react";
import { SectionEyebrow } from "@/components/visual/SectionEyebrow";
import { RevealOnScroll } from "@/components/visual/RevealOnScroll";
import { EditableImage } from "@/components/visual/EditableImage";
import { EditableText } from "@/components/visual/EditableText";

export function Testimonials() {
  const t = useTranslations("home.testimonials");
  const items = t.raw("items") as { quote: string; author: string; meta: string }[];

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="container-x relative">
        <SectionEyebrow eyebrow="VOICES" title={t("title")} body={t("subtitle")} />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <RevealOnScroll key={i} index={i}>
              <figure className="gold-glow-card relative flex h-full flex-col items-center rounded-3xl p-8 pt-20 text-center">
                {/* Editable photo — floats above the card top */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                  <div className="relative">
                    <div className="absolute -inset-2 rounded-full bg-gold-radial blur-md" />
                    <EditableImage
                      storageKey={`testimonial-photo-${i}`}
                      alt={it.author}
                      className="h-24 w-24 ring-2 ring-gold-primary/40"
                      rounded="rounded-full"
                    />
                  </div>
                </div>

                <Quote className="h-6 w-6 text-gold-primary/40" />

                <EditableText
                  as="blockquote"
                  storageKey={`testimonial-quote-${i}`}
                  defaultValue={it.quote}
                  className="mt-3 font-serif text-base leading-relaxed text-charcoal/90 sm:text-lg"
                  multiline
                />

                <figcaption className="mt-6 flex w-full flex-col items-center gap-1 border-t border-gold-primary/20 pt-4">
                  <EditableText
                    as="span"
                    storageKey={`testimonial-author-${i}`}
                    defaultValue={it.author}
                    className="text-sm font-medium text-charcoal"
                  />
                  <EditableText
                    as="span"
                    storageKey={`testimonial-meta-${i}`}
                    defaultValue={it.meta}
                    className="text-xs uppercase tracking-[0.18em] text-gold-deep"
                  />
                </figcaption>
              </figure>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
