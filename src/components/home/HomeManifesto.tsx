"use client";

import { useRef } from "react";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/utils";

const LINES = [
  "No hacemos “webs bonitas”.",
  "Diseñamos sistemas con carácter,",
  "experiencias que se recuerdan",
  "y marcas que se atreven a ser.",
];

/**
 * Manifesto block — line-by-line scroll reveal (GSAP).
 */
export function HomeManifesto() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !root.current) return;
      registerGsap();

      const lines = root.current.querySelectorAll<HTMLElement>("[data-line]");
      lines.forEach((line) => {
        const inner = line.querySelector<HTMLElement>("[data-line-inner]");
        if (!inner) return;
        gsap.fromTo(
          inner,
          { yPercent: 110 },
          {
            yPercent: 0,
            ease: "power3.out",
            duration: 1,
            scrollTrigger: {
              trigger: line,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section ref={root} className="relative overflow-hidden py-section">
      <Container>
        <Eyebrow index="01" className="mb-8 md:mb-12">
          Manifiesto
        </Eyebrow>

        <div className="max-w-5xl">
          {LINES.map((text, i) => (
            <p
              key={text}
              data-line
              className={cn(
                "overflow-hidden font-display tracking-display text-ink",
                i === 0
                  ? "text-display-lg"
                  : "text-display-md text-ink-soft md:text-display-lg",
                i > 0 && "mt-1 md:mt-2",
              )}
            >
              <span data-line-inner className="block will-change-transform">
                {reduced ? text : text}
              </span>
            </p>
          ))}
        </div>

        <p className="mt-10 max-w-md text-base text-ink-muted md:mt-14 md:text-lg">
          Vertical Management es el estudio de Esteban Ferrer: concepto,
          ejecución y un poco de caos controlado — desde Andorra para el mundo.
        </p>
      </Container>
    </section>
  );
}
