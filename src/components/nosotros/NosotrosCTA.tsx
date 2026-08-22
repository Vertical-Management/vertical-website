"use client";

import NextLink from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SITE } from "@/lib/constants";
import { InteractiveActionButton, NosotrosShell, useNosotrosReveal } from "./primitives";

/**
 * Closing CTA — next screen + interactive action button.
 */
export function NosotrosCTA() {
  const { t } = useLanguage();
  const c = t.nosotrosPage.cta;
  const reveal = useNosotrosReveal();

  return (
    <NosotrosShell
      tone="dark"
      className="px-5 py-16 sm:px-8 sm:py-20 md:px-12 md:py-24 lg:px-16"
    >
      <div className="relative z-[1] grid items-end gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <motion.p
            className="n-label text-white/40"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            {c.eyebrow}
          </motion.p>
          <motion.h2
            className="n-heading mt-4 font-display text-display-lg text-white"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            {c.titleLine1} <span className="text-accent-lime">{c.titleAccent}</span>
          </motion.h2>
          <motion.p
            className="n-body mt-6 max-w-md text-lead font-light text-white/55"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            {c.body}
          </motion.p>
        </div>
        <div className="flex flex-col items-start gap-4 lg:col-span-4 lg:items-end">
          <InteractiveActionButton href="/contacto">
            {c.startProject}
          </InteractiveActionButton>
          <NextLink
            href="/proyectos"
            data-cursor="hover"
            className="n-label text-white/45 transition-colors duration-300 hover:text-accent-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-lime"
          >
            {c.viewProjects}
          </NextLink>
          <a
            href={`mailto:${SITE.email}`}
            className="tracking-label font-mono text-caption uppercase text-white/35 transition-colors hover:text-white"
            data-cursor="hover"
          >
            {SITE.email}
          </a>
        </div>
      </div>
    </NosotrosShell>
  );
}
