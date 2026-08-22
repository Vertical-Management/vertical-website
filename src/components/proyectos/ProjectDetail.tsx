"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { useMemo } from "react";
import type { Project } from "@/types";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { asset } from "@/lib/assets";
import { getAdjacentProjects } from "@/data/projects";
import { localizeProject } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { CoinButton } from "@/components/home/CoinButton";
import { Grain } from "@/components/ui/Grain";
import { LazyGallery } from "@/components/proyectos/LazyGallery";
import { isGifSrc } from "@/lib/media";

type ProjectDetailProps = {
  project: Project;
};

/**
 * Full project case study — context, approach, deliverables, outcome + social proof.
 */
export function ProjectDetail({ project: raw }: ProjectDetailProps) {
  const { t } = useLanguage();
  const project = useMemo(() => localizeProject(raw, t), [raw, t]);
  const pd = t.projectDetail;
  const gallery = project.gallery?.length ? project.gallery : [project.cover];
  const coverIsGif = isGifSrc(project.cover);
  const hasVideoLoops = gallery.some(
    (src) => src.endsWith(".mp4") || src.endsWith(".webm"),
  );
  const { prev, next } = getAdjacentProjects(project.slug);
  const cs = project.caseStudy;

  return (
    <main id="main-content" className="relative pt-header">
      <section className="relative overflow-hidden border-b border-border">
        <div className="relative aspect-[16/10] max-h-[70dvh] w-full bg-ink md:aspect-[21/9]">
          <Image
            src={asset(project.cover)}
            alt={project.title}
            fill
            className="object-cover opacity-90"
            sizes="100vw"
            priority
            unoptimized={coverIsGif}
          />
          <div className="via-ink/40 absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
          <Grain className="opacity-30" strong />
          <Container className="absolute inset-x-0 bottom-0 z-[1] pb-10 md:pb-14">
            <Eyebrow className="mb-3 !text-white/50">
              {project.year}
              {project.client ? ` · ${project.client}` : ""}
              {project.projectType ? ` · ${project.projectType}` : ""}
            </Eyebrow>
            <h1 className="max-w-4xl font-display text-display-xl text-paper">
              {project.title}
            </h1>
            {project.subtitle ? (
              <p className="mt-3 text-lead text-white/70">{project.subtitle}</p>
            ) : null}
            <div className="mt-5 flex flex-wrap gap-2">
              {project.categories.map((c) => (
                <Badge key={c} variant="outline" className="border-white/25 text-paper">
                  {c}
                </Badge>
              ))}
            </div>
          </Container>
        </div>
      </section>

      <section className="border-b border-border bg-paper-warm py-4 md:py-5">
        <Container>
          <ul className="tracking-label flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.65rem] uppercase text-ink-muted">
            {project.client ? (
              <li>
                <span className="text-ink-faint">{t.common.client}</span>{" "}
                <span className="text-ink">{project.client}</span>
              </li>
            ) : null}
            {project.projectType ? (
              <li>
                <span className="text-ink-faint">{t.common.type}</span>{" "}
                <span className="text-ink">{project.projectType}</span>
              </li>
            ) : null}
            <li>
              <span className="text-ink-faint">{t.common.year}</span>{" "}
              <span className="text-ink">{project.year}</span>
            </li>
            {project.role ? (
              <li>
                <span className="text-ink-faint">{t.common.role}</span>{" "}
                <span className="text-ink">{project.role}</span>
              </li>
            ) : null}
          </ul>
        </Container>
      </section>

      <section className="py-section">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <dl className="tracking-label space-y-5 font-mono text-caption uppercase">
                {project.client ? (
                  <div>
                    <dt className="text-ink-muted">{t.common.client}</dt>
                    <dd className="mt-1 text-sm normal-case tracking-normal text-ink">
                      {project.client}
                    </dd>
                  </div>
                ) : null}
                {project.projectType ? (
                  <div>
                    <dt className="text-ink-muted">{pd.projectType}</dt>
                    <dd className="mt-1 text-sm normal-case tracking-normal text-ink">
                      {project.projectType}
                    </dd>
                  </div>
                ) : null}
                {project.role ? (
                  <div>
                    <dt className="text-ink-muted">{t.common.role}</dt>
                    <dd className="mt-1 text-sm normal-case tracking-normal text-ink">
                      {project.role}
                    </dd>
                  </div>
                ) : null}
                <div>
                  <dt className="text-ink-muted">{t.common.year}</dt>
                  <dd className="mt-1 text-sm normal-case tracking-normal text-ink">
                    {project.year}
                  </dd>
                </div>
              </dl>
              <NextLink
                href="/proyectos"
                className="tracking-label mt-8 inline-flex font-mono text-caption uppercase text-ink-muted transition-colors hover:text-accent"
                data-cursor="hover"
              >
                {pd.backProjects}
              </NextLink>
            </Reveal>

            <div className="space-y-10 lg:col-span-8">
              {project.description ? (
                <Reveal delay={0.05}>
                  <p className="text-lead text-ink-soft">{project.description}</p>
                </Reveal>
              ) : null}

              {cs ? (
                <div className="space-y-8">
                  <Reveal delay={0.08}>
                    <CaseBlock label={`01 · ${pd.context}`} title={pd.problem}>
                      {cs.context}
                    </CaseBlock>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <CaseBlock label={`02 · ${pd.approach}`} title={pd.idea}>
                      {cs.approach}
                    </CaseBlock>
                  </Reveal>
                  <Reveal delay={0.12}>
                    <div>
                      <p className="tracking-label font-mono text-caption uppercase text-accent">
                        03 · {pd.deliverables}
                      </p>
                      <h2 className="mt-2 font-display text-display-sm tracking-tight">
                        {pd.machineOut}
                      </h2>
                      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                        {cs.deliverables.map((d) => (
                          <li
                            key={d}
                            className="flex items-start gap-2 rounded-card border border-border bg-surface px-4 py-3 text-sm text-ink-soft"
                          >
                            <span
                              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                              aria-hidden
                            />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                  <Reveal delay={0.14}>
                    <CaseBlock label={`04 · ${pd.outcome}`} title={pd.impact}>
                      {cs.outcome}
                    </CaseBlock>
                  </Reveal>
                </div>
              ) : (
                <Reveal delay={0.1}>
                  <p className="whitespace-pre-line text-lead text-ink-soft">
                    {project.excerpt}
                  </p>
                </Reveal>
              )}
            </div>
          </div>
        </Container>
      </section>

      {project.videoUrl ? (
        <section className="pb-section">
          <Container>
            <div className="overflow-hidden rounded-card border border-border bg-ink shadow-md">
              <video
                className="aspect-video w-full"
                controls
                playsInline
                preload="none"
                poster={asset(project.cover)}
              >
                <source src={asset(project.videoUrl)} type="video/mp4" />
              </video>
            </div>
          </Container>
        </section>
      ) : null}

      <section className="border-t border-border bg-paper-warm py-section">
        <Container>
          <Eyebrow index="05" className="mb-8">
            {pd.gallery}
          </Eyebrow>
          <LazyGallery
            images={gallery}
            title={project.title}
            initialCount={hasVideoLoops ? 3 : 4}
            loadMoreLabel={pd.loadMore}
          />
        </Container>
      </section>

      {(prev || next) && (
        <section className="border-t border-border py-10 md:py-12">
          <Container>
            <p className="tracking-label mb-4 font-mono text-caption uppercase text-ink-muted">
              {pd.nextScreen}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {prev ? (
                <NextLink
                  href={`/proyectos/${prev.slug}`}
                  data-cursor="hover"
                  className="hover:border-ink/30 group flex flex-col rounded-card border border-border bg-surface p-5 transition-colors"
                >
                  <span className="tracking-label font-mono text-[10px] uppercase text-ink-faint">
                    {pd.prev}
                  </span>
                  <span className="mt-2 font-display text-lg group-hover:text-accent">
                    {prev.title}
                  </span>
                  <span className="mt-1 text-xs text-ink-muted">
                    {prev.client} · {prev.year}
                  </span>
                </NextLink>
              ) : (
                <div />
              )}
              {next ? (
                <NextLink
                  href={`/proyectos/${next.slug}`}
                  data-cursor="hover"
                  className="hover:border-ink/30 group flex flex-col rounded-card border border-border bg-surface p-5 text-right transition-colors sm:items-end"
                >
                  <span className="tracking-label font-mono text-[10px] uppercase text-ink-faint">
                    {pd.next}
                  </span>
                  <span className="mt-2 font-display text-lg group-hover:text-accent">
                    {next.title}
                  </span>
                  <span className="mt-1 text-xs text-ink-muted">
                    {next.client} · {next.year}
                  </span>
                </NextLink>
              ) : null}
            </div>
          </Container>
        </section>
      )}

      <section className="border-t border-border py-section">
        <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="tracking-label font-mono text-caption uppercase text-ink-muted">
              {pd.anotherCase}
            </p>
            <p className="mt-2 font-display text-display-sm">{pd.tellBrief}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <CoinButton href="/contacto" size="lg">
              {pd.startProject}
            </CoinButton>
            <NextLink
              href="/proyectos"
              className="inline-flex h-12 items-center rounded-pill border border-border-strong px-6 text-sm font-medium transition-colors hover:bg-ink hover:text-paper"
              data-cursor="hover"
            >
              {pd.moreProjects}
            </NextLink>
          </div>
        </Container>
      </section>
    </main>
  );
}

function CaseBlock({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="tracking-label font-mono text-caption uppercase text-accent">
        {label}
      </p>
      <h2 className="mt-2 font-display text-display-sm tracking-tight">{title}</h2>
      <p className="mt-3 max-w-prose text-base leading-relaxed text-ink-soft">
        {children}
      </p>
    </div>
  );
}
