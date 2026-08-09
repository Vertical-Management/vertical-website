/** Supported site locales. */

export const LOCALES = ["es", "ca", "en", "fr"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "es";

export const LOCALE_STORAGE_KEY = "vertical-locale";

export type LocaleMeta = {
  code: Locale;
  /** Native language name */
  label: string;
  /** Flag emoji */
  flag: string;
  /** BCP 47 / HTML lang */
  htmlLang: string;
  /** Accessible short name */
  shortLabel: string;
};

/**
 * Castellano → Spain, Català → Andorra, English → USA, Français → France
 * (flags chosen per product request).
 */
export const LOCALE_META: Record<Locale, LocaleMeta> = {
  es: {
    code: "es",
    label: "Castellano",
    flag: "🇪🇸",
    htmlLang: "es",
    shortLabel: "ES",
  },
  ca: {
    code: "ca",
    label: "Català",
    flag: "🇦🇩",
    htmlLang: "ca",
    shortLabel: "CA",
  },
  en: {
    code: "en",
    label: "English",
    flag: "🇺🇸",
    htmlLang: "en",
    shortLabel: "EN",
  },
  fr: {
    code: "fr",
    label: "Français",
    flag: "🇫🇷",
    htmlLang: "fr",
    shortLabel: "FR",
  },
};

export function isLocale(value: string | null | undefined): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}
