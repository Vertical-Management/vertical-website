import type { Metadata } from "next";
import {
  HomeAbout,
  HomeCTA,
  HomeHero,
  HomeLogoCarousel,
  HomeManifesto,
  HomeMarquee,
} from "@/components/home";
import { Grain } from "@/components/ui/Grain";
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
 * Home — immersive narrative experience.
 * Critical path: Hero wall (budgeted media) + marquee + editorial sections.
 */
export default function HomePage() {
  return (
    <main id="main-content" className="relative">
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.03]"
        aria-hidden
      >
        <Grain className="opacity-100" />
      </div>

      <HomeHero />
      <HomeMarquee />
      <HomeManifesto />
      <HomeAbout />
      <HomeLogoCarousel />
      <HomeCTA />
    </main>
  );
}
