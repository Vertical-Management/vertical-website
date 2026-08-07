"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useDesktop } from "@/components/proyectos/DesktopContext";
import { asset } from "@/lib/assets";
import { cn } from "@/lib/utils";

/**
 * Bottom taskbar — Start, open windows, clock.
 */
export function Taskbar() {
  const {
    windows,
    focusedId,
    startOpen,
    toggleStart,
    restoreWindow,
    focusWindow,
  } = useDesktop();
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      setTime(
        new Intl.DateTimeFormat("es-AD", {
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date()),
      );
    };
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="pointer-events-auto absolute inset-x-0 bottom-0 z-[100] flex h-12 items-center gap-1 border-t border-white/10 bg-[#121214]/90 px-1.5 backdrop-blur-xl md:px-2">
      <button
        type="button"
        data-cursor="hover"
        onClick={toggleStart}
        className={cn(
          "flex h-9 items-center gap-2 rounded-md px-2.5 font-display text-sm font-bold tracking-tight text-paper",
          "bg-gradient-to-b from-accent-lime to-[#9fcc00] text-ink shadow-sm",
          "transition-transform duration-fast hover:brightness-105 active:scale-95",
          startOpen && "ring-2 ring-white/40",
        )}
        aria-expanded={startOpen}
        aria-haspopup="menu"
      >
        <Image
          src={asset("/assets/xp/windows.png")}
          alt=""
          width={18}
          height={18}
          className="h-4 w-4 object-contain"
          unoptimized
        />
        <span className="hidden sm:inline">Start</span>
      </button>

      <div className="mx-1 h-6 w-px bg-white/10" aria-hidden />

      <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto scrollbar-none">
        {windows.map((w) => {
          const active = focusedId === w.id && !w.minimized;
          return (
            <button
              key={w.id}
              type="button"
              data-cursor="hover"
              onClick={() =>
                w.minimized ? restoreWindow(w.id) : focusWindow(w.id)
              }
              className={cn(
                "h-9 max-w-[160px] truncate rounded-md border px-2.5 font-mono text-[10px] uppercase tracking-label",
                "transition-colors duration-fast",
                active
                  ? "border-accent-lime/40 bg-white/15 text-paper"
                  : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-paper",
                w.minimized && "opacity-60",
              )}
            >
              {w.title}
            </button>
          );
        })}
      </div>

      <div className="flex h-9 items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 font-mono text-[11px] tabular-nums text-white/70">
        <span className="hidden text-accent-lime sm:inline" aria-hidden>
          ●
        </span>
        <span suppressHydrationWarning>{time || "--:--"}</span>
      </div>
    </div>
  );
}
