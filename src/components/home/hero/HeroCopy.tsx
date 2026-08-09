"use client";

import NextLink from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CoinButton } from "@/components/home/CoinButton";
import { RotatingWords } from "@/components/home/RotatingWords";
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
 * Shared hero copy block — eyebrow, impact type, pitch, CTAs, service tags.
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

  return (
    <div className={cn("relative z-[2]", className)}>
      <motion.p
        className={cn(
          "mb-5 font-mono text-[0.65rem] uppercase tracking-label sm:mb-6 sm:text-caption md:mb-8",
          isPaper ? "text-paper/55" : "text-ink-muted",
        )}
        initial={skipMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: duration.base, ease: EASE_OUT_EXPO }}
      >
        {SITE.location} · {SITE.founder} · {h.creativeManagement}
      </motion.p>

      <h1
        className={cn(
          "max-w-[14ch] text-balance font-display sm:max-w-[16ch]",
          compact ? "text-display-xl" : "text-display-2xl",
          isPaper ? "text-paper" : "text-ink",
        )}
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
        <span className="block overflow-hidden">
          <motion.span
            className="block"
            initial={skipMotion ? false : { y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: duration.slow,
              ease: EASE_OUT_EXPO,
              delay: skipMotion ? 0 : 0.22,
            }}
          >
            <RotatingWords words={h.rotating} />
          </motion.span>
        </span>
      </h1>

      <motion.p
        className={cn(
          "mt-6 max-w-[34ch] text-pretty text-lead sm:mt-8 sm:max-w-md md:mt-10",
          isPaper ? "text-paper/70" : "text-ink-soft",
        )}
        initial={skipMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: skipMotion ? 0 : 0.4,
          duration: duration.slow,
          ease: EASE_OUT_EXPO,
        }}
      >
        {h.pitch}
      </motion.p>

      <motion.div
        className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 md:mt-12"
        initial={skipMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: skipMotion ? 0 : 0.5,
          duration: duration.base,
          ease: EASE_OUT_EXPO,
        }}
      >
        <CoinButton
          href="/contacto"
          size="xl"
          className="w-full min-h-12 justify-center sm:w-auto"
        >
          {h.insertCoin}
        </CoinButton>
        <Magnetic strength={12}>
          <NextLink
            href="/proyectos"
            data-cursor="hover"
            className={cn(
              "inline-flex h-14 w-full min-h-12 items-center justify-center rounded-pill border px-8 text-base font-medium transition-colors duration-base ease-out-expo sm:h-16 sm:w-auto",
              isPaper
                ? "border-paper/35 text-paper hover:border-paper hover:bg-paper hover:text-ink"
                : "border-border-strong text-ink hover:border-ink hover:bg-ink hover:text-paper",
            )}
          >
            {h.viewProjects}
          </NextLink>
        </Magnetic>
      </motion.div>

      <motion.div
        className={cn(
          "mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.65rem] uppercase tracking-label sm:mt-14 sm:gap-x-6",
          isPaper ? "text-paper/45" : "text-ink-muted",
        )}
        initial={skipMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: skipMotion ? 0 : 0.7 }}
      >
        {h.tags.map((tag, i) => (
          <span key={tag} className="contents">
            {i > 0 ? (
              <span className="text-accent" aria-hidden>
                /
              </span>
            ) : null}
            <span>{tag}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
