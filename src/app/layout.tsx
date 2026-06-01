import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Noto_Serif_TC, Noto_Sans_TC } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSerifTC = Noto_Serif_TC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-serif-tc",
  display: "swap",
  preload: false,
});

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-noto-sans-tc",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "IM Infinity Medical · 無雙電波 DENSITY · Hong Kong",
  description:
    "IM Infinity Medical — Hong Kong's destination for the patented DENSITY (無雙電波) Monopolar × Bipolar RF skin-tightening treatment.",
  metadataBase: new URL("https://iminfinity.hk"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className={`${cormorant.variable} ${inter.variable} ${notoSerifTC.variable} ${notoSansTC.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Page-wide fixed gold-waves backdrop (mobile + desktop variants in globals.css) */}
        <div className="page-backdrop" aria-hidden />
        {children}
      </body>
    </html>
  );
}
