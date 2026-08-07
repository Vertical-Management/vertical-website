"use client";

import Image from "next/image";
import NextLink from "next/link";
import type { Project } from "@/types";
import { asset } from "@/lib/assets";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Badge } from "@/components/ui/Badge";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { CoinButton } from "@/components/home/CoinButton";
import { Grain } from "@/components/ui/Grain";

type ProjectDetailProps = {
  project: Project;
};

/**
 * Full project case study page.
 */
export function ProjectDetail({ project }: ProjectDetailProps) {
  const gallery = project.gallery?.length ? project.gallery : [project.cover];

  return (
    <main id="main-content" className="relative pt-header">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="relative aspect-[16/10] max-h-[70dvh] w-full bg-ink md:aspect-[21/9]">
          <Image
            src={asset(project.cover)}
            alt={project.title}
            fill
            className="object-cover opacity-90"
            sizes="100vw"
            priority
            unoptimized={project.cover.endsWith(".gif")}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
          <Grain className="opacity-30" strong />
          <Container className="absolute inset-x-0 bottom-0 z-[1] pb-10 md:pb-14">
            <Eyebrow className="mb-3 !text-white/50">
              {project.year}
              {project.client ? ` · ${project.client}` : ""}
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

      {/* Meta + description */}
      <section className="py-section">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <dl className="space-y-5 font-mono text-caption uppercase tracking-label">
                {project.client ? (
                  <div>
                    <dt className="text-ink-muted">Cliente</dt>
                    <dd className="mt-1 text-sm normal-case tracking-normal text-ink">
                      {project.client}
                    </dd>
                  </div>
                ) : null}
                {project.role ? (
                  <div>
                    <dt className="text-ink-muted">Rol</dt>
                    <dd className="mt-1 text-sm normal-case tracking-normal text-ink">
                      {project.role}
                    </dd>
                  </div>
                ) : null}
                <div>
                  <dt className="text-ink-muted">Año</dt>
                  <dd className="mt-1 text-sm normal-case tracking-normal text-ink">
                    {project.year}
                  </dd>
                </div>
              </dl>
              <NextLink
                href="/proyectos"
                className="mt-8 inline-flex font-mono text-caption uppercase tracking-label text-ink-muted transition-colors hover:text-accent"
                data-cursor="hover"
              >
                ← Volver al escritorio
              </NextLink>
            </Reveal>

            <Reveal className="lg:col-span-8" delay={0.1}>
              <p className="text-lead text-ink-soft">
                {project.description ?? project.excerpt}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Video */}
      {project.videoUrl ? (
        <section className="pb-section">
          <Container>
            <div className="overflow-hidden rounded-card border border-border bg-ink shadow-md">
              <video
                className="aspect-video w-full"
                controls
                playsInline
                preload="metadata"
                poster={asset(project.cover)}
              >
                <source src={asset(project.videoUrl)} type="video/mp4" />
              </video>
            </div>
          </Container>
        </section>
      ) : null}

      {/* Gallery */}
      <section className="border-t border-border bg-paper-warm py-section">
        <Container>
          <Eyebrow index="01" className="mb-8">
            Gallery
          </Eyebrow>
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {gallery.map((src, i) => (
              <StaggerItem
                key={`${src}-${i}`}
                className={i % 5 === 0 ? "sm:col-span-2 lg:col-span-2" : ""}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-border bg-paper-dim">
                  <Image
                    src={asset(src)}
                    alt={`${project.title} — frame ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-cinematic ease-out-expo hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized={src.endsWith(".gif")}
                  />
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-section">
        <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-mono text-caption uppercase tracking-label text-ink-muted">
              ¿Siguiente caso?
            </p>
            <p className="mt-2 font-display text-display-sm">
              Inserta coin y hablemos.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <CoinButton href="/contacto" size="lg" />
            <NextLink
              href="/proyectos"
              className="inline-flex h-12 items-center rounded-pill border border-border-strong px-6 text-sm font-medium transition-colors hover:bg-ink hover:text-paper"
              data-cursor="hover"
            >
              Más proyectos
            </NextLink>
          </div>
        </Container>
      </section>
    </main>
  );
}
