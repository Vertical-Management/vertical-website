"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { SITE } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { Grain } from "@/components/ui/Grain";
import { Magnetic } from "@/components/ui/Magnetic";

/**
 * Closing strip for contact page.
 */
export function ContactCTA() {
  const { t } = useLanguage();
  const c = t.contactPage.cta;

  return (
    <section
      className="relative overflow-hidden border-t border-border bg-surface-inverse py-section text-paper"
      data-theme="inverse"
    >
      <Grain strong />
      <Container className="relative z-[1] text-center">
        <p className="font-mono text-caption uppercase tracking-label text-white/40">
          {c.eyebrow}
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-display-md text-paper">
          {c.title}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-white/55">{c.body}</p>
        <Magnetic strength={14}>
          <a
            href={`mailto:${SITE.email}?subject=${encodeURIComponent(c.emailSubject)}`}
            data-cursor="hover"
            className="mt-8 inline-flex h-14 items-center rounded-pill border-2 border-accent-lime bg-accent-lime px-8 font-mono text-xs uppercase tracking-[0.14em] text-ink shadow-[4px_4px_0_0_#f4f1ea] transition-[transform,box-shadow] duration-base hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0_0_#f4f1ea]"
          >
            {c.button}
          </a>
        </Magnetic>
      </Container>
    </section>
  );
}
