"use client";

import NextLink from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Magnetic } from "@/components/ui/Magnetic";
import { SITE } from "@/lib/constants";
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
 * Production hero copy — byline, pitch, single project CTA.
 * No display headline (INV-15).
 */
export function HeroCopy({
  tone = "ink",
  className,
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
      <motion.h1
        className={cn(
          "mb-5 font-mono text-[0.65rem] font-medium uppercase tracking-label sm:mb-6 sm:text-caption md:mb-8",
          isPaper ? "text-paper/80" : "text-ink-muted",
        )}
        style={isPaper ? { color: "rgba(244, 241, 234, 0.8)" } : undefined}
        {...enter(0)}
      >
        {SITE.name} · {SITE.founder}
      </motion.h1>

      <motion.p
        className={cn(
          "mt-6 max-w-[34ch] text-pretty text-lead sm:mt-8 sm:max-w-md md:mt-10",
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
                ? "border-paper/40 text-paper hover:border-paper hover:bg-paper hover:text-ink"
                : "border-border-strong text-ink hover:border-ink hover:bg-ink hover:text-paper",
            )}
            style={isPaper ? { color: "var(--color-paper, #f4f1ea)" } : undefined}
          >
            {h.viewProjects}
          </NextLink>
        </Magnetic>
      </motion.div>
    </div>
  );
}
