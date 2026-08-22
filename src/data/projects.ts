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
    projectType: "Motion campaign",
    year: 2026,
    role: "Director creativo",
    categories: ["Animation", "Motion", "Campaign"],
    excerpt:
      "Loops y animaciones para FEP2026: energía de festival en frames que no se scrollean de largo.",
    description:
      "Estéreo Picnic no es “un cartel con fechas”. Es un universo. El brief: dar movimiento a ese universo sin diluir la marca del festival.",
    caseStudy: {
      context:
        "Un festival de escala continental necesita assets que funcionen en pantallas gigantes, reels y backstage a la vez — con la misma energía y sin verse como stock de “música y luces”.",
      approach:
        "Tratamos cada loop como un single: paleta sincronizada, ritmo de artista y un gancho visual que se lee en 0,5 s. Menos “intro genérica”, más identidad en movimiento.",
      deliverables: [
        "Sistema de loops y bucleados de marca",
        "Piezas por artista / momento del festival",
        "Master 1080p + cutdowns para social",
        "Paleta y timing compartidos entre piezas",
      ],
      outcome:
        "Una pared de motion que se siente FEP al instante: más scroll-stop, más coherencia de campaña y un kit reutilizable para el equipo de marketing del festival.",
    },
    cover: "/assets/PAG ANIMATION FEP2026/FEP PORTADA-cover.webp",
    gallery: [
      "/assets/PAG ANIMATION FEP2026/loops/fep-portada.mp4",
      "/assets/PAG ANIMATION FEP2026/loops/before-create-proyect.mp4",
      "/assets/PAG ANIMATION FEP2026/loops/bucle-girl.mp4",
      "/assets/PAG ANIMATION FEP2026/loops/bucle-sabrina-carpenter.mp4",
      "/assets/PAG ANIMATION FEP2026/loops/bucle-estereo-picnic.mp4",
      "/assets/PAG ANIMATION FEP2026/loops/bucle-tyler-the-creator.mp4",
      "/assets/PAG ANIMATION FEP2026/loops/bucle-un-mundo-distinto.mp4",
    ],
    videoUrl: "/assets/PAG ANIMATION FEP2026/fep_2026-1080p.mp4",
    accentColor: "#A855F7",
    featured: true,
    desktopIcon: "/assets/xp/official/fep-media-player.png",
  },
  {
    slug: "cafeteros-co",
    title: "Cafeteros Co.",
    subtitle: "Branding integral",
    client: "Cafeteros Co.",
    projectType: "Brand system",
    year: 2025,
    role: "Brand Designer",
    categories: ["Branding", "Packaging"],
    excerpt:
      "Identidad y packaging para café colombiano con carácter de origen y lectura moderna.",
    description:
      "Café con pedigrí de origen que competía en un estante lleno de “bolsas marrones con hoja”. Había que oler a Colombia sin clichés de postal.",
    caseStudy: {
      context:
        "Marca emergente de café de especialidad: necesitaba sistema visual completo (no solo un logo) para empaque, punto de venta y digitales — con orgullo de origen y cero folklore barato.",
      approach:
        "Construimos un sistema táctil: tipografía con peso, color de tostado, iconografía de proceso y packaging que se lee a un metro de distancia. Tradición en el fondo, contemporáneo en la superficie.",
      deliverables: [
        "Identidad verbal y visual",
        "Sistema de packaging (líneas y variantes)",
        "Aplicaciones de marca y materiales de POS",
        "Kit de assets para web y social",
      ],
      outcome:
        "Una marca que se reconoce en estantería y en feed: más coherencia entre grano, bolsa y conversación. El sistema escala a nuevas líneas sin reinventar el molino cada vez.",
    },
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
      "/assets/PAG BRANDING CAFETEROS CO/PNG COFFE/100COFFE.webp",
      "/assets/PAG BRANDING CAFETEROS CO/PNG COFFE/2COFFE.webp",
      "/assets/PAG BRANDING CAFETEROS CO/PNG COFFE/COFFE BCP.webp",
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
    projectType: "3D fashion",
    year: 2025,
    role: "3D Artist",
    categories: ["3D", "Fashion", "Digital"],
    excerpt:
      "Renders y dirección 3D para retail fashion: producto claro, atmósfera premium.",
    description:
      "Retail fashion que quería verse digital-first sin perder la lectura de prenda. El reto: volumen y deseo en la misma toma.",
    caseStudy: {
      context:
        "Campaña y activos digitales para marca de moda: necesitaban piezas 3D que vendieran silueta y textura en pantallas, no solo un lookbook plano escaneado.",
      approach:
        "Dirección visual con foco en composición editorial: luz, material y pose. Cada render se comporta como un still de campaña — legible en grid, potente a pantalla completa.",
      deliverables: [
        "Serie de renders hero y product",
        "Exploración de materiales y look development",
        "Assets para e-commerce y campaña digital",
        "Variantes de formato (feed, story, display)",
      ],
      outcome:
        "Un set de imágenes con carácter de marca y lectura clara de producto. Más impacto en canal digital y un lenguaje 3D reutilizable para drops futuros.",
    },
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
      "/assets/PAG KOAJ 3D/FEP KOAJ1O.webp",
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
    projectType: "Product UX/UI",
    year: 2025,
    role: "UX/UI Designer",
    categories: ["UX/UI", "Product"],
    excerpt: "App University GB: onboarding, shell y tono de producto que mueve la cola.",
    description:
      "Producto digital para una marca que habla con humanos y con perros. El brief: útil, claro y con personalidad — sin infantilizar ni aburrir.",
    caseStudy: {
      context:
        "University GB necesitaba una experiencia de app que guiara al usuario (y a su perro) sin fricción: login, fuentes de contenido y un shell que se sienta de marca, no de template genérico.",
      approach:
        "UX limpia primero, carácter después. Flujos cortos, jerarquía tipográfica fuerte y un mascot system que refuerza el tono sin robarse la tarea. Cada pantalla tiene un “por qué estás aquí”.",
      deliverables: [
        "Flujos de onboarding y login",
        "App shell y navegación principal",
        "UI kits de pantallas clave",
        "Assets de mascota / carácter de producto",
      ],
      outcome:
        "Un producto más legible y con voz propia: menos pantallas “de relleno”, más claridad en la tarea y un sistema listo para iterar features sin romper el tono.",
    },
    cover: "/assets/PAG UX_UI PEDIGREE/UNIVERSITY GROW BOOK.webp",
    gallery: [
      "/assets/PAG UX_UI PEDIGREE/UNIVERSITY GROW BOOK.webp",
      "/assets/PAG UX_UI PEDIGREE/UNIVERSITY GB APP.webp",
      "/assets/PAG UX_UI PEDIGREE/UNIVERSITY GB APP2.webp",
      "/assets/PAG UX_UI PEDIGREE/UNIVERSITY GB APP3.webp",
      "/assets/PAG UX_UI PEDIGREE/UNIVERSITY GB APP4.webp",
      "/assets/PAG UX_UI PEDIGREE/UNIVERSITY GB APP 6.webp",
      "/assets/PAG UX_UI PEDIGREE/UNIVERSITY GB APP7.webp",
      "/assets/PAG UX_UI PEDIGREE/UNIVERSITY GB LOGIN.webp",
      "/assets/PAG UX_UI PEDIGREE/UNIVERSITY GB SOURCES.webp",
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

/** Adjacent projects for case-study nav (wraps around) */
export function getAdjacentProjects(slug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i < 0) return { prev: null, next: null };
  const prev = projects[(i - 1 + projects.length) % projects.length] ?? null;
  const next = projects[(i + 1) % projects.length] ?? null;
  // Same slug only if single project
  return {
    prev: prev?.slug === slug ? null : prev,
    next: next?.slug === slug ? null : next,
  };
}
