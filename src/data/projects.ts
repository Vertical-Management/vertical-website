import type { Project } from "@/types";

/**
 * Project catalogue — desktop + detail pages.
 * Paths map to existing assets under /public/assets.
 */
export const projects: Project[] = [
  {
    slug: "fep-2026",
    title: "FEP 2026",
    subtitle: "Motion graphics · Festival",
    client: "Estéreo Picnic",
    year: 2026,
    role: "Director creativo",
    categories: ["Animation", "Motion", "Campaign"],
    excerpt: "Identidad en movimiento y loops para la temporada del festival.",
    description:
      "Estéreo Picnic es un universo sonoro y visual. Este proyecto captura la magia del FEP a través del movimiento: bucles, paleta sincronizada y energía de artistas en frames que no se scrollean de largo.",
    cover: "/assets/PAG ANIMATION FEP2026/FEP PORTADA.gif",
    gallery: [
      "/assets/PAG ANIMATION FEP2026/FEP PORTADA.gif",
      "/assets/PAG ANIMATION FEP2026/BUCLE TYLER THE CREATOR.gif",
      "/assets/PAG ANIMATION FEP2026/BUCLE UN MUNDO DISTINTO.gif",
      "/assets/PAG ANIMATION FEP2026/BUCLE SABRINA CARPENTER.gif",
      "/assets/PAG ANIMATION FEP2026/BUCLE GIRL.gif",
      "/assets/PAG ANIMATION FEP2026/BEFORE CREATE PROYECT.gif",
      "/assets/PAG ANIMATION FEP2026/BUCLE ESTEREO PICNIC.gif",
    ],
    videoUrl: "/assets/PAG ANIMATION FEP2026/fep_2026 (1080p).mp4",
    accentColor: "#A855F7",
    featured: true,
    desktopIcon: "/assets/xp/official/fep-media-player.png",
  },
  {
    slug: "cafeteros-co",
    title: "Cafeteros Co.",
    subtitle: "Branding integral",
    client: "Cafeteros Co.",
    year: 2025,
    role: "Brand Designer",
    categories: ["Branding", "Packaging"],
    excerpt: "Sistema visual con aroma y carácter para café colombiano.",
    description:
      "Identidad que celebra la excelencia del café colombiano: tradición, calidad y diseño contemporáneo. Del grano al packaging, un sistema con olor a craft.",
    cover: "/assets/PAG BRANDING CAFETEROS CO/CCDC1.webp",
    gallery: [
      "/assets/PAG BRANDING CAFETEROS CO/CCDC1.webp",
      "/assets/PAG BRANDING CAFETEROS CO/CCDC2.webp",
      "/assets/PAG BRANDING CAFETEROS CO/CCDC3.webp",
      "/assets/PAG BRANDING CAFETEROS CO/CCDC4.webp",
      "/assets/PAG BRANDING CAFETEROS CO/CCDC5.webp",
      "/assets/PAG BRANDING CAFETEROS CO/CCDC6.webp",
      "/assets/PAG BRANDING CAFETEROS CO/PNG COFFE/CUP COFFE.webp",
      "/assets/PAG BRANDING CAFETEROS CO/PNG COFFE/GREEN COFFE.webp",
    ],
    accentColor: "#8B6F47",
    featured: true,
    desktopIcon: "/assets/xp/official/branding-cafeteros.png",
  },
  {
    slug: "koaj-3d",
    title: "KOAJ 3D",
    subtitle: "Dirección visual 3D",
    client: "KOAJ",
    year: 2025,
    role: "3D Artist",
    categories: ["3D", "Fashion", "Digital"],
    excerpt: "Exploración 3D para retail fashion de alto impacto.",
    description:
      "Moda contemporánea, volumen y composición editorial. Cada render proyecta carácter de marca con lectura clara de producto y atmósfera digital premium.",
    cover: "/assets/PAG KOAJ 3D/FEP KOAJ1.webp",
    gallery: [
      "/assets/PAG KOAJ 3D/FEP KOAJ1.webp",
      "/assets/PAG KOAJ 3D/FEP KOAJ2.webp",
      "/assets/PAG KOAJ 3D/FEP KOAJ3.webp",
      "/assets/PAG KOAJ 3D/FEP KOAJ4.webp",
      "/assets/PAG KOAJ 3D/FEP KOAJ5.webp",
      "/assets/PAG KOAJ 3D/FEP KOAJ6.webp",
      "/assets/PAG KOAJ 3D/FEP KOAJ7.webp",
      "/assets/PAG KOAJ 3D/FEP KOAJ8.webp",
      "/assets/PAG KOAJ 3D/FEP KOAJ9.webp",
      "/assets/PAG KOAJ 3D/FEP KOAJ11.webp",
      "/assets/PAG KOAJ 3D/FEP KOAJ13.webp",
    ],
    accentColor: "#0A0A0A",
    featured: true,
    desktopIcon: "/assets/xp/official/koaj-3d.png",
  },
  {
    slug: "ux-pedigree",
    title: "UX Pedigree",
    subtitle: "Product design · App",
    client: "Pedigree",
    year: 2025,
    role: "UX/UI Designer",
    categories: ["UX/UI", "Product"],
    excerpt: "Producto digital con cola que mueve la cola.",
    description:
      "Diseño de interfaz y experiencia para University GB: onboarding, app shell y un tono de producto que no aburre ni al perro ni al humano.",
    cover: "/assets/PAG UX_UI PEDIGREE/UNIVERSITY GROW BOOK.webp",
    gallery: [
      "/assets/PAG UX_UI PEDIGREE/UNIVERSITY GROW BOOK.webp",
      "/assets/PAG UX_UI PEDIGREE/UNIVERSITY GB APP.webp",
      "/assets/PAG UX_UI PEDIGREE/UNIVERSITY GB APP2.webp",
      "/assets/PAG UX_UI PEDIGREE/UNIVERSITY GB APP3.webp",
      "/assets/PAG UX_UI PEDIGREE/UNIVERSITY GB APP4.webp",
      "/assets/PAG UX_UI PEDIGREE/UNIVERSITY GB APP6.webp",
      "/assets/PAG UX_UI PEDIGREE/UNIVERSITY GB APP7.webp",
      "/assets/PAG UX_UI PEDIGREE/UNIVERSITY GB LOGIN.webp",
      "/assets/PAG UX_UI PEDIGREE/UNIVERTISY GB DOG.webp",
    ],
    accentColor: "#F5A623",
    featured: true,
    desktopIcon: "/assets/xp/official/ux-pedigree.png",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
