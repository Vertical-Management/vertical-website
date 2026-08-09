"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { SITE, SOCIAL_LINKS } from "@/lib/constants";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * Quick contact channels + social with real handles/blurbs.
 */
export function ContactChannels() {
  const { t } = useLanguage();
  const ch = t.contactPage.channels;

  const CHANNELS = [
    {
      label: ch.emailLabel,
      value: SITE.email,
      href: `mailto:${SITE.email}`,
      hint: ch.emailHint,
    },
    {
      label: ch.baseLabel,
      value: SITE.location,
      href: "https://www.google.com/maps/search/Andorra",
      hint: ch.baseHint,
      external: true,
    },
    {
      label: ch.founderLabel,
      value: SITE.founder,
      href: "/proyectos",
      hint: ch.founderHint,
    },
  ];

  return (
    <section className="border-y border-border bg-paper-warm py-12 md:py-16">
      <div className="mx-auto max-w-site px-gutter">
        <Reveal>
          <p className="font-mono text-caption uppercase tracking-label text-ink-muted">
            {ch.eyebrow}
          </p>
        </Reveal>
        <Stagger
          className="mt-8 grid gap-4 sm:grid-cols-3"
          stagger={0.08}
          as="ul"
        >
          {CHANNELS.map((item) => (
            <StaggerItem key={item.label} as="li">
              <a
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                data-cursor="hover"
                className={cn(
                  "group flex h-full flex-col rounded-card border-2 border-ink bg-surface p-6",
                  "shadow-[4px_4px_0_0_var(--color-ink)]",
                  "transition-[transform,box-shadow] duration-base ease-out-expo",
                  "hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0_0_var(--color-ink)]",
                )}
              >
                <span className="font-mono text-caption uppercase tracking-label text-ink-muted">
                  {item.label}
                </span>
                <span className="mt-3 font-display text-xl tracking-tight text-ink group-hover:text-accent">
                  {item.value}
                </span>
                <span className="mt-2 text-sm text-ink-soft">{item.hint}</span>
              </a>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={
                s.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              data-cursor="hover"
              className="group rounded-card border border-border bg-surface p-5 transition-colors duration-base hover:border-ink/30 hover:bg-surface-elevated"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-caption uppercase tracking-label text-ink-muted">
                  {s.label}
                </span>
                {s.href.startsWith("http") ? (
                  <span className="text-ink-faint transition-colors group-hover:text-accent">
                    ↗
                  </span>
                ) : null}
              </div>
              <p className="mt-2 font-display text-lg tracking-tight text-ink">
                {s.handle}
              </p>
              <p className="mt-1 text-sm text-ink-soft">{s.blurb}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
