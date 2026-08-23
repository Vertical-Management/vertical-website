"use client";

import Lenis from "lenis";
import type { LenisOptions } from "lenis";

export type LenisInstance = Lenis;

export const defaultLenisOptions: LenisOptions = {
  // Snappy + short — less “sticky” lag when scrubbing slowly
  duration: 0.85,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical",
  gestureOrientation: "vertical",
  smoothWheel: true,
  touchMultiplier: 1.2,
  infinite: false,
  wheelMultiplier: 0.95,
};

export function createLenis(options?: LenisOptions) {
  return new Lenis({ ...defaultLenisOptions, ...options });
}

/** Prefer native scroll on touch / reduced-capability devices */
export function shouldEnableSmoothScroll(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }
  // Coarse pointer + no hover ≈ phone/tablet: native scroll is smoother with media walls
  if (window.matchMedia("(pointer: coarse)").matches) return false;
  if (window.matchMedia("(max-width: 1023px)").matches) return false;
  return true;
}
