/**
 * Hero resource wall — 3 continuous rows scrolling left.
 *
 * Masters:   recursos/CLUB DE LAS 18 PIEZAS
 * Optimized: public/assets/CLUB DE LAS 18 PIEZAS/loops
 *   GIF/MP4 → H.264 (1080 max, 30fps, CRF 22) + WebP poster
 *   stills  → WebP q90
 *
 * Re-run: scripts/convert-club-18.ps1 (or re-execute conversion pipeline)
 */

export type CarouselTile = {
  src: string;
  alt: string;
  kind: "image" | "video";
  poster?: string;
};

export const CAROUSEL_ROWS = 3;
export const CAROUSEL_COLS = 6;

const LOOPS = "/assets/CLUB DE LAS 18 PIEZAS/loops";

function video(slug: string, alt: string): CarouselTile {
  return {
    src: `${LOOPS}/${slug}.mp4`,
    poster: `${LOOPS}/${slug}-poster.webp`,
    alt,
    kind: "video",
  };
}

function image(slug: string, alt: string): CarouselTile {
  return {
    src: `${LOOPS}/${slug}.webp`,
    alt,
    kind: "image",
  };
}

/** 18 club pieces — optimized web delivery (masters stay in recursos/) */
export const CLUB_18_PIECES: CarouselTile[] = [
  video("01-cat-process-1440p", "Cat process"),
  video("02ae65252620189-6a548f9bbf2fb", "Pieza 02"),
  video("075d56181476863-65243055847cb", "Pieza 03"),
  image("2ff233236563385-6a4d301a537e1", "Pieza 04"),
  image("586126160946807-63be777032442", "Pieza 05"),
  video("5a50c0241088457-694e300174dd3", "Pieza 06"),
  video("732f5d253067395-6a621e6115c91", "Pieza 07"),
  video("br", "BR"),
  video("80f5d5252623373-6a54af5d77ee0", "Pieza 09"),
  video("83ea9f114445403-603bc566c02c5", "Pieza 10"),
  video("83fa93239192721-6924716c43d63", "Pieza 11"),
  video("before-create-proyect", "Before create project"),
  video("bucle-sabrina-carpenter", "Bucle Sabrina Carpenter"),
  video("cd8543243579473-698b0e5d57a52", "Pieza 14"),
  video("e138a9127894877-614ca7a66e042", "Pieza 15"),
  video("f05f09242567723-696fc122ab5e1", "Pieza 16"),
  video("menu-1080p", "Menu 1080p"),
  video("process-tecnica-recycle-your-boots-compositing-1080p", "Recycle your boots"),
];

/** Three rows of 6 — full club of 18, all scroll left */
export function getCarouselRows(): CarouselTile[][] {
  const pieces = CLUB_18_PIECES;
  return [pieces.slice(0, 6), pieces.slice(6, 12), pieces.slice(12, 18)];
}
