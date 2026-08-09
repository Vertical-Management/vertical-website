import type { Metadata } from "next";
import {
  HomeAbout,
  HomeCTA,
  HomeHero,
  HomeManifesto,
} from "@/components/home";
import { SEO } from "@/lib/seo";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    absolute: SEO.title,
  },
  description: SEO.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: SEO.title,
    description: SEO.description,
    url: "/",
    siteName: SITE.name,
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.title,
    description: SEO.description,
  },
};

/**
 * Home — lean narrative (INV-15): hero → manifiesto → quién hay detrás → cierre.
 * No full-page fixed grain (paint cost on scroll); grain lives in sections.
 */
export default function HomePage() {
  return (
    <main id="main-content" className="relative">
      <HomeHero />
      <HomeManifesto />
      <HomeAbout />
      <HomeCTA />
    </main>
  );
}
