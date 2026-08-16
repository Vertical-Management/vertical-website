"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { asset } from "@/lib/assets";
import {
  GlassStatCard,
  NosotrosShell,
  NOSOTROS_EASE,
  useNosotrosReveal,
} from "./primitives";

/**
 * Immersive /nosotros hero — dark glass shell + stat stack.
 */
export function NosotrosHero() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const desktop = useMediaQuery("(min-width: 768px)");
  const { t } = useLanguage();
  const h = t.nosotrosPage.hero;
  const reveal = useNosotrosReveal();

  useGSAP(
    () => {
      if (reduced || !desktop || !root.current) return;
      registerGsap();

      gsap.to("[data-nosotros-bg]", {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: root, dependencies: [reduced, desktop] },
  );

  return (
    <NosotrosShell
      ref={root}
      tone="dark"
      className="flex min-h-[calc(100dvh-var(--header-height)-1.5rem)] flex-col justify-end"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0" data-nosotros-bg>
          <Image
            src={asset("/assets/NOSOTROS.png")}
            alt=""
            fill
            className="object-cover object-center opacity-[0.55]"
            sizes="(max-width: 768px) 100vw, 1600px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-zinc-950/65 to-zinc-950/90" />
        </div>
      </div>

      <p
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[42%] z-[1] w-[140%] -translate-x-1/2 -translate-y-1/2 select-none text-center font-display text-[18vw] font-semibold leading-none tracking-[-0.06em] text-white/[0.04] blur-[2px] sm:text-[20vw] md:text-[22vw]"
      >
        {h.watermark}
      </p>

      <div className="relative z-[2] grid w-full flex-1 items-end gap-10 px-5 pb-10 pt-10 sm:px-8 sm:pb-12 sm:pt-12 md:grid-cols-12 md:gap-8 md:px-12 md:pb-16 md:pt-14 lg:px-16">
        <div className="md:col-span-7 lg:col-span-8">
          <motion.p
            className="n-label mb-4 text-white/50 sm:mb-5"
            variants={reveal}
            initial="hidden"
            animate="visible"
          >
            {h.eyebrow}
          </motion.p>

          <h1 className="n-heading max-w-[14ch] text-balance font-display text-display-xl text-white sm:max-w-none md:text-display-2xl">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={reduced ? false : { y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: NOSOTROS_EASE }}
              >
                {h.title}
              </motion.span>
            </span>
            <span className="mt-1 block overflow-hidden">
              <motion.span
                className="block text-accent-lime"
                initial={reduced ? false : { y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: NOSOTROS_EASE, delay: 0.08 }}
              >
                {h.titleMuted}
              </motion.span>
            </span>
          </h1>

          <motion.p
            className="n-body mt-6 max-w-lg text-lead font-light text-white/60 sm:mt-8"
            initial={reduced ? false : { y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: NOSOTROS_EASE, delay: 0.16 }}
          >
            {h.body}
          </motion.p>
        </div>

        <motion.ul
          className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:col-span-5 md:grid-cols-1 md:gap-4 lg:col-span-4"
          initial={reduced ? false : { y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: NOSOTROS_EASE, delay: 0.24 }}
        >
          {h.stats.map((stat) => (
            <li key={stat.label}>
              <GlassStatCard value={stat.value} label={stat.label} />
            </li>
          ))}
        </motion.ul>
      </div>
    </NosotrosShell>
  );
}
