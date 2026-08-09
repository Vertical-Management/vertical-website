"use client";

import NextLink from "next/link";
import { CoinButton } from "@/components/home/CoinButton";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Container } from "@/components/ui/Container";
import { Grain } from "@/components/ui/Grain";
import { Magnetic } from "@/components/ui/Magnetic";
import { SITE } from "@/lib/constants";

/**
 * Services closing CTA.
 */
export function ServicesCTA() {
  const { t } = useLanguage();
  const c = t.servicesPage.cta;

  return (
    <section
      className="relative overflow-hidden bg-surface-inverse py-section text-paper"
      data-theme="inverse"
    >
      <Grain strong />
      <Container className="relative z-[1]">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="font-mono text-caption uppercase tracking-label text-white/40">
              {c.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-display-lg text-paper">
              {c.titleLine1}
              <br />
              <span className="text-accent-lime">{c.titleAccent}</span>
            </h2>
            <p className="mt-6 max-w-md text-lead text-white/55">{c.body}</p>
          </div>
          <div className="flex flex-col items-start gap-4 lg:col-span-4 lg:items-end">
            <CoinButton href="/contacto" size="xl">
              {c.startProject}
            </CoinButton>
            <Magnetic strength={10}>
              <NextLink
                href="/proyectos"
                data-cursor="hover"
                className="inline-flex h-14 items-center rounded-pill border border-white/25 px-7 text-sm font-medium text-paper transition-colors duration-base hover:border-accent-lime hover:text-accent-lime"
              >
                {c.viewProjects}
              </NextLink>
            </Magnetic>
            <a
              href={`mailto:${SITE.email}`}
              className="font-mono text-caption uppercase tracking-label text-white/40 transition-colors hover:text-paper"
              data-cursor="hover"
            >
              {SITE.email}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
