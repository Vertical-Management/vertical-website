import type { Metadata } from "next";
import {
  ServicesBlocks,
  ServicesCTA,
  ServicesFAQ,
  ServicesHero,
  ServicesProcess,
} from "@/components/servicios";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, SEO } from "@/lib/seo";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Servicios",
  description: `${SEO.description} Identidad, web, motion y concepto.`,
  alternates: { canonical: "/servicios" },
  openGraph: {
    title: `Servicios · ${SITE.name}`,
    description: SEO.description,
    url: "/servicios",
  },
  twitter: {
    card: "summary_large_image",
    title: `Servicios · ${SITE.name}`,
    description: SEO.description,
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
