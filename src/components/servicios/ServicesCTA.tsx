"use client";

import { useState } from "react";
import NextLink from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SITE, SOCIAL_LINKS } from "@/lib/constants";
import { CrtCaret, CrtPrompt } from "./CrtPrimitives";

/**
 * CRT close — `./contact --brief` + shell echo.
 */
export function ServicesCTA() {
  const { t } = useLanguage();
  const c = t.servicesPage.crt.contact;
  const echo = t.servicesPage.crt.echo;
  const command = `$ mail ${SITE.email}`;
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <section>
        <CrtPrompt command={c.command} />
        <div className="crt-panel p-4 md:p-5">
          <h2 className="crt-head text-lg font-semibold md:text-xl">
            {c.headline}
          </h2>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <p className="crt-panel crt-glow-text flex min-w-0 flex-1 items-center overflow-x-auto px-3 py-2 text-sm">
              <span>{c.mailLabel}</span>
              <span className="crt-head ml-2">{SITE.email}</span>
              <CrtCaret />
            </p>
            <button
              type="button"
              onClick={() => void copy()}
              className="crt-btn crt-btn--ghost"
              aria-label={`${c.copy} ${command}`}
            >
              {copied ? c.copied : c.copy}
            </button>
          </div>
          <ul className="mt-4 flex flex-wrap gap-2">
            {SOCIAL_LINKS.filter((s) => s.label !== "Email").map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    s.href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="crt-pill hover:border-[var(--crt-lime)] hover:text-[var(--crt-lime)]"
                >
                  {s.label.toLowerCase()}
                </a>
              </li>
            ))}
            <li>
              <NextLink href="/proyectos" className="crt-pill hover:text-[var(--crt-lime)]">
                {t.servicesPage.cta.viewProjects.replace(" →", "").toLowerCase()}
              </NextLink>
            </li>
            <li>
              <NextLink href="/contacto" className="crt-pill crt-pill--accent">
                {t.header.insertCoin.toLowerCase()}
              </NextLink>
            </li>
          </ul>
        </div>
      </section>

      <footer className="crt-muted flex flex-col gap-2 border-t border-white/10 pt-4 text-[0.65rem] sm:flex-row sm:items-center sm:justify-between">
        <p className="crt-copy">{echo.line}</p>
        <p>{echo.git}</p>
      </footer>
    </>
  );
}
