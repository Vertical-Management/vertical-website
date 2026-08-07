"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type CursorProps = {
  className?: string;
  /** Hide native cursor on the document */
  hideNative?: boolean;
};

/**
 * Dual-ring custom cursor. Disabled on touch / reduced-motion.
 * Pair with `data-cursor="hover"` or `data-cursor="text"` on interactive nodes.
 */
export function Cursor({ className, hideNative = true }: CursorProps) {
  const reduced = useReducedMotion();
  const isFine = useMediaQuery("(pointer: fine)");
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<"default" | "hover" | "text">("default");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.35 });
  const rx = useSpring(x, { stiffness: 180, damping: 28, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 180, damping: 28, mass: 0.5 });

  useEffect(() => {
    if (reduced || !isFine) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const target = (e.target as HTMLElement | null)?.closest?.(
        "[data-cursor]",
      ) as HTMLElement | null;
      const next = (target?.dataset.cursor as "hover" | "text") || "default";
      setMode(next);
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    if (hideNative) {
      document.documentElement.classList.add("has-custom-cursor");
    }

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [reduced, isFine, hideNative, x, y]);

  if (reduced || !isFine) return null;

  const hover = mode === "hover";
  const text = mode === "text";

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-cursor hidden md:block",
        className,
      )}
      aria-hidden
    >
      {/* Dot */}
      <motion.div
        className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent mix-blend-difference"
        style={{ left: sx, top: sy, opacity: visible ? 1 : 0 }}
      />
      {/* Ring */}
      <motion.div
        className={cn(
          "absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/40 mix-blend-difference transition-[width,height,background-color] duration-base ease-out-expo",
          hover && "border-accent bg-accent/10",
          text && "border-ink/20",
        )}
        style={{
          left: rx,
          top: ry,
          width: hover ? 56 : text ? 72 : 36,
          height: hover ? 56 : text ? 72 : 36,
          opacity: visible ? 1 : 0,
        }}
      />
    </div>
  );
}
