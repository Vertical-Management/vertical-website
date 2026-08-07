/** Site-wide constants — navigation, SEO, contact. */

const siteUrl =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")) ||
  "https://somvertical.ad";

export const SITE = {
  name: "Vertical Management",
  shortName: "Vertical",
  founder: "Esteban Ferrer",
  url: siteUrl,
  locale: "es_AD",
  email: "hola@somvertical.ad",
  location: "Andorra",
  tagline: "Editorial Digital Disruptivo + Playful High-Craft",
  pitch: "Creamos marcas que van más lejos, más raro y con más craft.",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home", index: "01" },
  { href: "/servicios", label: "Servicios", index: "02" },
  { href: "/proyectos", label: "Proyectos", index: "03" },
  { href: "/contacto", label: "Contacto", index: "04" },
] as const;

export const SOCIAL_LINKS = [
  {
    href: "https://www.instagram.com/somvertical/",
    label: "Instagram",
    handle: "@somvertical",
    blurb: "Loops, behind the craft y caos controlado",
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
    href: "mailto:hola@somvertical.ad",
    label: "Email",
    handle: "hola@somvertical.ad",
    blurb: "La línea directa. Insert coin aquí",
    external: true,
  },
] as const;
