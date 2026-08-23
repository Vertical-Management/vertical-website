import type { Config } from "tailwindcss";

/**
 * Vertical Design System → Tailwind map
 * Tokens originate in src/styles/globals.css :root
 */
const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "var(--color-ink)",
          soft: "var(--color-ink-soft)",
          muted: "var(--color-ink-muted)",
          faint: "var(--color-ink-faint)",
        },
        paper: {
          DEFAULT: "var(--color-paper)",
          warm: "var(--color-paper-warm)",
          cool: "var(--color-paper-cool)",
          dim: "var(--color-paper-dim)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          hot: "var(--color-accent-hot)",
          cool: "var(--color-accent-cool)",
          lime: "var(--color-accent-lime)",
          soft: "var(--color-accent-soft)",
        },
        surface: {
          DEFAULT: "var(--color-surface)",
          elevated: "var(--color-surface-elevated)",
          sunken: "var(--color-surface-sunken)",
          inverse: "var(--color-surface-inverse)",
        },
        border: {
          DEFAULT: "var(--color-border)",
          strong: "var(--color-border-strong)",
        },
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        danger: "var(--color-danger)",
      },
      fontFamily: {
        display: [
          "var(--font-display)",
          "var(--font-display-fallback)",
          "system-ui",
          "sans-serif",
        ],
        body: [
          "var(--font-body)",
          "var(--font-body-fallback)",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "var(--font-mono)",
          "var(--font-mono-fallback)",
          "ui-monospace",
          "monospace",
        ],
      },
      fontSize: {
        /* Floors tuned for 375–430px: readable, no edge clipping */
        "display-2xl": [
          "clamp(2.75rem, 1.4rem + 7.2vw, 10rem)",
          { lineHeight: "0.9", letterSpacing: "-0.035em", fontWeight: "800" },
        ],
        "display-xl": [
          "clamp(2.25rem, 1.2rem + 5.2vw, 7rem)",
          { lineHeight: "0.92", letterSpacing: "-0.03em", fontWeight: "700" },
        ],
        "display-lg": [
          "clamp(1.85rem, 1.15rem + 3.2vw, 4.5rem)",
          { lineHeight: "0.96", letterSpacing: "-0.028em", fontWeight: "700" },
        ],
        "display-md": [
          "clamp(1.4rem, 1rem + 1.8vw, 2.75rem)",
          { lineHeight: "1.05", letterSpacing: "-0.022em", fontWeight: "600" },
        ],
        "display-sm": [
          "clamp(1.2rem, 1rem + 1vw, 1.75rem)",
          { lineHeight: "1.18", letterSpacing: "-0.018em", fontWeight: "600" },
        ],
        lead: ["var(--text-lead)", { lineHeight: "1.55", fontWeight: "400" }],
        caption: [
          "0.75rem",
          { lineHeight: "1.4", letterSpacing: "0.18em", fontWeight: "500" },
        ],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        header: "var(--header-height)",
        gutter: "var(--gutter)",
        section: "var(--section-y)",
      },
      maxWidth: {
        site: "var(--max-width-site)",
        narrow: "var(--max-width-narrow)",
        wide: "var(--max-width-wide)",
        prose: "68ch",
      },
      borderRadius: {
        pill: "9999px",
        card: "var(--radius-card)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        glow: "var(--shadow-glow-accent)",
      },
      transitionTimingFunction: {
        "out-expo": "var(--ease-out-expo)",
        "in-out-expo": "var(--ease-in-out-expo)",
        "out-quart": "var(--ease-out-quart)",
        spring: "var(--ease-spring)",
      },
      transitionDuration: {
        instant: "var(--duration-instant)",
        fast: "var(--duration-fast)",
        base: "var(--duration-base)",
        slow: "var(--duration-slow)",
        cinematic: "var(--duration-cinematic)",
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
        "1200": "1200ms",
      },
      zIndex: {
        grain: "2",
        header: "50",
        overlay: "60",
        cursor: "70",
        transition: "80",
        loader: "90",
      },
      backgroundImage: {
        "noise-fade": "linear-gradient(to bottom, transparent, var(--color-paper))",
        "radial-glow":
          "radial-gradient(ellipse at center, var(--color-accent-soft), transparent 65%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "coin-insert": {
          "0%": { transform: "translateY(-8px) scale(0.96)", opacity: "0" },
          "60%": { transform: "translateY(2px) scale(1.02)", opacity: "1" },
          "100%": { transform: "translateY(0) scale(1)", opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s var(--ease-out-expo) forwards",
        "fade-in": "fade-in 0.6s ease forwards",
        "scale-in": "scale-in 0.7s var(--ease-out-expo) forwards",
        marquee: "marquee 28s linear infinite",
        "marquee-fast": "marquee 16s linear infinite",
        "marquee-reverse": "marquee-reverse 28s linear infinite",
        "pulse-soft": "pulseSoft 2.4s ease-in-out infinite",
        "spin-slow": "spin-slow 12s linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "coin-insert": "coin-insert 0.55s var(--ease-out-expo) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
