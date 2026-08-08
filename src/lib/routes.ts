/** Route labels for transition overlay + SEO helpers */

export const ROUTE_LABELS: Record<string, string> = {
  "/": "Home",
  "/servicios": "Servicios",
  "/proyectos": "Proyectos",
  "/contacto": "Contacto",
  "/privacidad": "Privacidad",
  "/design-system": "Design System",
  "/propuestas-hero": "Propuestas hero",
};

export function getRouteLabel(pathname: string): string {
  if (ROUTE_LABELS[pathname]) return ROUTE_LABELS[pathname];
  if (pathname.startsWith("/proyectos/")) return "Caso";
  return "Vertical";
}

export function isInternalHref(href: string): boolean {
  if (!href) return false;
  if (href.startsWith("#")) return false;
  if (href.startsWith("mailto:") || href.startsWith("tel:")) return false;
  if (href.startsWith("http://") || href.startsWith("https://")) {
    if (typeof window === "undefined") return false;
    try {
      const url = new URL(href);
      return url.origin === window.location.origin;
    } catch {
      return false;
    }
  }
  return href.startsWith("/");
}

export function normalizePath(href: string): string {
  try {
    if (href.startsWith("http")) {
      const url = new URL(href);
      return url.pathname || "/";
    }
  } catch {
    /* ignore */
  }
  const path = href.split("?")[0].split("#")[0];
  if (!path || path === "") return "/";
  return path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
}
