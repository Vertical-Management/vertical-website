"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { asset } from "@/lib/assets";
import { SITE } from "@/lib/constants";
import { Grain } from "@/components/ui/Grain";
import { EASE_OUT_EXPO, duration } from "@/lib/motion";

/**
 * Immersive contact hero — Andorran landscape atmosphere + impact type.
 */
export function ContactHero() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { t } = useLanguage();
  const h = t.contactPage.hero;

  useGSAP(
    () => {
      if (reduced || !root.current) return;
      registerGsap();
      gsap.to("[data-contact-bg]", {
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
      className="relative flex min-h-[62dvh] flex-col justify-end overflow-hidden pt-header sm:min-h-[70dvh] md:min-h-[78dvh]"
    >
      <div className="absolute inset-0" data-contact-bg>
        <Image
          src={asset("/assets/xp/fondo-de-pantalla.jpg")}
          alt=""
          fill
          className="object-cover object-center scale-110"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/40 via-transparent to-ink/30" />
      </div>
      <Grain strong className="opacity-[0.08]" />

      <div className="relative z-[1] mx-auto w-full max-w-site px-gutter pb-12 pt-24 sm:pb-14 sm:pt-28 md:pb-20 md:pt-36">
        <motion.p
          className="mb-4 font-mono text-[0.65rem] uppercase tracking-label text-white/50 sm:mb-5 sm:text-caption"
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.base, ease: EASE_OUT_EXPO }}
        >
          {h.eyebrow} · {SITE.location}
        </motion.p>

        <h1 className="max-w-4xl text-balance font-display text-display-2xl text-paper">
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={reduced ? false : { y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: duration.slow, ease: EASE_OUT_EXPO }}
            >
              {h.title1}
            </motion.span>
          </span>
          <span className="block overflow-hidden">
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
              {h.title2}
            </motion.span>
          </span>
        </h1>

        <motion.p
          className="mt-6 max-w-md text-lead text-white/70"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: reduced ? 0 : 0.3,
            duration: duration.base,
            ease: EASE_OUT_EXPO,
          }}
        >
          {h.body}
        </motion.p>
      </div>
    </section>
  );
}
