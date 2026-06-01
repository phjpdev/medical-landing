import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "@/i18n/routing";
import { GoldDivider } from "@/components/visual/GoldDivider";
import { RevealOnScroll } from "@/components/visual/RevealOnScroll";

export function DensityHighlight() {
  const t = useTranslations("home.densityHighlight");
  const benefits = t.raw("benefits") as string[];

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(250,246,236,0.50) 0%, rgba(245,230,184,0.40) 50%, rgba(250,246,236,0.50) 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(212,175,55,0.22), transparent 70%)",
        }}
      />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <RevealOnScroll className="flex flex-col items-start gap-6">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="font-serif text-4xl font-medium leading-[1.05] sm:text-5xl lg:text-6xl">
            <span className="gold-text">{t("title")}</span>
          </h2>
          <GoldDivider className="!justify-start" />
          <p className="max-w-xl text-base leading-relaxed text-charcoal/75 sm:text-lg">
            {t("body")}
          </p>

          <ul className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {benefits.map((b) => (
              <li
                key={b}
                className="flex items-center gap-3 rounded-full bg-white/85 px-4 py-3 text-sm gold-border shadow-soft"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold-gradient text-ink shadow-sm">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span className="text-charcoal/90">{b}</span>
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

        <RevealOnScroll index={1} className="relative">
          <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gold-radial opacity-50" />
          <div className="relative overflow-hidden rounded-3xl gold-border bg-white shadow-gold-lg">
            <Image
              src="/images/density/benefits-ring.jpg"
              alt="DENSITY 無雙電波 — 六大效益"
              width={1080}
              height={1350}
              sizes="(max-width: 1024px) 90vw, 50vw"
              className="h-auto w-full"
              priority={false}
            />
          </div>
          {/* Corner ornaments */}
          <div className="absolute -left-3 -top-3 hidden h-16 w-16 rounded-tl-2xl border-l-2 border-t-2 border-gold-primary lg:block" />
          <div className="absolute -bottom-3 -right-3 hidden h-16 w-16 rounded-br-2xl border-b-2 border-r-2 border-gold-primary lg:block" />
        </RevealOnScroll>
      </div>
    </section>
  );
}
