export {
  LOCALES,
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  LOCALE_META,
  isLocale,
  type Locale,
  type LocaleMeta,
} from "./locales";

export {
  dictionaries,
  getDictionary,
  NAV_I18N_KEYS,
  fill,
  type Dictionary,
  type NavI18nKey,
  type ServiceCopy,
  type ProcessStepCopy,
  type FaqItem,
  type ProjectCopy,
} from "./dictionaries";

export type { Dictionary as DictionaryType } from "./types";

export {
  localizeServices,
  localizeProcessSteps,
  localizeProject,
  localizeProjects,
  localizeFeaturedProjects,
} from "./localized";
