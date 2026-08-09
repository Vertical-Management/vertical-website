"use client";

import { useEffect, useRef } from "react";
import {
  createLenis,
  shouldEnableSmoothScroll,
  type LenisInstance,
} from "@/lib/lenis";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { useNavigation } from "@/components/providers/NavigationProvider";

/**
 * Mount Lenis smooth scroll and sync with GSAP ScrollTrigger.
 * Disabled on reduced-motion, touch devices and narrow viewports (native scroll).
 */
export function useLenis() {
  const lenisRef = useRef<LenisInstance | null>(null);
  const reduced = usePrefersReducedMotion();
  const { setLenis } = useNavigation();

  useEffect(() => {
    if (reduced || !shouldEnableSmoothScroll()) {
      setLenis(null);
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      return;
    }

    registerGsap();
    const lenis = createLenis();
    lenisRef.current = lenis;
    setLenis(lenis);

    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(ticker);
    // Restore lag smoothing so long frames don't cascade into sticky scroll
    gsap.ticker.lagSmoothing(500, 33);

    document.documentElement.classList.add("lenis", "lenis-smooth");

    const onReset = () => {
      lenis.scrollTo(0, { immediate: true });
    };
    window.addEventListener("vertical:scroll-reset", onReset);

    const onResize = () => {
      if (!shouldEnableSmoothScroll()) {
        window.dispatchEvent(new Event("vertical:lenis-disable"));
      }
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("vertical:scroll-reset", onReset);
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(ticker);
      lenis.destroy();
      lenisRef.current = null;
      setLenis(null);
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };
  }, [reduced, setLenis]);

  return lenisRef;
}
