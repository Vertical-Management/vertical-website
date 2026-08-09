"use client";

import Image from "next/image";
import NextLink from "next/link";
import { useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { asset } from "@/lib/assets";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Grain } from "@/components/ui/Grain";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * About teaser — dark high-craft slab with orange accent.
 */
export function HomeAbout() {
  const { t } = useLanguage();
  const a = t.home.about;
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-y-2 border-ink bg-ink py-section text-paper">
      <Grain strong className="opacity-[0.07]" />

      {/* Accent geometry — dark stage, orange energy */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-0 top-0 h-full w-1.5 bg-accent sm:w-2" />
        <div className="absolute -right-8 top-16 h-28 w-28 rotate-12 bg-accent/20 sm:h-40 sm:w-40" />
      </div>

      <Container className="relative z-[1]">
        <div className="max-w-4xl pl-3 sm:pl-4">
          <Eyebrow index="02" className="mb-4 !text-accent/90">
            {a.eyebrow}
          </Eyebrow>

          <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
            <Heading
              as="h2"
              size="display-md"
              className="min-w-0 flex-1 max-w-lg !text-paper"
            >
              {a.titleLine1}
              <br />
              <span className="text-accent">{a.titleLine2}</span>
            </Heading>

            {/* Decorative mascot — skip animated GIF when reduced motion (INV-12/08) */}
            {!reduced ? (
              <div className="relative hidden h-20 w-20 shrink-0 sm:block sm:h-24 sm:w-24 md:h-28 md:w-28">
                <Image
                  src={asset("/assets/PIKACHU.gif")}
                  alt=""
                  fill
                  unoptimized
                  loading="lazy"
                  className="object-contain object-center"
                  sizes="112px"
                />
              </div>
            ) : null}
          </div>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-lg text-lead text-white/65">{a.body}</p>
          </Reveal>

          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {a.principles.map((p, i) => (
              <Reveal key={p.index} delay={0.1 + i * 0.08} as="li">
                <article
                  className={cn(
                    "h-full rounded-card border-2 border-paper/20 bg-paper/[0.04] p-5",
                    "shadow-[4px_4px_0_0_rgba(255,61,0,0.35)]",
                    "transition-[transform,box-shadow,border-color,background-color] duration-base ease-out-expo",
                    "hover:translate-x-px hover:translate-y-px hover:border-accent/60 hover:bg-paper/[0.07]",
                    "hover:shadow-[2px_2px_0_0_rgba(255,61,0,0.5)]",
                  )}
                >
                  <span className="font-mono text-caption text-accent">
                    {p.index}
                  </span>
                  <h3 className="mt-2 font-display text-lg tracking-tight text-paper">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">
                    {p.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.35}>
            <NextLink
              href="/nosotros"
              data-cursor="hover"
              className={cn(
                "mt-8 inline-flex items-center rounded-pill border-2 border-accent bg-accent px-5 py-2.5",
                "font-mono text-[0.65rem] uppercase tracking-label text-paper",
                "shadow-[3px_3px_0_0_#f4f1ea]",
                "transition-[transform,box-shadow] duration-base ease-out-expo",
                "hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0_0_#f4f1ea]",
              )}
            >
              {a.storyCta}
            </NextLink>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
