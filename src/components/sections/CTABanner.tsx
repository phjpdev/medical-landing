import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { GoldDivider } from "@/components/visual/GoldDivider";

export function CTABanner({
  title,
  body,
  cta,
  href = "/contact",
}: {
  title: string;
  body: string;
  cta: string;
  href?: "/contact" | "/density" | "/services" | "/about" | "/cases" | "/qa" | "/";
}) {
  return (
    <section className="container-x py-20">
      <div className="relative overflow-hidden rounded-3xl bg-ink p-10 text-center text-cream sm:p-16 lg:p-20">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(212,175,55,0.30), transparent 70%)",
          }}
        />
        <div className="particle-bg absolute inset-0 opacity-60" />
        <div className="relative flex flex-col items-center gap-5">
          <GoldDivider tone="light" />
          <h2 className="font-serif text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
            <span className="gold-text">{title}</span>
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-cream/75">{body}</p>
          <Link href={href} className="btn-gold mt-3 group">
            {cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
