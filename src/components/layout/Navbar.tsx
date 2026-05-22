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
  const tBrand = useTranslations("brand");
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
          ? "border-b border-gold-primary/15 bg-cream/85 backdrop-blur-md shadow-soft"
          : "bg-transparent",
      )}
    >
      <div className="container-x flex h-16 items-center justify-between gap-6 lg:h-20">
        <Link href="/" className="group flex items-center gap-2">
          <span className="font-serif text-xl tracking-tight text-charcoal lg:text-2xl">
            <span className="gold-text">IM</span>{" "}
            <span className="text-charcoal">Infinity</span>
          </span>
          <span className="hidden text-[10px] uppercase tracking-[0.32em] text-charcoal/50 lg:inline">
            {tBrand("name").split(" ")[1]}{" "}{tBrand("name").split(" ")[2]}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "relative text-sm tracking-wide transition-colors",
                  active
                    ? "text-gold-deep"
                    : "text-charcoal/70 hover:text-charcoal",
                )}
              >
                {t(item.key)}
                {active && (
                  <span className="absolute -bottom-1.5 left-1/2 h-px w-6 -translate-x-1/2 bg-gold-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher variant="light" />
          <Link href="/contact" className="btn-gold hidden text-xs sm:inline-flex">
            {t("book")}
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
