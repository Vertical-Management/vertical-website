"use client";

import { useRef } from "react";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SITE } from "@/lib/constants";
import { CoinButton } from "@/components/home/CoinButton";
import { Container } from "@/components/ui/Container";
import { Grain } from "@/components/ui/Grain";
import { Magnetic } from "@/components/ui/Magnetic";
import NextLink from "next/link";

/**
 * Closing CTA — cinematic, playful, unmissable.
 */
export function HomeCTA() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { t, locale } = useLanguage();
  const c = t.home.cta;

  useGSAP(
    () => {
      if (reduced || !root.current) return;
      registerGsap();

      gsap.fromTo(
        "[data-cta-word]",
        { yPercent: 80, opacity: 0.2 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.08,
          ease: "power3.out",
          duration: 1,
          scrollTrigger: {
            trigger: root.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );
    },
    { scope: root, dependencies: [reduced, locale] },
  );

  return (
    <section
      ref={root}
      className="relative overflow-hidden border-t border-border bg-paper-warm py-section"
    >
      <Grain />
      <Container className="relative z-[1] text-center">
        <p className="font-mono text-caption uppercase tracking-label text-ink-muted">
          {c.eyebrow}
        </p>

        <h2 className="mx-auto mt-6 max-w-4xl font-display text-display-xl text-ink">
          {c.words.map((word, i) => (
            <span
              key={`${locale}-${i}-${word}`}
              data-cta-word
              className={
                i >= c.accentFrom
                  ? "inline-block text-accent"
                  : "inline-block"
              }
            >
              {word}
              {i < c.words.length - 1 ? "\u00a0" : ""}
            </span>
          ))}
        </h2>

        <p className="mx-auto mt-6 max-w-md text-lead text-ink-soft">{c.body}</p>

        <div className="mt-8 flex w-full max-w-md flex-col items-stretch justify-center gap-3 px-1 sm:mt-10 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <CoinButton
            href="/contacto"
            size="xl"
            className="w-full justify-center sm:w-auto"
          >
            {c.startProject}
          </CoinButton>
          <Magnetic strength={12}>
            <NextLink
              href={`mailto:${SITE.email}`}
              data-cursor="hover"
              className="inline-flex h-14 min-h-12 w-full items-center justify-center rounded-pill border border-border-strong px-6 text-sm font-medium transition-colors duration-base hover:border-ink hover:bg-ink hover:text-paper sm:h-16 sm:w-auto sm:px-8 sm:text-base"
            >
              {SITE.email}
            </NextLink>
          </Magnetic>
        </div>
      </Container>
    </section>
  );
}
