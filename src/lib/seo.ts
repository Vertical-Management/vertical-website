import { SITE } from "@/lib/constants";
import { projects } from "@/data/projects";

export const SEO = {
  title: `${SITE.name} — ${SITE.founder}`,
  description:
    "Creatividad, branding, digital, motion y estrategia con craft y humor. Vertical Management · Andorra.",
  /** Static branded share card (SVG — wide platform support via absolute URL) */
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
    image: absoluteUrl(project.cover.replace(/ /g, "%20")),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
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
