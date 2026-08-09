"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SITE } from "@/lib/constants";
import { fill } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/types";

type LegalKey = "privacy" | "legalNotice" | "cookies";

type LegalDocumentProps = {
  kind: LegalKey;
};

/**
 * Shared legal page body — privacy / legal notice / cookies.
 */
export function LegalDocument({ kind }: LegalDocumentProps) {
  const { t } = useLanguage();
  const doc = t[kind] as Dictionary["privacy"];
  const vars = {
    name: SITE.name,
    location: SITE.location,
    email: SITE.email,
    url: SITE.url,
  };

  return (
    <Container className="max-w-narrow py-section">
      <Eyebrow className="mb-4">{doc.eyebrow}</Eyebrow>
      <h1 className="font-display text-display-lg tracking-display">
        {doc.title}
      </h1>
      <p className="mt-4 text-ink-soft">{fill(doc.updated, vars)}</p>

      <div className="prose-vertical mt-12 space-y-10 text-base leading-relaxed text-ink-soft">
        {doc.sections.map((section) => (
          <section key={section.title}>
            <h2 className="font-display text-display-sm text-ink">
              {section.title}
            </h2>
            <p className="mt-3">{fill(section.body, vars)}</p>
            {section.list ? (
              <ul className="mt-3 list-disc space-y-1 pl-5">
                {section.list.map((item) => (
                  <li key={item}>{fill(item, vars)}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>

      <p className="mt-16">
        <Link
          href="/contacto"
          className="font-mono text-caption uppercase tracking-label text-ink-muted transition-colors hover:text-accent"
        >
          {doc.backContact}
        </Link>
      </p>
    </Container>
  );
}
