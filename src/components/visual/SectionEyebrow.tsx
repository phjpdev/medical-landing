import { cn } from "@/lib/utils";
import { GoldDivider } from "./GoldDivider";

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
  title?: React.ReactNode;
  body?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
  withBackground?: boolean;
  className?: string;
}) {
  const colorTitle = tone === "dark" ? "text-cream" : "text-charcoal";
  const colorBody = tone === "dark" ? "text-cream/70" : "text-charcoal/70";
  const dividerTone = tone === "dark" ? "light" : "primary";

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        withBackground &&
          "rounded-2xl gold-border bg-white/85 px-6 py-5 shadow-soft backdrop-blur-sm sm:px-8 sm:py-6",
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "eyebrow",
            tone === "dark" ? "text-gold-light" : "text-gold-deep",
          )}
        >
          {eyebrow}
        </span>
      )}
      {title && (
        <h2 className={cn("font-serif text-3xl sm:text-4xl lg:text-5xl font-medium leading-[1.1]", colorTitle)}>
          {title}
        </h2>
      )}
      <GoldDivider tone={dividerTone} className="my-1" />
      {body && (
        <p className={cn("max-w-2xl text-base sm:text-lg leading-relaxed", colorBody)}>
          {body}
        </p>
      )}
    </div>
  );
}
