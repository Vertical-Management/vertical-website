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

import type { HeroVariantId } from "./constants";
import { HeroCinematic } from "./HeroCinematic";

/**
 * Resolve hero layout. Alternate variants are required lazily so the home
 * critical path does not parse split/featured/poster modules.
 */
export function getHeroVariant(id: HeroVariantId) {
  if (id === "cinematic") return HeroCinematic;
  // Lazy graph for review-only layouts
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const alts = require("./variants") as typeof import("./variants");
  const map = {
    cinematic: HeroCinematic,
    split: alts.HeroSplit,
    featured: alts.HeroFeatured,
    poster: alts.HeroPoster,
  } as const;
  return map[id] ?? HeroCinematic;
}
