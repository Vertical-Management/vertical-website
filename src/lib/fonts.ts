import localFont from "next/font/local";

/**
 * Vertical type system
 * ────────────────────
 * Display → Syne: editorial impact, geometric tension
 * Body    → Manrope: readable, modern, neutral craft
 * Mono    → JetBrains Mono: indexes, labels, "system" voice
 */

export const fontDisplay = localFont({
  src: "../assets/fonts/syne-latin.woff2",
  variable: "--font-display",
  display: "swap",
  weight: "500 800",
  // Hero H1 — keep preload for LCP text paint
  preload: true,
});

export const fontBody = localFont({
  src: "../assets/fonts/manrope-latin.woff2",
  variable: "--font-body",
  display: "swap",
  weight: "400 700",
  // Body copy — keep preload
  preload: true,
});

export const fontMono = localFont({
  src: "../assets/fonts/jetbrains-mono-latin.woff2",
  variable: "--font-mono",
  display: "swap",
  weight: "400 600",
  // Labels / indexes — not LCP-critical; avoid third font preload race
  preload: false,
});

/** Apply all CSS variables on <html> */
export const fontVariables = [
  fontDisplay.variable,
  fontBody.variable,
  fontMono.variable,
].join(" ");
