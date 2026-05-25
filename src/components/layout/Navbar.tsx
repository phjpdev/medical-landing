"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { LogOut, ShieldCheck } from "lucide-react";
import { Link, usePathname } from "@/i18n/routing";
import { NAV_ITEMS } from "@/lib/constants";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";
import { useIsAdmin, useLogout } from "@/lib/admin";

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const isAdmin = useIsAdmin();
  const logout = useLogout();

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
          ? "border-b border-gold-primary/15 bg-cream/92 backdrop-blur-md shadow-soft"
          : "bg-cream/30 backdrop-blur-[2px]",
      )}
    >
      <div className="container-x flex h-24 items-center justify-between gap-6 lg:h-28">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="IM Infinity Medical Limited"
            width={320}
            height={320}
            priority
            className={cn(
              "w-auto transition-all duration-500 drop-shadow-[0_2px_8px_rgba(184,148,31,0.30)]",
              scrolled ? "h-20 lg:h-24" : "h-24 lg:h-28",
            )}
          />
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
                  "relative text-sm tracking-wide transition-colors duration-300",
                  active
                    ? "text-gold-deep"
                    : "text-charcoal/75 hover:text-gold-deep",
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
          {isAdmin && (
            <button
              type="button"
              onClick={() => void logout()}
              className="hidden items-center gap-1.5 rounded-full border border-gold-primary/50 bg-white/70 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-gold-deep backdrop-blur transition-colors hover:bg-gold-primary/10 lg:inline-flex"
              title="Sign out of admin"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              Admin
              <LogOut className="h-3.5 w-3.5 opacity-70" />
            </button>
          )}
          <LocaleSwitcher variant="light" />
          <Link href="/contact" className="btn-gold hidden text-xs sm:inline-flex">
            {t("book")}
          </Link>
          <MobileMenu variant="light" />
        </div>
      </div>
    </header>
  );
}
