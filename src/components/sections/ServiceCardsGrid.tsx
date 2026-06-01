"use client";

import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { RevealOnScroll } from "@/components/visual/RevealOnScroll";
import { EditableImage } from "@/components/visual/EditableImage";
import { SERVICE_CARD_IMAGES } from "@/lib/serviceImages";

export type ServiceCardItem = {
  tag: string;
  title: string;
  body: string;
  cta: string;
  href: string;
};

export function ServiceCardsGrid({ items }: { items: ServiceCardItem[] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {items.map((s, i) => {
        const img = SERVICE_CARD_IMAGES[i] ?? SERVICE_CARD_IMAGES[0];
        return (
          <RevealOnScroll key={s.title} index={i}>
            <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl gold-border bg-white/90 transition-all duration-500 hover:-translate-y-1 hover:shadow-gold">
              <div className="relative aspect-[4/3] overflow-hidden">
                <EditableImage
                  storageKey={img.key}
                  alt={s.title}
                  defaultSrc={img.defaultSrc}
                  objectPosition={img.objectPosition}
                  rounded="rounded-none"
                  className="absolute inset-0 h-full w-full"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
                <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-gold-gradient px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink shadow-sm">
                  {s.tag}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-serif text-2xl font-medium leading-tight">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/70">{s.body}</p>
                <Link
                  href={s.href as "/density" | "/contact"}
                  className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-medium text-gold-deep transition-colors hover:text-gold-primary"
                >
                  {s.cta}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>

              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gold-radial opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </article>
          </RevealOnScroll>
        );
      })}
    </div>
  );
}
