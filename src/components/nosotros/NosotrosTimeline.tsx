"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";
import { NosotrosShell, useNosotrosReveal } from "./primitives";

/**
 * Origin story — five numbered spawn steps.
 */
export function NosotrosTimeline() {
  const { t, locale } = useLanguage();
  const tl = t.nosotrosPage.timeline;
  const reveal = useNosotrosReveal();

  return (
    <NosotrosShell tone="light" className="px-5 py-14 sm:px-8 sm:py-16 md:px-12 md:py-20 lg:px-16">
      <div className="max-w-2xl">
        <motion.p
          className="n-label mb-4 text-zinc-500"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          01 — {tl.eyebrow}
        </motion.p>
        <motion.h2
          className="n-heading font-display text-display-md text-zinc-900 md:text-display-lg"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          {tl.titleLine1}
          <br />
          <span className="text-zinc-500">{tl.titleLine2}</span>
        </motion.h2>
        <motion.p
          className="n-body mt-6 max-w-lg text-lead"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          {tl.body}
        </motion.p>
      </div>

      <ol className="mt-12 grid gap-3 md:mt-16 md:gap-4">
        {tl.saves.map((save, i) => (
          <motion.li
            key={`${locale}-${save.index}`}
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: i * 0.04 }}
          >
            <article
              className={cn(
                "rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6 md:p-8",
                "transition-[transform,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                "hover:border-zinc-300 hover:shadow-md motion-safe:hover:scale-[1.01]",
              )}
            >
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="n-label text-zinc-900">{save.index}</span>
                <span className="n-label rounded-full border border-zinc-200 bg-zinc-100 px-2.5 py-0.5 text-[0.6rem] text-zinc-500">
                  {save.label}
                </span>
              </div>
              <h3 className="n-heading mt-3 font-display text-display-sm tracking-tight text-zinc-900 md:text-display-md">
                {save.title}
              </h3>
              <p className="n-body mt-3 max-w-2xl text-base leading-relaxed md:text-lg">
                {save.body}
              </p>
            </article>
          </motion.li>
        ))}
      </ol>
    </NosotrosShell>
  );
}
