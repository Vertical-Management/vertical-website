"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo } from "react";
import { ProjectsMobileList } from "@/components/proyectos/ProjectsMobileList";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Grain } from "@/components/ui/Grain";
import { PageLoader } from "@/components/transitions/PageLoader";
import { fill, localizeProjects } from "@/lib/i18n";

const DesktopScene = dynamic(
  () => import("@/components/proyectos/DesktopScene").then((m) => m.DesktopScene),
  {
    ssr: false,
    loading: () => (
      <div className="bg-ink/5 flex h-[min(820px,calc(100dvh-var(--header-height)-2rem))] min-h-[560px] items-center justify-center rounded-card border border-border">
        <PageLoader variant="inline" label="Booting Vertical OS" />
      </div>
    ),
  },
);

/**
 * Client shell for /proyectos — translates UI and project excerpts.
 */
export function ProyectosPageContent() {
  const { t } = useLanguage();
  const projects = useMemo(() => localizeProjects(t), [t]);
  const p = t.projectsPage;

  return (
    <>
      <Grain className="opacity-[0.03]" />

      <Container className="relative z-[1] py-6 md:py-10">
        <div className="mb-4 flex flex-col gap-3 md:mb-8 md:flex-row md:items-end md:justify-between md:gap-4">
          <div>
            <Eyebrow index="04" className="mb-3">
              <span className="md:hidden">{p.eyebrowCases}</span>
              <span className="hidden md:inline">{p.eyebrowOs}</span>
            </Eyebrow>
            <h1 className="tracking-display font-display text-display-lg">{p.title}</h1>
            <p className="mt-3 max-w-md text-base text-ink-soft md:text-[1.05rem]">
              <span className="md:hidden">{p.bodyMobile}</span>
              <span className="hidden md:inline">{p.bodyDesktop}</span>
            </p>
          </div>
          <p className="tracking-label hidden font-mono text-[0.65rem] uppercase text-ink-muted md:block">
            {fill(p.desktopMeta, { count: projects.length })}
          </p>
        </div>

        <div className="hidden md:block">
          <DesktopScene />
          <p className="tracking-label mt-4 text-center font-mono text-[0.65rem] uppercase text-ink-muted">
            {p.tip}
          </p>
        </div>
      </Container>

      <div className="md:hidden">
        <ProjectsMobileList />
      </div>

      <div className="hidden border-t border-border bg-paper py-10 md:block">
        <Container>
          <p className="tracking-label font-mono text-caption uppercase text-ink-muted">
            {p.indexLabel}
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((project) => (
              <li key={project.slug}>
                <Link
                  href={`/proyectos/${project.slug}`}
                  data-cursor="hover"
                  className="hover:border-ink/25 group flex flex-col rounded-md border border-border bg-surface px-4 py-3 transition-colors"
                >
                  <span className="tracking-label font-mono text-[10px] uppercase text-ink-muted">
                    {project.year}
                    {project.projectType ? ` · ${project.projectType}` : ""}
                  </span>
                  <span className="font-display text-lg group-hover:text-accent">
                    {project.title}
                  </span>
                  {project.client ? (
                    <span className="mt-0.5 text-xs text-ink-soft">{project.client}</span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </>
  );
}
