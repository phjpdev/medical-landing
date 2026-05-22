export const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "density", href: "/density" },
  { key: "cases", href: "/cases" },
  { key: "qa", href: "/qa" },
  { key: "contact", href: "/contact" },
] as const;

export type NavKey = (typeof NAV_ITEMS)[number]["key"];

export const CLINIC = {
  whatsapp: "https://wa.me/85200000000",
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
};
