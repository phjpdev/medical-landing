import { setRequestLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { BrandIntro } from "@/components/sections/BrandIntro";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { DensityHighlight } from "@/components/sections/DensityHighlight";
import { StatsBand } from "@/components/sections/StatsBand";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTABanner } from "@/components/sections/CTABanner";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tCta = await getTranslations("home.ctaBanner");

  return (
    <>
      <Hero />
      <BrandIntro />
      <ServicesPreview />
      <DensityHighlight />
      <StatsBand />
      <Testimonials />
      <CTABanner
        title={tCta("title")}
        body={tCta("body")}
        cta={tCta("cta")}
      />
    </>
  );
}
