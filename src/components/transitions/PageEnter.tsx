"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT_EXPO, duration } from "@/lib/motion";

/**
 * Content enter animation for app/template.tsx (remounts each navigation).
 */
export function PageEnter({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  if (reduced) {
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
