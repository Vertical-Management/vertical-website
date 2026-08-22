import { describe, expect, it } from "vitest";
import {
  ROUTE_LABELS,
  getRouteLabel,
  isInternalHref,
  normalizePath,
} from "@/lib/routes";

describe("getRouteLabel", () => {
  it("devuelve la etiqueta exacta para rutas conocidas", () => {
    expect(getRouteLabel("/")).toBe("Home");
    expect(getRouteLabel("/servicios")).toBe("Servicios");
    expect(getRouteLabel("/proyectos")).toBe("Proyectos");
  });

  it("mapea detalles de proyecto a 'Caso'", () => {
    expect(getRouteLabel("/proyectos/fep-2026")).toBe("Caso");
  });

  it("usa fallback 'Vertical' para rutas desconocidas", () => {
    expect(getRouteLabel("/no-existe")).toBe("Vertical");
  });

  it("cubre todas las rutas del nav principal", () => {
    for (const route of ["/", "/nosotros", "/servicios", "/proyectos", "/contacto"]) {
      expect(ROUTE_LABELS[route]).toBeTruthy();
    }
  });
});

describe("isInternalHref", () => {
  it("acepta hrefs relativos de la app", () => {
    expect(isInternalHref("/")).toBe(true);
    expect(isInternalHref("/servicios")).toBe(true);
    expect(isInternalHref("/proyectos/fep-2026")).toBe(true);
  });

  it("rechaza anchors, mailto y tel", () => {
    expect(isInternalHref("#main-content")).toBe(false);
    expect(isInternalHref("mailto:sales@somvertical.ad")).toBe(false);
    expect(isInternalHref("tel:+376000000")).toBe(false);
    expect(isInternalHref("")).toBe(false);
  });

  // En node no hay window: los absolutos http(s) se consideran externos.
  it("rechaza absolutos http(s) fuera del navegador", () => {
    expect(isInternalHref("https://somvertical.ad/servicios")).toBe(false);
    expect(isInternalHref("http://evil.example")).toBe(false);
  });
});

describe("normalizePath", () => {
  it("quita trailing slash salvo en raíz", () => {
    expect(normalizePath("/about/")).toBe("/about");
    expect(normalizePath("/")).toBe("/");
  });

  it("extrae el pathname de URLs absolutas", () => {
    expect(normalizePath("https://somvertical.ad/proyectos?x=1#top")).toBe(
      "/proyectos",
    );
  });

  it("normaliza vacío a raíz y quita query/hash", () => {
    expect(normalizePath("")).toBe("/");
    expect(normalizePath("/contacto?ok=1#form")).toBe("/contacto");
  });
});
