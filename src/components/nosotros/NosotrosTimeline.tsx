"use client";

import { useRef } from "react";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * Vertical origin story — save points along a climbing timeline.
 */
export function NosotrosTimeline() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { t, locale } = useLanguage();
  const tl = t.nosotrosPage.timeline;

  useGSAP(
    () => {
      if (reduced || !root.current) return;
      registerGsap();

      root.current
        .querySelectorAll<HTMLElement>("[data-save]")
        .forEach((node, i) => {
          gsap.fromTo(
            node,
            { y: 28, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              ease: "power3.out",
              delay: i * 0.02,
              scrollTrigger: {
                trigger: node,
                start: "top 86%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });

      const line = root.current.querySelector<HTMLElement>("[data-timeline-line]");
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root.current.querySelector("[data-saves]"),
              start: "top 75%",
              end: "bottom 30%",
              scrub: true,
            },
          },
        );
      }
    },
    { scope: root, dependencies: [reduced, locale] },
  );

  return (
    <section ref={root} className="relative overflow-hidden py-section">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow index="01" className="mb-4">
            {tl.eyebrow}
          </Eyebrow>
          <Heading as="h2" size="display-md">
            {tl.titleLine1}
            <br />
            <span className="text-ink-muted">{tl.titleLine2}</span>
          </Heading>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-lg text-lead text-ink-soft">{tl.body}</p>
          </Reveal>
        </div>

        <div data-saves className="relative mt-14 md:mt-20">
          {/* Climbing line */}
          <div
            className="absolute left-[0.7rem] top-2 bottom-2 w-px origin-top bg-border md:left-[1.05rem]"
            aria-hidden
          />
          <div
            data-timeline-line
            className="absolute left-[0.7rem] top-2 bottom-2 w-px origin-top bg-accent md:left-[1.05rem]"
            aria-hidden
          />

          <ol className="relative space-y-6 md:space-y-8">
            {tl.saves.map((save, i) => (
              <li
                key={`${locale}-${save.index}`}
                data-save
                className={cn(
                  "relative grid gap-4 pl-10 md:grid-cols-12 md:gap-8 md:pl-16",
                  i === tl.saves.length - 1 && "pb-1",
                )}
              >
                {/* Node */}
                <span
                  className={cn(
                    "absolute left-0 top-5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-ink bg-paper md:top-6 md:h-8 md:w-8",
                    "shadow-[2px_2px_0_0_var(--color-ink)]",
                    i === 0 && "bg-accent-lime",
                    i === tl.saves.length - 1 && "bg-accent",
                  )}
                  aria-hidden
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full bg-ink",
                      (i === 0 || i === tl.saves.length - 1) && "bg-ink",
                    )}
                  />
                </span>

                <article className="md:col-span-12">
                  <div
                    className={cn(
                      "rounded-card border-2 border-ink bg-surface p-5 sm:p-6 md:p-8",
                      "shadow-[4px_4px_0_0_var(--color-ink)]",
                      "transition-[transform,box-shadow] duration-base ease-out-expo",
                      "hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0_0_var(--color-ink)]",
                    )}
                  >
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <span className="font-mono text-caption text-accent">
                        {save.index}
                      </span>
                      <span className="rounded-pill border border-border bg-paper px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-label text-ink-muted">
                        {save.label}
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-display-sm tracking-tight text-ink md:text-display-md">
                      {save.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
                      {save.body}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
