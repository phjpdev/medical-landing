"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { NAV_ITEMS } from "@/lib/constants";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500",
        scrolled
          ? "border-b border-gold-primary/15 bg-cream/90 backdrop-blur-md shadow-soft"
          : "bg-ink/35 backdrop-blur-[2px]",
      )}
    >
      <div className="container-x flex h-16 items-center justify-between gap-6 lg:h-20">
        <Link href="/" className="flex items-baseline gap-2.5">
          <span className="font-serif text-xl tracking-tight lg:text-2xl">
            <span className="gold-text">IM</span>{" "}
            <span
              className={cn(
                "transition-colors duration-500",
                scrolled ? "text-charcoal" : "text-cream",
              )}
            >
              Infinity
            </span>
          </span>
          <span
            className={cn(
              "hidden text-[10px] uppercase tracking-[0.32em] transition-colors duration-500 lg:inline",
              scrolled ? "text-charcoal/45" : "text-gold-light/70",
            )}
          >
            Infinity Medical
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            const inactiveColor = scrolled
              ? "text-charcoal/70 hover:text-charcoal"
              : "text-cream/80 hover:text-gold-light";
            const activeColor = scrolled ? "text-gold-deep" : "text-gold-light";
            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "relative text-sm tracking-wide transition-colors duration-300",
                  active ? activeColor : inactiveColor,
                )}
              >
                {t(item.key)}
                {active && (
                  <span
                    className={cn(
                      "absolute -bottom-1.5 left-1/2 h-px w-6 -translate-x-1/2",
                      scrolled ? "bg-gold-primary" : "bg-gold-light",
                    )}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher variant={scrolled ? "light" : "dark"} />
          <Link href="/contact" className="btn-gold hidden text-xs sm:inline-flex">
            {t("book")}
          </Link>
          <MobileMenu variant={scrolled ? "light" : "dark"} />
        </div>
      </div>
    </header>
  );
}
