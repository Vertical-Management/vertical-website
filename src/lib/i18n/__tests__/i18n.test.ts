import { describe, expect, it } from "vitest";
import {
  dictionaries,
  fill,
  getDictionary,
  localizeFeaturedProjects,
  localizeProcessSteps,
  localizeProject,
  localizeServices,
} from "@/lib/i18n";
import { LOCALES, isLocale } from "@/lib/i18n/locales";
import { projects } from "@/data/projects";
import { processSteps, services } from "@/data/services";
import type { Dictionary } from "@/lib/i18n/types";

/** Claves profundas de un diccionario (arrays cuentan como hojas). */
function deepKeys(value: unknown, prefix = ""): string[] {
  if (value === null || typeof value !== "object") return [prefix];
  return Object.entries(value as Record<string, unknown>).flatMap(([k, v]) =>
    deepKeys(v, prefix ? `${prefix}.${k}` : k),
  );
}

describe("diccionarios i18n", () => {
  it("existen los 4 locales soportados", () => {
    expect(Object.keys(dictionaries).sort()).toEqual([...LOCALES].sort());
    for (const locale of LOCALES) {
      expect(dictionaries[locale]).toBeTruthy();
    }
  });

  it("todos los locales tienen exactamente las mismas claves que es", () => {
    const reference = deepKeys(dictionaries.es);
    for (const locale of LOCALES) {
      const keys = deepKeys(dictionaries[locale]);
      expect(keys, `locale ${locale}`).toEqual(reference);
    }
  });

  it("los strings vacíos son consistentes en todos los locales", () => {
    // Hay claves vacías a propósito (segunda línea de CTA, tags opcionales…).
    // La invariante útil: si una clave está vacía, lo está en TODOS los locales.
    const keys = deepKeys(dictionaries.es);
    for (const key of keys) {
      const lengths = LOCALES.map((locale) => {
        const value = key
          .split(".")
          .reduce<unknown>(
            (acc, k) =>
              acc && typeof acc === "object"
                ? (acc as Record<string, unknown>)[k]
                : undefined,
            dictionaries[locale],
          );
        return typeof value === "string" ? value.trim().length : -1;
      });
      const allEmpty = lengths.every((len) => len === 0);
      const noneEmpty = lengths.every((len) => len !== 0);
      expect(
        allEmpty || noneEmpty,
        `clave ${key}: vacía solo en [${LOCALES.filter(
          (_, i) => lengths[i] === 0,
        ).join(", ")}]`,
      ).toBe(true);
    }
  });

  it("getDictionary devuelve el locale pedido", () => {
    expect(getDictionary("en")).toBe(dictionaries.en);
  });
});

describe("isLocale", () => {
  it("valida códigos de locale", () => {
    expect(isLocale("es")).toBe(true);
    expect(isLocale("fr")).toBe(true);
    expect(isLocale("xx")).toBe(false);
    expect(isLocale(null)).toBe(false);
  });
});

describe("fill", () => {
  it("sustituye tokens conocidos y deja los desconocidos", () => {
    expect(fill("Hola {name}, tienes {count} msgs", { name: "Ada", count: 3 })).toBe(
      "Hola Ada, tienes 3 msgs",
    );
    expect(fill("{missing} token", {})).toBe("{missing} token");
  });
});

describe("localize*", () => {
  it("localizeServices conserva el catálogo y aplica el copy del locale", () => {
    const t: Dictionary = getDictionary("ca");
    const localized = localizeServices(t);
    expect(localized.length).toBe(services.length);
    const withCopy = localized.filter((s) => t.serviceItems[s.id]);
    expect(withCopy.length).toBeGreaterThan(0);
    for (const service of withCopy) {
      const copy = t.serviceItems[service.id as keyof typeof t.serviceItems];
      expect(service.title).toBe(copy.title);
      expect(service.description).toBe(copy.description);
    }
  });

  it("localizeProcessSteps aplica títulos por índice", () => {
    const t: Dictionary = getDictionary("fr");
    const steps = localizeProcessSteps(t);
    expect(steps.length).toBe(processSteps.length);
    expect(steps[0].title).toBe(t.processSteps[0].title);
  });

  it("localizeProject fusiona el copy si existe para el slug", () => {
    const t: Dictionary = getDictionary("es");
    const project = projects.find((p) => t.projectItems[p.slug]);
    if (!project) throw new Error("no project copy fixture");
    const localized = localizeProject(project, t);
    const copy = t.projectItems[project.slug as keyof typeof t.projectItems];
    expect(localized.subtitle).toBe(copy.subtitle);
    expect(localized.caseStudy.outcome).toBe(copy.caseStudy.outcome);
    // campos estructurales intactos
    expect(localized.slug).toBe(project.slug);
    expect(localized.year).toBe(project.year);
  });

  it("localizeProject devuelve el original si no hay copy", () => {
    const t = getDictionary("es");
    const orphan = { ...projects[0], slug: "slug-sin-copy" };
    expect(localizeProject(orphan, t)).toEqual(orphan);
  });

  it("localizeFeaturedProjects solo incluye destacados", () => {
    const featured = localizeFeaturedProjects(getDictionary("es"));
    expect(featured.length).toBeGreaterThan(0);
    for (const project of featured) {
      expect(project.featured).toBe(true);
    }
  });
});
