import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { RevealOnScroll } from "@/components/visual/RevealOnScroll";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { CTABanner } from "@/components/sections/CTABanner";

type QAGroup = {
  title: string;
  items: { q: string; a: string }[];
};

export default async function QAPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("qa");
  const tCta = await getTranslations("common.ctaBanner");
  const groups = t.raw("groups") as QAGroup[];

  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} body={t("hero.body")} />

      <section className="container-narrow py-16">
        <div className="flex flex-col gap-12">
          {groups.map((g, gi) => (
            <RevealOnScroll key={g.title} index={gi}>
              <div>
                <div className="mb-4 flex items-baseline gap-3">
                  <span className="font-serif text-2xl text-gold-deep">
                    {String(gi + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-serif text-2xl font-medium leading-tight sm:text-3xl">
                    {g.title}
                  </h2>
                </div>
                <Accordion
                  type="single"
                  collapsible
                  className="rounded-2xl gold-border bg-white/85 px-6 backdrop-blur"
                >
                  {g.items.map((it, i) => (
                    <AccordionItem
                      key={it.q}
                      value={`${gi}-${i}`}
                      className="last:border-b-0"
                    >
                      <AccordionTrigger>{it.q}</AccordionTrigger>
                      <AccordionContent>{it.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <CTABanner title={tCta("title")} body={tCta("body")} cta={tCta("cta")} />
    </>
  );
}
