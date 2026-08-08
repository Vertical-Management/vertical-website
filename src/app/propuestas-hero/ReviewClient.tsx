"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { HomeHero } from "@/components/home/HomeHero";
import {
  DEFAULT_HERO_VARIANT,
  HERO_VARIANTS,
  type HeroVariantId,
} from "@/components/home/hero";
import { cn } from "@/lib/utils";

type ReviewClientProps = {
  initialVariant?: string;
};

/**
 * Lightweight review shell — one variant at a time, always visible, no stacked GSAP.
 */
export function ReviewClient({ initialVariant }: ReviewClientProps) {
  const initial = useMemo(() => {
    if (
      initialVariant &&
      HERO_VARIANTS.some((v) => v.id === initialVariant)
    ) {
      return initialVariant as HeroVariantId;
    }
    return DEFAULT_HERO_VARIANT;
  }, [initialVariant]);

  const [active, setActive] = useState<HeroVariantId>(initial);
  const meta = HERO_VARIANTS.find((v) => v.id === active)!;
  const index = HERO_VARIANTS.findIndex((v) => v.id === active) + 1;

  return (
    <div className="relative bg-paper">
      {/* Fixed review chrome below site header — high z so it's always usable */}
      <div className="fixed inset-x-0 top-header z-[55] border-b border-border bg-ink text-paper shadow-md">
        <div className="mx-auto flex max-w-site flex-col gap-3 px-gutter py-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[0.6rem] uppercase tracking-label text-accent-lime">
                Review interno · no index
              </p>
              <h1 className="font-display text-lg tracking-display md:text-xl">
                Hero home con ARINSAL
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/"
                className="rounded-pill border border-paper/25 bg-paper/5 px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-label text-paper transition-colors hover:border-accent-lime hover:text-accent-lime"
              >
                ← Home live
              </Link>
              <span className="rounded-pill border border-accent-lime/40 bg-accent-lime/10 px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-label text-accent-lime">
                Live = {DEFAULT_HERO_VARIANT}
              </span>
            </div>
          </div>

          <div
            className="flex gap-2 overflow-x-auto pb-1"
            role="tablist"
            aria-label="Propuestas de hero"
          >
            {HERO_VARIANTS.map((v, i) => {
              const isActive = active === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setActive(v.id);
                    // Keep URL shareable without full remount cascade
                    const url = new URL(window.location.href);
                    url.searchParams.set("v", v.id);
                    window.history.replaceState({}, "", url.toString());
                  }}
                  className={cn(
                    "shrink-0 rounded-pill border px-3 py-2 font-mono text-[0.65rem] uppercase tracking-label transition-colors",
                    isActive
                      ? "border-accent-lime bg-accent-lime text-ink"
                      : "border-paper/25 text-paper/80 hover:border-paper/60 hover:text-paper",
                  )}
                >
                  {String(i + 1).padStart(2, "0")} · {v.name}
                  {v.id === DEFAULT_HERO_VARIANT ? " ★" : ""}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Spacer for fixed review bar (~header already handled by site chrome) */}
      <div className="h-[7.5rem] md:h-[7rem]" aria-hidden />

      {/* Active meta */}
      <div className="border-b border-border bg-surface-elevated px-gutter py-4">
        <div className="mx-auto max-w-site">
          <p className="font-mono text-[0.6rem] uppercase tracking-label text-ink-muted">
            Propuesta {String(index).padStart(2, "0")}
            {meta.recommended ? " · recomendada (live)" : ""}
          </p>
          <h2 className="font-display text-display-sm text-ink">{meta.name}</h2>
          <p className="mt-1 max-w-2xl text-sm text-ink-soft">{meta.tagline}</p>
        </div>
      </div>

      {/* Single hero — remount on switch so layout is clean */}
      <div key={active} className="relative isolate bg-paper">
        <HomeHero variant={active} preview />
      </div>

      <footer className="border-t border-border bg-paper-warm px-gutter py-10">
        <div className="mx-auto max-w-site space-y-4">
          <p className="font-mono text-caption uppercase tracking-label text-ink-muted">
            Cómo elegir
          </p>
          <ul className="max-w-2xl space-y-2 text-sm text-ink-soft">
            {HERO_VARIANTS.map((v) => (
              <li key={v.id}>
                <button
                  type="button"
                  onClick={() => setActive(v.id)}
                  className="text-left hover:text-ink"
                >
                  <strong className="text-ink">{v.name}</strong>
                  {v.id === DEFAULT_HERO_VARIANT ? " ★" : ""} — {v.tagline}
                </button>
              </li>
            ))}
          </ul>
          <p className="text-sm text-ink-muted">
            Para fijar la del home, cambia{" "}
            <code className="rounded bg-ink/5 px-1.5 py-0.5 font-mono text-xs">
              DEFAULT_HERO_VARIANT
            </code>{" "}
            en{" "}
            <code className="rounded bg-ink/5 px-1.5 py-0.5 font-mono text-xs">
              src/components/home/hero/constants.ts
            </code>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}
