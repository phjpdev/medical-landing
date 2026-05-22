import { setRequestLocale, getTranslations } from "next-intl/server";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { CLINIC } from "@/lib/constants";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} body={t("hero.body")} />

      <section className="container-x grid gap-10 pb-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <ContactForm />

        <aside className="flex flex-col gap-6">
          <div className="gold-glow-card rounded-3xl p-8">
            <h2 className="font-serif text-2xl font-medium leading-tight">
              {t("info.title")}
            </h2>
            <div className="mt-2 h-px w-12 bg-gold-primary" />
            <ul className="mt-6 flex flex-col gap-5 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-primary" />
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-charcoal/55">
                    {t("info.addressLabel")}
                  </div>
                  <div className="mt-1 text-charcoal/85">{t("info.address")}</div>
                </div>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold-primary" />
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-charcoal/55">
                    {t("info.phoneLabel")}
                  </div>
                  <div className="mt-1 text-charcoal/85">{t("info.phone")}</div>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gold-primary" />
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-charcoal/55">
                    {t("info.emailLabel")}
                  </div>
                  <div className="mt-1 text-charcoal/85">{t("info.email")}</div>
                </div>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold-primary" />
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-charcoal/55">
                    {t("info.hoursLabel")}
                  </div>
                  <div className="mt-1 text-charcoal/85">{t("info.hours")}</div>
                </div>
              </li>
            </ul>

            <a
              href={CLINIC.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold-primary/50 bg-white/70 px-5 py-3 text-sm font-medium text-charcoal transition-all hover:bg-gold-primary/10"
            >
              <MessageCircle className="h-4 w-4 text-gold-deep" />
              {t("info.whatsapp")}
            </a>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl gold-border bg-gradient-to-br from-cream via-beige to-gold-light/30 shadow-soft">
            <div className="absolute inset-0 grid place-items-center text-center">
              <div>
                <MapPin className="mx-auto h-8 w-8 text-gold-primary" />
                <p className="mt-3 text-sm text-charcoal/55">{t("info.mapPlaceholder")}</p>
                <p className="mt-1 text-xs text-charcoal/45">{t("info.address")}</p>
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
        </aside>
      </section>
    </>
  );
}
