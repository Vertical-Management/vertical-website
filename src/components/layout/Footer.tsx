"use client";

import NextLink from "next/link";
import { Logo } from "@/components/layout/Logo";
import { NavLink } from "@/components/layout/NavLink";
import { Marquee, MarqueeItem } from "@/components/ui/Marquee";
import { Grain } from "@/components/ui/Grain";
import { Magnetic } from "@/components/ui/Magnetic";
import { NAV_LINKS, SITE, SOCIAL_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const MARQUEE = [
  "Branding",
  "Digital",
  "Motion",
  "3D",
  "Estrategia",
  "Andorra",
  "Playful High-Craft",
  "Insert Coin",
];

/**
 * Site footer — editorial wordmark, nav, social, irreverent meta.
 */
export function Footer() {
  // Fixed at build-ish render; suppressHydrationWarning avoids year-boundary flicker
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="relative mt-auto overflow-hidden border-t border-border bg-paper-warm"
    >
      <Grain />

      {/* Marquee strip */}
      <div className="relative z-[1] border-b border-border py-4">
        <Marquee speed="normal" gap="2.5rem">
          {MARQUEE.map((item) => (
            <MarqueeItem key={item}>
              <span className="font-display text-display-sm text-ink/70">
                {item}
              </span>
              <span className="text-accent" aria-hidden>
                ✦
              </span>
            </MarqueeItem>
          ))}
        </Marquee>
      </div>

      <div className="relative z-[1] mx-auto max-w-site px-gutter py-16 md:py-22">
        {/* CTA row */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="font-mono text-caption uppercase tracking-label text-ink-muted">
              ¿Hablamos?
            </p>
            <h2 className="mt-3 font-display text-display-md text-ink">
              Hagamos algo
              <br />
              <span className="text-accent">verticalmente</span> memorable.
            </h2>
          </div>

          <Magnetic strength={16}>
            <NextLink
              href="/contacto"
              data-cursor="hover"
              className={cn(
                "inline-flex h-14 items-center rounded-pill border-2 border-ink bg-accent-lime px-8",
                "font-mono text-xs uppercase tracking-[0.14em] text-ink",
                "shadow-[4px_4px_0_0_var(--color-ink)]",
                "transition-[transform,box-shadow] duration-base ease-out-expo",
                "hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0_0_var(--color-ink)]",
              )}
            >
              Insert coin → Contacto
            </NextLink>
          </Magnetic>
        </div>

        {/* Giant wordmark */}
        <div className="mt-16 overflow-hidden md:mt-22">
          <p
            className="select-none font-display text-[clamp(3.5rem,18vw,14rem)] font-extrabold leading-[0.85] tracking-display text-ink/[0.07]"
            aria-hidden
          >
            VERTICAL
          </p>
        </div>

        {/* Columns */}
        <div className="mt-12 grid gap-10 border-t border-border pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo magnetic={false} size="md" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
              {SITE.pitch}
              <br />
              {SITE.location} · {SITE.founder}.
            </p>
          </div>

          <div>
            <p className="font-mono text-caption uppercase tracking-label text-ink-muted">
              Navegar
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <NavLink
                    href={link.href}
                    label={link.label}
                    index={link.index}
                    variant="footer"
                  />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-caption uppercase tracking-label text-ink-muted">
              Social
            </p>
            <ul className="mt-4 flex flex-col gap-3">
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
                    data-cursor="hover"
                    className="group flex flex-col gap-0.5 text-sm text-ink-soft transition-colors duration-base hover:text-ink"
                  >
                    <span className="inline-flex items-center gap-1">
                      <span className="link-underline font-medium text-ink">
                        {s.label}
                      </span>
                      {s.href.startsWith("http") ? (
                        <span className="opacity-40 transition-opacity group-hover:opacity-80">
                          ↗
                        </span>
                      ) : null}
                    </span>
                    <span className="font-mono text-[0.65rem] tracking-label text-ink-faint">
                      {s.handle}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-caption uppercase tracking-label text-ink-muted">
              Contacto
            </p>
            <a
              href={`mailto:${SITE.email}`}
              data-cursor="hover"
              className="mt-4 inline-block text-sm text-ink-soft transition-colors duration-base hover:text-accent"
            >
              <span className="link-underline">{SITE.email}</span>
            </a>
            <p className="mt-3 text-sm text-ink-muted">{SITE.location}</p>
          </div>
        </div>

        {/* Legal row */}
        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p
            className="font-mono text-[0.65rem] uppercase tracking-label text-ink-faint"
            suppressHydrationWarning
          >
            © {year} {SITE.name}. Todos los coins reservados.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.65rem] uppercase tracking-label text-ink-faint">
            <NextLink
              href="/privacidad"
              data-cursor="hover"
              className="transition-colors hover:text-ink"
            >
              Privacidad
            </NextLink>
            <a
              href={`mailto:${SITE.email}`}
              data-cursor="hover"
              className="transition-colors hover:text-ink"
            >
              {SITE.email}
            </a>
            <span className="hidden sm:inline">·</span>
            <span>Hecho con craft · sin plantillas</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
