import type { Metadata } from "next";
import {
  ServicesBlocks,
  ServicesCTA,
  ServicesFAQ,
  ServicesHero,
  ServicesProcess,
} from "@/components/servicios";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Branding, digital, motion y estrategia creativa con craft y humor. Vertical Management — Andorra.",
  alternates: { canonical: "/servicios" },
  openGraph: {
    title: "Servicios · Vertical Management",
    description:
      "Identidad, web, motion y concepto. Bloques de color, tipografía brutal, ejecución de estudio.",
    url: "/servicios",
  },
};

/**
 * Servicios — brutalist color blocks elevated to high-craft.
 */
export default function ServiciosPage() {
  return (
    <main id="main-content" className="relative">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Servicios", path: "/servicios" },
        ])}
      />
      <ServicesHero />
      <ServicesBlocks />
      <ServicesProcess />
      <ServicesFAQ />
      <ServicesCTA />
    </main>
  );
}
