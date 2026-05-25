"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "@/i18n/routing";
import { GoldDivider } from "@/components/visual/GoldDivider";

export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative -mt-20 flex min-h-[100svh] items-center overflow-hidden lg:-mt-24">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(251,246,227,0.55) 0%, rgba(245,230,184,0.42) 35%, rgba(250,246,236,0.50) 70%, rgba(245,239,224,0.55) 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 30% 40%, rgba(212,175,55,0.30), transparent 70%)",
        }}
      />
      <div className="particle-bg absolute inset-0 opacity-50" />

      {/* Decorative gold streaks */}
      <svg
        className="absolute inset-0 h-full w-full opacity-50"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <linearGradient id="streak" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#D4AF37" stopOpacity="0" />
            <stop offset="0.5" stopColor="#B8941F" stopOpacity="0.5" />
            <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M-100 320 C 420 180, 1000 540, 1540 380" stroke="url(#streak)" strokeWidth="1.5" />
        <path d="M-100 460 C 360 320, 1100 640, 1540 500" stroke="url(#streak)" strokeWidth="1" />
        <path d="M-100 200 C 480 80, 980 380, 1540 240" stroke="url(#streak)" strokeWidth="1" />
      </svg>

      <div className="container-x relative z-10 grid items-center gap-12 pb-20 pt-32 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:pb-28 lg:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start gap-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-primary/40 bg-white/70 px-4 py-1.5 text-[10px] uppercase tracking-[0.32em] text-gold-deep backdrop-blur">
            <Sparkles className="h-3 w-3" />
            {t("eyebrow")}
          </span>

          <h1 className="font-serif text-[clamp(2.5rem,6.5vw,5.25rem)] font-medium leading-[0.95] tracking-tight">
            <span className="gold-text">{t("title1")}</span>
            <br />
            <span className="text-charcoal">{t("title2")}</span>
          </h1>

          <GoldDivider className="!justify-start" />

          <p className="max-w-xl text-base leading-relaxed text-charcoal/75 sm:text-lg">
            {t("subtitle")}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href="/contact" className="btn-gold group">
              {t("cta1")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/density"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gold-primary/60 bg-white/60 px-7 py-3 text-sm font-medium tracking-wide text-gold-deep backdrop-blur transition-all duration-300 hover:bg-gold-primary/10"
            >
              {t("cta2")}
            </Link>
          </div>
        </motion.div>

        {/* Right — wide DENSITY hero artwork */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-2xl"
        >
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gold-radial blur-2xl" />
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl shadow-gold-lg gold-border">
            <Image
              src="/images/density/hero-wide.png"
              alt="無雙電波 DENSITY"
              fill
              sizes="(max-width: 1024px) 90vw, 55vw"
              className="object-cover"
              priority
            />
          </div>
          {/* Corner ornaments */}
          <div className="absolute -left-3 -top-3 hidden h-16 w-16 rounded-tl-2xl border-l-2 border-t-2 border-gold-primary lg:block" />
          <div className="absolute -bottom-3 -right-3 hidden h-16 w-16 rounded-br-2xl border-b-2 border-r-2 border-gold-primary lg:block" />
        </motion.div>
      </div>

      {/* Bottom transition */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-cream" />
    </section>
  );
}
