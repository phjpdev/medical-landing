import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceCardsGrid, type ServiceCardItem } from "@/components/sections/ServiceCardsGrid";
import { CTABanner } from "@/components/sections/CTABanner";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");
  const tCta = await getTranslations("common.ctaBanner");
  const items = t.raw("items") as ServiceCardItem[];

  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} body={t("hero.body")} />

      <section className="container-x py-20">
        <ServiceCardsGrid items={items} />
      </section>

      <CTABanner title={tCta("title")} body={tCta("body")} cta={tCta("cta")} />
    </>
  );
}
