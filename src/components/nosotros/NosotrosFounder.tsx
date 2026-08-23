"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { asset } from "@/lib/assets";
import { SITE } from "@/lib/constants";
import { NosotrosShell, useNosotrosReveal } from "./primitives";

/**
 * Founder profile — large dark glass card.
 */
export function NosotrosFounder() {
  const { t } = useLanguage();
  const f = t.nosotrosPage.founder;
  const reveal = useNosotrosReveal();

  return (
    <NosotrosShell
      tone="dark"
      className="px-5 py-12 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:px-16"
    >
      <div className="relative z-[1] grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
        <motion.div
          className="relative lg:col-span-5"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="n-glass n-glass--lg relative aspect-[4/5] overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/5 md:backdrop-blur-[20px]">
            <Image
              src={asset("/assets/FERRER.webp")}
              alt={SITE.founder}
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent p-5">
              <p className="n-label text-accent-lime">{f.role}</p>
              <p className="n-heading mt-1 font-display text-display-sm text-white">
                {SITE.founder}
              </p>
            </div>
          </div>
          <p className="n-label mt-4 text-white/50">
            {f.basedIn} {SITE.location}
          </p>
        </motion.div>

        <div className="relative z-[1] lg:col-span-7 lg:pl-4">
          <motion.p
            className="n-label mb-4 text-white/45"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            03 — {f.eyebrow}
          </motion.p>
          <motion.h2
            className="n-heading max-w-lg font-display text-display-md text-white"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            {f.titleLine1}
            <br />
            <span className="text-white/45">{f.titleLine2}</span>
          </motion.h2>

          <div className="mt-8 max-w-lg space-y-4">
            {f.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                className="n-body text-base font-light leading-relaxed text-white/60 md:text-lg"
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {p}
              </motion.p>
            ))}
          </div>

          <ul className="mt-10 grid gap-3 sm:grid-cols-3">
            {f.stats.map((stat) => (
              <li key={stat.label}>
                <article className="n-glass h-full rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-4 md:backdrop-blur-md">
                  <span className="n-label text-white/45">{stat.label}</span>
                  <p className="mt-1.5 font-display text-base font-medium tracking-tight text-white">
                    {stat.value}
                  </p>
                </article>
              </li>
            ))}
          </ul>

          <motion.blockquote
            className="n-glass mt-10 rounded-[1.25rem] border border-white/10 bg-white/5 p-5 sm:p-6 md:backdrop-blur-md"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <p className="n-heading font-display text-display-sm tracking-tight text-white md:text-display-md">
              “{f.quote}”
            </p>
          </motion.blockquote>
        </div>
      </div>
    </NosotrosShell>
  );
}
