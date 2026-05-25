"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { GoldDivider } from "@/components/visual/GoldDivider";

function AnimatedNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const numericTarget = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1500;
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
    <span ref={ref} className="gold-text font-serif text-5xl font-medium leading-none sm:text-6xl lg:text-7xl">
      {n}
      {suffix}
    </span>
  );
}

export function StatsBand() {
  const t = useTranslations("home.stats");
  const items = t.raw("items") as { value: string; label: string }[];

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(245,239,224,0.55) 0%, rgba(251,246,227,0.50) 100%)",
        }}
      />
      <div className="particle-bg absolute inset-0 opacity-40" />

      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-gold-radial blur-2xl" />
          <div className="relative overflow-hidden rounded-3xl gold-border bg-white shadow-gold-lg">
            <Image
              src="/images/density/spokesperson.png"
              alt="DENSITY clinical evidence"
              width={1080}
              height={1350}
              sizes="(max-width: 1024px) 80vw, 35vw"
              className="h-auto w-full"
            />
          </div>
        </motion.div>

        <div className="flex flex-col items-start gap-6">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="font-serif text-3xl font-medium leading-tight text-charcoal sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <GoldDivider className="!justify-start" />

          <div className="mt-4 grid w-full gap-px overflow-hidden rounded-2xl gold-border bg-gold-primary/20 sm:grid-cols-3">
            {items.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center justify-center gap-2 bg-white/95 p-8 text-center"
              >
                <AnimatedNumber value={s.value} />
                <span className="text-[11px] uppercase tracking-[0.18em] text-charcoal/70">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <p className="text-xs text-charcoal/55">
            {t("sourceLabel")}
            <a
              href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8950306/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 text-gold-deep underline-offset-4 hover:underline"
            >
              PMC8950306
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
