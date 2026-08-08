"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export type MediaBudget = {
  /**
   * Posters only — no video decode.
   * Used for prefers-reduced-motion and Save-Data / very slow networks.
   */
  staticOnly: boolean;
};

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
};

function readStaticOnly(reduced: boolean | null): boolean {
  if (typeof window === "undefined") return !!reduced;
  if (reduced) return true;

  const conn = (navigator as Navigator & { connection?: NetworkInformation })
    .connection;
  // Only hard-disable video on explicit Save-Data or reduced-motion.
  // Do NOT freeze the wall on "3g" — that left many users with stuck posters.
  if (conn?.saveData) return true;
  if (conn?.effectiveType === "slow-2g") return true;
  return false;
}

/**
 * Whether the hero wall should skip video decode entirely.
 * Does not cap concurrent players — any pixel-visible tile may play.
 */
export function useMediaBudget(): MediaBudget {
  const reduced = useReducedMotion();
  const [staticOnly, setStaticOnly] = useState(() => readStaticOnly(reduced));

  useEffect(() => {
    const apply = () => setStaticOnly(readStaticOnly(reduced));
    apply();

    const conn = (navigator as Navigator & { connection?: EventTarget })
      .connection;
    conn?.addEventListener?.("change", apply);

    return () => {
      conn?.removeEventListener?.("change", apply);
    };
  }, [reduced]);

  return { staticOnly };
}
