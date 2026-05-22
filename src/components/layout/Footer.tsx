import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { NAV_ITEMS, CLINIC } from "@/lib/constants";
import { GoldDivider } from "@/components/visual/GoldDivider";
import { Instagram, Facebook, MessageCircle, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tBrand = useTranslations("brand");
  const tContact = useTranslations("contact.info");
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 overflow-hidden bg-ink text-cream">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 1200px 400px at 50% 0%, rgba(212,175,55,0.18), transparent 70%)",
        }}
      />
      <div className="container-x relative grid gap-12 py-16 md:grid-cols-4 md:gap-8">
        <div className="md:col-span-2">
          <div className="font-serif text-2xl">
            <span className="gold-text">IM Infinity</span>
            <span className="ml-2 text-cream/80">Medical</span>
          </div>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/70">
            {t("tagline")}
          </p>
          <p className="mt-3 max-w-md text-xs leading-relaxed text-cream/45">
            {tBrand("subTagline")}
          </p>
        </div>

        <div>
          <h4 className="eyebrow-light mb-4">{t("navTitle")}</h4>
          <ul className="space-y-2 text-sm">
            {NAV_ITEMS.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="text-cream/70 transition-colors hover:text-gold-light"
                >
                  {tNav(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="eyebrow-light mb-4">{t("contactTitle")}</h4>
          <ul className="space-y-3 text-sm text-cream/70">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-primary" />
              <span>{tContact("address")}</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-primary" />
              <span>{tContact("phone")}</span>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-primary" />
              <span>{tContact("email")}</span>
            </li>
          </ul>

          <h4 className="eyebrow-light mb-4 mt-8">{t("socialTitle")}</h4>
          <div className="flex items-center gap-2">
            <a
              href={CLINIC.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold-primary/30 text-gold-light transition hover:bg-gold-primary/15"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href={CLINIC.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold-primary/30 text-gold-light transition hover:bg-gold-primary/15"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={CLINIC.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold-primary/30 text-gold-light transition hover:bg-gold-primary/15"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <GoldDivider tone="light" className="container-x" />

      <div className="container-x relative flex flex-col items-center justify-between gap-2 py-6 text-xs text-cream/45 md:flex-row">
        <p>{t("copyright", { year })}</p>
        <p className="max-w-md text-center md:text-right">{t("disclaimer")}</p>
      </div>
    </footer>
  );
}
