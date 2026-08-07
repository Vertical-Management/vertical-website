"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";
import { services } from "@/data/services";
import { Grain } from "@/components/ui/Grain";
import { EASE_OUT_EXPO, duration } from "@/lib/motion";

/**
 * Brutalist impact hero — oversized type + color chips + scroll cue.
 */
export function ServicesHero() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

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
      className="relative flex min-h-[85dvh] flex-col justify-end overflow-hidden border-b border-border pt-header"
    >
      <Grain />

      {/* Background color shards */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-10 top-24 h-40 w-40 rotate-12 bg-accent-lime md:h-56 md:w-56" />
        <div className="absolute right-[8%] top-[28%] h-28 w-28 -rotate-6 bg-accent-hot md:h-36 md:w-36" />
        <div className="absolute bottom-[22%] left-[30%] h-20 w-48 bg-accent-cool md:h-24 md:w-64" />
        <div className="absolute bottom-0 right-0 h-32 w-1/3 bg-ink md:h-40" />
      </div>

      <div
        data-hero-shift
        className="relative z-[1] mx-auto w-full max-w-site px-gutter pb-14 pt-24 md:pb-20 md:pt-32"
      >
        <motion.p
          className="mb-6 font-mono text-caption uppercase tracking-label text-ink-muted"
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.base, ease: EASE_OUT_EXPO }}
        >
          02 — Servicios · Insert skill
        </motion.p>

        <h1 className="font-display text-display-2xl text-ink">
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={reduced ? false : { y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: duration.slow, ease: EASE_OUT_EXPO }}
            >
              Servicios
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
              con carácter
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
          Tipografía brutal. Bloques de color. Ejecución de estudio. Cuatro
          frentes — un mismo estándar: craft + humor con propósito.
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
