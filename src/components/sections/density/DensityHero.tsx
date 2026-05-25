"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { GoldDivider } from "@/components/visual/GoldDivider";

export function DensityHero() {
  const t = useTranslations("density.hero");

  return (
    <section className="relative -mt-24 flex min-h-[100svh] items-center overflow-hidden lg:-mt-28">
      <div className="particle-bg absolute inset-0 opacity-25" />

      {/* Decorative gold streaks */}
      <svg
        className="absolute inset-0 h-full w-full opacity-30"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <linearGradient id="d-streak" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#D4AF37" stopOpacity="0" />
            <stop offset="0.5" stopColor="#B8941F" stopOpacity="0.5" />
            <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M-100 700 C 360 540, 1100 740, 1540 580" stroke="url(#d-streak)" strokeWidth="1.5" />
        <path d="M-100 760 C 480 600, 980 820, 1540 660" stroke="url(#d-streak)" strokeWidth="1" />
      </svg>

      <div className="container-x relative z-10 grid items-center gap-12 pb-20 pt-32 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:pb-28 lg:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="flex flex-col items-start gap-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-primary/40 bg-white/70 px-4 py-1.5 text-[10px] uppercase tracking-[0.32em] text-gold-deep backdrop-blur">
            <Sparkles className="h-3 w-3" />
            {t("eyebrow")}
          </span>

          <h1 className="font-serif text-[clamp(3rem,7vw,5.75rem)] font-medium leading-[0.95] tracking-tight">
            <span className="gold-text">{t("title")}</span>
            <br />
            <span className="text-charcoal/85 text-[0.65em]">{t("subtitle")}</span>
          </h1>

          <GoldDivider className="!justify-start" />
          <p className="max-w-xl text-lg leading-relaxed text-charcoal/85 [text-shadow:_0_1px_0_rgba(255,255,255,0.45)]">
            {t("body")}
          </p>

          <div className="pt-2">
            <Link href="/contact" className="btn-gold group">
              {t("cta")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gold-radial blur-2xl" />
          <div className="relative overflow-hidden rounded-3xl gold-border bg-white shadow-gold-lg">
            <Image
              src="/images/density/spokesperson.png"
              alt="DENSITY · Lee Young-Ae"
              width={1080}
              height={1350}
              sizes="(max-width: 1024px) 80vw, 45vw"
              className="h-auto w-full"
              priority
            />
          </div>
          <div className="absolute -left-3 -top-3 hidden h-16 w-16 rounded-tl-2xl border-l-2 border-t-2 border-gold-primary lg:block" />
          <div className="absolute -bottom-3 -right-3 hidden h-16 w-16 rounded-br-2xl border-b-2 border-r-2 border-gold-primary lg:block" />
        </motion.div>
      </div>
    </section>
  );
}
