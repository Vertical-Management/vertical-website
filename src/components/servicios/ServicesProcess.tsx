"use client";

import { useMemo } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { localizeProcessSteps } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Marquee, MarqueeItem } from "@/components/ui/Marquee";

/**
 * How we work — process grid + ticker.
 */
export function ServicesProcess() {
  const { t } = useLanguage();
  const steps = useMemo(() => localizeProcessSteps(t), [t]);
  const p = t.servicesPage.process;

  return (
    <section className="relative overflow-hidden border-b border-border py-section">
      <Container>
        <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Eyebrow index="05" className="mb-4">
              {p.eyebrow}
            </Eyebrow>
            <Heading as="h2" size="display-md">
              {p.titleLine1}
              <br />
              {p.titleLine2}
            </Heading>
          </div>
          <Reveal className="md:col-span-5">
            <p className="max-w-sm text-base text-ink-soft md:ml-auto md:text-right">
              {p.blurb}
            </p>
          </Reveal>
        </div>

        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {steps.map((step) => (
            <StaggerItem key={step.index}>
              <article className="group flex h-full flex-col rounded-card border-2 border-ink bg-surface p-6 shadow-[4px_4px_0_0_var(--color-ink)] transition-[transform,box-shadow] duration-base ease-out-expo hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0_0_var(--color-ink)]">
                <span className="font-mono text-caption tracking-label text-accent">
                  {step.index}
                </span>
                <h3 className="mt-4 font-display text-display-sm tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                  {step.description}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>

      <div className="mt-16 border-y-2 border-ink bg-accent py-4 md:mt-20">
        <Marquee speed="fast" gap="2rem">
          {p.ticker.map((w) => (
            <MarqueeItem key={w} className="gap-8">
              <span className="font-display text-display-sm tracking-display text-paper">
                {w}
              </span>
              <span className="text-accent-lime" aria-hidden>
                ■
              </span>
            </MarqueeItem>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
