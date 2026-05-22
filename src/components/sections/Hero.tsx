"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "@/i18n/routing";
import { GoldDivider } from "@/components/visual/GoldDivider";

export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative -mt-16 flex min-h-[100svh] items-center overflow-hidden lg:-mt-20">
      <div className="absolute inset-0 bg-ink-gradient" />
      <div className="absolute inset-0 particle-bg opacity-70" />
      <div
        className="absolute inset-x-0 top-0 h-[60%] opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,175,55,0.25), transparent 60%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(245,230,184,0.18), transparent 70%)",
        }}
      />

      {/* Decorative gold streaks */}
      <svg
        className="absolute inset-0 h-full w-full opacity-30"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <linearGradient id="streak" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#D4AF37" stopOpacity="0" />
            <stop offset="0.5" stopColor="#F5E6B8" stopOpacity="0.45" />
            <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M-100 320 C 420 180, 1000 540, 1540 380" stroke="url(#streak)" strokeWidth="1.5" />
        <path d="M-100 460 C 360 320, 1100 640, 1540 500" stroke="url(#streak)" strokeWidth="1" />
        <path d="M-100 200 C 480 80, 980 380, 1540 240" stroke="url(#streak)" strokeWidth="1" />
      </svg>

      <div className="container-x relative z-10 grid items-center gap-12 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start gap-7"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-primary/40 bg-white/5 px-4 py-1.5 text-[10px] uppercase tracking-[0.32em] text-gold-light backdrop-blur">
            <Sparkles className="h-3 w-3" />
            {t("eyebrow")}
          </span>

          <h1 className="font-serif text-[clamp(2.75rem,7vw,5.75rem)] font-medium leading-[0.95] tracking-tight text-cream">
            <span className="gold-text">{t("title1")}</span>
            <br />
            <span className="text-cream/95">{t("title2")}</span>
          </h1>

          <GoldDivider tone="light" className="!justify-start" />

          <p className="max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg">
            {t("subtitle")}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href="/contact" className="btn-gold group">
              {t("cta1")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="/density" className="btn-ghost-gold">
              {t("cta2")}
            </Link>
          </div>
        </motion.div>

        {/* Right: ornate gold ring framing brand monogram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto hidden aspect-square w-full max-w-md items-center justify-center lg:flex"
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(from 90deg, #B8941F 0%, #F5E6B8 25%, #D4AF37 50%, #F5E6B8 75%, #B8941F 100%)",
              filter: "blur(40px)",
              opacity: 0.35,
            }}
          />
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute inset-6 rounded-full border border-gold-primary/40"
          />
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: -360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
            className="absolute inset-16 rounded-full border border-gold-primary/20"
          />
          <div className="relative flex h-56 w-56 flex-col items-center justify-center rounded-full bg-ink/80 backdrop-blur-sm gold-border">
            <span className="font-serif text-5xl text-gold-light">∞</span>
            <span className="mt-1 text-[10px] uppercase tracking-[0.4em] text-gold-light/70">
              Infinity Medical
            </span>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-cream" />
    </section>
  );
}
