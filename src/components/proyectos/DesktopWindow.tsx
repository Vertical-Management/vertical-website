"use client";

import {
  useCallback,
  useRef,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { DesktopWindowState } from "@/types";
import { useDesktop } from "@/components/proyectos/DesktopContext";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO, duration } from "@/lib/motion";

type DesktopWindowProps = {
  win: DesktopWindowState;
  children: ReactNode;
  accent?: string;
};

/**
 * Neo-retro window chrome — drag titlebar, focus, min/close.
 */
export function DesktopWindow({ win, children, accent }: DesktopWindowProps) {
  const { focusedId, focusWindow, closeWindow, minimizeWindow, moveWindow } =
    useDesktop();
  const reduced = useReducedMotion();
  const drag = useRef<{
    ox: number;
    oy: number;
    sx: number;
    sy: number;
  } | null>(null);
  const focused = focusedId === win.id;

  const onPointerDownTitle = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if ((e.target as HTMLElement).closest("[data-win-action]")) return;
      focusWindow(win.id);
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      drag.current = {
        ox: e.clientX,
        oy: e.clientY,
        sx: win.x,
        sy: win.y,
      };
    },
    [focusWindow, win.id, win.x, win.y],
  );

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (!drag.current) return;
      const dx = e.clientX - drag.current.ox;
      const dy = e.clientY - drag.current.oy;
      const nx = Math.max(0, drag.current.sx + dx);
      const ny = Math.max(0, drag.current.sy + dy);
      moveWindow(win.id, nx, ny);
    },
    [moveWindow, win.id],
  );

  const onPointerUp = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    drag.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  }, []);

  if (win.minimized) return null;

  return (
    <motion.div
      role="dialog"
      aria-label={win.title}
      className={cn(
        "absolute flex flex-col overflow-hidden rounded-xl border border-white/20 bg-[#1a1a1c]/95 shadow-lg backdrop-blur-xl",
        focused ? "ring-1 ring-accent-lime/40" : "opacity-95",
      )}
      style={{
        left: win.x,
        top: win.y,
        width: Math.min(win.width, typeof window !== "undefined" ? window.innerWidth - 16 : win.width),
        height: win.height,
        zIndex: win.z,
        maxWidth: "calc(100vw - 1rem)",
      }}
      initial={reduced ? false : { opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0, scale: 0.96, y: 8 }}
      transition={{ duration: duration.base, ease: EASE_OUT_EXPO }}
      onPointerDown={() => focusWindow(win.id)}
    >
      {/* Title bar */}
      <div
        className="flex h-10 shrink-0 cursor-grab items-center gap-2 border-b border-white/10 bg-gradient-to-r from-white/10 to-transparent px-2 active:cursor-grabbing"
        style={
          accent
            ? {
                borderTop: `2px solid ${accent}`,
              }
            : { borderTop: "2px solid var(--color-accent-lime)" }
        }
        onPointerDown={onPointerDownTitle}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="flex items-center gap-1.5 pl-1" data-win-action>
          <button
            type="button"
            data-win-action
            aria-label="Cerrar"
            className="h-3 w-3 rounded-full bg-[#ff5f57] transition-transform hover:scale-110"
            onClick={() => closeWindow(win.id)}
          />
          <button
            type="button"
            data-win-action
            aria-label="Minimizar"
            className="h-3 w-3 rounded-full bg-[#febc2e] transition-transform hover:scale-110"
            onClick={() => minimizeWindow(win.id)}
          />
          <span
            className="h-3 w-3 rounded-full bg-[#28c840] opacity-60"
            aria-hidden
          />
        </div>
        <p className="min-w-0 flex-1 truncate text-center font-mono text-[11px] uppercase tracking-label text-white/70">
          {win.title}
        </p>
        <span className="w-14" aria-hidden />
      </div>

      {/* Body */}
      <div
        className="min-h-0 flex-1 overflow-auto overscroll-contain bg-[#0f0f10] text-paper"
        data-lenis-prevent
      >
        {children}
      </div>
    </motion.div>
  );
}
