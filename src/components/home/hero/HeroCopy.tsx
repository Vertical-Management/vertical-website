"use client";

import NextLink from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Magnetic } from "@/components/ui/Magnetic";
import { EASE_OUT_EXPO, duration } from "@/lib/motion";
import { cn } from "@/lib/utils";

type HeroCopyProps = {
  tone?: "paper" | "ink";
  className?: string;
  compact?: boolean;
  /** Skip entrance fades — always visible (review / static) */
  static?: boolean;
};

/**
 * Shared hero copy block — impact type, pitch, single project CTA.
 * Paper tone forces light colors at paint time (no black FOUC on dark wall).
 */
export function HeroCopy({
  tone = "ink",
  className,
  compact = false,
  static: isStatic = false,
}: HeroCopyProps) {
  const reduced = useReducedMotion();
  const { t } = useLanguage();
  const h = t.home.hero;
  const skipMotion = isStatic || !!reduced;
  const isPaper = tone === "paper";

  const enter = (delay: number) =>
    skipMotion
      ? {}
      : {
          initial: { opacity: 0, y: 14 } as const,
          animate: { opacity: 1, y: 0 } as const,
          transition: {
            delay,
            duration: duration.slow,
            ease: EASE_OUT_EXPO,
          },
        };

  return (
    <div
      className={cn(
        "relative z-[2]",
        isPaper && "hero-copy-legible",
        className,
      )}
    >
      <h1
        className={cn(
          "max-w-[18ch] text-balance font-display sm:max-w-[20ch]",
          compact ? "text-display-xl" : "text-display-2xl",
          isPaper ? "text-paper" : "text-ink",
        )}
        style={
          isPaper
            ? {
                color: "var(--color-paper, #f4f1ea)",
                textShadow:
                  "0 1px 2px rgb(0 0 0 / 0.45), 0 8px 32px rgb(0 0 0 / 0.35)",
              }
            : undefined
        }
      >
        <motion.span
          className="block"
          initial={skipMotion ? false : { y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{
            duration: duration.slow,
            ease: EASE_OUT_EXPO,
            delay: skipMotion ? 0 : 0.05,
          }}
        >
          {h.line1}
        </motion.span>
        <span className="block overflow-hidden">
          <motion.span
            className="block"
            initial={skipMotion ? false : { y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: duration.slow,
              ease: EASE_OUT_EXPO,
              delay: skipMotion ? 0 : 0.14,
            }}
          >
            {h.line2}
          </motion.span>
        </span>
      </h1>

      <motion.p
        className={cn(
          "mt-6 max-w-[36ch] text-pretty text-base leading-relaxed sm:mt-8 sm:max-w-lg sm:text-lead md:mt-10",
          isPaper ? "text-paper/80" : "text-ink-soft",
        )}
        style={isPaper ? { color: "rgba(244, 241, 234, 0.82)" } : undefined}
        {...enter(skipMotion ? 0 : 0.35)}
      >
        {h.pitch}
      </motion.p>

      <motion.div
        className="mt-8 flex w-full justify-center sm:mt-10 sm:justify-start md:mt-12"
        {...enter(skipMotion ? 0 : 0.45)}
      >
        <Magnetic strength={12}>
          <NextLink
            href="/proyectos"
            data-cursor="hover"
            className={cn(
              "inline-flex h-14 w-full min-h-12 max-w-sm items-center justify-center rounded-pill border-2 px-8 text-base font-medium transition-colors duration-base ease-out-expo sm:h-16 sm:w-auto sm:max-w-none",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              isPaper
                ? "border-accent bg-accent text-paper shadow-[4px_4px_0_0_rgba(244,241,234,0.35)] hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0_0_rgba(244,241,234,0.45)]"
                : "border-ink bg-accent text-paper shadow-[4px_4px_0_0_var(--color-ink)] hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0_0_var(--color-ink)]",
            )}
          >
            {h.viewProjects}
          </NextLink>
        </Magnetic>
      </motion.div>
    </div>
  );
}
