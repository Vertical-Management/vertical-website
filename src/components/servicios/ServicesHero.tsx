"use client";

import { useMemo, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { localizeServices } from "@/lib/i18n";
import { Grain } from "@/components/ui/Grain";
import { EASE_OUT_EXPO, duration } from "@/lib/motion";

/**
 * Brutalist impact hero — oversized type + color chips + scroll cue.
 * Color blocks stay decorative and never cover primary copy (z-index + placement).
 */
export function ServicesHero() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { t } = useLanguage();
  const services = useMemo(() => localizeServices(t), [t]);
  const h = t.servicesPage.hero;

  useGSAP(
    () => {
      if (reduced || !root.current) return;
      registerGsap();

      gsap.to("[data-hero-shift]", {
        y: -48,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-[72dvh] flex-col justify-end overflow-hidden border-b border-border pt-header sm:min-h-[80dvh] md:min-h-[85dvh]"
    >
      <Grain />

      {/* Decorative slabs — always behind copy (z-0), kept clear of text column */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        {/* Lime — top-left, away from headline */}
        <div className="absolute -left-12 top-16 h-24 w-24 rotate-12 bg-accent-lime sm:-left-10 sm:top-24 sm:h-36 sm:w-36 md:h-48 md:w-48 lg:h-56 lg:w-56" />
        {/* Hot — upper right */}
        <div className="absolute right-[4%] top-[16%] h-16 w-16 -rotate-6 bg-accent-hot sm:right-[8%] sm:top-[22%] sm:h-24 sm:w-24 md:h-32 md:w-32 lg:h-36 lg:w-36" />
        {/* Cyan — right side mid, NOT under body copy (was bottom-left overlapping text) */}
        <div className="absolute bottom-[38%] right-[-4%] h-12 w-28 rotate-3 bg-accent-cool sm:bottom-[42%] sm:right-[2%] sm:h-16 sm:w-40 md:h-20 md:w-52 lg:h-24 lg:w-64" />
        {/* Ink bar — bottom edge accent only */}
        <div className="absolute bottom-0 right-0 h-16 w-1/4 bg-ink sm:h-20 md:h-28 md:w-1/3" />
      </div>

      <div
        data-hero-shift
        className="relative z-10 mx-auto w-full max-w-site px-gutter pb-12 pt-20 sm:pb-14 sm:pt-24 md:pb-20 md:pt-32"
      >
        <motion.p
          className="mb-6 font-mono text-caption uppercase tracking-label text-ink-muted"
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.base, ease: EASE_OUT_EXPO }}
        >
          {h.eyebrow}
        </motion.p>

        <h1 className="max-w-[12ch] text-balance font-display text-display-2xl text-ink sm:max-w-none">
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={reduced ? false : { y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: duration.slow, ease: EASE_OUT_EXPO }}
            >
              {h.title}
            </motion.span>
          </span>
          <span className="mt-1 block overflow-hidden">
            <motion.span
              className="block text-ink/30"
              initial={reduced ? false : { y: "110%" }}
              animate={{ y: "0%" }}
              transition={{
                duration: duration.slow,
                ease: EASE_OUT_EXPO,
                delay: 0.08,
              }}
            >
              {h.titleMuted}
            </motion.span>
          </span>
        </h1>

        {/* Body on a subtle paper scrim so color blocks never steal contrast */}
        <motion.p
          className="mt-8 max-w-lg rounded-md bg-paper/85 text-lead text-ink-soft backdrop-blur-[2px] sm:bg-transparent sm:backdrop-blur-none"
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: reduced ? 0 : 0.25,
            duration: duration.base,
            ease: EASE_OUT_EXPO,
          }}
        >
          {h.body}
        </motion.p>

        <motion.ul
          className="mt-10 flex flex-wrap gap-2"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduced ? 0 : 0.4 }}
        >
          {services.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                data-cursor="hover"
                className="inline-flex items-center gap-2 rounded-pill border-2 border-ink bg-paper px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-label shadow-[2px_2px_0_0_var(--color-ink)] transition-[transform,box-shadow] duration-base ease-out-expo hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0_0_var(--color-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <span className="opacity-50">{s.index}</span>
                {s.title}
              </a>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
