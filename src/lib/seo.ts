import { SITE } from "@/lib/constants";
import { projects } from "@/data/projects";
import { asset } from "@/lib/assets";

/**
 * Unified brand pitch for title / description / Open Graph / Twitter.
 * Single source — never diverge between pages.
 */
export const BRAND_TAGLINE = SITE.pitch;

export const SEO = {
  /** Default document title (homepage absolute + layout default) */
  title: `${SITE.name} — ${BRAND_TAGLINE}`,
  /** Short title when template slots page name: "%s · Vertical" */
  titleShort: `${SITE.name} · ${SITE.founder}`,
  /** Meta description + og:description baseline */
  description: `${BRAND_TAGLINE} Branding, digital, motion y estrategia. ${SITE.name} · ${SITE.location}.`,
  /**
   * Fallback static card. App Router also serves `opengraph-image.tsx` (PNG)
   * which most social platforms prefer over SVG.
   */
  ogImage: "/og.svg",
  locale: "es_AD",
  twitterHandle: "@somvertical",
} as const;

export function absoluteUrl(path = "/"): string {
  const base = SITE.url.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: absoluteUrl("/assets/logo/VERTICAL-BLACK.png"),
    email: SITE.email,
    founder: {
      "@type": "Person",
      name: SITE.founder,
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "AD",
      addressLocality: SITE.location,
    },
    sameAs: [
      "https://www.instagram.com/somvertical/",
      "https://www.linkedin.com/company/vertical-management",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SEO.description,
    inLanguage: "es",
    publisher: {
      "@type": "Organization",
      name: SITE.name,
    },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.founder,
    jobTitle: "Creative Director",
    worksFor: {
      "@type": "Organization",
      name: SITE.name,
    },
    url: SITE.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.location,
      addressCountry: "AD",
    },
  };
}

export function projectJsonLd(slug: string) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) return null;
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.excerpt,
    dateCreated: String(project.year),
    creator: {
      "@type": "Organization",
      name: SITE.name,
    },
    url: absoluteUrl(`/proyectos/${project.slug}`),
    image: absoluteUrl(asset(project.cover)),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
