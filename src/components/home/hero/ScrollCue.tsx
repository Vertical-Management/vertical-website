"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type ScrollCueProps = {
  tone?: "paper" | "ink";
  className?: string;
  static?: boolean;
};

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
        "absolute bottom-8 left-1/2 z-[2] flex -translate-x-1/2 flex-col items-center gap-2",
        className,
      )}
      initial={skipMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: skipMotion ? 0 : 1 }}
      aria-hidden
    >
      <span
        className={cn(
          "font-mono text-[0.6rem] uppercase tracking-label",
          isPaper ? "text-paper/50" : "text-ink-muted",
        )}
      >
        Scroll
      </span>
      <span
        className={cn(
          "relative h-10 w-px overflow-hidden",
          isPaper ? "bg-paper/20" : "bg-ink/15",
        )}
      >
        <span className="absolute inset-x-0 top-0 h-1/2 animate-pulse-soft bg-accent" />
      </span>
    </motion.div>
  );
}
