"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import {
  DesktopProvider,
  useDesktop,
} from "@/components/proyectos/DesktopContext";
import { DesktopIcon } from "@/components/proyectos/DesktopIcon";
import { DesktopWindow } from "@/components/proyectos/DesktopWindow";
import { Taskbar } from "@/components/proyectos/Taskbar";
import { StartMenu } from "@/components/proyectos/StartMenu";
import {
  AboutWindowBody,
  ProjectWindowBody,
  ReadmeWindowBody,
  SystemWindowBody,
  TrashWindowBody,
} from "@/components/proyectos/WindowContents";
import { projects } from "@/data/projects";
import { getProjectBySlug } from "@/data/projects";
import { asset } from "@/lib/assets";
import { Grain } from "@/components/ui/Grain";
import type { DesktopWindowId } from "@/types";

function DesktopInner() {
  const { windows, openWindow, setStartOpen, desktopRef } = useDesktop();
  const [selected, setSelected] = useState<string | null>(null);

  // Boot: open readme lightly after mount
  useEffect(() => {
    const t = window.setTimeout(() => {
      openWindow("readme");
    }, 600);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- boot once
  }, []);

  const renderBody = (id: DesktopWindowId) => {
    if (id.startsWith("project:")) {
      const slug = id.replace("project:", "");
      const project = getProjectBySlug(slug);
      if (!project) return <p className="p-4 text-sm">Proyecto no encontrado.</p>;
      return <ProjectWindowBody project={project} />;
    }
    switch (id) {
      case "readme":
        return <ReadmeWindowBody />;
      case "about":
        return <AboutWindowBody />;
      case "trash":
        return <TrashWindowBody />;
      case "system":
        return <SystemWindowBody />;
      default:
        return null;
    }
  };

  const accentFor = (id: DesktopWindowId) => {
    if (id.startsWith("project:")) {
      return getProjectBySlug(id.replace("project:", ""))?.accentColor;
    }
    return undefined;
  };

  return (
    <div
      ref={desktopRef}
      className="relative h-[min(820px,calc(100dvh-var(--header-height)-2rem))] min-h-[560px] w-full overflow-hidden rounded-card border border-ink/20 shadow-lg md:h-[calc(100dvh-var(--header-height)-3rem)]"
      onClick={() => {
        setSelected(null);
        setStartOpen(false);
      }}
    >
      {/* Wallpaper */}
      <Image
        src={asset("/assets/xp/fondo-de-pantalla.jpg")}
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/25 via-transparent to-ink/50" />
      <Grain className="opacity-[0.06]" strong />

      {/* Icon grid */}
      <div
        className="absolute inset-x-0 top-0 bottom-12 z-[1] overflow-y-auto p-3 md:p-5"
        data-lenis-prevent
      >
        <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:content-start sm:gap-2">
          <DesktopIcon
            label="léeme.txt"
            emoji="📄"
            selected={selected === "readme"}
            onSelect={() => setSelected("readme")}
            onOpen={() => openWindow("readme")}
          />
          <DesktopIcon
            label="Sobre Vertical"
            emoji="💻"
            selected={selected === "about"}
            onSelect={() => setSelected("about")}
            onOpen={() => openWindow("about")}
          />
          {projects.map((p) => (
            <DesktopIcon
              key={p.slug}
              label={p.title}
              iconSrc={p.desktopIcon}
              selected={selected === p.slug}
              onSelect={() => setSelected(p.slug)}
              onOpen={() => openWindow(`project:${p.slug}`, p.title)}
            />
          ))}
          <DesktopIcon
            label="Papelera"
            emoji="🗑️"
            selected={selected === "trash"}
            onSelect={() => setSelected("trash")}
            onOpen={() => openWindow("trash")}
          />
          <DesktopIcon
            label="Terminal"
            emoji="⬛"
            selected={selected === "system"}
            onSelect={() => setSelected("system")}
            onOpen={() => openWindow("system")}
          />
          <DesktopIcon
            label="Linux?"
            iconSrc="/assets/xp/linux-penguin.svg"
            selected={selected === "linux"}
            onSelect={() => setSelected("linux")}
            onOpen={() => openWindow("about", "Linux mode (mentira)")}
          />
        </div>
      </div>

      {/* Windows layer */}
      <div className="pointer-events-none absolute inset-0 bottom-12 z-[10]">
        <div className="pointer-events-auto relative h-full w-full">
          <AnimatePresence>
            {windows.map((w) => (
              <DesktopWindow key={w.id} win={w} accent={accentFor(w.id)}>
                {renderBody(w.id)}
              </DesktopWindow>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <StartMenu />
      <Taskbar />
    </div>
  );
}

/**
 * Full Vertical OS desktop experience.
 */
export function DesktopScene() {
  return (
    <DesktopProvider>
      <DesktopInner />
    </DesktopProvider>
  );
}
