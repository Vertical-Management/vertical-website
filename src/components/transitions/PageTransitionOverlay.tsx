"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePageTransition } from "@/components/transitions/TransitionProvider";
import { asset } from "@/lib/assets";
import { EASE_IN_OUT_EXPO, EASE_OUT_EXPO, duration } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Full-viewport cinematic cover — ink panels + brand lockup + route label.
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

            {/* Center brand lockup + route label */}
            <div className="relative z-[1] flex flex-1 flex-col items-center justify-center gap-5 px-gutter text-center">
              <motion.div
                className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
                initial={{ opacity: 0, y: 16 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.18,
                    duration: duration.base,
                    ease: EASE_OUT_EXPO,
                  },
                }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
              >
                <Image
                  src={asset("/assets/logo/VERTICAL-WHITE.png")}
                  alt=""
                  width={48}
                  height={68}
                  className="h-12 w-auto object-contain sm:h-14"
                  priority
                />
                <span className="relative font-display text-2xl font-extrabold tracking-tight text-paper sm:text-3xl">
                  VERTICAL
                  <span
                    className="absolute -right-1.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-accent-lime"
                    aria-hidden
                  />
                </span>
              </motion.div>

              <motion.p
                className="font-mono text-caption uppercase tracking-[0.28em] text-accent-lime"
                initial={{ opacity: 0, y: 12 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.24,
                    duration: duration.base,
                    ease: EASE_OUT_EXPO,
                  },
                }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
              >
                Loading stage
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
                    delay: 0.3,
                    duration: duration.base,
                    ease: EASE_OUT_EXPO,
                  },
                }}
                exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
              >
                {label}
              </motion.p>

              <motion.span
                className="h-px w-16 bg-accent"
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: 1,
                  transition: {
                    delay: 0.36,
                    duration: duration.base,
                    ease: EASE_OUT_EXPO,
                  },
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
