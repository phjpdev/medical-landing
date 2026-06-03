import { setRequestLocale, getTranslations } from "next-intl/server";
import { DensityHero } from "@/components/sections/density/DensityHero";
import { DensityStats } from "@/components/sections/density/DensityStats";
import { DensityBenefits } from "@/components/sections/density/DensityBenefits";
import { HandleAnatomy } from "@/components/sections/density/HandleAnatomy";
import { ExclusiveTreatmentTips } from "@/components/sections/density/ExclusiveTreatmentTips";
import { HeatingComparison } from "@/components/sections/density/HeatingComparison";
import { AgingTimeline } from "@/components/sections/density/AgingTimeline";
import { ImageShowcase } from "@/components/sections/density/ImageShowcase";
import { FixedVideoBackground } from "@/components/sections/density/FixedVideoBackground";
import { CTABanner } from "@/components/sections/CTABanner";

export default async function DensityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tCta = await getTranslations("density.ctaBanner");
  const tFeat = await getTranslations("density.features");
  const tTips = await getTranslations("density.tips");
  const tHeads = await getTranslations("density.treatmentHeads");
  const tCmp = await getTranslations("density.comparison");
  const tAft = await getTranslations("density.aftercare");

  return (
    <>
      {/* One fixed video background covers the entire page — content scrolls over it */}
      <FixedVideoBackground />

      <div className="relative z-10">
        <DensityHero />
        <DensityStats />

        <ImageShowcase
          eyebrow={tFeat("eyebrow")}
          title={tFeat("title")}
          src="/images/density/features.jpg"
          alt="DENSITY 技術特點 — 四大核心科技"
          variant="transparent"
          maxWidth="max-w-6xl"
          width={1600}
          height={900}
        />

        <DensityBenefits />

        <ImageShowcase
          eyebrow="TIP TECHNOLOGY"
          title={tTips("title")}
          body={tTips("subtitle")}
          src="/images/density/tips.png"
          alt="CLASSIC TIP / HIGH TIP · 改善問題"
          variant="transparent"
          maxWidth="max-w-3xl"
          width={1080}
          height={1500}
        />

        <ImageShowcase
          eyebrow="TREATMENT HEADS"
          title={tHeads("title")}
          body={tHeads("body")}
          src="/images/density/treatment-heads.jpg"
          alt="EYE / FACE / BODY 治療頭"
          variant="transparent"
          maxWidth="max-w-6xl"
          width={1600}
          height={1200}
          className="mt-24 lg:mt-32"
        />

        <ExclusiveTreatmentTips />
        <HandleAnatomy />
        <HeatingComparison />
        <AgingTimeline />

        <ImageShowcase
          eyebrow="DENSITY vs TRADITIONAL"
          title="專利黑科技與一般單極射頻"
          src="/images/density/density-vs-traditional.png"
          alt="DENSITY vs 一般單極射頻"
          variant="transparent"
          maxWidth="max-w-3xl"
          width={1080}
          height={1300}
        />

        <ImageShowcase
          eyebrow="HOW WE COMPARE"
          title={tCmp("title")}
          body={tCmp("subtitle")}
          src="/images/density/comparison.png"
          alt="DENSITY · Thermage · Ultherapy 比較"
          variant="transparent"
          maxWidth="max-w-3xl"
          width={1080}
          height={1300}
        />

        <ImageShowcase
          eyebrow="AFTERCARE"
          title={tAft("title")}
          src="/images/density/aftercare.jpg"
          alt="治療後注意事項"
          variant="transparent"
          maxWidth="max-w-5xl"
          width={1600}
          height={1500}
        />

        <CTABanner title={tCta("title")} body={tCta("body")} cta={tCta("cta")} />
      </div>
    </>
  );
}
