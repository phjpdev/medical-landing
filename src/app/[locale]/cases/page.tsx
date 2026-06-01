"use client";

import { useTranslations } from "next-intl";
import { PageHero } from "@/components/sections/PageHero";
import { CasePostsGrid } from "@/components/sections/CasePostsGrid";

export default function CasesPage() {
  const t = useTranslations("cases");

  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} body={t("hero.body")} />

      <section className="container-x pb-24 pt-4">
        <CasePostsGrid />
        <p className="mt-10 text-center text-xs text-charcoal/55">{t("disclaimer")}</p>
      </section>
    </>
  );
}
