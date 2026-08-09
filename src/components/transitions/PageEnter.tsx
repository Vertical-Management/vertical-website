"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { EASE_OUT_EXPO, duration } from "@/lib/motion";

/**
 * Routes that must paint immediately (no opacity:0 entrance trap).
 * Home is included so hero text is never invisible/black while waiting for FM.
 */
const INSTANT_PATHS = new Set(["/", "/propuestas-hero"]);

/**
 * Content enter animation for app/template.tsx (remounts each navigation).
 */
export function PageEnter({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const instant = INSTANT_PATHS.has(pathname);

  if (reduced || instant) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: duration.slow,
        ease: EASE_OUT_EXPO,
        delay: 0.05,
      }}
    >
      {children}
    </motion.div>
  );
}
