import type { Config } from "tailwindcss";

/**
 * Ibda design system.
 * Editorial and flat by intent: warm sand surface, ink text, a single
 * terracotta accent (oasis green only as a sparing secondary). The type system
 * is bilingual — Fraunces/Inter for Latin, Amiri/IBM Plex Sans Arabic for
 * Arabic — swapped by direction in globals.css.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          DEFAULT: "#F7F4EF", // page background
          deep: "#EFEAE1", // subtle alternate surface
          dark: "#E7E0D4", // pressed / inset
        },
        ink: {
          DEFAULT: "#1C1A17", // primary text
          soft: "#56504A", // secondary text
          faint: "#8A8178", // captions / meta
        },
        terracotta: {
          DEFAULT: "#9C4221", // the one accent
          dark: "#7E3417",
          tint: "#F0E2D8", // washed accent surface
        },
        oasis: {
          DEFAULT: "#2F5D50", // sparing secondary
          tint: "#E1E8E4",
        },
        hairline: "#DAD3C7", // 1px borders
        "hairline-strong": "#C8BFAF",
      },
      fontFamily: {
        // Latin defaults; Arabic equivalents are swapped via [dir="rtl"] in CSS.
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        "serif-ar": ["var(--font-amiri)", "Georgia", "serif"],
        "sans-ar": ["var(--font-plex-arabic)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      maxWidth: {
        prose: "68ch",
      },
      keyframes: {
        "fade-rise": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-rise": "fade-rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 0.6s ease both",
      },
    },
  },
  plugins: [],
};

export default config;
