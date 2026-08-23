"use client";

import NextLink from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { CrtCaret, CrtPrompt } from "./CrtPrimitives";

/**
 * CRT hero — `whoami --services`.
 */
function highlightSage(text: string, marks: string[]) {
  if (marks.length === 0) return text;
  const escaped = marks
    .filter(Boolean)
    .map((m) => m.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  if (escaped.length === 0) return text;
  const re = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(re);
  return parts.map((part, i) =>
    marks.some((m) => m.toLowerCase() === part.toLowerCase()) ? (
      <span key={`${part}-${i}`} className="crt-glow-text">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

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
      <p className="crt-copy mt-4 max-w-2xl text-sm leading-relaxed md:text-[0.95rem]">
        {highlightSage(h.body, w.highlights ?? [])}
      </p>
      <ul className="mt-5 space-y-1.5 text-sm">
        {w.checks.map((check) => (
          <li key={check}>
            <span className="crt-glow-text">[x]</span>{" "}
            <span className="crt-copy">{check}</span>
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
