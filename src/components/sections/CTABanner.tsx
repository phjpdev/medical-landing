import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { GoldDivider } from "@/components/visual/GoldDivider";
import { ResponsiveSplitText } from "@/components/visual/ResponsiveSplitText";

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
      <div className="relative overflow-hidden rounded-3xl gold-border bg-white/95 p-10 text-center shadow-gold-lg sm:p-16 lg:p-20">
        <div className="relative flex flex-col items-center gap-5">
          <GoldDivider />
          <h2 className="font-serif text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
            <span className="gold-text">{title}</span>
          </h2>
          <ResponsiveSplitText
            as="p"
            text={body}
            className="max-w-xl text-base leading-relaxed text-charcoal/80"
          />
          <Link href={href} className="btn-gold mt-3 group">
            {cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
