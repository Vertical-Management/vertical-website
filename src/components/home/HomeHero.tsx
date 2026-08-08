"use client";

import dynamic from "next/dynamic";
import type { HeroVariantId } from "@/components/home/hero";
import { HeroCinematic } from "@/components/home/hero/HeroCinematic";

const AltHero = dynamic(
  () =>
    import("@/components/home/hero/AltHero").then((m) => m.AltHero),
  { ssr: false },
);

type HomeHeroProps = {
  /** Override layout — used by /propuestas-hero only */
  variant?: HeroVariantId;
  preview?: boolean;
};

/**
 * Production home hero: cinematic wall only.
 * Alternate variants lazy-load for internal review.
 */
export function HomeHero({
  variant = "cinematic",
  preview = false,
}: HomeHeroProps = {}) {
  if (variant === "cinematic") {
    return <HeroCinematic preview={preview} />;
  }

  return <AltHero variant={variant} preview={preview} />;
}
