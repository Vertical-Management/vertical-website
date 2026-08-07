"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { DesktopWindowId, DesktopWindowState } from "@/types";
import { getProjectBySlug } from "@/data/projects";

type DesktopContextValue = {
  windows: DesktopWindowState[];
  focusedId: DesktopWindowId | null;
  startOpen: boolean;
  openWindow: (id: DesktopWindowId, title?: string) => void;
  closeWindow: (id: DesktopWindowId) => void;
  minimizeWindow: (id: DesktopWindowId) => void;
  restoreWindow: (id: DesktopWindowId) => void;
  focusWindow: (id: DesktopWindowId) => void;
  moveWindow: (id: DesktopWindowId, x: number, y: number) => void;
  toggleStart: () => void;
  setStartOpen: (open: boolean) => void;
};

const DesktopContext = createContext<DesktopContextValue | null>(null);

let zCounter = 10;

function defaultSize(id: DesktopWindowId) {
  if (id.startsWith("project:")) {
    return { width: 520, height: 420 };
  }
  if (id === "readme" || id === "about") {
    return { width: 440, height: 360 };
  }
  return { width: 380, height: 300 };
}

function defaultPos(id: DesktopWindowId, openCount: number) {
  const offset = (openCount % 5) * 28;
  if (typeof window === "undefined") {
    return { x: 80 + offset, y: 60 + offset };
  }
  const size = defaultSize(id);
  const maxX = Math.max(24, window.innerWidth - size.width - 24);
  const maxY = Math.max(24, window.innerHeight - size.height - 100);
  return {
    x: Math.min(72 + offset, maxX),
    y: Math.min(48 + offset, maxY),
  };
}

function resolveTitle(id: DesktopWindowId, fallback?: string) {
  if (fallback) return fallback;
  if (id.startsWith("project:")) {
    const slug = id.replace("project:", "");
    return getProjectBySlug(slug)?.title ?? "Proyecto";
  }
  if (id === "readme") return "léeme.txt";
  if (id === "about") return "Sobre Vertical";
  if (id === "trash") return "Papelera";
  if (id === "system") return "System  · Vertical OS";
  return "Ventana";
}

export function DesktopProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<DesktopWindowState[]>([]);
  const [focusedId, setFocusedId] = useState<DesktopWindowId | null>(null);
  const [startOpen, setStartOpen] = useState(false);

  const focusWindow = useCallback((id: DesktopWindowId) => {
    zCounter += 1;
    setFocusedId(id);
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, z: zCounter, minimized: false } : w)),
    );
  }, []);

  const openWindow = useCallback(
    (id: DesktopWindowId, title?: string) => {
      setStartOpen(false);
      setWindows((prev) => {
        const existing = prev.find((w) => w.id === id);
        if (existing) {
          zCounter += 1;
          setFocusedId(id);
          return prev.map((w) =>
            w.id === id ? { ...w, minimized: false, z: zCounter } : w,
          );
        }
        zCounter += 1;
        const pos = defaultPos(id, prev.length);
        const size = defaultSize(id);
        const next: DesktopWindowState = {
          id,
          title: resolveTitle(id, title),
          x: pos.x,
          y: pos.y,
          width: size.width,
          height: size.height,
          minimized: false,
          z: zCounter,
        };
        setFocusedId(id);
        return [...prev, next];
      });
    },
    [],
  );

  const closeWindow = useCallback((id: DesktopWindowId) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setFocusedId((cur) => (cur === id ? null : cur));
  }, []);

  const minimizeWindow = useCallback((id: DesktopWindowId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: true } : w)),
    );
    setFocusedId((cur) => (cur === id ? null : cur));
  }, []);

  const restoreWindow = useCallback(
    (id: DesktopWindowId) => {
      focusWindow(id);
    },
    [focusWindow],
  );

  const moveWindow = useCallback((id: DesktopWindowId, x: number, y: number) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, x, y } : w)),
    );
  }, []);

  const toggleStart = useCallback(() => {
    setStartOpen((v) => !v);
  }, []);

  const value = useMemo(
    () => ({
      windows,
      focusedId,
      startOpen,
      openWindow,
      closeWindow,
      minimizeWindow,
      restoreWindow,
      focusWindow,
      moveWindow,
      toggleStart,
      setStartOpen,
    }),
    [
      windows,
      focusedId,
      startOpen,
      openWindow,
      closeWindow,
      minimizeWindow,
      restoreWindow,
      focusWindow,
      moveWindow,
      toggleStart,
    ],
  );

  return (
    <DesktopContext.Provider value={value}>{children}</DesktopContext.Provider>
  );
}

export function useDesktop() {
  const ctx = useContext(DesktopContext);
  if (!ctx) throw new Error("useDesktop must be used within DesktopProvider");
  return ctx;
}
