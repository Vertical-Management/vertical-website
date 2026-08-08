import type { Metadata } from "next";
import {
  HomeAbout,
  HomeCTA,
  HomeHero,
  HomeManifesto,
  HomeMarquee,
  HomeServices,
  HomeWork,
} from "@/components/home";
import { Grain } from "@/components/ui/Grain";
import { SEO } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: SEO.title,
  },
  description:
    "Creamos marcas que van más lejos. Branding, digital, motion y estrategia con craft y humor. Andorra.",
  alternates: { canonical: "/" },
  openGraph: {
    title: SEO.title,
    description:
      "Creamos marcas que van más lejos. Branding, digital, motion y estrategia con craft y humor.",
    url: "/",
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
      <HomeWork />
      <HomeServices />
      <HomeAbout />
      <HomeCTA />
    </main>
  );
}
