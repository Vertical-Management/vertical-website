"use client";

import NextLink from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useDesktop } from "@/components/proyectos/DesktopContext";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { projects } from "@/data/projects";
import { SITE } from "@/lib/constants";
import { EASE_OUT_EXPO, duration } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Start menu — neo-retro, projects + site links.
 */
export function StartMenu() {
  const { startOpen, setStartOpen, openWindow } = useDesktop();
  const reduced = useReducedMotion();
  const { t } = useLanguage();

  if (!startOpen) return null;

  return (
    <>
      <button
        type="button"
        className="absolute inset-0 z-[90] cursor-default bg-black/20"
        aria-label={t.desktop.closeMenu}
        onClick={() => setStartOpen(false)}
      />
      <motion.div
        role="menu"
        className={cn(
          "absolute bottom-14 left-2 z-[95] flex w-[min(100%-1rem,340px)] overflow-hidden rounded-xl",
          "border border-white/15 bg-[#161618]/95 shadow-lg backdrop-blur-xl",
        )}
        initial={reduced ? false : { opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: duration.fast, ease: EASE_OUT_EXPO }}
      >
        <div className="from-accent-lime/90 flex w-12 flex-col items-center justify-end gap-2 bg-gradient-to-b to-accent py-3">
          <span className="mb-auto rotate-180 font-display text-[10px] font-bold tracking-[0.2em] text-ink [writing-mode:vertical-rl]">
            VERTICAL
          </span>
        </div>

        <div className="min-w-0 flex-1 p-2">
          <p className="tracking-label px-2 py-1.5 font-mono text-[10px] uppercase text-white/40">
            {t.desktop.projects}
          </p>
          <ul>
            {projects.map((p) => (
              <li key={p.slug}>
                <button
                  type="button"
                  role="menuitem"
                  data-cursor="hover"
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-paper transition-colors hover:bg-white/10"
                  onClick={() => openWindow(`project:${p.slug}`, p.title)}
                >
                  <span className="text-accent-lime" aria-hidden>
                    ▸
                  </span>
                  {p.title}
                </button>
              </li>
            ))}
          </ul>

          <div className="my-2 h-px bg-white/10" />

          <p className="tracking-label px-2 py-1.5 font-mono text-[10px] uppercase text-white/40">
            System
          </p>
          <ul>
            <li>
              <button
                type="button"
                role="menuitem"
                className="flex w-full rounded-lg px-2 py-2 text-left text-sm text-paper hover:bg-white/10"
                onClick={() => openWindow("readme")}
              >
                {t.desktop.readme}
              </button>
            </li>
            <li>
              <button
                type="button"
                role="menuitem"
                className="flex w-full rounded-lg px-2 py-2 text-left text-sm text-paper hover:bg-white/10"
                onClick={() => openWindow("about")}
              >
                {t.desktop.about}
              </button>
            </li>
            <li>
              <NextLink
                href="/servicios"
                role="menuitem"
                className="flex w-full rounded-lg px-2 py-2 text-sm text-paper hover:bg-white/10"
                onClick={() => setStartOpen(false)}
              >
                {t.nav.services} →
              </NextLink>
            </li>
            <li>
              <NextLink
                href="/contacto"
                role="menuitem"
                className="flex w-full rounded-lg px-2 py-2 text-sm text-accent-lime hover:bg-white/10"
                onClick={() => setStartOpen(false)}
              >
                {t.nav.contact} →
              </NextLink>
            </li>
          </ul>

          <p className="mt-2 px-2 pb-1 font-mono text-[9px] text-white/30">
            {SITE.founder} · {SITE.location}
          </p>
        </div>
      </motion.div>
    </>
  );
}
