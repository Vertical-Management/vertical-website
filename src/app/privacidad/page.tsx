import type { Metadata } from "next";
import { PrivacyContent } from "@/components/legal/PrivacyContent";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacidad",
  description: `Política de privacidad de ${SITE.name}. Cómo tratamos tus datos cuando nos escribes.`,
  alternates: { canonical: "/privacidad" },
  openGraph: {
    title: `Privacidad · ${SITE.name}`,
    description: SITE.pitch,
    url: "/privacidad",
  },
  robots: { index: true, follow: true },
};

/**
 * Privacy policy — contact form data (Andorra / EU-friendly baseline).
 */
export default function PrivacidadPage() {
  return (
    <main id="main-content" className="relative pt-header">
      <PrivacyContent />
    </main>
  );
}
