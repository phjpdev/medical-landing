import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { PageHero } from "@/components/sections/PageHero";
import { RevealOnScroll } from "@/components/visual/RevealOnScroll";
import { CTABanner } from "@/components/sections/CTABanner";

type ServiceItem = {
  tag: string;
  title: string;
  body: string;
  cta: string;
  href: "/density" | "/contact";
};

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");
  const tCta = await getTranslations("home.ctaBanner");
  const items = t.raw("items") as ServiceItem[];

  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} body={t("hero.body")} />

      <section className="container-x py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {items.map((s, i) => (
            <RevealOnScroll key={s.title} index={i}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl gold-border bg-white/85 transition-all duration-500 hover:-translate-y-1 hover:shadow-gold">
                {i === 0 && (
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src="/images/density/04-spokesperson.jpg"
                      alt={s.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
                    <span className="absolute right-4 top-4 rounded-full bg-gold-gradient px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink">
                      {s.tag}
                    </span>
                  </div>
                )}
                {i !== 0 && (
                  <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-cream via-beige to-gold-light/30">
                    <div className="absolute inset-0 grid place-items-center">
                      <span className="font-serif text-6xl text-gold-primary/30">
                        {s.title.charAt(0)}
                      </span>
                    </div>
                    <span className="absolute right-4 top-4 rounded-full border border-gold-primary/50 bg-white/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-deep backdrop-blur">
                      {s.tag}
                    </span>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-serif text-2xl font-medium leading-tight">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal/70">{s.body}</p>
                  <Link
                    href={s.href}
                    className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-medium text-gold-deep transition-colors hover:text-gold-primary"
                  >
                    {s.cta}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <CTABanner title={tCta("title")} body={tCta("body")} cta={tCta("cta")} />
    </>
  );
}
