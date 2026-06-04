"use client";

import { useTranslations } from "next-intl";
import { PageHero } from "@/components/sections/PageHero";
import { CasePostsGrid } from "@/components/sections/CasePostsGrid";
import { CTABanner } from "@/components/sections/CTABanner";

export default function CasesPage() {
  const t = useTranslations("cases");
  const tCta = useTranslations("common.ctaBanner");

  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} body={t("hero.body")} />

      <section className="container-x pb-24 pt-4">
        <CasePostsGrid />
        <p className="mt-10 text-center text-xs text-charcoal/55">{t("disclaimer")}</p>
      </section>

      <CTABanner title={tCta("title")} body={tCta("body")} cta={tCta("cta")} />
    </>
  );
}
