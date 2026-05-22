import { useTranslations } from "next-intl";
import { Crown } from "lucide-react";
import { SectionEyebrow } from "@/components/visual/SectionEyebrow";
import { RevealOnScroll } from "@/components/visual/RevealOnScroll";

export function ComparisonTable() {
  const t = useTranslations("density.comparison");
  const headers = t.raw("headers") as string[];
  const rows = t.raw("rows") as { label: string; values: string[] }[];

  return (
    <section className="bg-beige/60 py-24">
      <div className="container-x">
        <SectionEyebrow eyebrow="HOW WE COMPARE" title={t("title")} body={t("subtitle")} />

        <RevealOnScroll className="mt-12 overflow-hidden rounded-3xl gold-border bg-white/90 shadow-soft">
          <div className="overflow-x-auto">
            <table className="min-w-[720px] w-full border-collapse text-left">
              <thead>
                <tr className="bg-gold-gradient text-ink">
                  {headers.map((h, i) => (
                    <th
                      key={i}
                      className="px-5 py-5 text-sm font-semibold tracking-wide"
                    >
                      {i === 1 ? (
                        <span className="inline-flex items-center gap-1.5">
                          <Crown className="h-4 w-4" />
                          {h}
                        </span>
                      ) : (
                        h
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => (
                  <tr
                    key={row.label}
                    className={ri % 2 === 0 ? "bg-white" : "bg-beige/40"}
                  >
                    <th
                      scope="row"
                      className="border-r border-gold-primary/15 px-5 py-5 align-top text-xs uppercase tracking-[0.18em] text-charcoal/70"
                    >
                      {row.label}
                    </th>
                    {row.values.map((v, vi) => (
                      <td
                        key={vi}
                        className={
                          "px-5 py-5 align-top text-sm leading-relaxed " +
                          (vi === 0
                            ? "bg-gold-primary/10 font-medium text-charcoal"
                            : "text-charcoal/75")
                        }
                      >
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </RevealOnScroll>

        <p className="mt-8 text-center text-sm uppercase tracking-[0.32em] text-gold-deep">
          {t("footer")}
        </p>
      </div>
    </section>
  );
}
