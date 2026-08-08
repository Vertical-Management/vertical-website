"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import type { DesktopWindowId, DesktopWindowState } from "@/types";
import { getProjectBySlug } from "@/data/projects";

type DesktopBounds = { width: number; height: number };

type DesktopContextValue = {
  windows: DesktopWindowState[];
  focusedId: DesktopWindowId | null;
  startOpen: boolean;
  desktopRef: RefObject<HTMLDivElement>;
  openWindow: (id: DesktopWindowId, title?: string) => void;
  closeWindow: (id: DesktopWindowId) => void;
  minimizeWindow: (id: DesktopWindowId) => void;
  restoreWindow: (id: DesktopWindowId) => void;
  focusWindow: (id: DesktopWindowId) => void;
  moveWindow: (id: DesktopWindowId, x: number, y: number) => void;
  toggleStart: () => void;
  setStartOpen: (open: boolean) => void;
  getBounds: () => DesktopBounds;
};

const DesktopContext = createContext<DesktopContextValue | null>(null);

let zCounter = 10;

const TASKBAR_H = 48;
const TITLEBAR_H = 40;

function defaultSize(id: DesktopWindowId, bounds: DesktopBounds) {
  let width = 380;
  let height = 300;
  if (id.startsWith("project:")) {
    width = 520;
    height = 420;
  } else if (id === "readme" || id === "about") {
    width = 440;
    height = 360;
  }

  const maxW = Math.max(260, bounds.width - 16);
  const maxH = Math.max(200, bounds.height - TASKBAR_H - 16);
  return {
    width: Math.min(width, maxW),
    height: Math.min(height, maxH),
  };
}

function defaultPos(
  id: DesktopWindowId,
  openCount: number,
  bounds: DesktopBounds,
  size: { width: number; height: number },
) {
  const offset = (openCount % 5) * 24;
  const maxX = Math.max(8, bounds.width - size.width - 8);
  const maxY = Math.max(8, bounds.height - size.height - TASKBAR_H - 8);
  return {
    x: Math.min(48 + offset, maxX),
    y: Math.min(32 + offset, maxY),
  };
}

function clampPos(
  x: number,
  y: number,
  width: number,
  height: number,
  bounds: DesktopBounds,
) {
  const maxX = Math.max(0, bounds.width - Math.min(width, bounds.width));
  const maxY = Math.max(
    0,
    bounds.height - TASKBAR_H - Math.min(TITLEBAR_H + 24, height),
  );
  return {
    x: Math.min(Math.max(0, x), maxX),
    y: Math.min(Math.max(0, y), maxY),
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
  const desktopRef = useRef<HTMLDivElement>(null!);

  const getBounds = useCallback((): DesktopBounds => {
    const el = desktopRef.current;
    if (el) {
      const r = el.getBoundingClientRect();
      return { width: r.width, height: r.height };
    }
    if (typeof window !== "undefined") {
      return {
        width: Math.min(window.innerWidth - 32, 1200),
        height: Math.min(window.innerHeight - 120, 820),
      };
    }
    return { width: 960, height: 640 };
  }, []);

  const focusWindow = useCallback((id: DesktopWindowId) => {
    zCounter += 1;
    setFocusedId(id);
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, z: zCounter, minimized: false } : w,
      ),
    );
  }, []);

  const openWindow = useCallback(
    (id: DesktopWindowId, title?: string) => {
      setStartOpen(false);
      const bounds = getBounds();

      setWindows((prev) => {
        const existing = prev.find((w) => w.id === id);
        zCounter += 1;
        if (existing) {
          return prev.map((w) =>
            w.id === id ? { ...w, minimized: false, z: zCounter } : w,
          );
        }
        const size = defaultSize(id, bounds);
        const pos = defaultPos(id, prev.length, bounds, size);
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
        return [...prev, next];
      });
      setFocusedId(id);
    },
    [getBounds],
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

  const moveWindow = useCallback(
    (id: DesktopWindowId, x: number, y: number) => {
      const bounds = getBounds();
      setWindows((prev) =>
        prev.map((w) => {
          if (w.id !== id) return w;
          const pos = clampPos(x, y, w.width, w.height, bounds);
          return { ...w, ...pos };
        }),
      );
    },
    [getBounds],
  );

  const toggleStart = useCallback(() => {
    setStartOpen((v) => !v);
  }, []);

  const value = useMemo(
    () => ({
      windows,
      focusedId,
      startOpen,
      desktopRef,
      openWindow,
      closeWindow,
      minimizeWindow,
      restoreWindow,
      focusWindow,
      moveWindow,
      toggleStart,
      setStartOpen,
      getBounds,
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
      getBounds,
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
