"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO, duration } from "@/lib/motion";

/** Hero cycle — tagline energy without hammering the same three words. */
const DEFAULT_WORDS = [
  "más lejos",
  "más raro",
  "más alto",
  "más divertido",
  "más vertical",
];

type RotatingWordsProps = {
  words?: string[];
  interval?: number;
  className?: string;
};

/**
 * Cycling word stack for hero — editorial + playful.
 * First paint is always fully legible (no opacity:0 / no black inheritance).
 * Only subsequent cycles animate; min-width prevents layout jumps.
 */
export function RotatingWords({
  words = DEFAULT_WORDS,
  interval = 2400,
  className,
}: RotatingWordsProps) {
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const reduced = useReducedMotion();

  // Longest word reserves horizontal space → no CLS on rotate
  const minCh = useMemo(() => {
    const longest = words.reduce(
      (max, w) => Math.max(max, w.length),
      0,
    );
    return Math.max(longest, 8);
  }, [words]);

  useEffect(() => {
    // Mark mounted after first paint so entrance never runs as black/invisible
    const id = window.requestAnimationFrame(() => setReady(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (reduced || !ready) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [words, interval, reduced, ready]);

  const wordClass = cn(
    // Hard accent — never inherit body ink (#0a0a0a)
    "inline-block text-accent",
    className,
  );

  if (reduced) {
    return (
      <span className={wordClass} style={{ minWidth: `${minCh}ch` }}>
        {words[0]}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "relative inline-flex h-[1.05em] overflow-hidden align-bottom",
      )}
      style={{ minWidth: `${minCh}ch` }}
    >
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {words[index]}
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          className={wordClass}
          aria-hidden
          // First word paints solid; only swaps animate
          initial={ready ? { y: "105%", opacity: 0 } : false}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-105%", opacity: 0 }}
          transition={{
            duration: duration.base,
            ease: EASE_OUT_EXPO,
          }}
          style={{
            // Inline fallback if utility CSS is late: accent orange, never ink
            color: "var(--color-accent, #ff3d00)",
          }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
