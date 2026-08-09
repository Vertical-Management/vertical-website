"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SITE } from "@/lib/constants";
import { fill } from "@/lib/i18n";

/**
 * Privacy policy body — client for locale switching.
 */
export function PrivacyContent() {
  const { t } = useLanguage();
  const p = t.privacy;
  const vars = {
    name: SITE.name,
    location: SITE.location,
    email: SITE.email,
    url: SITE.url,
  };

  return (
    <Container className="max-w-narrow py-section">
      <Eyebrow className="mb-4">{p.eyebrow}</Eyebrow>
      <h1 className="font-display text-display-lg tracking-display">{p.title}</h1>
      <p className="mt-4 text-ink-soft">{fill(p.updated, vars)}</p>

      <div className="prose-vertical mt-12 space-y-10 text-base leading-relaxed text-ink-soft">
        {p.sections.map((section) => (
          <section key={section.title}>
            <h2 className="font-display text-display-sm text-ink">
              {section.title}
            </h2>
            <p className="mt-3">{fill(section.body, vars)}</p>
            {section.list ? (
              <ul className="mt-3 list-disc space-y-1 pl-5">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
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
          {p.backContact}
        </Link>
      </p>
    </Container>
  );
}
