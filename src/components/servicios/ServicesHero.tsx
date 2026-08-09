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

      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-10 top-24 h-28 w-28 rotate-12 bg-accent-lime sm:h-40 sm:w-40 md:h-56 md:w-56" />
        <div className="absolute right-[8%] top-[28%] h-20 w-20 -rotate-6 bg-accent-hot sm:h-28 sm:w-28 md:h-36 md:w-36" />
        <div className="absolute bottom-[22%] left-[30%] h-14 w-32 bg-accent-cool sm:h-20 sm:w-48 md:h-24 md:w-64" />
        <div className="absolute bottom-0 right-0 h-24 w-1/3 bg-ink md:h-40" />
      </div>

      <div
        data-hero-shift
        className="relative z-[1] mx-auto w-full max-w-site px-gutter pb-12 pt-20 sm:pb-14 sm:pt-24 md:pb-20 md:pt-32"
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
              className="block text-ink/25"
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

        <motion.p
          className="mt-8 max-w-lg text-lead text-ink-soft"
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
                className="inline-flex items-center gap-2 rounded-pill border-2 border-ink bg-paper px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-label shadow-[2px_2px_0_0_var(--color-ink)] transition-[transform,box-shadow] duration-base ease-out-expo hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0_0_var(--color-ink)]"
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
