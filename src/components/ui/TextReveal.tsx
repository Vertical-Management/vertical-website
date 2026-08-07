"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO, duration } from "@/lib/motion";

type TextRevealProps = {
  text: string;
  className?: string;
  /** Split by words (default) or characters */
  mode?: "words" | "chars" | "lines";
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  delay?: number;
  stagger?: number;
  once?: boolean;
};

/**
 * Masked line / word / char reveal — high-craft editorial entrance.
 */
export function TextReveal({
  text,
  className,
  mode = "words",
  as = "p",
  delay = 0,
  stagger = 0.04,
  once = true,
}: TextRevealProps) {
  const reduced = useReducedMotion();
  const Comp = motion[as];

  const parts = useMemo(() => {
    if (mode === "chars") return text.split("");
    if (mode === "lines") return text.split("\n");
    return text.split(" ");
  }, [text, mode]);

  if (reduced) {
    const Static = as;
    return <Static className={className}>{text}</Static>;
  }

  return (
    <Comp
      className={cn("inline-block", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.4 }}
      aria-label={text}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden className="flex flex-wrap">
        {parts.map((part, i) => (
          <span key={`${part}-${i}`} className="mask-reveal inline-block overflow-hidden">
            <motion.span
              className="inline-block will-change-transform"
              variants={{
                hidden: { y: "110%", opacity: 0 },
                visible: {
                  y: "0%",
                  opacity: 1,
                  transition: {
                    duration: duration.slow,
                    ease: EASE_OUT_EXPO,
                    delay: delay + i * stagger,
                  },
                },
              }}
            >
              {part === " " ? "\u00A0" : part}
              {mode === "words" && i < parts.length - 1 ? "\u00A0" : null}
            </motion.span>
          </span>
        ))}
      </span>
    </Comp>
  );
}
