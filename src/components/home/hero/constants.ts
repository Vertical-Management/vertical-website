import { asset } from "@/lib/assets";

/** Primary NEW INTRO assets for home hero proposals */
export const HERO_INTRO = {
  src: asset("/assets/NEW INTRO/ARINSAL.png"),
  video: asset("/assets/NEW INTRO/FIRE-CAR.mp4"),
  alt: "Vertical — Fire Car intro",
  width: 1400,
  height: 1400,
} as const;

export const HERO_FLOATS = [
  {
    src: asset("/assets/PAG BRANDING CAFETEROS CO/CCDC1.webp"),
    alt: "Cafeteros Co.",
    className:
      "right-[4%] top-[18%] hidden w-[140px] rotate-6 md:block lg:w-[180px] xl:w-[200px]",
    delay: 0.45,
  },
  {
    src: asset("/assets/PAG KOAJ 3D/FEP KOAJ1.webp"),
    alt: "KOAJ 3D",
    className:
      "bottom-[18%] left-[3%] hidden w-[120px] -rotate-3 sm:block lg:w-[160px]",
    delay: 0.55,
  },
  {
    src: asset("/assets/PAG UX_UI PEDIGREE/UNIVERSITY GROW BOOK.webp"),
    alt: "UX Pedigree",
    className:
      "bottom-[22%] right-[12%] hidden w-[110px] rotate-[-8deg] lg:block xl:w-[140px]",
    delay: 0.65,
  },
] as const;

export type HeroVariantId = "cinematic" | "split" | "featured" | "poster";

export const HERO_VARIANTS: {
  id: HeroVariantId;
  name: string;
  tagline: string;
  recommended?: boolean;
}[] = [
  {
    id: "cinematic",
    name: "Cinemático full-bleed",
    tagline:
      "Muro de recursos 3 filas en scroll continuo a la izquierda + overlay editorial.",
    recommended: true,
  },
  {
    id: "split",
    name: "Split editorial",
    tagline: "Copy a la izquierda, ARINSAL en marco craft a la derecha.",
  },
  {
    id: "featured",
    name: "Float protagonista",
    tagline: "Hero actual, con ARINSAL como imagen principal flotante.",
  },
  {
    id: "poster",
    name: "Poster collagé",
    tagline: "Poster inclinado con stickers arcade y tipo superpuesto.",
  },
];

/** Default home hero after reviewing proposals */
export const DEFAULT_HERO_VARIANT: HeroVariantId = "cinematic";
