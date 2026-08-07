"use client";

import { useEffect, useRef } from "react";
import { createLenis, type LenisInstance } from "@/lib/lenis";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { useNavigation } from "@/components/providers/NavigationProvider";

/**
 * Mount Lenis smooth scroll and sync with GSAP ScrollTrigger.
 * Registers instance on NavigationProvider for menu lock.
 * Disabled when prefers-reduced-motion is set.
 */
export function useLenis() {
  const lenisRef = useRef<LenisInstance | null>(null);
  const reduced = usePrefersReducedMotion();
  const { setLenis } = useNavigation();

  useEffect(() => {
    if (reduced) {
      setLenis(null);
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
    gsap.ticker.lagSmoothing(0);

    document.documentElement.classList.add("lenis", "lenis-smooth");

    // Reset scroll on route transitions (custom event from TransitionProvider optional)
    const onReset = () => {
      lenis.scrollTo(0, { immediate: true });
    };
    window.addEventListener("vertical:scroll-reset", onReset);

    return () => {
      window.removeEventListener("vertical:scroll-reset", onReset);
      gsap.ticker.remove(ticker);
      lenis.destroy();
      lenisRef.current = null;
      setLenis(null);
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };
  }, [reduced, setLenis]);

  return lenisRef;
}
