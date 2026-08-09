"use client";

import { useRef } from "react";
import NextLink from "next/link";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Container } from "@/components/ui/Container";
import { Grain } from "@/components/ui/Grain";
import { Magnetic } from "@/components/ui/Magnetic";
import { cn } from "@/lib/utils";

/**
 * Closing CTA — short manifesto line + single contact action.
 * No email button (footer owns contact channels).
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
        { yPercent: 60, opacity: 0.25 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.06,
          ease: "power3.out",
          duration: 0.8,
          scrollTrigger: {
            trigger: root.current,
            start: "top 75%",
            once: true,
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

        <div className="mt-8 flex justify-center sm:mt-10">
          <Magnetic strength={12}>
            <NextLink
              href="/contacto"
              data-cursor="hover"
              className={cn(
                "inline-flex h-14 min-h-12 w-full max-w-sm items-center justify-center rounded-pill border-2 border-ink bg-accent-lime px-8",
                "font-mono text-xs uppercase tracking-[0.14em] text-ink",
                "shadow-[4px_4px_0_0_var(--color-ink)]",
                "transition-[transform,box-shadow] duration-base ease-out-expo",
                "hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0_0_var(--color-ink)]",
                "sm:w-auto",
              )}
            >
              {c.startProject}
            </NextLink>
          </Magnetic>
        </div>
      </Container>
    </section>
  );
}
