"use client";

import Image from "next/image";
import NextLink from "next/link";
import type { Project } from "@/types";
import { asset } from "@/lib/assets";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function ProjectWindowBody({ project }: { project: Project }) {
  return (
    <div className="flex h-full flex-col">
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-ink">
        <Image
          src={asset(project.cover)}
          alt={project.title}
          fill
          className="object-cover"
          sizes="520px"
          unoptimized={project.cover.endsWith(".gif")}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent"
          aria-hidden
        />
        <div className="absolute bottom-3 left-3 right-3">
          <p className="tracking-label font-mono text-[10px] uppercase text-white/60">
            {project.year}
            {project.client ? ` · ${project.client}` : ""}
            {project.projectType ? ` · ${project.projectType}` : ""}
          </p>
          <h3 className="font-display text-xl text-white md:text-2xl">{project.title}</h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap gap-1.5">
          {project.categories.map((c) => (
            <span
              key={c}
              className="tracking-label rounded-pill border border-white/15 px-2 py-0.5 font-mono text-[10px] uppercase text-white/70"
            >
              {c}
            </span>
          ))}
        </div>
        <p className="text-sm leading-relaxed text-white/70">{project.excerpt}</p>
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          <NextLink
            href={`/proyectos/${project.slug}`}
            data-cursor="hover"
            className="tracking-label inline-flex h-9 items-center rounded-pill bg-accent-lime px-4 font-mono text-[11px] uppercase text-ink transition-transform duration-base hover:scale-[1.02]"
          >
            Abrir caso →
          </NextLink>
          {project.role ? (
            <span className="tracking-label inline-flex h-9 items-center font-mono text-[10px] uppercase text-white/40">
              {project.role}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function ReadmeWindowBody() {
  return (
    <div className="space-y-3 p-5 font-mono text-xs leading-relaxed text-white/75">
      <p className="text-accent-lime">{"// vertical_os.txt"}</p>
      <p>Bienvenido al escritorio de proyectos de {SITE.name}.</p>
      <ul className="list-inside list-disc space-y-1 text-white/60">
        <li>Clic en un icono para abrir la ventana.</li>
        <li>Arrastra las ventanas por la barra de título.</li>
        <li>Rojo cierra · amarillo minimiza · taskbar restaura.</li>
        <li>Cada carpeta es un caso real con contexto y entregables.</li>
      </ul>
      <p className="pt-2 text-white/40">
        OS version 2.0 · Playful High-Craft · {SITE.location}
      </p>
    </div>
  );
}

export function AboutWindowBody() {
  return (
    <div className="p-5">
      <p className="tracking-label font-mono text-[10px] uppercase text-accent-lime">
        About this machine
      </p>
      <h3 className="mt-2 font-display text-2xl text-white">Vertical OS</h3>
      <p className="mt-3 text-sm leading-relaxed text-white/65">
        Un desktop creativo modernizado: el espíritu XP/Linux del sitio original, con UI
        de 2026. Proyectos como apps. Humor incluido en el kernel.
      </p>
      <p className="mt-4 text-sm text-white/50">
        Founder: {SITE.founder}
        <br />
        Locale: {SITE.location}
      </p>
      <NextLink
        href="/contacto"
        className="tracking-label mt-5 inline-flex font-mono text-[11px] uppercase text-accent-lime hover:underline"
        data-cursor="hover"
      >
        Escribir → Contacto
      </NextLink>
    </div>
  );
}

export function TrashWindowBody() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
      <span className="text-4xl" aria-hidden>
        🗑️
      </span>
      <p className="font-display text-lg text-white">Papelera vacía</p>
      <p className="max-w-xs text-sm text-white/50">
        Aquí irían los briefs aburridos y los archivos “final_v3_REAL”. Vacío. Buen signo.
      </p>
    </div>
  );
}

export function SystemWindowBody({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-2 p-5 font-mono text-[11px] text-white/60", className)}>
      <p className="text-accent-lime">vertical@andorra:~$</p>
      <p>uptime: since forever</p>
      <p>shell: lenis + gsap</p>
      <p>theme: editorial-disruptivo</p>
      <p>status: ready for coin</p>
      <p className="animate-pulse-soft text-white/40">_</p>
    </div>
  );
}
