import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Aviso legal",
  description: `Aviso legal de ${SITE.name}. Titular, condiciones de uso y propiedad intelectual.`,
  alternates: { canonical: "/aviso-legal" },
  openGraph: {
    title: `Aviso legal · ${SITE.name}`,
    description: SITE.pitch,
    url: "/aviso-legal",
  },
  robots: { index: true, follow: true },
};

export default function AvisoLegalPage() {
  return (
    <main id="main-content" className="relative pt-header">
      <LegalDocument kind="legalNotice" />
    </main>
  );
}
