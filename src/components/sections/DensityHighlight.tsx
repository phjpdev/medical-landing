import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { GoldDivider } from "@/components/visual/GoldDivider";
import { RevealOnScroll } from "@/components/visual/RevealOnScroll";

export function DensityHighlight() {
  const t = useTranslations("home.densityHighlight");
  const benefits = t.raw("benefits") as string[];

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-cream-radial" />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <RevealOnScroll className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl gold-border shadow-gold-lg">
            <Image
              src="/images/density/03-benefits-hero.jpg"
              alt="DENSITY 無雙電波"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority={false}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ink/30 via-transparent to-transparent" />
          </div>
          <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full border border-gold-primary/40 bg-cream/70 backdrop-blur" />
          <div className="absolute -bottom-8 -right-6 h-32 w-32 rounded-full bg-gold-radial" />
        </RevealOnScroll>

        <RevealOnScroll index={1} className="flex flex-col gap-6">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="font-serif text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
            <span className="gold-text">{t("title")}</span>
          </h2>
          <GoldDivider className="!justify-start" />
          <p className="max-w-xl text-base leading-relaxed text-charcoal/75 sm:text-lg">
            {t("body")}
          </p>

          <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {benefits.map((b) => (
              <li
                key={b}
                className="flex items-center gap-3 rounded-full bg-white/70 px-4 py-2.5 text-sm gold-border"
              >
                <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold-primary" />
                <span className="text-charcoal/85">{b}</span>
              </li>
            ))}
          </ul>

          <div className="pt-4">
            <Link href="/density" className="btn-gold group">
              <span>DENSITY</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
