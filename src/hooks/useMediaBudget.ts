"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export type MediaBudget = {
  /**
   * Posters only — no video decode.
   * Used for prefers-reduced-motion and Save-Data / very slow networks.
   */
  staticOnly: boolean;
  /** Hard cap of concurrent video elements for the hero wall */
  maxVideos: number;
};

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
};

type CapOptions = {
  desktop?: number;
  mobile?: number;
};

function isMobileViewport(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 768px)").matches;
}

function readStaticOnly(reduced: boolean | null): boolean {
  if (typeof window === "undefined") return !!reduced;
  if (reduced) return true;

  const conn = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  // Only hard-disable video on explicit Save-Data or reduced-motion.
  if (conn?.saveData) return true;
  if (conn?.effectiveType === "slow-2g") return true;
  return false;
}

function readMaxVideos(reduced: boolean | null, caps: Required<CapOptions>): number {
  if (typeof window === "undefined") return caps.desktop;
  if (reduced || readStaticOnly(reduced)) return 0;

  const conn = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  const mobile = isMobileViewport();
  let cap = mobile ? caps.mobile : caps.desktop;

  // Throttle further on constrained networks (still allow some motion)
  if (conn?.effectiveType === "2g") cap = Math.min(cap, 1);
  else if (conn?.effectiveType === "3g") cap = Math.min(cap, mobile ? 1 : 2);

  // Hardware concurrency heuristic (low-end devices)
  const cores = navigator.hardwareConcurrency ?? 8;
  if (cores <= 4) cap = Math.min(cap, mobile ? 1 : 2);

  return Math.max(0, cap);
}

/**
 * Hero wall media budget: static-only gate + concurrent video cap.
 */
export function useMediaBudget(caps?: CapOptions): MediaBudget {
  const reduced = useReducedMotion();
  const resolved = {
    desktop: caps?.desktop ?? 4,
    mobile: caps?.mobile ?? 2,
  };

  const [staticOnly, setStaticOnly] = useState(() => readStaticOnly(reduced));
  const [maxVideos, setMaxVideos] = useState(() => readMaxVideos(reduced, resolved));

  useEffect(() => {
    const apply = () => {
      setStaticOnly(readStaticOnly(reduced));
      setMaxVideos(readMaxVideos(reduced, resolved));
    };
    apply();

    const conn = (navigator as Navigator & { connection?: EventTarget }).connection;
    conn?.addEventListener?.("change", apply);

    const mql = window.matchMedia("(max-width: 768px)");
    const onMql = () => apply();
    mql.addEventListener?.("change", onMql);

    return () => {
      conn?.removeEventListener?.("change", apply);
      mql.removeEventListener?.("change", onMql);
    };
    // resolved caps are stable primitives from call sites
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, resolved.desktop, resolved.mobile]);

  return { staticOnly, maxVideos };
}
