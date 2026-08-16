"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { useNavigation } from "@/components/providers/NavigationProvider";
import { cn } from "@/lib/utils";

/**
 * Thin scroll progress bar fixed to the top edge (under header feel).
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  const { menuOpen } = useNavigation();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  if (reduced) return null;

  return (
    <motion.div
      data-header-ignore
      className={cn(
        "pointer-events-none fixed left-0 right-0 top-0 z-[51] h-[2px] origin-left bg-accent",
        menuOpen && "opacity-0",
      )}
      style={{ scaleX }}
      aria-hidden
    />
  );
}
