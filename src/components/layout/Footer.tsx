"use client";

import NextLink from "next/link";
import { Logo } from "@/components/layout/Logo";
import { NavLink } from "@/components/layout/NavLink";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Grain } from "@/components/ui/Grain";
import { Magnetic } from "@/components/ui/Magnetic";
import { socialIconFor } from "@/components/ui/SocialIcons";
import { NAV_LINKS, SITE, SOCIAL_LINKS } from "@/lib/constants";
import { NAV_I18N_KEYS } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Site footer — compact close: manifesto line, nav, social with icons, legal.
 */
export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const navLabel = (href: string) => {
    const key = NAV_I18N_KEYS[href as keyof typeof NAV_I18N_KEYS];
    return key ? t.nav[key] : href;
  };

  return (
    <footer
      role="contentinfo"
      className="relative mt-auto overflow-hidden border-t border-border bg-paper-warm"
    >
      <Grain />

      <div className="relative z-[1] mx-auto max-w-site px-gutter py-14 md:py-20">
        {/* Closing manifesto */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-caption uppercase tracking-label text-ink-muted">
            {t.footer.letsTalk}
          </p>
          <h2 className="mt-4 font-display text-display-md text-ink md:text-display-lg">
            {t.footer.ctaLine1}{" "}
            <span className="text-accent">{t.footer.ctaAccent}</span>
            {t.footer.ctaLine2 ? ` ${t.footer.ctaLine2}` : ""}
          </h2>
          <Magnetic strength={14} className="mt-8 inline-flex">
            <NextLink
              href="/contacto"
              data-cursor="hover"
              className={cn(
                "inline-flex h-12 items-center rounded-pill border-2 border-ink bg-accent-lime px-7",
                "font-mono text-xs uppercase tracking-[0.14em] text-ink",
                "shadow-[3px_3px_0_0_var(--color-ink)]",
                "transition-[transform,box-shadow] duration-base ease-out-expo",
                "hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0_0_var(--color-ink)]",
              )}
            >
              {t.footer.writeContact}
            </NextLink>
          </Magnetic>
        </div>

        {/* Giant wordmark */}
        <div className="mt-14 overflow-hidden text-center md:mt-18">
          <p
            className="select-none font-display text-[clamp(3.25rem,16vw,12rem)] font-extrabold leading-[0.85] tracking-display text-ink/[0.07]"
            aria-hidden
          >
            VERTICAL
          </p>
        </div>

        {/* Nav + social — centered, balanced */}
        <div className="mx-auto mt-12 grid max-w-3xl gap-10 border-t border-border pt-10 sm:grid-cols-2">
          <div className="text-center sm:text-left">
            <Logo magnetic={false} size="md" className="mx-auto sm:mx-0" />
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              {t.site.pitch}
            </p>
            <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-label text-ink-faint">
              {SITE.location} · {SITE.founder}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-center sm:text-left">
            <div>
              <p className="font-mono text-caption uppercase tracking-label text-ink-muted">
                {t.footer.navigate}
              </p>
              <ul className="mt-4 flex flex-col items-center gap-2.5 sm:items-start">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <NavLink
                      href={link.href}
                      label={navLabel(link.href)}
                      index={link.index}
                      variant="footer"
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono text-caption uppercase tracking-label text-ink-muted">
                {t.footer.social}
              </p>
              <ul className="mt-4 flex flex-col items-center gap-3 sm:items-start">
                {SOCIAL_LINKS.map((s) => {
                  const Icon = socialIconFor(s.label);
                  return (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target={s.href.startsWith("http") ? "_blank" : undefined}
                        rel={
                          s.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        data-cursor="hover"
                        className="group inline-flex items-center gap-2 text-sm text-ink-soft transition-colors duration-base hover:text-ink"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-paper text-ink transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                          <Icon className="h-3.5 w-3.5" title="" />
                        </span>
                        <span className="font-medium text-ink">{s.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Legal row */}
        <div className="mt-12 flex flex-col items-center gap-3 border-t border-border pt-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <p
            className="font-mono text-[0.65rem] uppercase tracking-label text-ink-faint"
            suppressHydrationWarning
          >
            © {year} {SITE.name}. {t.footer.highScores}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-mono text-[0.65rem] uppercase tracking-label text-ink-faint">
            <NextLink
              href="/aviso-legal"
              data-cursor="hover"
              className="transition-colors hover:text-ink"
            >
              {t.footer.legalNotice}
            </NextLink>
            <NextLink
              href="/privacidad"
              data-cursor="hover"
              className="transition-colors hover:text-ink"
            >
              {t.footer.privacy}
            </NextLink>
            <NextLink
              href="/cookies"
              data-cursor="hover"
              className="transition-colors hover:text-ink"
            >
              {t.footer.cookies}
            </NextLink>
            <span className="hidden sm:inline">·</span>
            <span>
              {t.footer.madeIn} {SITE.location}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
