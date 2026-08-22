"use client";

import Image from "next/image";
import { useRef, type RefObject } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap, registerGsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { Grain } from "@/components/ui/Grain";
import { EASE_OUT_EXPO, duration } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { HeroCopy } from "./HeroCopy";
import { ScrollCue } from "./ScrollCue";
import { HERO_FLOATS, HERO_INTRO } from "./constants";

type VariantProps = {
  /** Review mode: always visible, no GSAP, no entrance opacity trap */
  preview?: boolean;
  className?: string;
};

function useHeroParallax(
  root: RefObject<HTMLElement | null>,
  reduced: boolean | null,
  enabled: boolean,
) {
  useGSAP(
    () => {
      if (!enabled || reduced || !root.current) return;
      registerGsap();

      const media = root.current.querySelectorAll<HTMLElement>("[data-float]");
      media.forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -36 : 28,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      const fadeEls = root.current.querySelectorAll<HTMLElement>("[data-hero-fade]");
      fadeEls.forEach((el) => {
        gsap.to(el, {
          opacity: 0.15,
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      const scaleEls = root.current.querySelectorAll<HTMLElement>("[data-hero-scale]");
      scaleEls.forEach((el) => {
        gsap.to(el, {
          scale: 1.08,
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
    { scope: root, dependencies: [reduced, enabled] },
  );

  useGSAP(() => {
    if (!enabled) return;
    ScrollTrigger.refresh();
  }, [enabled]);
}

/* ═══════════════════════════════════════════════════════════
   B — Split editorial (review only — not on home critical path)
   ═══════════════════════════════════════════════════════════ */
export function HeroSplit({ preview, className }: VariantProps) {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const skipMotion = !!preview || !!reduced;
  useHeroParallax(root, reduced, !preview);

  return (
    <section
      ref={root}
      className={cn(
        "relative flex flex-col justify-center overflow-hidden bg-paper",
        preview ? "min-h-[78vh] pt-6 md:min-h-[85vh]" : "min-h-dvh pt-header",
        className,
      )}
      aria-label="Inicio"
    >
      <Grain />
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[60vw] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial-glow opacity-80"
        aria-hidden
      />

      <div
        data-hero-fade
        className="relative z-[2] mx-auto grid w-full max-w-site items-center gap-10 px-gutter py-14 md:grid-cols-12 md:gap-8 md:py-20"
      >
        <HeroCopy className="md:col-span-6 lg:col-span-6" compact static={!!preview} />

        <motion.div
          data-float
          className="relative md:col-span-6 lg:col-span-6"
          initial={skipMotion ? false : { opacity: 0, x: 40, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{
            delay: skipMotion ? 0 : 0.25,
            duration: duration.slow,
            ease: EASE_OUT_EXPO,
          }}
        >
          <div className="relative mx-auto max-w-md md:ml-auto md:max-w-none">
            <div
              className="absolute -left-3 -top-3 z-[1] hidden h-16 w-16 border-l-2 border-t-2 border-accent md:block"
              aria-hidden
            />
            <div
              className="absolute -bottom-3 -right-3 z-[1] hidden h-16 w-16 border-b-2 border-r-2 border-accent-lime md:block"
              aria-hidden
            />

            <div className="border-ink/10 relative overflow-hidden rounded-card border bg-ink shadow-lg">
              <div className="relative aspect-square w-full">
                <Image
                  src={HERO_INTRO.src}
                  alt={HERO_INTRO.alt}
                  fill
                  priority={!preview}
                  sizes="(max-width: 768px) 90vw, 42vw"
                  className="object-cover"
                />
              </div>
              <div className="from-ink/80 absolute inset-x-0 bottom-0 bg-gradient-to-t to-transparent p-5">
                <p className="tracking-label font-mono text-[0.6rem] uppercase text-accent-lime">
                  01 · New intro
                </p>
                <p className="mt-1 font-display text-display-sm text-paper">Arinsal</p>
              </div>
            </div>

            <motion.div
              data-float
              className="border-ink/10 absolute -bottom-6 -left-4 hidden w-24 overflow-hidden rounded-md border shadow-md sm:block md:-left-8 md:w-28"
              initial={skipMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: skipMotion ? 0 : 0.55,
                duration: duration.slow,
                ease: EASE_OUT_EXPO,
              }}
            >
              <Image
                src={HERO_FLOATS[0].src}
                alt=""
                width={120}
                height={140}
                className="h-auto w-full object-cover"
                sizes="120px"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      <ScrollCue static={!!preview} />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   C — Float protagonista
   ═══════════════════════════════════════════════════════════ */
export function HeroFeatured({ preview, className }: VariantProps) {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const skipMotion = !!preview || !!reduced;
  useHeroParallax(root, reduced, !preview);

  return (
    <section
      ref={root}
      className={cn(
        "relative flex flex-col justify-center overflow-hidden bg-paper",
        preview ? "min-h-[78vh] pt-6 md:min-h-[85vh]" : "min-h-dvh pt-header",
        className,
      )}
      aria-label="Inicio"
    >
      <Grain />
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[60vw] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial-glow opacity-80"
        aria-hidden
      />

      <motion.div
        data-float
        className="border-ink/10 pointer-events-none absolute right-[2%] top-[14%] z-[1] hidden w-[min(38vw,420px)] overflow-hidden rounded-card border shadow-lg md:block lg:right-[4%] lg:top-[12%]"
        initial={skipMotion ? false : { opacity: 0, scale: 0.92, y: 28 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          delay: skipMotion ? 0 : 0.3,
          duration: duration.slow,
          ease: EASE_OUT_EXPO,
        }}
      >
        <div className="relative aspect-square w-full">
          <Image
            src={HERO_INTRO.src}
            alt=""
            fill
            priority={!preview}
            sizes="420px"
            className="object-cover"
          />
        </div>
        <div className="tracking-label absolute left-3 top-3 rounded-pill bg-accent-lime px-2.5 py-1 font-mono text-[0.55rem] uppercase text-ink">
          Intro
        </div>
      </motion.div>

      {HERO_FLOATS.slice(1).map((item) => (
        <motion.div
          key={item.alt}
          data-float
          className={cn(
            "border-ink/10 pointer-events-none absolute z-[1] overflow-hidden rounded-md border shadow-lg",
            item.className,
          )}
          initial={skipMotion ? false : { opacity: 0, scale: 0.9, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            delay: skipMotion ? 0 : item.delay,
            duration: duration.slow,
            ease: EASE_OUT_EXPO,
          }}
        >
          <Image
            src={item.src}
            alt=""
            width={200}
            height={260}
            className="h-auto w-full object-cover"
            sizes="200px"
          />
        </motion.div>
      ))}

      <motion.div
        className="relative z-[2] mx-auto w-full max-w-sm px-gutter pt-6 md:hidden"
        initial={skipMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: duration.base, ease: EASE_OUT_EXPO }}
      >
        <div className="border-ink/10 relative aspect-[4/3] overflow-hidden rounded-card border shadow-md">
          <Image
            src={HERO_INTRO.src}
            alt={HERO_INTRO.alt}
            fill
            priority={!preview}
            sizes="90vw"
            className="object-cover"
          />
        </div>
      </motion.div>

      <div
        data-hero-fade
        className="relative z-[2] mx-auto w-full max-w-site px-gutter py-12 md:py-22"
      >
        <HeroCopy static={!!preview} />
      </div>

      <ScrollCue static={!!preview} />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   D — Poster collagé
   ═══════════════════════════════════════════════════════════ */
export function HeroPoster({ preview, className }: VariantProps) {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const skipMotion = !!preview || !!reduced;
  useHeroParallax(root, reduced, !preview);

  return (
    <section
      ref={root}
      className={cn(
        "relative flex flex-col justify-center overflow-hidden bg-paper-warm",
        preview ? "min-h-[78vh] pt-6 md:min-h-[85vh]" : "min-h-dvh pt-header",
        className,
      )}
      aria-label="Inicio"
    >
      <Grain />

      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="bg-accent-lime/40 absolute -left-8 top-28 h-32 w-32 rotate-12 md:h-44 md:w-44" />
        <div className="bg-accent/25 absolute bottom-24 right-[6%] h-24 w-24 -rotate-6 md:h-32 md:w-32" />
        <div className="bg-accent-cool/20 absolute right-[20%] top-[18%] h-16 w-40" />
      </div>

      <div
        data-hero-fade
        className="relative z-[2] mx-auto grid w-full max-w-site items-center gap-12 px-gutter py-14 md:grid-cols-12 md:gap-6 md:py-20"
      >
        <div className="order-2 md:order-1 md:col-span-6 lg:col-span-5">
          <HeroCopy compact static={!!preview} />
        </div>

        <div className="order-1 md:order-2 md:col-span-6 lg:col-span-7">
          <div className="relative mx-auto max-w-md md:max-w-lg lg:max-w-xl">
            <motion.div
              className="tracking-label absolute -left-4 top-8 z-[3] rotate-[-12deg] rounded-pill border-2 border-ink bg-accent-lime px-3 py-1.5 font-mono text-[0.6rem] uppercase text-ink shadow-[3px_3px_0_0_var(--color-ink)] md:-left-8 md:top-12"
              initial={skipMotion ? false : { opacity: 0, scale: 0.8, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: -12 }}
              transition={{
                delay: skipMotion ? 0 : 0.5,
                duration: duration.base,
                ease: EASE_OUT_EXPO,
              }}
            >
              Insert craft
            </motion.div>

            <motion.div
              className="tracking-label absolute -right-2 bottom-16 z-[3] rotate-[8deg] rounded-pill border-2 border-ink bg-accent px-3 py-1.5 font-mono text-[0.6rem] uppercase text-paper shadow-[3px_3px_0_0_var(--color-ink)] md:bottom-20 md:right-0"
              initial={skipMotion ? false : { opacity: 0, scale: 0.8, rotate: 16 }}
              animate={{ opacity: 1, scale: 1, rotate: 8 }}
              transition={{
                delay: skipMotion ? 0 : 0.6,
                duration: duration.base,
                ease: EASE_OUT_EXPO,
              }}
            >
              Andorra
            </motion.div>

            <motion.div
              data-float
              className="relative rotate-3 overflow-hidden rounded-card border-2 border-ink bg-ink shadow-[8px_8px_0_0_var(--color-ink)] md:rotate-[4deg]"
              initial={skipMotion ? false : { opacity: 0, y: 32, rotate: 8 }}
              animate={{ opacity: 1, y: 0, rotate: 4 }}
              transition={{
                delay: skipMotion ? 0 : 0.2,
                duration: duration.slow,
                ease: EASE_OUT_EXPO,
              }}
            >
              <div className="relative aspect-[5/6] w-full sm:aspect-square">
                <Image
                  src={HERO_INTRO.src}
                  alt={HERO_INTRO.alt}
                  fill
                  priority={!preview}
                  sizes="(max-width: 768px) 90vw, 48vw"
                  className="object-cover"
                />
              </div>
              <div className="bg-ink/50 absolute inset-x-0 top-0 flex items-center justify-between px-4 py-3 backdrop-blur-[2px]">
                <span className="tracking-label text-paper/70 font-mono text-[0.55rem] uppercase">
                  Vertical · 2026
                </span>
                <span className="tracking-label font-mono text-[0.55rem] uppercase text-accent-lime">
                  ARINSAL
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <ScrollCue static={!!preview} />
    </section>
  );
}
