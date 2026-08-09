"use client";

import Image from "next/image";
import NextLink from "next/link";
import { useMemo } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { asset } from "@/lib/assets";
import { fill, localizeProjects } from "@/lib/i18n";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

/**
 * Default mobile / touch project index — clean list, fast navigation.
 * Desktop OS metaphor stays on md+ only.
 */
export function ProjectsMobileList() {
  const { t } = useLanguage();
  const projects = useMemo(() => localizeProjects(t), [t]);
  const p = t.projectsPage;

  return (
    <section className="bg-paper pb-14 pt-2" aria-label={p.mobileAria}>
      <div className="px-gutter">
        <p className="font-mono text-caption uppercase tracking-label text-ink-muted">
          {fill(p.mobileCount, { count: projects.length })}
        </p>
        <Stagger className="mt-5 space-y-3" as="ul" stagger={0.05}>
          {projects.map((project, i) => (
            <StaggerItem key={project.slug} as="li">
              <NextLink
                href={`/proyectos/${project.slug}`}
                data-cursor="hover"
                className="flex min-h-[5.5rem] gap-3.5 overflow-hidden rounded-card border border-border bg-surface transition-colors active:border-ink/30 active:bg-surface-elevated"
              >
                <div className="relative h-auto w-[5.5rem] shrink-0 self-stretch bg-paper-dim sm:w-28">
                  <Image
                    src={asset(project.cover)}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="112px"
                    loading={i < 2 ? "eager" : "lazy"}
                    unoptimized={project.cover.endsWith(".gif")}
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-center py-3.5 pr-4">
                  <p className="font-mono text-[10px] uppercase tracking-label text-ink-muted">
                    {project.year}
                    {project.client ? ` · ${project.client}` : ""}
                    {project.projectType ? ` · ${project.projectType}` : ""}
                  </p>
                  <h2 className="mt-1 font-display text-lg leading-tight tracking-tight sm:text-xl">
                    {project.title}
                  </h2>
                  <p className="mt-1 line-clamp-2 text-sm leading-snug text-ink-soft">
                    {project.excerpt}
                  </p>
                  <span className="mt-2 inline-flex font-mono text-[10px] uppercase tracking-label text-accent">
                    {t.common.viewCase}
                  </span>
                </div>
              </NextLink>
            </StaggerItem>
          ))}
        </Stagger>

        <p className="mt-8 text-center font-mono text-[0.6rem] uppercase tracking-label text-ink-faint">
          {p.mobileDesktopHint}
        </p>
      </div>
    </section>
  );
}
