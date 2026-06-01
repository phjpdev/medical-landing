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

// Pages that contain admin-editable content (photos / text).
// Used by Navbar + MobileMenu to highlight these entries when admin is signed in.
export const EDITABLE_NAV_KEYS = new Set<NavKey>(["home", "cases"]);

export const CLINIC = {
  whatsapp: "https://wa.me/85269740633",
  instagram: "https://www.instagram.com/iminfinity_medicall?igsh=MWJ6NWx0bGZ3aWhucQ==",
  instagramHandle: "@iminfinity_medicall",
  threads: "https://www.threads.com/@iminfinity_medicall",
};
