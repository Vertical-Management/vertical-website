"use client";

import { useMemo } from "react";
import NextLink from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { localizeServices } from "@/lib/i18n";
import { CrtPrompt } from "./CrtPrimitives";

/**
 * CRT services grid — `ls -la ~/services`.
 */
export function ServicesBlocks() {
  const { t } = useLanguage();
  const services = useMemo(() => localizeServices(t), [t]);
  const listing = t.servicesPage.crt.listing;
  const b = t.servicesPage.blocks;

  return (
    <section id="crt-services" aria-label={b.ariaLabel}>
      <CrtPrompt command={listing.command} />
      <h2 className="crt-head mb-4 text-sm font-semibold tracking-tight md:text-base">
        {listing.heading}
      </h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {listing.files.map((file) => {
          const service = services.find((s) => s.id === file.id);
          if (!service) return null;
          return (
            <li key={file.id} id={service.id}>
              <article className="crt-panel flex h-full flex-col p-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="crt-glow-text text-sm font-semibold">{file.name}</h3>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <span className="crt-muted text-[0.62rem]">{listing.perm}</span>
                    {file.tag ? (
                      <span className="crt-pill crt-pill--accent">{file.tag}</span>
                    ) : null}
                  </div>
                </div>
                <p className="crt-copy mt-3 text-sm leading-relaxed">
                  {service.description}
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {(service.tags ?? []).slice(0, 4).map((tag) => (
                    <li key={tag} className="crt-pill">
                      {tag}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-3 text-xs">
                  <NextLink
                    href="/proyectos"
                    className="crt-glow-text hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--crt-lime)]"
                  >
                    {listing.cases}
                  </NextLink>
                  <NextLink
                    href="/contacto"
                    className="crt-copy hover:text-[var(--crt-lime)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--crt-lime)]"
                  >
                    {listing.brief}
                  </NextLink>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
