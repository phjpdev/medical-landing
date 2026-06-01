import { useTranslations } from "next-intl";
import {
  Waves,
  Minus,
  Sparkles,
  Hexagon,
  ArrowUp,
  Feather,
} from "lucide-react";
import { SectionEyebrow } from "@/components/visual/SectionEyebrow";
import { RevealOnScroll } from "@/components/visual/RevealOnScroll";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  wave: Waves,
  lines: Minus,
  sparkle: Sparkles,
  molecule: Hexagon,
  "arrow-up": ArrowUp,
  feather: Feather,
};

export function DensityBenefits() {
  const t = useTranslations("density.benefits");
  const items = t.raw("items") as { title: string; icon: string }[];

  return (
    <section className="container-x relative py-24">
      <SectionEyebrow eyebrow="CORE BENEFITS" title={t("title")} withBackground />

      <div className="mt-12 grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-3">
        {items.map((it, i) => {
          const Icon = ICON_MAP[it.icon] ?? Sparkles;
          return (
            <RevealOnScroll key={it.title} index={i}>
              <div className="group flex flex-col items-center gap-4 rounded-3xl p-4 text-center transition-all duration-500 hover:-translate-y-1 sm:p-8">
                <div className="relative grid h-20 w-20 place-items-center rounded-full gold-border bg-white/90 shadow-gold-inset transition-all group-hover:shadow-gold sm:h-24 sm:w-24">
                  <div
                    className="absolute inset-0 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(circle at center, rgba(212,175,55,0.20), transparent 70%)",
                    }}
                  />
                  <Icon className="h-8 w-8 text-gold-deep sm:h-9 sm:w-9" />
                </div>
                <h3 className="rounded-full gold-border bg-cream/90 px-3 py-1.5 font-serif text-sm font-medium leading-tight text-charcoal shadow-soft backdrop-blur-sm sm:px-4 sm:text-base lg:text-lg">
                  {it.title}
                </h3>
              </div>
            </RevealOnScroll>
          );
        })}
      </div>
    </section>
  );
}
