import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  size = 40,
  showWordmark = false,
}: {
  className?: string;
  size?: number;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Image
        src="/images/logo.png"
        alt="IM Infinity Medical Limited"
        width={size}
        height={size}
        priority
        className="h-auto w-auto"
        style={{ height: size, width: "auto" }}
      />
      {showWordmark && (
        <span className="hidden font-serif text-xs uppercase tracking-[0.32em] text-gold-deep sm:inline">
          Infinity Medical
        </span>
      )}
    </span>
  );
}
