import { cn } from "@/lib/utils";

export function GoldDivider({
  className,
  tone = "primary",
}: {
  className?: string;
  tone?: "primary" | "light";
}) {
  const color = tone === "light" ? "text-gold-light" : "text-gold-primary";
  return (
    <div className={cn("flex items-center justify-center gap-3", color, className)}>
      <span
        className="h-px w-12"
        style={{ background: "linear-gradient(90deg, transparent, currentColor)" }}
      />
      <svg
        viewBox="0 0 24 24"
        className="h-3 w-3"
        fill="currentColor"
        aria-hidden
      >
        <path d="M12 1l3.09 8.41L24 12l-8.91 2.59L12 23l-3.09-8.41L0 12l8.91-2.59L12 1z" />
      </svg>
      <span
        className="h-px w-12"
        style={{ background: "linear-gradient(90deg, currentColor, transparent)" }}
      />
    </div>
  );
}
