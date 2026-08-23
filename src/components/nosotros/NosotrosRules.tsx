"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { NosotrosShell, useNosotrosReveal } from "./primitives";

/**
 * House rules — glass cards on a clean zinc shell.
 */
export function NosotrosRules() {
  const { t } = useLanguage();
  const r = t.nosotrosPage.rules;
  const reveal = useNosotrosReveal();

  return (
    <NosotrosShell
      tone="light"
      ariaLabel={r.ariaLabel}
      className="px-5 py-16 sm:px-8 sm:py-20 md:px-12 md:py-24 lg:px-16"
    >
      <motion.p
        className="n-label mb-8 text-zinc-500 md:mb-10"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        02 — {r.eyebrow}
      </motion.p>

      <ul className="grid gap-3 sm:grid-cols-2 md:gap-4">
        {r.items.map((rule, i) => (
          <motion.li
            key={rule.code}
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: i * 0.05 }}
          >
            <article className="relative h-full overflow-hidden rounded-[1.25rem] bg-gradient-to-b from-zinc-900 to-black p-6 text-white sm:p-7 md:p-8">
              <span className="n-grain" aria-hidden />
              <p
                aria-hidden
                className="pointer-events-none absolute -right-2 top-4 select-none font-display text-[4.5rem] font-semibold leading-none tracking-[-0.06em] text-white/[0.04] blur-[1px] sm:text-[5.5rem]"
              >
                {rule.punch}
              </p>
              <div className="n-glass n-glass--lg relative z-[1] h-full rounded-[1.25rem] border border-white/10 bg-white/5 p-5 sm:p-6 md:backdrop-blur-[20px]">
                <p className="n-label text-accent-lime">{rule.code}</p>
                <h3 className="n-heading mt-4 font-display text-display-sm text-white md:text-display-md">
                  {rule.title}
                </h3>
                <p className="n-body mt-4 max-w-md text-base font-light leading-relaxed text-white/60">
                  {rule.body}
                </p>
              </div>
            </article>
          </motion.li>
        ))}
      </ul>
    </NosotrosShell>
  );
}
