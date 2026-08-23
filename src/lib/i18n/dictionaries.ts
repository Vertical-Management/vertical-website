import type { Locale } from "./locales";
import type { Dictionary } from "./types";
import es from "./locales/es";
import ca from "./locales/ca";
import en from "./locales/en";
import fr from "./locales/fr";

export type { Dictionary } from "./types";
export type { ServiceCopy, ProcessStepCopy, FaqItem, ProjectCopy } from "./types";

export const dictionaries: Record<Locale, Dictionary> = {
  es,
  ca,
  en,
  fr,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.es;
}

/** Nav href → dictionary key mapping (stable routes). */
export const NAV_I18N_KEYS = {
  "/": "home",
  "/nosotros": "about",
  "/servicios": "services",
  "/proyectos": "projects",
  "/contacto": "contact",
} as const satisfies Record<string, keyof Dictionary["nav"]>;

export type NavI18nKey = (typeof NAV_I18N_KEYS)[keyof typeof NAV_I18N_KEYS];

/** Simple `{token}` replacement for dictionary strings. */
export function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    vars[key] !== undefined ? String(vars[key]) : `{${key}}`,
  );
}
