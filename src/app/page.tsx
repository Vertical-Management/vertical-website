import type { Metadata } from "next";
import {
  HomeAbout,
  HomeCTA,
  HomeHero,
  HomeLogoCarousel,
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
 * Home — Club 18 wall, logo strip, manifesto, about, close.
 */
export default function HomePage() {
  return (
    <main id="main-content" className="relative">
      <HomeHero />
      <HomeLogoCarousel />
      <HomeManifesto />
      <HomeAbout />
      <HomeCTA />
    </main>
  );
}
