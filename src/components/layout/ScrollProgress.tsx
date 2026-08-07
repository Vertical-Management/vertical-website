"use client";

import { useEffect } from "react";
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

  // Keep header tick in sync if present
  useEffect(() => {
    if (reduced) return;
    const unsub = scrollYProgress.on("change", (v) => {
      const el = document.getElementById("header-scroll-progress");
      if (el) el.style.transform = `scaleX(${v})`;
    });
    return () => unsub();
  }, [scrollYProgress, reduced]);

  if (reduced) return null;

  return (
    <motion.div
      className={cn(
        "pointer-events-none fixed left-0 right-0 top-0 z-[51] h-[2px] origin-left bg-accent",
        menuOpen && "opacity-0",
      )}
      style={{ scaleX }}
      aria-hidden
    />
  );
}
