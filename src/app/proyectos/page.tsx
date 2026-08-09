import type { Metadata } from "next";
import { ProyectosPageContent } from "@/components/proyectos/ProyectosPageContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, SEO } from "@/lib/seo";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Proyectos",
  description: `${SEO.description} Casos: FEP, Cafeteros, KOAJ, Pedigree.`,
  alternates: { canonical: "/proyectos" },
  openGraph: {
    title: `Proyectos · ${SITE.name}`,
    description: SEO.description,
    url: "/proyectos",
  },
  twitter: {
    card: "summary_large_image",
    title: `Proyectos · ${SITE.name}`,
    description: SEO.description,
  },
};

/**
 * Proyectos — mobile: clean list (default).
 * Desktop (md+): Vertical OS metaphor + SEO index.
 */
export default function ProyectosPage() {
  return (
    <main id="main-content" className="relative bg-paper-dim pt-header">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Proyectos", path: "/proyectos" },
        ])}
      />
      <ProyectosPageContent />
    </main>
  );
}
