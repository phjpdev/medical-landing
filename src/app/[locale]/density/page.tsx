import { setRequestLocale, getTranslations } from "next-intl/server";
import { DensityHero } from "@/components/sections/density/DensityHero";
import { DensityStats } from "@/components/sections/density/DensityStats";
import { DensityBenefits } from "@/components/sections/density/DensityBenefits";
import { HandleAnatomy } from "@/components/sections/density/HandleAnatomy";
import { HeatingComparison } from "@/components/sections/density/HeatingComparison";
import { AgingTimeline } from "@/components/sections/density/AgingTimeline";
import { ImageShowcase } from "@/components/sections/density/ImageShowcase";
import { VideoBackdrop } from "@/components/sections/density/VideoBackdrop";
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
  const tCmp = await getTranslations("density.comparison");
  const tAft = await getTranslations("density.aftercare");

  return (
    <>
      {/* Top video backdrop — hero only */}
      <VideoBackdrop>
        <DensityHero />
      </VideoBackdrop>

      {/* Stats sit on regular cream/gold (no video) */}
      <DensityStats />

      {/* Bottom video backdrop — features showcase + core benefits (mid-page, no navbar offset) */}
      <VideoBackdrop dodgeNavbar={false}>
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
      </VideoBackdrop>

      {/* Tips: Classic vs High Tip + improvement areas (real artwork) */}
      <ImageShowcase
        eyebrow="TIP TECHNOLOGY"
        title={tTips("title")}
        body={tTips("subtitle")}
        src="/images/density/tips.png"
        alt="CLASSIC TIP / HIGH TIP · 改善問題"
        variant="gold"
        maxWidth="max-w-3xl"
        width={1080}
        height={1500}
      />

      {/* Innovative treatment heads — EYE / FACE / BODY (real artwork) */}
      <ImageShowcase
        eyebrow="TREATMENT HEADS"
        title="創新治療頭技術"
        body="依照不同部位與深度，三種專屬探頭精準傳遞能量。"
        src="/images/density/treatment-heads.jpg"
        alt="EYE / FACE / BODY 治療頭"
        variant="cream"
        maxWidth="max-w-6xl"
        width={1600}
        height={1200}
      />

      {/* Handle anatomy — interactive callouts + real image, on a video backdrop */}
      <VideoBackdrop dodgeNavbar={false}>
        <HandleAnatomy />
      </VideoBackdrop>

      {/* Heating comparison — bespoke diagram */}
      <HeatingComparison />

      {/* Age-reversal timeline + temperature scale */}
      <AgingTimeline />

      {/* DENSITY vs traditional monopolar — detailed comparison artwork */}
      <ImageShowcase
        eyebrow="DENSITY vs TRADITIONAL"
        title="專利黑科技與一般單極射頻"
        src="/images/density/density-vs-traditional.png"
        alt="DENSITY vs 一般單極射頻"
        variant="gold"
        maxWidth="max-w-3xl"
        width={1080}
        height={1300}
      />

      {/* DENSITY vs Thermage vs Ultherapy (real artwork) */}
      <ImageShowcase
        eyebrow="HOW WE COMPARE"
        title={tCmp("title")}
        body={tCmp("subtitle")}
        src="/images/density/comparison.png"
        alt="DENSITY · Thermage · Ultherapy 比較"
        variant="cream"
        maxWidth="max-w-3xl"
        width={1080}
        height={1300}
      />

      {/* Aftercare (real artwork) */}
      <ImageShowcase
        eyebrow="AFTERCARE"
        title={tAft("title")}
        src="/images/density/aftercare.jpg"
        alt="治療後注意事項"
        variant="gold"
        maxWidth="max-w-5xl"
        width={1600}
        height={1500}
      />

      <CTABanner title={tCta("title")} body={tCta("body")} cta={tCta("cta")} />
    </>
  );
}
