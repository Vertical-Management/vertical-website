"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePageTransition } from "@/components/transitions/TransitionProvider";
import { EASE_IN_OUT_EXPO, EASE_OUT_EXPO, duration } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Full-viewport cinematic cover — ink panels + route label + VERTICAL mark.
 */
export function PageTransitionOverlay() {
  const { phase, label, isTransitioning } = usePageTransition();
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || reduced) return null;

  const visible = phase === "leaving" || phase === "entering";

  return (
    <>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {isTransitioning ? `Navegando a ${label}` : ""}
      </div>

      <AnimatePresence>
        {visible ? (
          <motion.div
            key="page-overlay"
            className="pointer-events-auto fixed inset-0 z-transition flex flex-col"
            initial={{ visibility: "visible" }}
            exit={{
              transition: { when: "afterChildren" },
            }}
            aria-hidden
          >
            {/* Dual panel wipe */}
            <div className="absolute inset-0 flex flex-col">
              <motion.div
                className="h-1/2 w-full origin-top bg-ink"
                initial={{ scaleY: 0 }}
                animate={{
                  scaleY: 1,
                  transition: {
                    duration: duration.slow,
                    ease: EASE_IN_OUT_EXPO,
                  },
                }}
                exit={{
                  scaleY: 0,
                  transition: {
                    duration: duration.base,
                    ease: EASE_IN_OUT_EXPO,
                    delay: 0.05,
                  },
                }}
              />
              <motion.div
                className="h-1/2 w-full origin-bottom bg-ink"
                initial={{ scaleY: 0 }}
                animate={{
                  scaleY: 1,
                  transition: {
                    duration: duration.slow,
                    ease: EASE_IN_OUT_EXPO,
                    delay: 0.04,
                  },
                }}
                exit={{
                  scaleY: 0,
                  transition: {
                    duration: duration.base,
                    ease: EASE_IN_OUT_EXPO,
                  },
                }}
              />
            </div>

            {/* Accent rail */}
            <motion.div
              className="absolute inset-y-0 left-0 w-1 bg-accent-lime md:w-1.5"
              initial={{ scaleY: 0 }}
              animate={{
                scaleY: 1,
                transition: {
                  duration: duration.slow,
                  ease: EASE_OUT_EXPO,
                  delay: 0.12,
                },
              }}
              exit={{ scaleY: 0, transition: { duration: duration.fast } }}
            />

            {/* Center brand + label */}
            <div className="relative z-[1] flex flex-1 flex-col items-center justify-center gap-4 px-gutter text-center">
              <motion.p
                className="font-mono text-caption uppercase tracking-[0.28em] text-accent-lime"
                initial={{ opacity: 0, y: 12 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.2, duration: duration.base, ease: EASE_OUT_EXPO },
                }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
              >
                Vertical
              </motion.p>
              <motion.p
                className={cn(
                  "font-display text-display-md tracking-display text-paper md:text-display-lg",
                )}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.28,
                    duration: duration.base,
                    ease: EASE_OUT_EXPO,
                  },
                }}
                exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
              >
                {label}
              </motion.p>
              <motion.span
                className="mt-2 h-px w-16 bg-accent"
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: 1,
                  transition: { delay: 0.35, duration: duration.base, ease: EASE_OUT_EXPO },
                }}
                exit={{ scaleX: 0 }}
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
