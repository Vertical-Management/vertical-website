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
export function useScrollDirection(): ScrollState {
  const [state, setState] = useState<ScrollState>({
    y: 0,
    direction: null,
    solid: false,
    atTop: true,
  });

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const diff = y - lastY;
      let direction: ScrollState["direction"] = null;

      if (Math.abs(diff) > DELTA) {
        direction = diff > 0 ? "down" : "up";
        lastY = y;
      }

      setState({
        y,
        direction,
        solid: y > SOLID_AT,
        atTop: y < 8,
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
