import { setRequestLocale, getTranslations } from "next-intl/server";
import { DensityHero } from "@/components/sections/density/DensityHero";
import { DensityStats } from "@/components/sections/density/DensityStats";
import { DensityFeatures } from "@/components/sections/density/DensityFeatures";
import { DensityBenefits } from "@/components/sections/density/DensityBenefits";
import { TipsShowcase } from "@/components/sections/density/TipsShowcase";
import { ImprovementAreas } from "@/components/sections/density/ImprovementAreas";
import { HandleAnatomy } from "@/components/sections/density/HandleAnatomy";
import { HeatingComparison } from "@/components/sections/density/HeatingComparison";
import { AgingTimeline } from "@/components/sections/density/AgingTimeline";
import { ComparisonTable } from "@/components/sections/density/ComparisonTable";
import { Aftercare } from "@/components/sections/density/Aftercare";
import { CTABanner } from "@/components/sections/CTABanner";

export default async function DensityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tCta = await getTranslations("density.ctaBanner");

  return (
    <>
      <DensityHero />
      <DensityStats />
      <DensityFeatures />
      <DensityBenefits />
      <TipsShowcase />
      <ImprovementAreas />
      <HandleAnatomy />
      <HeatingComparison />
      <AgingTimeline />
      <ComparisonTable />
      <Aftercare />
      <CTABanner title={tCta("title")} body={tCta("body")} cta={tCta("cta")} />
    </>
  );
}
