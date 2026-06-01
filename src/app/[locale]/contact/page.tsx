import { setRequestLocale, getTranslations } from "next-intl/server";
import { Instagram, MessageCircle, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CLINIC } from "@/lib/constants";

function ContactCard({
  href,
  icon,
  label,
  handle,
  body,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  handle: string;
  body: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-3xl gold-border bg-white/85 p-8 shadow-soft backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-gold sm:p-12"
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at center, rgba(212,175,55,0.30), transparent 70%)",
        }}
      />

      <div className="relative flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
        <span className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-gold-gradient text-ink shadow-sm">
          {icon}
        </span>

        <div className="flex-1">
          <div className="text-xs uppercase tracking-[0.32em] text-gold-deep">{label}</div>
          <h2 className="mt-2 font-serif text-2xl font-medium leading-tight sm:text-3xl">
            <span className="gold-text">{handle}</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-charcoal/70">{body}</p>
        </div>

        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold-primary/50 bg-white text-gold-deep transition-all group-hover:bg-gold-primary group-hover:text-ink group-hover:rotate-45">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </div>
    </a>
  );
}

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

      <section className="container-narrow flex flex-col gap-6 pb-24">
        <ContactCard
          href={CLINIC.whatsapp}
          icon={<MessageCircle className="h-9 w-9" />}
          label={t("whatsapp.label")}
          handle={CLINIC.whatsappPhone}
          body={t("whatsapp.body")}
        />

        <ContactCard
          href={CLINIC.instagram}
          icon={<Instagram className="h-9 w-9" />}
          label="Instagram"
          handle={CLINIC.instagramHandle}
          body="追蹤我們的 Instagram，掌握最新療程資訊、真實案例與優惠活動。"
        />
      </section>
    </>
  );
}
