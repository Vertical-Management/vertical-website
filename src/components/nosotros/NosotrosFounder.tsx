"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { asset } from "@/lib/assets";
import { SITE } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { Grain } from "@/components/ui/Grain";
import { cn } from "@/lib/utils";

/**
 * Founder profile card — portrait + long-form narrative + stats.
 */
export function NosotrosFounder() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { t } = useLanguage();
  const f = t.nosotrosPage.founder;

  useGSAP(
    () => {
      if (reduced || !root.current) return;
      registerGsap();

      gsap.fromTo(
        "[data-founder-img]",
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
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="relative lg:col-span-5" variant="scaleIn">
            <div className="relative aspect-[4/5] overflow-hidden rounded-card border border-border bg-paper-dim">
              <Grain />
              <Image
                data-founder-img
                src={asset("/assets/FERRER.webp")}
                alt={SITE.founder}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/80 to-transparent p-5">
                <p className="font-mono text-caption uppercase tracking-label text-accent-lime">
                  {f.role}
                </p>
                <p className="mt-1 font-display text-display-sm text-paper">
                  {SITE.founder}
                </p>
              </div>
            </div>
            <div
              className={cn(
                "absolute -right-3 top-8 rotate-6 rounded-pill border-2 border-ink bg-accent px-4 py-2",
                "font-mono text-[0.65rem] font-medium uppercase tracking-label text-paper shadow-[3px_3px_0_0_var(--color-ink)]",
                "md:-right-6",
              )}
            >
              {f.basedIn} {SITE.location}
            </div>
          </Reveal>

          <div className="lg:col-span-7 lg:pl-8">
            <Eyebrow index="03" className="mb-4">
              {f.eyebrow}
            </Eyebrow>
            <Heading as="h2" size="display-md" className="max-w-lg">
              {f.titleLine1}
              <br />
              <span className="text-ink-muted">{f.titleLine2}</span>
            </Heading>

            <div className="mt-8 space-y-4 max-w-lg">
              {f.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.08 + i * 0.06}>
                  <p className="text-base leading-relaxed text-ink-soft md:text-lg">
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>

            <ul className="mt-10 grid gap-3 sm:grid-cols-3">
              {f.stats.map((stat, i) => (
                <Reveal key={stat.label} delay={0.2 + i * 0.06} as="li">
                  <article className="h-full rounded-card border border-border bg-surface p-4 transition-colors duration-base hover:border-ink/25 hover:bg-surface-elevated">
                    <span className="font-mono text-[0.6rem] uppercase tracking-label text-ink-muted">
                      {stat.label}
                    </span>
                    <p className="mt-1.5 font-display text-base tracking-tight text-ink">
                      {stat.value}
                    </p>
                  </article>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.35}>
              <blockquote className="mt-10 border-l-2 border-accent pl-5">
                <p className="font-display text-display-sm tracking-tight text-ink md:text-display-md">
                  “{f.quote}”
                </p>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
