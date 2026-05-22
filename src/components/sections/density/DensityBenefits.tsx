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
    <section className="container-x py-24">
      <SectionEyebrow eyebrow="CORE BENEFITS" title={t("title")} />

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => {
          const Icon = ICON_MAP[it.icon] ?? Sparkles;
          return (
            <RevealOnScroll key={it.title} index={i}>
              <div className="group flex flex-col items-center gap-4 rounded-3xl p-8 text-center transition-all duration-500 hover:-translate-y-1">
                <div className="relative grid h-24 w-24 place-items-center rounded-full gold-border bg-white/85 shadow-gold-inset transition-all group-hover:shadow-gold">
                  <div
                    className="absolute inset-0 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(circle at center, rgba(212,175,55,0.20), transparent 70%)",
                    }}
                  />
                  <Icon className="h-9 w-9 text-gold-deep" />
                </div>
                <h3 className="font-serif text-lg font-medium leading-tight sm:text-xl">
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
