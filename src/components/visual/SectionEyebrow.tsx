import { cn } from "@/lib/utils";
import { GoldDivider } from "./GoldDivider";
import { ResponsiveSplitText } from "./ResponsiveSplitText";

export function SectionEyebrow({
  eyebrow,
  title,
  body,
  align = "center",
  tone = "light",
  withBackground = false,
  className,
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
  /** Readable card on busy / video backgrounds */
  withBackground?: boolean;
  className?: string;
}) {
  const colorTitle = withBackground
    ? "text-charcoal"
    : tone === "dark"
      ? "text-cream"
      : "text-charcoal";
  const colorBody = withBackground
    ? "text-charcoal/80"
    : tone === "dark"
      ? "text-cream/70"
      : "text-charcoal/70";
  const dividerTone = tone === "dark" ? "light" : "primary";
  const showDivider = Boolean(title) && (Boolean(eyebrow) || Boolean(body));

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        withBackground && [
          "mx-auto w-full max-w-3xl rounded-3xl gold-border",
          "bg-white/[0.97] px-6 py-7 shadow-soft ring-1 ring-gold-primary/10",
          "sm:px-10 sm:py-8",
        ],
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "eyebrow",
            withBackground || tone === "light"
              ? "text-gold-deep"
              : "text-gold-light",
          )}
        >
          {eyebrow}
        </span>
      )}
      {title && (
        <h2
          className={cn(
            "font-serif text-3xl font-medium leading-[1.15] sm:text-4xl lg:text-5xl",
            colorTitle,
          )}
        >
          <ResponsiveSplitText text={title} />
        </h2>
      )}
      {showDivider && <GoldDivider tone={dividerTone} className="my-0.5" />}
      {body && (
        <ResponsiveSplitText
          as="p"
          text={body}
          className={cn("max-w-2xl text-base leading-relaxed sm:text-lg", colorBody)}
        />
      )}
    </div>
  );
}
