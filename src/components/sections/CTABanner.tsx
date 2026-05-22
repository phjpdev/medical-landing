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
      <div className="relative overflow-hidden rounded-3xl gold-border bg-gradient-to-br from-[#FBF6E3] via-[#F5E6B8] to-[#F5EFE0] p-10 text-center shadow-gold-lg sm:p-16 lg:p-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(212,175,55,0.30), transparent 70%)",
          }}
        />
        <div className="particle-bg pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative flex flex-col items-center gap-5">
          <GoldDivider />
          <h2 className="font-serif text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
            <span className="gold-text">{title}</span>
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-charcoal/80">{body}</p>
          <Link href={href} className="btn-gold mt-3 group">
            {cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
