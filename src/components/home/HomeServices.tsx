"use client";

import NextLink from "next/link";
import { useMemo, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { localizeServices } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO, duration } from "@/lib/motion";

/**
 * Services — large interactive list (brutalist editorial, high craft).
 */
export function HomeServices() {
  const { t } = useLanguage();
  const services = useMemo(() => localizeServices(t), [t]);
  const [hovered, setHovered] = useState<string | null>(services[0]?.id ?? null);
  const reduced = useReducedMotion();
  const active = services.find((s) => s.id === hovered) ?? services[0];
  const s = t.home.services;

  return (
    <section
      className="relative overflow-hidden border-y border-border bg-surface-inverse py-section text-paper"
      data-theme="inverse"
    >
      <Container>
        <div className="mb-12 grid gap-8 md:mb-16 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Eyebrow index="03" className="mb-4 !text-white/45">
              {s.eyebrow}
            </Eyebrow>
            <Heading as="h2" size="display-lg" className="!text-paper">
              {s.titleLine1}
              <br />
              {s.titleLine2}
            </Heading>
          </div>
          <p className="max-w-sm text-base text-white/55 md:col-span-5 md:justify-self-end md:text-right">
            {s.blurb}
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <ul className="lg:col-span-7">
            {services.map((service) => {
              const isOn = hovered === service.id;
              return (
                <li key={service.id}>
                  <NextLink
                    href="/servicios"
                    data-cursor="hover"
                    className={cn(
                      "group flex items-baseline gap-4 border-b border-white/10 py-5 transition-colors duration-base md:py-6",
                      "hover:border-accent-lime/40",
                      isOn && "border-accent-lime/30",
                    )}
                    onMouseEnter={() => setHovered(service.id)}
                    onFocus={() => setHovered(service.id)}
                  >
                    <span
                      className={cn(
                        "tracking-label font-mono text-caption text-white/30 transition-colors duration-base",
                        isOn && "text-accent-lime",
                      )}
                    >
                      {service.index}
                    </span>
                    <span
                      className={cn(
                        "tracking-display flex-1 font-display text-[clamp(1.75rem,4vw,3.25rem)] font-bold transition-transform duration-slow ease-out-expo",
                        isOn ? "translate-x-2 text-accent-lime" : "text-paper",
                      )}
                    >
                      {service.title}
                    </span>
                    <span
                      className={cn(
                        "tracking-label hidden font-mono text-[0.65rem] uppercase text-white/30 transition-all duration-base sm:inline",
                        isOn && "translate-x-0 text-accent-lime",
                        !isOn && "translate-x-2 opacity-0 group-hover:opacity-100",
                      )}
                    >
                      {s.explore}
                    </span>
                  </NextLink>
                </li>
              );
            })}
          </ul>

          <div className="relative flex min-h-[220px] flex-col justify-between rounded-card border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8 lg:col-span-5">
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div
                  key={active.id}
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: duration.base, ease: EASE_OUT_EXPO }}
                >
                  <p className="tracking-label font-mono text-caption uppercase text-accent-lime">
                    {active.index} — {active.title}
                  </p>
                  <p className="mt-4 text-lead text-white/75">{active.description}</p>
                  {active.tags ? (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {active.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="border-white/20 text-paper"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  ) : null}
                </motion.div>
              ) : null}
            </AnimatePresence>

            <NextLink
              href="/servicios"
              data-cursor="hover"
              className="tracking-label mt-8 inline-flex w-fit items-center gap-2 font-mono text-caption uppercase text-paper transition-colors duration-base hover:text-accent-lime"
            >
              {s.viewAll}
            </NextLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
