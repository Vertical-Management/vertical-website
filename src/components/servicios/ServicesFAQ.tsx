"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO, duration } from "@/lib/motion";

/**
 * Lightweight accordion FAQ — irreverent but useful.
 */
export function ServicesFAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = useReducedMotion();
  const { t } = useLanguage();
  const f = t.servicesPage.faq;

  return (
    <section className="relative border-b border-border py-section">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow index="06" className="mb-4">
              {f.eyebrow}
            </Eyebrow>
            <Heading as="h2" size="display-md" className="text-balance">
              {f.titleLine1}
              <br />
              {f.titleLine2}
            </Heading>
            <p className="mt-4 max-w-xs text-sm text-ink-soft">{f.blurb}</p>
          </div>

          <ul className="lg:col-span-8">
            {f.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q} className="border-b border-border">
                  <button
                    type="button"
                    data-cursor="hover"
                    className="flex min-h-14 w-full items-start justify-between gap-4 py-5 text-left transition-colors duration-base hover:text-accent sm:gap-6 md:py-6"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="font-display text-base tracking-tight sm:text-lg md:text-xl">
                      <span className="mr-2 font-mono text-caption text-ink-faint sm:mr-3">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item.q}
                    </span>
                    <span
                      className={cn(
                        "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border font-mono text-sm transition-transform duration-base ease-out-expo",
                        isOpen && "rotate-45 bg-ink text-paper",
                      )}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={reduced ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduced ? undefined : { height: 0, opacity: 0 }}
                        transition={{
                          duration: duration.base,
                          ease: EASE_OUT_EXPO,
                        }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-xl pb-6 text-base leading-relaxed text-ink-soft">
                          {item.a}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
