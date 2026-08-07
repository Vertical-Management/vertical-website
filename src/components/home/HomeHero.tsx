"use client";

import Image from "next/image";
import NextLink from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap, registerGsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { asset } from "@/lib/assets";
import { SITE } from "@/lib/constants";
import { CoinButton } from "@/components/home/CoinButton";
import { RotatingWords } from "@/components/home/RotatingWords";
import { Grain } from "@/components/ui/Grain";
import { Magnetic } from "@/components/ui/Magnetic";
import { EASE_OUT_EXPO, duration } from "@/lib/motion";
import { cn } from "@/lib/utils";

const FLOATS = [
  {
    src: asset("/assets/PAG BRANDING CAFETEROS CO/CCDC1.webp"),
    alt: "Cafeteros Co.",
    className:
      "right-[4%] top-[18%] hidden w-[140px] rotate-6 md:block lg:w-[180px] xl:w-[200px]",
    delay: 0.45,
  },
  {
    src: asset("/assets/PAG KOAJ 3D/FEP KOAJ1.webp"),
    alt: "KOAJ 3D",
    className:
      "bottom-[18%] left-[3%] hidden w-[120px] -rotate-3 sm:block lg:w-[160px]",
    delay: 0.55,
  },
  {
    src: asset("/assets/PAG UX_UI PEDIGREE/UNIVERSITY GROW BOOK.webp"),
    alt: "UX Pedigree",
    className:
      "bottom-[22%] right-[12%] hidden w-[110px] rotate-[-8deg] lg:block xl:w-[140px]",
    delay: 0.65,
  },
];

/**
 * Immersive home hero — impact type, arcade CTA, floating work previews.
 */
export function HomeHero() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !root.current) return;
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

      gsap.to("[data-hero-fade]", {
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
    },
    { scope: root, dependencies: [reduced] },
  );

  // Refresh ScrollTrigger after layout
  useGSAP(() => {
    ScrollTrigger.refresh();
  }, []);

  return (
    <section
      ref={root}
      className="relative flex min-h-dvh flex-col justify-center overflow-hidden pt-header"
      aria-label="Inicio"
    >
      <Grain />

      {/* Soft radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[60vw] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial-glow opacity-80"
        aria-hidden
      />

      {/* Floating project stills */}
      {FLOATS.map((item) => (
        <motion.div
          key={item.alt}
          data-float
          className={cn(
            "pointer-events-none absolute z-[1] overflow-hidden rounded-md border border-ink/10 shadow-lg",
            item.className,
          )}
          initial={reduced ? false : { opacity: 0, scale: 0.9, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            delay: reduced ? 0 : item.delay,
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
            priority={false}
          />
        </motion.div>
      ))}

      <div
        data-hero-fade
        className="relative z-[2] mx-auto w-full max-w-site px-gutter py-16 md:py-22"
      >
        <motion.p
          className="mb-6 font-mono text-caption uppercase tracking-label text-ink-muted md:mb-8"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.base, ease: EASE_OUT_EXPO }}
        >
          {SITE.location} · {SITE.founder} · Creative Management
        </motion.p>

        <h1 className="max-w-[16ch] font-display text-display-2xl text-ink">
          <motion.span
            className="block"
            initial={reduced ? false : { y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: duration.slow,
              ease: EASE_OUT_EXPO,
              delay: 0.05,
            }}
          >
            Creamos
          </motion.span>
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={reduced ? false : { y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: duration.slow,
                ease: EASE_OUT_EXPO,
                delay: 0.14,
              }}
            >
              marcas que van
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={reduced ? false : { y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: duration.slow,
                ease: EASE_OUT_EXPO,
                delay: 0.22,
              }}
            >
              <RotatingWords />
            </motion.span>
          </span>
        </h1>

        <motion.p
          className="mt-8 max-w-md text-lead text-ink-soft md:mt-10"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: reduced ? 0 : 0.4,
            duration: duration.slow,
            ease: EASE_OUT_EXPO,
          }}
        >
          {SITE.name}. Branding, digital, motion y estrategia con craft de
          estudio y humor de arcade. Sin plantillas. Con intención.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-4 md:mt-12"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: reduced ? 0 : 0.5,
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
              className="inline-flex h-16 items-center rounded-pill border border-border-strong px-8 text-base font-medium text-ink transition-colors duration-base ease-out-expo hover:border-ink hover:bg-ink hover:text-paper"
            >
              Ver proyectos
            </NextLink>
          </Magnetic>
        </motion.div>

        <motion.div
          className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.65rem] uppercase tracking-label text-ink-muted"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduced ? 0 : 0.7 }}
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

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-[2] flex -translate-x-1/2 flex-col items-center gap-2"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        aria-hidden
      >
        <span className="font-mono text-[0.6rem] uppercase tracking-label text-ink-muted">
          Scroll
        </span>
        <span className="relative h-10 w-px overflow-hidden bg-ink/15">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-pulse-soft bg-accent" />
        </span>
      </motion.div>
    </section>
  );
}
