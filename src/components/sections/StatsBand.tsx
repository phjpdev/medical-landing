"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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
    <span ref={ref} className="gold-text font-serif text-5xl font-medium leading-none sm:text-6xl">
      {n}
      {suffix}
    </span>
  );
}

export function StatsBand() {
  const t = useTranslations("home.stats");
  const items = t.raw("items") as { value: string; label: string }[];

  return (
    <section className="relative overflow-hidden bg-ink py-20 text-cream md:py-28">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(212,175,55,0.18), transparent 70%)",
        }}
      />
      <div className="particle-bg absolute inset-0 opacity-70" />

      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-3xl gold-border"
        >
          <Image
            src="/images/density/04-spokesperson.jpg"
            alt="DENSITY clinical evidence"
            fill
            sizes="(max-width: 1024px) 80vw, 35vw"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
        </motion.div>

        <div className="flex flex-col items-start gap-6">
          <span className="eyebrow-light">{t("eyebrow")}</span>
          <h2 className="font-serif text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl text-cream">
            {t("title")}
          </h2>

          <div className="mt-4 grid w-full gap-px overflow-hidden rounded-2xl gold-border bg-gold-primary/15 sm:grid-cols-3">
            {items.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center justify-center gap-2 bg-ink p-8 text-center"
              >
                <AnimatedNumber value={s.value} />
                <span className="text-[11px] uppercase tracking-[0.18em] text-cream/65">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <p className="text-xs text-cream/45">
            {t("sourceLabel")}
            <a
              href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8950306/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 text-gold-light underline-offset-4 hover:underline"
            >
              PMC8950306
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
