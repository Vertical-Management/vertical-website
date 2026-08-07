import type { Metadata } from "next";
import {
  ContactChannels,
  ContactCTA,
  ContactHero,
  ContactSection,
} from "@/components/contacto";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/lib/constants";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contacto",
  description: `Hablemos. ${SITE.name}, ${SITE.location}. Branding, digital, motion y estrategia. Insert coin.`,
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: "Contacto · Vertical Management",
    description:
      "Insert coin y cuéntanos el proyecto. Desde Andorra para el mundo.",
    url: "/contacto",
  },
};

/**
 * Contacto — landscape + neo-iOS device + high-craft form.
 */
export default function ContactoPage() {
  return (
    <main id="main-content" className="relative">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contacto", path: "/contacto" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contacto",
            url: `${SITE.url}/contacto`,
            mainEntity: {
              "@type": "Organization",
              name: SITE.name,
              email: SITE.email,
              address: {
                "@type": "PostalAddress",
                addressLocality: SITE.location,
                addressCountry: "AD",
              },
            },
          },
        ]}
      />
      <ContactHero />
      <ContactChannels />
      <ContactSection />
      <ContactCTA />
    </main>
  );
}
