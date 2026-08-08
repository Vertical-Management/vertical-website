"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { asset } from "@/lib/assets";
import { SITE } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { Grain } from "@/components/ui/Grain";
import { cn } from "@/lib/utils";

const PRINCIPLES = [
  {
    index: "A",
    title: "Concepto primero",
    body: "Si no hay idea, no hay render que lo salve.",
  },
  {
    index: "B",
    title: "Craft obsesivo",
    body: "Cada detalle cuenta. Cada hover tiene intención.",
  },
  {
    index: "C",
    title: "Humor con propósito",
    body: "Irreverente sí. Gratuito nunca.",
  },
];

/**
 * About Esteban / Vertical — portrait + principles.
 */
export function HomeAbout() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !root.current) return;
      registerGsap();

      gsap.fromTo(
        "[data-about-img]",
        { yPercent: 12, scale: 1.08 },
        {
          yPercent: -8,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section ref={root} className="relative overflow-hidden py-section">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Portrait */}
          <Reveal className="relative lg:col-span-5" variant="scaleIn">
            <div className="relative aspect-[4/5] overflow-hidden rounded-card border border-border bg-paper-dim">
              <Grain />
              <Image
                data-about-img
                src={asset("/assets/FERRER.webp")}
                alt={SITE.founder}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority={false}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/80 to-transparent p-5">
                <p className="font-mono text-caption uppercase tracking-label text-accent-lime">
                  Founder
                </p>
                <p className="mt-1 font-display text-display-sm text-paper">
                  {SITE.founder}
                </p>
              </div>
            </div>
            {/* sticker */}
            <div
              className={cn(
                "absolute -right-3 top-8 rotate-6 rounded-pill border-2 border-ink bg-accent px-4 py-2",
                "font-mono text-[0.65rem] font-medium uppercase tracking-label text-paper shadow-[3px_3px_0_0_var(--color-ink)]",
                "md:-right-6",
              )}
            >
              Based in {SITE.location}
            </div>
          </Reveal>

          {/* Copy */}
          <div className="lg:col-span-7 lg:pl-8">
            <Eyebrow index="04" className="mb-4">
              Quién hay detrás
            </Eyebrow>
            <Heading as="h2" size="display-md" className="max-w-lg">
              Creativo de profesión.
              <br />
              <span className="text-ink-muted">Arcade de vocación.</span>
            </Heading>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-lg text-lead text-ink-soft">
                {SITE.name} es el vehículo de {SITE.founder} para construir
                identidades, productos y campañas que no se comportan como
                “contenido genérico”. Premium en la ejecución. Divertido en el
                alma.
              </p>
            </Reveal>

            <ul className="mt-10 grid gap-4 sm:grid-cols-3">
              {PRINCIPLES.map((p, i) => (
                <Reveal key={p.index} delay={0.1 + i * 0.08} as="li">
                  <article className="h-full rounded-card border border-border bg-surface p-5 transition-colors duration-base hover:border-ink/25 hover:bg-surface-elevated">
                    <span className="font-mono text-caption text-accent">
                      {p.index}
                    </span>
                    <h3 className="mt-2 font-display text-lg tracking-tight">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {p.body}
                    </p>
                  </article>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
