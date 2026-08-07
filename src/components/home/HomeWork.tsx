"use client";

import Image from "next/image";
import NextLink from "next/link";
import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { getFeaturedProjects } from "@/data/projects";
import { asset } from "@/lib/assets";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Link } from "@/components/ui/Link";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * Featured work — asymmetric editorial grid with hover craft.
 */
export function HomeWork() {
  const projects = getFeaturedProjects();
  const reduced = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden py-section">
      <Container>
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow index="02" className="mb-4">
              Selected work
            </Eyebrow>
            <Heading as="h2" size="display-lg">
              Proyectos que
              <br />
              no piden perdón
            </Heading>
          </div>
          <Reveal delay={0.1}>
            <Link href="/proyectos" mono className="text-ink">
              Todos los proyectos →
            </Link>
          </Reveal>
        </div>

        <Stagger
          className="grid gap-5 sm:grid-cols-2 lg:gap-6"
          stagger={0.1}
          as="ul"
        >
          {projects.map((project, i) => {
            const tall = i % 3 === 0;
            const isActive = active === project.slug;

            return (
              <StaggerItem
                key={project.slug}
                as="li"
                className={cn(
                  i === 0 && "sm:col-span-2 lg:col-span-1 lg:row-span-2",
                  i === 1 && "lg:mt-16",
                )}
              >
                <NextLink
                  href={`/proyectos/${project.slug}`}
                  data-cursor="hover"
                  className="group relative block overflow-hidden rounded-card border border-border bg-surface"
                  onMouseEnter={() => setActive(project.slug)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(project.slug)}
                  onBlur={() => setActive(null)}
                >
                  <div
                    className={cn(
                      "relative overflow-hidden bg-paper-dim",
                      tall ? "aspect-[4/5] sm:aspect-[16/10] lg:aspect-[3/4]" : "aspect-[4/5] sm:aspect-[4/3]",
                    )}
                  >
                    <Image
                      src={asset(project.cover)}
                      alt={project.title}
                      fill
                      className={cn(
                        "object-cover transition-transform duration-cinematic ease-out-expo",
                        !reduced && "group-hover:scale-105",
                      )}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      unoptimized={project.cover.endsWith(".gif")}
                    />
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent transition-opacity duration-base",
                        isActive ? "opacity-100" : "opacity-80 group-hover:opacity-100",
                      )}
                    />
                    <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                      <div className="flex flex-wrap gap-2">
                        {project.categories.slice(0, 2).map((cat) => (
                          <span
                            key={cat}
                            className="rounded-pill bg-paper/15 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-label text-paper backdrop-blur-sm"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                      <h3 className="mt-3 font-display text-display-sm text-paper md:text-display-md">
                        {project.title}
                      </h3>
                      <p className="mt-2 max-w-sm text-sm text-paper/75">
                        {project.excerpt}
                      </p>
                      <span
                        className={cn(
                          "mt-4 inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-label text-accent-lime",
                          "transition-transform duration-base ease-out-expo",
                          !reduced && "group-hover:translate-x-1",
                        )}
                      >
                        Abrir proyecto →
                      </span>
                    </div>
                  </div>
                </NextLink>
              </StaggerItem>
            );
          })}
        </Stagger>

        <div className="mt-12 flex justify-center md:mt-16">
          <Magnetic>
            <NextLink
              href="/proyectos"
              data-cursor="hover"
              className="inline-flex h-12 items-center rounded-pill border border-border-strong px-6 font-mono text-xs uppercase tracking-label transition-colors duration-base hover:border-ink hover:bg-ink hover:text-paper"
            >
              Entrar al escritorio de proyectos
            </NextLink>
          </Magnetic>
        </div>
      </Container>
    </section>
  );
}
