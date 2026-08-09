"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type ScrollCueProps = {
  tone?: "paper" | "ink";
  className?: string;
  static?: boolean;
};

/**
 * Desktop-only scroll hint — hidden on small viewports to avoid CTA overlap.
 */
export function ScrollCue({
  tone = "ink",
  className,
  static: isStatic = false,
}: ScrollCueProps) {
  const reduced = useReducedMotion();
  const skipMotion = isStatic || !!reduced;
  const isPaper = tone === "paper";

  return (
    <motion.div
      className={cn(
        // Hide on mobile/tablet; only show from lg when there is room
        "pointer-events-none absolute bottom-8 left-1/2 z-[2] hidden -translate-x-1/2 flex-col items-center gap-2 opacity-60 lg:flex",
        className,
      )}
      initial={skipMotion ? false : { opacity: 0 }}
      animate={{ opacity: 0.55 }}
      transition={{ delay: skipMotion ? 0 : 1 }}
      aria-hidden
    >
      <span
        className={cn(
          "font-mono text-[0.55rem] uppercase tracking-label",
          isPaper ? "text-paper/45" : "text-ink-muted",
        )}
      >
        Scroll
      </span>
      <span
        className={cn(
          "relative h-8 w-px overflow-hidden",
          isPaper ? "bg-paper/15" : "bg-ink/12",
        )}
      >
        <span className="absolute inset-x-0 top-0 h-1/2 animate-pulse-soft bg-accent" />
      </span>
    </motion.div>
  );
}
