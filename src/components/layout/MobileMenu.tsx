"use client";

import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import NextLink from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useNavigation } from "@/components/providers/NavigationProvider";
import { NavLink } from "@/components/layout/NavLink";
import { Grain } from "@/components/ui/Grain";
import { NAV_LINKS, SITE, SOCIAL_LINKS } from "@/lib/constants";
import { NAV_I18N_KEYS } from "@/lib/i18n";
import { EASE_IN_OUT_EXPO, EASE_OUT_EXPO, duration } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Fullscreen cinematic navigation overlay.
 * Staggered links, social rail, irreverent footer line.
 */
export function MobileMenu() {
  const { menuOpen, closeMenu } = useNavigation();
  const { t } = useLanguage();
  const reduced = useReducedMotion();

  const navLabel = (href: string) => {
    const key = NAV_I18N_KEYS[href as keyof typeof NAV_I18N_KEYS];
    return key ? t.nav[key] : href;
  };

  // Trap focus roughly: focus first link when open
  useEffect(() => {
    if (!menuOpen) return;
    const first = document.querySelector<HTMLElement>(
      "#mobile-navigation a[href]",
    );
    first?.focus({ preventScroll: true });
  }, [menuOpen]);

  const backdrop = reduced
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { clipPath: "inset(0 0 100% 0)" },
        animate: {
          clipPath: "inset(0 0 0% 0)",
          transition: { duration: duration.slow, ease: EASE_IN_OUT_EXPO },
        },
        exit: {
          clipPath: "inset(0 0 100% 0)",
          transition: { duration: duration.base, ease: EASE_IN_OUT_EXPO },
        },
      };

  return (
    <AnimatePresence mode="wait">
      {menuOpen ? (
        <motion.div
          key="mobile-menu"
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label={t.menu.ariaLabel}
          className={cn(
            "fixed inset-0 z-overlay flex flex-col bg-surface-inverse text-paper",
            "pt-[calc(var(--header-height)+0.5rem)]",
          )}
          {...backdrop}
        >
          <Grain strong />

          <div className="relative z-[1] flex min-h-0 flex-1 flex-col px-gutter pb-8">
            {/* Links */}
            <nav
              className="flex flex-1 flex-col justify-center"
              aria-label={t.menu.mainNav}
            >
              <ul className="mx-auto w-full max-w-site">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={reduced ? false : { opacity: 0, y: 40 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: reduced ? 0 : 0.18 + i * 0.07,
                        duration: duration.slow,
                        ease: EASE_OUT_EXPO,
                      },
                    }}
                    exit={
                      reduced
                        ? { opacity: 0 }
                        : {
                            opacity: 0,
                            y: -12,
                            transition: {
                              duration: duration.fast,
                              delay: (NAV_LINKS.length - i) * 0.03,
                            },
                          }
                    }
                  >
                    <NavLink
                      href={link.href}
                      label={navLabel(link.href)}
                      index={link.index}
                      variant="overlay"
                      onClick={closeMenu}
                    />
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Bottom meta */}
            <motion.div
              className="mx-auto flex w-full max-w-site flex-col gap-6 border-t border-white/10 pt-6 sm:flex-row sm:items-end sm:justify-between"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: reduced ? 0 : 0.45,
                  duration: duration.base,
                  ease: EASE_OUT_EXPO,
                },
              }}
              exit={{ opacity: 0 }}
            >
              <div>
                <p className="font-mono text-caption uppercase tracking-label text-white/40">
                  {SITE.location} · {SITE.founder}
                </p>
                <NextLink
                  href={`mailto:${SITE.email}`}
                  className="mt-2 inline-block font-display text-xl tracking-tight text-paper transition-colors duration-base hover:text-accent-lime"
                  data-cursor="hover"
                >
                  {SITE.email}
                </NextLink>
              </div>

              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {SOCIAL_LINKS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        s.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="font-mono text-caption uppercase tracking-label text-white/45 transition-colors duration-base hover:text-accent-lime"
                      data-cursor="hover"
                    >
                      {s.label}
                      {s.href.startsWith("http") ? " ↗" : ""}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.p
              className="mx-auto mt-6 w-full max-w-site font-mono text-[0.65rem] uppercase tracking-label text-white/25"
              initial={reduced ? false : { opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: reduced ? 0 : 0.55 },
              }}
            >
              No credits · Press start · Andorra
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
