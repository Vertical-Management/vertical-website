/** Site-wide constants — navigation, SEO, contact. */

/**
 * Canonical production origin — always apex, never www.
 * Env override must already be non-www; we strip a leading www if present.
 */
function resolveSiteUrl(): string {
  const raw =
    (typeof process !== "undefined" &&
      process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")) ||
    "https://somvertical.ad";
  try {
    const u = new URL(raw.includes("://") ? raw : `https://${raw}`);
    if (u.hostname.startsWith("www.")) {
      u.hostname = u.hostname.slice(4);
    }
    u.protocol = "https:";
    return u.origin;
  } catch {
    return "https://somvertical.ad";
  }
}

const siteUrl = resolveSiteUrl();

export const SITE = {
  name: "Vertical Management",
  shortName: "Vertical",
  founder: "Esteban Ferrer",
  /** Always https://somvertical.ad (no trailing slash, no www) */
  url: siteUrl,
  locale: "es_AD",
  email: "sales@somvertical.ad",
  location: "Andorra",
  tagline: "Editorial Digital Disruptivo + Playful High-Craft",
  /** Unified brand pitch — title, meta description, OG, on-page */
  pitch:
    "Branding, digital, motion, estrategia y software que convierten — desde Andorra.",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home", index: "01" },
  { href: "/nosotros", label: "Nosotros", index: "02" },
  { href: "/servicios", label: "Servicios", index: "03" },
  { href: "/proyectos", label: "Proyectos", index: "04" },
  { href: "/contacto", label: "Contacto", index: "05" },
] as const;

export const SOCIAL_LINKS = [
  {
    href: "https://www.instagram.com/somvertical/",
    label: "Instagram",
    handle: "@somvertical",
    blurb: "Loops, behind the scenes y caos controlado",
    external: true,
  },
  {
    href: "https://www.linkedin.com/company/vertical-management",
    label: "LinkedIn",
    handle: "Vertical Management",
    blurb: "Proyectos, equipo y updates de estudio",
    external: true,
  },
  {
    href: "mailto:sales@somvertical.ad",
    label: "Email",
    handle: "sales@somvertical.ad",
    blurb: "Línea directa. Respuesta humana.",
    external: true,
  },
] as const;
