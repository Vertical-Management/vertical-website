"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { asset } from "@/lib/assets";
import { Grain } from "@/components/ui/Grain";
import { EASE_OUT_EXPO, duration } from "@/lib/motion";

/**
 * Immersive nosotros hero — NOSOTROS.png full-bleed + impact type.
 */
export function NosotrosHero() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { t } = useLanguage();
  const h = t.nosotrosPage.hero;

  useGSAP(
    () => {
      if (reduced || !root.current) return;
      registerGsap();

      gsap.to("[data-nosotros-bg]", {
        yPercent: 12,
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
      className="relative flex min-h-[72dvh] flex-col justify-end overflow-hidden border-b border-ink pt-header sm:min-h-[80dvh] md:min-h-[88dvh]"
    >
      <div className="absolute inset-0" data-nosotros-bg>
        <Image
          src={asset("/assets/NOSOTROS.png")}
          alt=""
          fill
          className="object-cover object-center scale-110"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/50 via-transparent to-ink/25" />
      </div>
      <Grain strong className="opacity-[0.08]" />

      <div className="relative z-[1] mx-auto w-full max-w-site px-gutter pb-12 pt-24 sm:pb-14 sm:pt-28 md:pb-20 md:pt-36">
        <motion.p
          className="mb-4 font-mono text-[0.65rem] uppercase tracking-label text-white/50 sm:mb-5 sm:text-caption"
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.base, ease: EASE_OUT_EXPO }}
        >
          {h.eyebrow}
        </motion.p>

        <h1 className="max-w-[14ch] text-balance font-display text-display-2xl text-paper sm:max-w-none">
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
              className="block text-accent-lime"
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
          className="mt-6 max-w-lg text-lead text-white/70 sm:mt-8"
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
          className="mt-8 flex flex-wrap gap-2 sm:mt-10"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduced ? 0 : 0.4 }}
        >
          {h.chips.map((chip) => (
            <li key={chip}>
              <span className="inline-flex items-center rounded-pill border-2 border-paper/80 bg-accent-lime px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-label text-ink shadow-[2px_2px_0_0_rgba(244,241,234,0.85)]">
                {chip}
              </span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
