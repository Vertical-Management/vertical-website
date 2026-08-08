export {
  DEFAULT_HERO_VARIANT,
  HERO_INTRO,
  HERO_VARIANTS,
  type HeroVariantId,
} from "./constants";
export { HeroCopy } from "./HeroCopy";
export { HeroCinematic } from "./HeroCinematic";
export { HeroWallCarousel } from "./HeroWallCarousel";
export { ScrollCue } from "./ScrollCue";
export { HeroFeatured, HeroPoster, HeroSplit } from "./variants";

import type { HeroVariantId } from "./constants";
import { HeroCinematic } from "./HeroCinematic";
import { HeroFeatured, HeroPoster, HeroSplit } from "./variants";

const HERO_MAP = {
  cinematic: HeroCinematic,
  split: HeroSplit,
  featured: HeroFeatured,
  poster: HeroPoster,
} as const;

/** Resolve hero layout for home / internal review */
export function getHeroVariant(id: HeroVariantId) {
  return HERO_MAP[id] ?? HeroCinematic;
}
