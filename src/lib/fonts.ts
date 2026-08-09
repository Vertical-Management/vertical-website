import { JetBrains_Mono, Manrope, Syne } from "next/font/google";

/**
 * Vertical type system
 * ────────────────────
 * Display → Syne: editorial impact, geometric tension
 * Body    → Manrope: readable, modern, neutral craft
 * Mono    → JetBrains Mono: indexes, labels, "system" voice
 */

export const fontDisplay = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800"],
  // Hero H1 — keep preload for LCP text paint
  preload: true,
});

export const fontBody = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  // Body copy — keep preload
  preload: true,
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
  // Labels / indexes — not LCP-critical; avoid third font preload race
  preload: false,
});

/** Apply all CSS variables on <html> */
export const fontVariables = [
  fontDisplay.variable,
  fontBody.variable,
  fontMono.variable,
].join(" ");
