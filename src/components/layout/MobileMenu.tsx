"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet";
import { NAV_ITEMS } from "@/lib/constants";
import { GoldDivider } from "@/components/visual/GoldDivider";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function MobileMenu({ variant = "light" }: { variant?: "light" | "dark" }) {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          aria-label="Open menu"
          className={
            "inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold-primary/30 transition hover:bg-gold-primary/10 lg:hidden " +
            (variant === "dark" ? "text-gold-light" : "text-gold-deep")
          }
        >
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col">
        <SheetTitle className="font-serif text-2xl">
          <span className="gold-text">IM</span> Infinity
        </SheetTitle>
        <GoldDivider tone="light" className="my-4 !justify-start" />
        <nav className="mt-2 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <SheetClose asChild key={item.key}>
              <Link
                href={item.href}
                className="rounded-md px-3 py-3 text-base text-cream transition-colors hover:bg-gold-primary/10 hover:text-gold-light"
              >
                {t(item.key)}
              </Link>
            </SheetClose>
          ))}
        </nav>

        <div className="mt-auto flex flex-col items-start gap-4 pt-6">
          <LocaleSwitcher variant="dark" />
          <SheetClose asChild>
            <Link href="/contact" className="btn-gold w-full justify-center">
              {t("book")}
            </Link>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
