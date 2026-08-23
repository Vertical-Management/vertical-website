import type { Metadata } from "next";
import {
  NosotrosCTA,
  NosotrosFounder,
  NosotrosHero,
  NosotrosRules,
  NosotrosTimeline,
} from "@/components/nosotros";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/lib/constants";
import { breadcrumbJsonLd, SEO } from "@/lib/seo";
import "@/components/nosotros/nosotros-ds.css";

export const metadata: Metadata = {
  title: "Nosotros",
  description: `${SEO.description} Historia, reglas de casa y el jugador detrás de Vertical.`,
  alternates: { canonical: "/nosotros" },
  openGraph: {
    title: `Nosotros · ${SITE.name}`,
    description: SEO.description,
    url: "/nosotros",
  },
  twitter: {
    card: "summary_large_image",
    title: `Nosotros · ${SITE.name}`,
    description: SEO.description,
  },
};

/**
 * Nosotros — Player One origin story.
 */
export default function NosotrosPage() {
  return (
    <main id="main-content" data-nav-ground="paper" className="nosotros-page relative">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Nosotros", path: "/nosotros" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: `Nosotros · ${SITE.name}`,
            url: `${SITE.url}/nosotros`,
            mainEntity: {
              "@type": "Organization",
              name: SITE.name,
              url: SITE.url,
              email: SITE.email,
              founder: {
                "@type": "Person",
                name: SITE.founder,
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: SITE.location,
                addressCountry: "AD",
              },
            },
          },
        ]}
      />
      <div className="n-frame">
        <NosotrosHero />
        <NosotrosTimeline />
        <NosotrosRules />
        <NosotrosFounder />
        <NosotrosCTA />
      </div>
    </main>
  );
}
