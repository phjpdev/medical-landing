"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function AnimatedNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const numericTarget = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1600;
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(numericTarget * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, numericTarget]);

  return (
    <span ref={ref} className="gold-text font-serif text-6xl font-medium leading-none sm:text-7xl">
      {n}
      {suffix}
    </span>
  );
}

export function DensityStats() {
  const t = useTranslations("density.stats");
  const items = t.raw("items") as { value: string; label: string }[];

  return (
    <section className="container-x relative py-16 md:py-24">
      <div className="grid items-stretch gap-px overflow-hidden rounded-3xl gold-border bg-gold-primary/15 shadow-gold-lg sm:grid-cols-3">
        {items.map((it, i) => (
          <motion.div
            key={it.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center justify-center gap-3 bg-white/85 p-10 text-center"
          >
            <AnimatedNumber value={it.value} />
            <span className="text-sm tracking-[0.12em] text-charcoal/70">{it.label}</span>
          </motion.div>
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-charcoal/55">
        {t("source")}
        {" "}
        <a
          href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8950306/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold-deep underline-offset-4 hover:underline"
        >
          pmc.ncbi.nlm.nih.gov
        </a>
      </p>
    </section>
  );
}
