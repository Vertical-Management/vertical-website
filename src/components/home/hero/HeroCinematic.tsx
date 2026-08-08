"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";
import { Grain } from "@/components/ui/Grain";
import { EASE_OUT_EXPO, duration } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { HeroCopy } from "./HeroCopy";
import { HeroWallCarousel } from "./HeroWallCarousel";
import { ScrollCue } from "./ScrollCue";

type VariantProps = {
  preview?: boolean;
  className?: string;
};

/**
 * Production home hero — work wall + editorial copy.
 * Isolated module so alternate hero variants are not on the home critical path.
 */
export function HeroCinematic({ preview, className }: VariantProps) {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const skipMotion = !!preview || !!reduced;

  // Fade copy only — never scale the media wall
  useGSAP(
    () => {
      if (preview || reduced || !root.current) return;
      registerGsap();
      const fade = root.current.querySelectorAll<HTMLElement>("[data-hero-fade]");
      fade.forEach((el) => {
        gsap.to(el, {
          opacity: 0.2,
          y: -28,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: root, dependencies: [preview, reduced] },
  );

  return (
    <section
      ref={root}
      className={cn(
        "relative flex flex-col justify-end overflow-hidden bg-ink text-paper",
        preview ? "min-h-[78vh] pt-6 md:min-h-[85vh]" : "min-h-dvh pt-header",
        className,
      )}
      aria-label="Inicio"
    >
      <div className="absolute inset-0 z-0" aria-hidden>
        <motion.div
          className="absolute inset-0"
          initial={skipMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: duration.slow, ease: EASE_OUT_EXPO }}
        >
          <HeroWallCarousel />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/40 to-ink/15" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_70%,transparent_0%,rgb(10_10_10/0.5)_75%)]" />
      </div>

      <Grain className="opacity-[0.06]" />

      <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
        <div className="absolute right-[12%] top-[22%] h-2 w-2 rounded-full bg-accent-lime shadow-[0_0_24px_var(--color-accent-lime)]" />
        <div className="absolute bottom-[34%] left-[8%] h-1.5 w-1.5 rounded-full bg-accent opacity-80" />
      </div>

      <div
        data-hero-fade
        className="relative z-[2] mx-auto w-full max-w-site px-gutter pb-20 pt-16 md:pb-24 md:pt-22"
      >
        <motion.span
          className="mb-5 inline-flex items-center gap-2 rounded-pill border border-paper/15 bg-ink/40 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-label text-accent-lime backdrop-blur-sm"
          initial={skipMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.base, ease: EASE_OUT_EXPO }}
        >
          <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-accent-lime" />
          Intro · Work wall
        </motion.span>
        <HeroCopy tone="paper" static={!!preview} />
      </div>

      <ScrollCue tone="paper" static={!!preview} />
    </section>
  );
}
