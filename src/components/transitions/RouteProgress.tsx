"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePageTransition } from "@/components/transitions/TransitionProvider";
import { cn } from "@/lib/utils";

/**
 * Slim top progress during page leave phase (complements scroll progress).
 */
export function RouteProgress() {
  const { phase, isTransitioning } = usePageTransition();
  const reduced = useReducedMotion();

  if (reduced) return null;

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-[81] h-[2px] overflow-hidden",
        !isTransitioning && "opacity-0",
      )}
      aria-hidden
    >
      <motion.div
        className="h-full origin-left bg-accent-lime"
        initial={false}
        animate={
          phase === "leaving"
            ? { scaleX: 1, opacity: 1 }
            : phase === "entering"
              ? { scaleX: 1, opacity: 0 }
              : { scaleX: 0, opacity: 0 }
        }
        transition={
          phase === "leaving"
            ? { duration: 0.7, ease: [0.87, 0, 0.13, 1] }
            : { duration: 0.25 }
        }
        style={{ transformOrigin: "left center" }}
      />
    </div>
  );
}
