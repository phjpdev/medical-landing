"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { SectionEyebrow } from "@/components/visual/SectionEyebrow";
import { ServiceCardsGrid, type ServiceCardItem } from "@/components/sections/ServiceCardsGrid";

export function ServicesPreview() {
  const t = useTranslations("home.servicesPreview");
  const tServices = useTranslations("services");
  const items = tServices.raw("items") as ServiceCardItem[];

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="container-x relative">
        <SectionEyebrow eyebrow={t("title")} title={t("subtitle")} />

        <div className="mt-14">
          <ServiceCardsGrid items={items} />
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
