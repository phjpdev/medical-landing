import { useTranslations } from "next-intl";
import { Crown, ChevronRight } from "lucide-react";
import { SectionEyebrow } from "@/components/visual/SectionEyebrow";
import { RevealOnScroll } from "@/components/visual/RevealOnScroll";

type Phase = { phase: string; primary: string; secondary: string };

function TimelineRow({
  title,
  phases,
  variant,
  badge,
}: {
  title: string;
  phases: Phase[];
  variant: "classic" | "high";
  badge?: string;
}) {
  const isHigh = variant === "high";
  return (
    <div
      className={
        isHigh
          ? "relative overflow-hidden rounded-3xl p-8 text-cream bg-gradient-to-br from-[#4a3a14] via-[#3a2c10] to-[#1f180a] gold-border shadow-gold-lg"
          : "rounded-3xl gold-border bg-white/85 p-8"
      }
    >
      {isHigh && (
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(245,230,184,0.35), transparent 70%)",
          }}
        />
      )}

      <div className="relative flex flex-col items-center gap-2">
        {isHigh && badge && (
          <span className="inline-flex items-center gap-1 rounded-full bg-gold-gradient px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink">
            <Crown className="h-3 w-3" />
            {badge}
          </span>
        )}
        <h3
          className={
            "font-serif text-2xl font-medium leading-tight sm:text-3xl " +
            (isHigh ? "gold-text" : "text-charcoal")
          }
        >
          {title}
        </h3>
      </div>

      <div className="relative mt-10 grid gap-4 md:grid-cols-4">
        {phases.map((p, i) => (
          <div key={p.phase} className="relative flex flex-col gap-2">
            <div
              className={
                "rounded-xl border p-4 transition-all " +
                (isHigh
                  ? "border-gold-primary/40 bg-white/[0.04] backdrop-blur"
                  : "border-gold-primary/25 bg-white")
              }
            >
              <div
                className={
                  "text-xs uppercase tracking-[0.18em] " +
                  (isHigh ? "text-gold-light" : "text-gold-deep")
                }
              >
                {p.phase}
              </div>
              <div
                className={
                  "mt-3 font-serif text-base font-medium leading-snug " +
                  (isHigh ? "text-cream" : "text-charcoal")
                }
              >
                {p.primary}
              </div>
              <div
                className={
                  "mt-2 h-px w-8 " + (isHigh ? "bg-gold-primary/50" : "bg-gold-primary/40")
                }
              />
              <div
                className={
                  "mt-2 text-xs leading-relaxed " +
                  (isHigh ? "text-cream/70" : "text-charcoal/65")
                }
              >
                {p.secondary}
              </div>
            </div>
            {i < phases.length - 1 && (
              <ChevronRight
                className={
                  "absolute -right-2 top-10 hidden h-5 w-5 md:block " +
                  (isHigh ? "text-gold-light/70" : "text-gold-primary/60")
                }
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function AgingTimeline() {
  const t = useTranslations("density.aging");
  const tTemp = useTranslations("density.temperature");
  const classic = t.raw("classic") as Phase[];
  const high = t.raw("high") as Phase[];

  return (
    <section className="container-x py-24">
      <SectionEyebrow eyebrow="AGE-REVERSAL TIMELINE" title={t("title")} />

      <div className="mt-12 flex flex-col gap-8">
        <RevealOnScroll>
          <TimelineRow title={t("classicTitle")} phases={classic} variant="classic" />
        </RevealOnScroll>
        <RevealOnScroll index={1}>
          <TimelineRow title={t("highTitle")} phases={high} variant="high" badge={t("badge")} />
        </RevealOnScroll>
      </div>

      {/* Temperature scale */}
      <RevealOnScroll index={2} className="mt-14">
        <div className="rounded-3xl gold-border bg-white/85 p-8">
          <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-start">
            <div>
              <span className="inline-block rounded-full bg-gold-gradient px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-ink">
                {tTemp("title")}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-charcoal/75">{tTemp("body")}</p>
          </div>

          <div className="mt-8">
            <p className="text-center text-xs uppercase tracking-[0.18em] text-charcoal/55">
              {tTemp("scaleTitle")}
            </p>
            <div className="mt-4 grid grid-cols-7 gap-1 text-center text-sm">
              {[
                { c: "30°C", bg: "#3b2310", color: "#fff" },
                { c: "40°C", bg: "#5c331a", color: "#fff" },
                { c: "50°C", bg: "#7e4221", color: "#fff" },
                { c: "60°C", bg: "#9f5028", color: "#fff" },
                { c: "75°C", bg: "linear-gradient(180deg,#F5E6B8,#D4AF37,#B8941F)", color: "#0A0A0A", highlight: true, label: "DENSITY" },
                { c: "80°C", bg: "#c25a30", color: "#fff" },
                { c: "90°C", bg: "#d65a35", color: "#fff" },
              ].map((s) => (
                <div
                  key={s.c}
                  className={
                    "relative flex flex-col items-center justify-center rounded-md py-4 " +
                    (s.highlight ? "shadow-gold ring-2 ring-gold-primary -translate-y-1" : "")
                  }
                  style={{ background: s.bg, color: s.color }}
                >
                  {s.label && (
                    <span className="absolute -top-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-deep">
                      {s.label}
                    </span>
                  )}
                  <span className="font-serif text-lg font-medium">{s.c}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-6 text-center text-sm leading-relaxed text-charcoal/70">
            {tTemp("footnote")}
          </p>
        </div>
      </RevealOnScroll>
    </section>
  );
}
