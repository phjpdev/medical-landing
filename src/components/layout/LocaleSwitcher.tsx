"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useTransition } from "react";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({ variant = "light" }: { variant?: "light" | "dark" }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: "zh" | "en") => {
    if (next === locale || isPending) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  const inactiveTextColor =
    variant === "dark" ? "text-cream/60 hover:text-gold-light" : "text-charcoal/60 hover:text-gold-deep";
  const containerBg = variant === "dark" ? "bg-white/5" : "bg-white/60";

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-gold-primary/30 p-1 text-xs font-medium tracking-[0.18em] backdrop-blur",
        containerBg,
      )}
      role="group"
      aria-label="Language switcher"
    >
      <button
        type="button"
        onClick={() => switchTo("zh")}
        aria-pressed={locale === "zh"}
        className={cn(
          "rounded-full px-3 py-1.5 transition-all duration-300",
          locale === "zh"
            ? "bg-gold-gradient text-ink shadow-sm"
            : inactiveTextColor,
        )}
      >
        中
      </button>
      <button
        type="button"
        onClick={() => switchTo("en")}
        aria-pressed={locale === "en"}
        className={cn(
          "rounded-full px-3 py-1.5 transition-all duration-300",
          locale === "en"
            ? "bg-gold-gradient text-ink shadow-sm"
            : inactiveTextColor,
        )}
      >
        EN
      </button>
    </div>
  );
}
