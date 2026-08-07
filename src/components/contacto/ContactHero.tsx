"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";
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
      className="relative flex min-h-[70dvh] flex-col justify-end overflow-hidden pt-header md:min-h-[78dvh]"
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

      <div className="relative z-[1] mx-auto w-full max-w-site px-gutter pb-14 pt-28 md:pb-20 md:pt-36">
        <motion.p
          className="mb-5 font-mono text-caption uppercase tracking-label text-white/50"
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.base, ease: EASE_OUT_EXPO }}
        >
          04 — Contacto · {SITE.location}
        </motion.p>

        <h1 className="max-w-4xl font-display text-display-2xl text-paper">
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={reduced ? false : { y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: duration.slow, ease: EASE_OUT_EXPO }}
            >
              Insert coin
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
              hablemos.
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
          Desde las montañas de {SITE.location} (y el Wi‑Fi del mundo). Cuéntanos
          el proyecto — sin PowerPoint obligatorio.
        </motion.p>
      </div>
    </section>
  );
}
