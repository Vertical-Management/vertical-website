import { Inter } from "next/font/google";

/**
 * Inter is exclusive to the home testimonials register (INV-16).
 * Do not apply this class on chrome or other routes.
 */
export const testimonialsInter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  preload: false,
});
