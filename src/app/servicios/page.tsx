import type { Metadata } from "next";
import {
  CrtFrame,
  ServicesBlocks,
  ServicesCTA,
  ServicesHero,
  ServicesIdentity,
  ServicesProcess,
} from "@/components/servicios";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, SEO } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import "@/components/servicios/servicios-crt.css";

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
 * Servicios — CRT terminal session (this route only).
 */
export default function ServiciosPage() {
  return (
    <main id="main-content" data-nav-ground="paper" className="servicios-crt relative">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Servicios", path: "/servicios" },
        ])}
      />
      <CrtFrame>
        <ServicesHero />
        <ServicesIdentity />
        <ServicesBlocks />
        <ServicesProcess />
        <ServicesCTA />
      </CrtFrame>
    </main>
  );
}
