"use client";

import { useRef } from "react";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/utils";

/**
 * Manifesto block — line-by-line scroll reveal (GSAP).
 * Play once (no reverse) to avoid sticky jank on slow scroll.
 */
export function HomeManifesto() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { t, locale } = useLanguage();
  const m = t.home.manifesto;

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
            duration: 0.85,
            scrollTrigger: {
              trigger: line,
              start: "top 90%",
              once: true,
            },
          },
        );
      });
    },
    { scope: root, dependencies: [reduced, locale] },
  );

  return (
    <section ref={root} className="relative overflow-hidden py-section">
      <Container>
        <Eyebrow index="01" className="mb-6 sm:mb-8 md:mb-12">
          {m.eyebrow}
        </Eyebrow>

        <div className="max-w-5xl">
          {m.lines.map((text, i) => (
            <p
              key={`${locale}-${i}-${text}`}
              data-line
              className={cn(
                "tracking-display overflow-hidden text-balance font-display text-ink",
                i === 0
                  ? "text-display-lg"
                  : "text-display-md text-ink-soft md:text-display-lg",
                i > 0 && "mt-1.5 md:mt-2",
              )}
            >
              <span
                data-line-inner
                className="block"
                style={{ willChange: reduced ? undefined : "transform" }}
              >
                {text}
              </span>
            </p>
          ))}
        </div>

        <p className="mt-8 max-w-md text-base leading-relaxed text-ink-muted sm:mt-10 md:mt-14 md:text-lg">
          {m.body}
        </p>
      </Container>
    </section>
  );
}
