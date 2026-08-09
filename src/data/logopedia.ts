/** Partner / stack logos from recursos/LOGOPEDIA */

export type LogopediaItem = {
  src: string;
  alt: string;
  /** Optional width hint for layout (px at ~32–40px height) */
  width: number;
  height: number;
};

export const LOGOPEDIA: LogopediaItem[] = [
  {
    src: "/assets/logopedia/Cinema_4D_Logo_2026.svg",
    alt: "Cinema 4D",
    width: 120,
    height: 40,
  },
  {
    src: "/assets/logopedia/Cloudflare_Logo.svg.webp",
    alt: "Cloudflare",
    width: 140,
    height: 40,
  },
  {
    src: "/assets/logopedia/GITHUB.png",
    alt: "GitHub",
    width: 100,
    height: 40,
  },
  {
    src: "/assets/logopedia/GPartner.png",
    alt: "Google Partner",
    width: 120,
    height: 40,
  },
  {
    src: "/assets/logopedia/Logo_Blender.svg.webp",
    alt: "Blender",
    width: 120,
    height: 40,
  },
  {
    src: "/assets/logopedia/media_13aa07ce4ca638ad6cfe7604a1937888ccdf3a700.jpg",
    alt: "Partner",
    width: 100,
    height: 40,
  },
  {
    src: "/assets/logopedia/Meta-Business-Partner-Badge-Webtopia.png",
    alt: "Meta Business Partner",
    width: 140,
    height: 40,
  },
] as const;
