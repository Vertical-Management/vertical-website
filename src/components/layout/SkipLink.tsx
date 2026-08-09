"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

/** Accessible skip link — locale-aware. */
export function SkipLink() {
  const { t } = useLanguage();
  return (
    <a href="#main-content" className="skip-link">
      {t.common.skipToContent}
    </a>
  );
}
