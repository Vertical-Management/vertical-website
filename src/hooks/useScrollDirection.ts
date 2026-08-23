"use client";

import { useEffect, useState } from "react";

type ScrollState = {
  /** Pixels scrolled from top */
  y: number;
  /** true when scrolling down */
  direction: "up" | "down" | null;
  /** past threshold where header solidifies */
  solid: boolean;
  /** near top of page */
  atTop: boolean;
};

const SOLID_AT = 24;
const DELTA = 6;

/**
 * Scroll position + direction for header hide/show and solid state.
 * Works with Lenis (listens to window scroll + lenis scroll events via native scroll).
 */
function readScrollState(lastY: number): ScrollState & { lastY: number } {
  const y = typeof window !== "undefined" ? window.scrollY : 0;
  const diff = y - lastY;
  let direction: ScrollState["direction"] = null;
  let nextLast = lastY;

  if (Math.abs(diff) > DELTA) {
    direction = diff > 0 ? "down" : "up";
    nextLast = y;
  }

  return {
    y,
    direction,
    solid: y > SOLID_AT,
    atTop: y < 8,
    lastY: nextLast,
  };
}

export function useScrollDirection(): ScrollState {
  // Lazy init from real scrollY so restore / mid-page load doesn't flash wrong chrome
  const [state, setState] = useState<ScrollState>(() => {
    if (typeof window === "undefined") {
      return { y: 0, direction: null, solid: false, atTop: true };
    }
    const { lastY: _l, ...s } = readScrollState(window.scrollY);
    return s;
  });

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const next = readScrollState(lastY);
      lastY = next.lastY;
      setState({
        y: next.y,
        direction: next.direction,
        solid: next.solid,
        atTop: next.atTop,
      });
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return state;
}
