"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ImageOff } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { cn } from "@/lib/utils";

type Category = "all" | "face" | "eye" | "body";

const CASES: { id: string; category: Exclude<Category, "all">; label: string }[] = [
  { id: "c1", category: "face", label: "Full-face Lift" },
  { id: "c2", category: "face", label: "Nasolabial Lines" },
  { id: "c3", category: "eye", label: "Eye-area Lift" },
  { id: "c4", category: "eye", label: "Puffy Eye Reduction" },
  { id: "c5", category: "body", label: "Abdomen Tightening" },
  { id: "c6", category: "body", label: "Upper-arm Tightening" },
  { id: "c7", category: "face", label: "Jawline Definition" },
  { id: "c8", category: "face", label: "Pore Refinement" },
];

export default function CasesPage() {
  const t = useTranslations("cases");
  const [filter, setFilter] = useState<Category>("all");
  const filters: Category[] = ["all", "face", "eye", "body"];

  const visible = filter === "all" ? CASES : CASES.filter((c) => c.category === filter);

  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} body={t("hero.body")} />

      <section className="container-x py-16">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full px-5 py-2 text-sm tracking-wide transition-all",
                filter === f
                  ? "bg-gold-gradient text-ink shadow-sm"
                  : "border border-gold-primary/40 bg-white/60 text-charcoal/70 hover:text-charcoal",
              )}
            >
              {t(`filters.${f}`)}
            </button>
          ))}
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {visible.map((c, i) => (
              <motion.article
                key={c.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ delay: i * 0.04 }}
                className="group overflow-hidden rounded-3xl gold-border bg-white/85 shadow-soft"
              >
                <div className="grid grid-cols-2 divide-x divide-gold-primary/15">
                  {(["placeholderBefore", "placeholderAfter"] as const).map((key) => (
                    <div
                      key={key}
                      className="relative aspect-[3/4] bg-gradient-to-br from-cream via-beige to-gold-light/20"
                    >
                      <div className="absolute inset-0 grid place-items-center text-charcoal/30">
                        <ImageOff className="h-7 w-7" />
                      </div>
                      <span className="absolute left-3 top-3 rounded-full bg-white/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-deep">
                        {t(key)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between px-5 py-4">
                  <span className="text-sm font-medium text-charcoal">{c.label}</span>
                  <span className="text-xs uppercase tracking-[0.18em] text-gold-deep">
                    {t(`filters.${c.category}`)}
                  </span>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        <p className="mt-10 text-center text-xs text-charcoal/55">{t("disclaimer")}</p>
      </section>
    </>
  );
}
