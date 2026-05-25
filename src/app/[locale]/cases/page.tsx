"use client";

import { useTranslations } from "next-intl";
import { PageHero } from "@/components/sections/PageHero";
import { EditableImage } from "@/components/visual/EditableImage";
import { EditableText } from "@/components/visual/EditableText";

const CASES = [
  { id: "c1", label: "Full-face Lift" },
  { id: "c2", label: "Nasolabial Lines" },
  { id: "c3", label: "Eye-area Lift" },
  { id: "c4", label: "Puffy Eye Reduction" },
  { id: "c5", label: "Abdomen Tightening" },
  { id: "c6", label: "Upper-arm Tightening" },
  { id: "c7", label: "Jawline Definition" },
  { id: "c8", label: "Pore Refinement" },
];

export default function CasesPage() {
  const t = useTranslations("cases");

  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} body={t("hero.body")} />

      <section className="container-x pb-24 pt-4">
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {CASES.map((c) => (
            <article
              key={c.id}
              className="overflow-hidden rounded-3xl gold-border bg-white/85 shadow-soft backdrop-blur-sm"
            >
              <EditableImage
                storageKey={`case-photo-${c.id}`}
                alt={c.label}
                className="aspect-[3/4]"
                rounded="rounded-none"
                maxWidth={900}
                maxHeight={1200}
              />
              <div className="px-5 py-4">
                <EditableText
                  as="span"
                  storageKey={`case-label-${c.id}`}
                  defaultValue={c.label}
                  className="block text-sm font-medium text-charcoal"
                />
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-charcoal/55">{t("disclaimer")}</p>
      </section>
    </>
  );
}
