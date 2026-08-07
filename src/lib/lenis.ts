"use client";

import Lenis from "lenis";
import type { LenisOptions } from "lenis";

export type LenisInstance = Lenis;

export const defaultLenisOptions: LenisOptions = {
  duration: 1.15,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical",
  gestureOrientation: "vertical",
  smoothWheel: true,
  touchMultiplier: 1.4,
  infinite: false,
};

export function createLenis(options?: LenisOptions) {
  return new Lenis({ ...defaultLenisOptions, ...options });
}
