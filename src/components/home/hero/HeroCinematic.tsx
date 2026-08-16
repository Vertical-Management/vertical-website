"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";
import { useVisitorLocation } from "@/hooks/useVisitorLocation";
import { useLanguage } from "@/components/providers/LanguageProvider";
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
 * Color contract: section paints paper text — never body ink over the wall.
 */
export function HeroCinematic({ preview, className }: VariantProps) {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const skipMotion = !!preview || !!reduced;
  const { location, loading } = useVisitorLocation();
  const { t } = useLanguage();
  const h = t.home.hero;
  const badgeLabel = loading
    ? h.locationLoading
    : (location?.label ?? h.locationLoading);

  // Fade copy only — no scrub on coarse pointers / reduced motion
  useGSAP(
    () => {
      if (preview || reduced || !root.current) return;
      registerGsap();
      const fade = root.current.querySelectorAll<HTMLElement>("[data-hero-fade]");
      const coarse =
        typeof window !== "undefined" &&
        window.matchMedia("(pointer: coarse)").matches;
      if (coarse) return;

      fade.forEach((el) => {
        gsap.to(el, {
          opacity: 0.35,
          y: -16,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: root, dependencies: [preview, reduced] },
  );

  return (
    <section
      ref={root}
      data-hero-surface="dark"
      data-nav-ground="color"
      className={cn(
        "relative flex flex-col justify-end overflow-hidden bg-ink text-paper",
        preview ? "min-h-[78vh] pt-6 md:min-h-[85vh]" : "min-h-dvh pt-header",
        className,
      )}
      style={{ color: "var(--color-paper, #f4f1ea)" }}
      aria-label={h.sectionLabel}
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

        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/65 to-ink/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/55 to-ink/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_70%,transparent_0%,rgb(10_10_10/0.55)_70%)]" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink/70 to-transparent md:h-36" />
      </div>

      <Grain className="opacity-[0.06]" />

      <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
        <div className="absolute right-[12%] top-[22%] h-2 w-2 rounded-full bg-accent-lime shadow-[0_0_24px_var(--color-accent-lime)]" />
        <div className="absolute bottom-[34%] left-[8%] h-1.5 w-1.5 rounded-full bg-accent opacity-80" />
      </div>

      <div
        data-hero-fade
        className="relative z-[2] mx-auto w-full max-w-site px-gutter pb-14 pt-12 sm:pb-20 sm:pt-16 md:pb-24 md:pt-22"
      >
        <motion.span
          className="mb-4 inline-flex min-h-[1.75rem] min-w-[12rem] max-w-full items-center gap-2 rounded-pill border border-paper/20 bg-ink/55 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-label text-accent-lime backdrop-blur-sm sm:mb-5 sm:min-w-[14rem]"
          style={{ color: "var(--color-accent-lime, #c8ff00)" }}
          initial={skipMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.base, ease: EASE_OUT_EXPO }}
          aria-live="polite"
          aria-busy={loading}
        >
          <span
            className={cn(
              "h-1.5 w-1.5 shrink-0 rounded-full bg-accent-lime",
              !reduced && "animate-pulse-soft",
            )}
            aria-hidden
          />
          <span className={cn("truncate", loading && "opacity-70")}>
            {badgeLabel}
          </span>
        </motion.span>
        <HeroCopy tone="paper" static={!!preview} />
      </div>

      {!reduced ? <ScrollCue tone="paper" static={!!preview} /> : null}
    </section>
  );
}
