import type { Metadata } from "next";
import { ReviewClient } from "./ReviewClient";

export const metadata: Metadata = {
  title: "Propuestas hero · ARINSAL",
  robots: { index: false, follow: false },
};

/**
 * Internal review of home hero treatments using ARINSAL.
 * Renders one variant at a time so the page stays visible and responsive.
 */
export default function PropuestasHeroPage({
  searchParams,
}: {
  searchParams?: { v?: string };
}) {
  return (
    <main id="main-content" className="relative min-h-dvh bg-paper">
      <ReviewClient initialVariant={searchParams?.v} />
    </main>
  );
}
