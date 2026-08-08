"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export type MediaBudget = {
  /** Prefer posters only — no video decode */
  staticOnly: boolean;
  /** Max simultaneous H.264 decodes */
  maxPlaying: number;
  /** Document tab is visible */
  visible: boolean;
};

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
};

function readBudget(reduced: boolean | null): Omit<MediaBudget, "visible"> {
  if (typeof window === "undefined") {
    return { staticOnly: !!reduced, maxPlaying: 3 };
  }

  if (reduced) {
    return { staticOnly: true, maxPlaying: 0 };
  }

  const nav = navigator as Navigator & {
    connection?: NetworkInformation;
    deviceMemory?: number;
  };
  const conn = nav.connection;
  const saveData = !!conn?.saveData;
  const slowNet =
    conn?.effectiveType === "slow-2g" ||
    conn?.effectiveType === "2g" ||
    conn?.effectiveType === "3g";

  const cores = navigator.hardwareConcurrency || 4;
  const mem = nav.deviceMemory; // Chrome only, GB
  const lowEnd = cores <= 4 || (typeof mem === "number" && mem <= 4);

  // Mobile / coarse pointer → fewer decodes
  const coarse =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(pointer: coarse)").matches;

  if (saveData || slowNet) {
    return { staticOnly: true, maxPlaying: 0 };
  }

  if (coarse || lowEnd) {
    return { staticOnly: false, maxPlaying: 2 };
  }

  return { staticOnly: false, maxPlaying: 4 };
}

/**
 * Adaptive media budget for the home hero wall.
 * Degrades gracefully on Save-Data, slow networks, low-end devices.
 */
export function useMediaBudget(): MediaBudget {
  const reduced = useReducedMotion();
  const [budget, setBudget] = useState<MediaBudget>(() => ({
    ...readBudget(reduced),
    visible: true,
  }));

  useEffect(() => {
    const apply = () => {
      setBudget((prev) => ({
        ...readBudget(reduced),
        visible: typeof document !== "undefined" ? !document.hidden : prev.visible,
      }));
    };

    apply();

    const conn = (navigator as Navigator & { connection?: EventTarget })
      .connection;
    conn?.addEventListener?.("change", apply);
    document.addEventListener("visibilitychange", apply);

    let mql: MediaQueryList | null = null;
    if (typeof window.matchMedia === "function") {
      mql = window.matchMedia("(pointer: coarse)");
      mql.addEventListener?.("change", apply);
    }

    return () => {
      conn?.removeEventListener?.("change", apply);
      document.removeEventListener("visibilitychange", apply);
      mql?.removeEventListener?.("change", apply);
    };
  }, [reduced]);

  return budget;
}
