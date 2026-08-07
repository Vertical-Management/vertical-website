"use client";

import { useRef } from "react";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
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
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section
      ref={root}
      className="relative overflow-hidden border-t border-border bg-paper-warm py-section"
    >
      <Grain />
      <Container className="relative z-[1] text-center">
        <p className="font-mono text-caption uppercase tracking-label text-ink-muted">
          Game over? No. Press start.
        </p>

        <h2 className="mx-auto mt-6 max-w-4xl font-display text-display-xl text-ink">
          <span data-cta-word className="inline-block">
            ¿Listo&nbsp;
          </span>
          <span data-cta-word className="inline-block">
            para&nbsp;
          </span>
          <span data-cta-word className="inline-block text-accent">
            insertar&nbsp;
          </span>
          <span data-cta-word className="inline-block text-accent">
            coin?
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-md text-lead text-ink-soft">
          Cuéntanos el proyecto. Si hay buena idea (o ganas de encontrarla),
          jugamos. {SITE.location} y remoto.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <CoinButton href="/contacto" size="xl">
            Insert coin
          </CoinButton>
          <Magnetic strength={12}>
            <NextLink
              href={`mailto:${SITE.email}`}
              data-cursor="hover"
              className="inline-flex h-16 items-center rounded-pill border border-border-strong px-8 font-medium transition-colors duration-base hover:border-ink hover:bg-ink hover:text-paper"
            >
              {SITE.email}
            </NextLink>
          </Magnetic>
        </div>
      </Container>
    </section>
  );
}
