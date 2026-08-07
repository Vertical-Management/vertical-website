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
});

export const fontBody = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

/** Apply all CSS variables on <html> */
export const fontVariables = [
  fontDisplay.variable,
  fontBody.variable,
  fontMono.variable,
].join(" ");
