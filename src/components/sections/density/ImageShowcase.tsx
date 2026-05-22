import Image from "next/image";
import { SectionEyebrow } from "@/components/visual/SectionEyebrow";
import { RevealOnScroll } from "@/components/visual/RevealOnScroll";

export function ImageShowcase({
  eyebrow,
  title,
  body,
  src,
  alt,
  ratio = "auto",
  maxWidth = "max-w-5xl",
  variant = "cream",
  width = 1600,
  height = 900,
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  src: string;
  alt: string;
  ratio?: "auto" | "wide" | "square" | "tall";
  maxWidth?: string;
  variant?: "cream" | "gold";
  width?: number;
  height?: number;
}) {
  const bg =
    variant === "gold"
      ? "linear-gradient(180deg, #FAF6EC 0%, #F5E6B8 50%, #FAF6EC 100%)"
      : undefined;
  const ratioClass =
    ratio === "wide"
      ? "aspect-[16/9]"
      : ratio === "square"
        ? "aspect-square"
        : ratio === "tall"
          ? "aspect-[3/4]"
          : "";

  return (
    <section className="relative overflow-hidden py-24">
      <div
        className="absolute inset-0"
        style={{ background: bg ?? undefined }}
      />
      {variant === "cream" && <div className="absolute inset-0 bg-cream-radial" />}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 30%, rgba(212,175,55,0.18), transparent 70%)",
        }}
      />

      <div className="container-x relative">
        {(eyebrow || title || body) && (
          <SectionEyebrow eyebrow={eyebrow} title={title} body={body} />
        )}

        <RevealOnScroll className={`mx-auto ${eyebrow || title ? "mt-12" : "mt-0"} ${maxWidth}`}>
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gold-radial blur-2xl" />
            <div className={`relative overflow-hidden rounded-3xl gold-border bg-white shadow-gold-lg ${ratioClass}`}>
              {ratioClass ? (
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(max-width: 1024px) 95vw, 75vw"
                  className="object-cover"
                />
              ) : (
                <Image
                  src={src}
                  alt={alt}
                  width={width}
                  height={height}
                  sizes="(max-width: 1024px) 95vw, 75vw"
                  className="h-auto w-full"
                />
              )}
            </div>
            <div className="absolute -left-3 -top-3 hidden h-14 w-14 rounded-tl-2xl border-l-2 border-t-2 border-gold-primary lg:block" />
            <div className="absolute -bottom-3 -right-3 hidden h-14 w-14 rounded-br-2xl border-b-2 border-r-2 border-gold-primary lg:block" />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
