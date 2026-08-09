"use client";

import { useRef } from "react";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { serviceBlockClasses } from "@/components/servicios/serviceTheme";
import type { ServiceTheme } from "@/types";
import { cn } from "@/lib/utils";

const RULE_THEMES: ServiceTheme[] = ["lime", "hot", "cool", "ink"];

/**
 * House rules — full-bleed color blocks (same family as Services).
 */
export function NosotrosRules() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { t } = useLanguage();
  const r = t.nosotrosPage.rules;

  useGSAP(
    () => {
      if (reduced || !root.current) return;
      registerGsap();

      root.current.querySelectorAll<HTMLElement>("[data-rule-block]").forEach(
        (block) => {
          const punch = block.querySelector<HTMLElement>("[data-punch]");
          const content = block.querySelector<HTMLElement>("[data-content]");

          if (punch) {
            gsap.fromTo(
              punch,
              { xPercent: -8, opacity: 0.35 },
              {
                xPercent: 4,
                opacity: 0.55,
                ease: "none",
                scrollTrigger: {
                  trigger: block,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              },
            );
          }

          if (content) {
            gsap.fromTo(
              content,
              { y: 36, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: block,
                  start: "top 78%",
                  toggleActions: "play none none reverse",
                },
              },
            );
          }
        },
      );
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section ref={root} aria-label={r.ariaLabel} className="relative">
      <div className="border-y-2 border-ink bg-paper px-gutter py-6">
        <p className="mx-auto max-w-site font-mono text-caption uppercase tracking-label text-ink-muted">
          02 — {r.eyebrow}
        </p>
      </div>

      {r.items.map((rule, i) => {
        const theme = serviceBlockClasses(RULE_THEMES[i % RULE_THEMES.length]);
        const flip = i % 2 === 1;

        return (
          <article
            key={rule.code}
            data-rule-block
            className={cn(
              "relative overflow-hidden border-b-2 border-ink",
              theme.block,
            )}
          >
            <p
              data-punch
              aria-hidden
              className={cn(
                "pointer-events-none absolute -right-4 top-1/2 select-none font-display text-[clamp(3.5rem,18vw,12rem)] font-extrabold leading-none tracking-display",
                theme.number,
                "-translate-y-1/2",
              )}
            >
              {rule.punch}
            </p>

            <div
              data-content
              className={cn(
                "relative z-[1] mx-auto grid max-w-site gap-6 px-gutter py-16 sm:py-20 md:grid-cols-12 md:gap-10 md:py-24",
                flip && "md:text-right",
              )}
            >
              <div
                className={cn(
                  "md:col-span-7",
                  flip && "md:col-start-6 md:text-right",
                )}
              >
                <p
                  className={cn(
                    "font-mono text-[0.65rem] uppercase tracking-label",
                    theme.muted,
                  )}
                >
                  {rule.code}
                </p>
                <h3 className="mt-3 font-display text-display-md tracking-display md:text-display-lg">
                  {rule.title}
                </h3>
                <p
                  className={cn(
                    "mt-5 max-w-xl text-lead",
                    theme.muted,
                    flip && "md:ml-auto",
                  )}
                >
                  {rule.body}
                </p>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
