"use client";

import {
  useRef,
  type ReactNode,
  type MouseEvent,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type MagneticProps = {
  children: ReactNode;
  /** Pull strength in px (default 28) */
  strength?: number;
  className?: string;
};

/**
 * Soft magnetic pull toward the cursor.
 * Disabled on touch / reduced-motion.
 */
export function Magnetic({
  children,
  strength = 28,
  className,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isFinePointer = useMediaQuery("(pointer: fine)");
  const enabled = !reduced && isFinePointer;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set((relX / (rect.width / 2)) * strength);
    y.set((relY / (rect.height / 2)) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={cn("inline-flex will-change-transform", className)}
      style={enabled ? { x: springX, y: springY } : undefined}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
}
