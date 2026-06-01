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
    <section className="relative py-24 md:py-28">
      <div className="container-x relative">
        <SectionEyebrow
          eyebrow="VOICES"
          title={t("title")}
          body={t("subtitle")}
          className="gap-5"
        />

        {/* Extra top room — photo floats above each card */}
        <div className="mt-24 grid grid-cols-1 gap-y-28 sm:mt-28 md:mt-20 md:grid-cols-3 md:gap-8 md:pt-12">
          {items.map((it, i) => (
            <RevealOnScroll key={i} index={i}>
              <figure className="gold-glow-card relative flex h-full flex-col items-center rounded-3xl p-8 pt-24 text-center sm:pt-28">
                {/* Editable photo — full card width, fixed height */}
                <div className="absolute -top-16 left-8 right-8 sm:-top-20">
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-none bg-gold-radial opacity-60" />
                    <EditableImage
                      storageKey={`testimonial-photo-${i}`}
                      alt={it.author}
                      className="h-32 w-full ring-2 ring-gold-primary/40 sm:h-40"
                      rounded="rounded-none"
                    />
                  </div>
                </div>

                <Quote className="mt-4 h-6 w-6 text-gold-primary/40" />

                <EditableText
                  as="blockquote"
                  storageKey={`testimonial-quote-${i}`}
                  defaultValue={it.quote}
                  className="mt-5 font-serif text-base leading-relaxed text-charcoal/90 sm:text-lg"
                  multiline
                />

                <figcaption className="mt-8 flex w-full flex-col items-center gap-1 border-t border-gold-primary/20 pt-5">
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
