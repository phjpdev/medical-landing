import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { SectionEyebrow } from "@/components/visual/SectionEyebrow";
import { RevealOnScroll } from "@/components/visual/RevealOnScroll";

type ServiceItem = {
  tag: string;
  title: string;
  body: string;
  cta: string;
  href: string;
};

const SERVICE_IMAGES = [
  { src: "/images/density/hero-wide.png", objectPosition: "center", fit: "cover" as const },
  { src: "/images/density/aftercare.jpg", objectPosition: "20% 30%", fit: "cover" as const },
  { src: "/images/density/spokesperson.png", objectPosition: "center top", fit: "cover" as const },
];

export function ServicesPreview() {
  const t = useTranslations("home.servicesPreview");
  const tServices = useTranslations("services");
  const items = tServices.raw("items") as ServiceItem[];

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-cream-radial" />
      <div className="container-x relative">
        <SectionEyebrow eyebrow={t("title")} title={t("subtitle")} />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((s, i) => {
            const img = SERVICE_IMAGES[i] ?? SERVICE_IMAGES[0];
            return (
              <RevealOnScroll key={s.title} index={i}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl gold-border bg-white/90 transition-all duration-500 hover:-translate-y-1 hover:shadow-gold">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={img.src}
                      alt={s.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ objectPosition: img.objectPosition }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
                    <span className="absolute right-4 top-4 rounded-full bg-gold-gradient px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink shadow-sm">
                      {s.tag}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="font-serif text-2xl font-medium leading-tight">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-charcoal/70">{s.body}</p>
                    <Link
                      href={s.href as "/density" | "/contact"}
                      className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-medium text-gold-deep transition-colors hover:text-gold-primary"
                    >
                      {s.cta}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>

                  <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gold-radial opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </article>
              </RevealOnScroll>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-gold-primary/50 bg-white/70 px-7 py-3 text-sm font-medium text-gold-deep transition-all hover:bg-gold-primary/10"
          >
            {t("cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
