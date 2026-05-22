import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx,js,jsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        gold: {
          50: "#FBF6E3",
          100: "#F5E6B8",
          200: "#EFD78D",
          300: "#E8C964",
          400: "#DCB94A",
          500: "#D4AF37",
          600: "#B8941F",
          700: "#937414",
          800: "#6E5610",
          900: "#4A3A0B",
          light: "#E8D4A2",
          primary: "#D4AF37",
          deep: "#B8941F",
        },
        cream: "#FAF6EC",
        beige: "#F5EFE0",
        ink: "#0A0A0A",
        charcoal: "#1A1A1A",
        border: "rgba(212, 175, 55, 0.18)",
        ring: "#D4AF37",
        background: "#FAF6EC",
        foreground: "#1A1A1A",
        muted: {
          DEFAULT: "#F5EFE0",
          foreground: "#6B6357",
        },
        accent: {
          DEFAULT: "#D4AF37",
          foreground: "#0A0A0A",
        },
        destructive: {
          DEFAULT: "#B23A48",
          foreground: "#FFFFFF",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#1A1A1A",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#1A1A1A",
        },
        primary: {
          DEFAULT: "#0A0A0A",
          foreground: "#FAF6EC",
        },
        secondary: {
          DEFAULT: "#F5EFE0",
          foreground: "#1A1A1A",
        },
        input: "rgba(212, 175, 55, 0.30)",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "var(--font-noto-serif-tc)", "serif"],
        sans: ["var(--font-inter)", "var(--font-noto-sans-tc)", "system-ui", "sans-serif"],
        display: ["var(--font-cormorant)", "var(--font-noto-serif-tc)", "serif"],
      },
      backgroundImage: {
        "gold-shimmer":
          "linear-gradient(110deg, #B8941F 0%, #D4AF37 25%, #F5E6B8 50%, #D4AF37 75%, #B8941F 100%)",
        "gold-gradient":
          "linear-gradient(135deg, #F5E6B8 0%, #D4AF37 50%, #B8941F 100%)",
        "gold-radial":
          "radial-gradient(ellipse at center, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0) 70%)",
        "ink-gradient":
          "linear-gradient(180deg, #0A0A0A 0%, #1A1A1A 100%)",
        "cream-radial":
          "radial-gradient(ellipse at top, #FBF6E3 0%, #FAF6EC 50%, #F5EFE0 100%)",
      },
      boxShadow: {
        gold: "0 0 40px rgba(212, 175, 55, 0.18)",
        "gold-lg": "0 0 80px rgba(212, 175, 55, 0.25)",
        "gold-inset": "inset 0 0 0 1px rgba(212, 175, 55, 0.4)",
        soft: "0 8px 30px rgba(10, 10, 10, 0.06)",
      },
      borderRadius: {
        lg: "1rem",
        md: "0.75rem",
        sm: "0.5rem",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(212, 175, 55, 0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(212, 175, 55, 0.4)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        shimmer: "shimmer 6s linear infinite",
        "fade-up": "fade-up 0.7s ease-out forwards",
        glow: "glow 3s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
