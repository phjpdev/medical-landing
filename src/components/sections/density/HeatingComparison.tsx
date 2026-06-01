import { useTranslations } from "next-intl";
import { SectionEyebrow } from "@/components/visual/SectionEyebrow";
import { RevealOnScroll } from "@/components/visual/RevealOnScroll";

function HeatingDiagram({ variant }: { variant: "density" | "traditional" }) {
  const isDensity = variant === "density";
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl gold-border bg-gradient-to-b from-[#f4dfb1] via-[#f6e0c0] to-[#e0a78a]">
      {/* skin layers */}
      <div className="absolute inset-x-0 top-0 h-1/5 bg-[#fff1d6]/70" />
      <div className="absolute inset-x-0 top-1/5 h-2/5 bg-[#f5cb98]/55" />
      <div className="absolute inset-x-0 top-3/5 h-2/5 bg-[#d99b6a]/55" />

      {/* device head */}
      <div className="absolute left-1/2 top-2 -translate-x-1/2">
        <div className="h-10 w-24 rounded-md bg-gold-gradient shadow-gold" />
        <div className="mx-auto h-2 w-20 -mt-0.5 rounded-b-md bg-gold-deep/70" />
      </div>

      {/* energy beam */}
      {isDensity ? (
        <div
          className="absolute left-1/2 top-12 h-[68%] w-24 -translate-x-1/2 rounded-b-lg"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,200,80,0.95), rgba(255,140,40,0.85) 60%, rgba(255,90,30,0.8))",
            boxShadow: "0 0 30px rgba(255,160,60,0.6)",
          }}
        />
      ) : (
        <div
          className="absolute left-1/2 top-12 h-[68%] w-48 -translate-x-1/2 rounded-b-full"
          style={{
            background:
              "radial-gradient(ellipse 50% 100% at 50% 0%, rgba(255,200,80,0.85), rgba(255,140,40,0.55) 50%, rgba(255,90,30,0.25) 90%, transparent)",
          }}
        />
      )}

      <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.22em] text-charcoal/70">
        {isDensity ? "Density" : "Traditional"}
      </span>
    </div>
  );
}

export function HeatingComparison() {
  const t = useTranslations("density.heating");

  return (
    <section className="container-x py-24">
      <SectionEyebrow eyebrow="HEATING TECHNOLOGY" title={t("title")} withBackground />

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <RevealOnScroll>
          <div className="gold-glow-card flex h-full flex-col gap-5 rounded-3xl p-6">
            <HeatingDiagram variant="density" />
            <div>
              <h3 className="font-serif text-xl font-medium text-charcoal">
                {t("density.title")}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/75">
                {t("density.body")}
              </p>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll index={1}>
          <div className="rounded-3xl border border-charcoal/15 bg-white/95 p-6 shadow-soft">
            <HeatingDiagram variant="traditional" />
            <div className="mt-5">
              <h3 className="font-serif text-xl font-medium text-charcoal">
                {t("traditional.title")}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
                {t("traditional.body")}
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
