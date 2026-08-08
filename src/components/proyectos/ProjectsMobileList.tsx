"use client";

import Image from "next/image";
import NextLink from "next/link";
import { projects } from "@/data/projects";
import { asset } from "@/lib/assets";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

/**
 * Accessible project list — complements desktop on small screens / SEO.
 */
export function ProjectsMobileList() {
  return (
    <section className="border-t border-border bg-paper py-12">
      <div className="px-gutter">
        <p className="font-mono text-caption uppercase tracking-label text-ink-muted">
          Vista lista
        </p>
        <h2 className="mt-2 font-display text-display-sm">Todos los proyectos</h2>
        <Stagger className="mt-6 space-y-3" as="ul" stagger={0.06}>
          {projects.map((p) => (
            <StaggerItem key={p.slug} as="li">
              <NextLink
                href={`/proyectos/${p.slug}`}
                data-cursor="hover"
                className="flex gap-3 overflow-hidden rounded-card border border-border bg-surface transition-colors hover:border-ink/25"
              >
                <div className="relative h-24 w-24 shrink-0 bg-paper-dim">
                  <Image
                    src={asset(p.cover)}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="96px"
                    unoptimized={p.cover.endsWith(".gif")}
                  />
                </div>
                <div className="min-w-0 flex-1 py-3 pr-3">
                  <p className="font-mono text-[10px] uppercase tracking-label text-ink-muted">
                    {p.year} · {p.client}
                  </p>
                  <h3 className="font-display text-lg tracking-tight">{p.title}</h3>
                  <p className="mt-0.5 line-clamp-2 text-xs text-ink-soft">
                    {p.excerpt}
                  </p>
                </div>
              </NextLink>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
