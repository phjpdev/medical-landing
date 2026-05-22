import { setRequestLocale, getTranslations } from "next-intl/server";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CLINIC } from "@/lib/constants";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  const items = [
    { Icon: MapPin, label: t("info.addressLabel"), value: t("info.address") },
    { Icon: Phone, label: t("info.phoneLabel"), value: t("info.phone") },
    { Icon: Mail, label: t("info.emailLabel"), value: t("info.email") },
    { Icon: Clock, label: t("info.hoursLabel"), value: t("info.hours") },
  ];

  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} body={t("hero.body")} />

      <section className="container-narrow pb-24">
        <div className="gold-glow-card relative rounded-3xl p-8 sm:p-12">
          <h2 className="text-center font-serif text-2xl font-medium leading-tight sm:text-3xl">
            {t("info.title")}
          </h2>
          <div className="mx-auto mt-3 h-px w-16 bg-gold-primary" />

          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {items.map(({ Icon, label, value }) => (
              <li
                key={label}
                className="flex items-start gap-4 rounded-2xl gold-border bg-white/70 p-5 backdrop-blur"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold-gradient text-ink shadow-sm">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-[0.18em] text-charcoal/55">
                    {label}
                  </div>
                  <div className="mt-1 text-base text-charcoal/85">{value}</div>
                </div>
              </li>
            ))}
          </ul>

          <a
            href={CLINIC.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold mt-10 flex w-full items-center justify-center gap-2 sm:mx-auto sm:w-auto sm:px-12"
          >
            <MessageCircle className="h-4 w-4" />
            {t("info.whatsapp")}
          </a>
        </div>

        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl gold-border bg-gradient-to-br from-cream via-beige to-gold-light/30 shadow-soft">
          <div className="absolute inset-0 grid place-items-center text-center">
            <div>
              <MapPin className="mx-auto h-9 w-9 text-gold-primary" />
              <p className="mt-3 text-sm text-charcoal/60">{t("info.mapPlaceholder")}</p>
              <p className="mt-1 text-xs text-charcoal/50">{t("info.address")}</p>
            </div>
          </div>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(212,175,55,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.12) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>
      </section>
    </>
  );
}
