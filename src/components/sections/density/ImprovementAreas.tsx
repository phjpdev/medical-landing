import Image from "next/image";
import { useTranslations } from "next-intl";
import { Star } from "lucide-react";
import { GoldDivider } from "@/components/visual/GoldDivider";
import { RevealOnScroll } from "@/components/visual/RevealOnScroll";

export function ImprovementAreas() {
  const t = useTranslations("density.improvements");
  const items = t.raw("items") as string[];

  return (
    <section className="container-x py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <RevealOnScroll className="relative mx-auto w-full max-w-md">
          <div className="relative aspect-square overflow-hidden rounded-full gold-border shadow-gold-lg">
            <Image
              src="/images/density/02-tips-and-issues.jpg"
              alt="Improvement areas"
              fill
              sizes="(max-width: 1024px) 80vw, 35vw"
              style={{ objectPosition: "20% 85%", transform: "scale(1.4)" }}
              className="object-cover"
            />
          </div>
          <div className="absolute -right-6 -top-2 hidden h-20 w-20 rounded-full bg-gold-radial lg:block" />
        </RevealOnScroll>

        <RevealOnScroll index={1} className="flex flex-col items-start gap-5">
          <span className="eyebrow">DENSITY</span>
          <h2 className="font-serif text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <GoldDivider className="!justify-start" />
          <ul className="mt-4 flex flex-col gap-4">
            {items.map((line) => (
              <li key={line} className="flex items-start gap-3">
                <Star className="mt-1 h-4 w-4 shrink-0 text-gold-primary" />
                <span className="text-base leading-relaxed text-charcoal/80 sm:text-lg">{line}</span>
              </li>
            ))}
          </ul>
        </RevealOnScroll>
      </div>
    </section>
  );
}
