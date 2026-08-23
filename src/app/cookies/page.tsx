import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Cookies",
  description: `Política de cookies de ${SITE.name}. Uso de almacenamiento técnico y geolocalización aproximada.`,
  alternates: { canonical: "/cookies" },
  openGraph: {
    title: `Cookies · ${SITE.name}`,
    description: SITE.pitch,
    url: "/cookies",
  },
  robots: { index: true, follow: true },
};

export default function CookiesPage() {
  return (
    <main id="main-content" className="relative pt-header">
      <LegalDocument kind="cookies" />
    </main>
  );
}
