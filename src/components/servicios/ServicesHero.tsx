"use client";

import NextLink from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { CrtCaret, CrtPrompt } from "./CrtPrimitives";

/**
 * CRT hero — `whoami --services`.
 */
export function ServicesHero() {
  const { t } = useLanguage();
  const h = t.servicesPage.hero;
  const w = t.servicesPage.crt.whoami;

  return (
    <section aria-labelledby="crt-whoami">
      <CrtPrompt command={w.command} />
      <h1 id="crt-whoami" className="crt-banner">
        {w.banner}
      </h1>
      <p className="crt-glow-text mt-3 text-sm leading-relaxed md:text-base">{w.role}</p>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#5f8d68] md:text-[0.95rem]">
        {h.body}
      </p>
      <ul className="mt-5 space-y-1.5 text-sm">
        {w.checks.map((check) => (
          <li key={check} className="text-[#2bbf5c]">
            <span className="crt-glow-text">[x]</span>{" "}
            <span className="text-[#5f8d68]">{check}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap gap-2.5">
        <a href="#crt-services" className="crt-btn crt-btn--solid">
          {w.lsCta}
        </a>
        <NextLink href="/contacto" className="crt-btn crt-btn--ghost">
          {w.contactCta}
          <CrtCaret className="ml-2 h-3.5" />
        </NextLink>
      </div>
    </section>
  );
}
