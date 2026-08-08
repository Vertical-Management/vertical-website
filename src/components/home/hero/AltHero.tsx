"use client";

import type { HeroVariantId } from "./constants";
import { HeroCinematic } from "./HeroCinematic";
import { HeroFeatured, HeroPoster, HeroSplit } from "./variants";

const MAP = {
  cinematic: HeroCinematic,
  split: HeroSplit,
  featured: HeroFeatured,
  poster: HeroPoster,
} as const;

/**
 * Non-cinematic hero layouts — dynamic-imported only by /propuestas-hero.
 */
export function AltHero({
  variant,
  preview,
}: {
  variant: HeroVariantId;
  preview?: boolean;
}) {
  const Variant = MAP[variant] ?? HeroCinematic;
  return <Variant preview={preview} />;
}
