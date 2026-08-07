"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO, duration } from "@/lib/motion";

const DEFAULT_WORDS = [
  "más lejos",
  "más raro",
  "más craft",
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
 */
export function RotatingWords({
  words = DEFAULT_WORDS,
  interval = 2200,
  className,
}: RotatingWordsProps) {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [words, interval, reduced]);

  if (reduced) {
    return (
      <span className={cn("text-accent", className)}>{words[0]}</span>
    );
  }

  return (
    <span
      className={cn(
        "relative inline-flex h-[1.05em] overflow-hidden align-bottom",
        className,
      )}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          className="inline-block text-accent"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: duration.base, ease: EASE_OUT_EXPO }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
