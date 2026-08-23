import type { ProcessStep, Service } from "@/types";

/** Services catalogue — brutalist blocks elevated to high-craft. */
export const services: Service[] = [
  {
    id: "branding",
    index: "01",
    title: "Branding",
    punch: "IDENTIDAD",
    theme: "lime",
    description:
      "Identidades con carácter. Sistemas visuales que no piden perdón y se recuerdan.",
    longDescription:
      "Construimos marcas que se sienten vivas: naming, voz, sistemas visuales y guidelines que aguantan el ritmo real del negocio — no un PDF que nadie abre.",
    tags: ["Identidad", "Naming", "Guidelines", "Art Direction"],
    deliverables: [
      "Estrategia de marca",
      "Naming & verbal identity",
      "Sistema visual",
      "Brand guidelines",
      "Applications & rollout",
    ],
  },
  {
    id: "digital",
    index: "02",
    title: "Digital & Web",
    punch: "EXPERIENCIA",
    theme: "cool",
    description: "Sitios y productos con nivel de Awwwards y personalidad de arcade.",
    longDescription:
      "Webs y productos digitales con tipografía de impacto, micro-interacciones intencionadas y performance real. Premium en la ejecución, divertido en el alma.",
    tags: ["Web", "UI", "UX", "Experiencias"],
    deliverables: [
      "Design systems",
      "Websites & landing",
      "Product UI/UX",
      "Prototipos de alta fidelidad",
      "Handoff & dev partner",
    ],
  },
  {
    id: "motion",
    index: "03",
    title: "Motion & 3D",
    punch: "MOVIMIENTO",
    theme: "hot",
    description:
      "Loops, campañas y renders que se sienten vivos. Pixel y polígono con intención.",
    longDescription:
      "Animación, loops y 3D para campañas que no se scrollean de largo. Ritmo, textura y un punto de irreverencia cuando suma.",
    tags: ["Motion", "3D", "Campaign", "Loops"],
    deliverables: [
      "Motion systems",
      "Campaign films & loops",
      "3D product & fashion",
      "Social cutdowns",
      "Launch assets",
    ],
  },
  {
    id: "strategy",
    index: "04",
    title: "Estrategia creativa",
    punch: "CONCEPTO",
    theme: "ink",
    description: "Concepto primero. Luego ejecución. Humor incluido cuando suma.",
    longDescription:
      "Antes del pixel: el ángulo. Posicionamiento, campañas y narrativas que dan dirección al equipo y claridad al cliente.",
    tags: ["Concepto", "Campaign", "Consultoría", "Narrativa"],
    deliverables: [
      "Creative platforms",
      "Campaign concepts",
      "Tone of voice",
      "Workshops",
      "Ongoing creative direction",
    ],
  },
];

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Brief & caos útil",
    description:
      "Escuchamos, preguntamos lo incómodo y aterrizamos el problema real — no el briefing de PowerPoint.",
  },
  {
    index: "02",
    title: "Concepto",
    description:
      "Ideas con filo. Probamos direcciones hasta que una se siente inevitable.",
  },
  {
    index: "03",
    title: "Ejecución",
    description:
      "Diseño, motion y sistemas con obsesión por el detalle. Cada hover tiene intención.",
  },
  {
    index: "04",
    title: "Launch & iterate",
    description:
      "Salimos al mundo, medimos lo que importa y afinamos. Volvemos a la máquina si hace falta.",
  },
];

export function getServiceById(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}
