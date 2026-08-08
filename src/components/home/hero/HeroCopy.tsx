"use client";

import NextLink from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CoinButton } from "@/components/home/CoinButton";
import { RotatingWords } from "@/components/home/RotatingWords";
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
  const skipMotion = isStatic || !!reduced;
  const isPaper = tone === "paper";

  return (
    <div className={cn("relative z-[2]", className)}>
      <motion.p
        className={cn(
          "mb-6 font-mono text-caption uppercase tracking-label md:mb-8",
          isPaper ? "text-paper/55" : "text-ink-muted",
        )}
        initial={skipMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: duration.base, ease: EASE_OUT_EXPO }}
      >
        {SITE.location} · {SITE.founder} · Creative Management
      </motion.p>

      <h1
        className={cn(
          "max-w-[16ch] font-display",
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
          Creamos
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
            marcas que van
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
            <RotatingWords />
          </motion.span>
        </span>
      </h1>

      <motion.p
        className={cn(
          "mt-8 max-w-md text-lead md:mt-10",
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
        {SITE.name}. Branding, digital, motion y estrategia con craft de estudio
        y humor de arcade. Sin plantillas. Con intención.
      </motion.p>

      <motion.div
        className="mt-10 flex flex-wrap items-center gap-4 md:mt-12"
        initial={skipMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: skipMotion ? 0 : 0.5,
          duration: duration.base,
          ease: EASE_OUT_EXPO,
        }}
      >
        <CoinButton href="/contacto" size="xl">
          Insert coin
        </CoinButton>
        <Magnetic strength={12}>
          <NextLink
            href="/proyectos"
            data-cursor="hover"
            className={cn(
              "inline-flex h-16 items-center rounded-pill border px-8 text-base font-medium transition-colors duration-base ease-out-expo",
              isPaper
                ? "border-paper/35 text-paper hover:border-paper hover:bg-paper hover:text-ink"
                : "border-border-strong text-ink hover:border-ink hover:bg-ink hover:text-paper",
            )}
          >
            Ver proyectos
          </NextLink>
        </Magnetic>
      </motion.div>

      <motion.div
        className={cn(
          "mt-14 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.65rem] uppercase tracking-label",
          isPaper ? "text-paper/45" : "text-ink-muted",
        )}
        initial={skipMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: skipMotion ? 0 : 0.7 }}
      >
        <span>Branding</span>
        <span className="text-accent" aria-hidden>
          /
        </span>
        <span>Digital</span>
        <span className="text-accent" aria-hidden>
          /
        </span>
        <span>Motion</span>
        <span className="text-accent" aria-hidden>
          /
        </span>
        <span>3D</span>
      </motion.div>
    </div>
  );
}
