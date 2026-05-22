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
    <section className="relative -mt-20 flex min-h-[100svh] items-center overflow-hidden lg:-mt-24">
      {/* Solid cream strip behind the fixed navbar (keeps video out of the nav area) */}
      <div className="absolute inset-x-0 top-0 h-20 bg-cream lg:h-24" />

      {/* Background video — starts BELOW the navbar, fills the rest of the hero */}
      <video
        className="absolute inset-x-0 bottom-0 top-20 h-[calc(100%-5rem)] w-full object-cover lg:top-24 lg:h-[calc(100%-6rem)]"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden
      >
        <source src="/treeelink.mp4" type="video/mp4" />
      </video>

      {/* Cream/gold tint overlay — lighter on mobile so the video stays visible across the taller stacked layout */}
      <div
        className="absolute inset-x-0 bottom-0 top-20 h-[calc(100%-5rem)] lg:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(251,246,227,0.42) 0%, rgba(245,230,184,0.28) 50%, rgba(250,246,236,0.42) 100%)",
        }}
      />
      {/* Desktop overlay — heavier tint (text-on-side layout doesn't need to see video as much) */}
      <div
        className="absolute inset-x-0 bottom-0 hidden h-[calc(100%-6rem)] lg:block lg:top-24"
        style={{
          background:
            "linear-gradient(180deg, rgba(251,246,227,0.78) 0%, rgba(245,230,184,0.62) 35%, rgba(250,246,236,0.72) 70%, rgba(245,239,224,0.85) 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 70% 40%, rgba(212,175,55,0.32), transparent 70%)",
        }}
      />
      <div className="particle-bg absolute inset-0 opacity-30" />

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
          <p className="max-w-xl text-lg leading-relaxed text-charcoal/80 [text-shadow:_0_1px_0_rgba(255,255,255,0.4)]">
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

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-b from-transparent to-cream" />
    </section>
  );
}
