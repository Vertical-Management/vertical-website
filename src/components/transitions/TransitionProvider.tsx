"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useNavigation } from "@/components/providers/NavigationProvider";
import {
  getRouteLabel,
  isInternalHref,
  normalizePath,
} from "@/lib/routes";

export type TransitionPhase = "idle" | "leaving" | "entering";

type TransitionContextValue = {
  phase: TransitionPhase;
  label: string;
  targetPath: string | null;
  isTransitioning: boolean;
  /** Programmatic navigate with cinematic cover */
  navigateWithTransition: (href: string) => void;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

const LEAVE_MS = 420;
const ENTER_MS = 360;

/**
 * Cinematic page transitions via cover overlay + App Router navigation.
 * Intercepts internal link clicks; respects reduced-motion.
 */
export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();
  const { closeMenu } = useNavigation();

  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const [label, setLabel] = useState(() => getRouteLabel(pathname));
  const [targetPath, setTargetPath] = useState<string | null>(null);
  const pendingRef = useRef<string | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const enterTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;

  const clearTimers = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    if (enterTimer.current) clearTimeout(enterTimer.current);
    leaveTimer.current = null;
    enterTimer.current = null;
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.dispatchEvent(new Event("vertical:scroll-reset"));
  }, []);

  const finishEnter = useCallback(() => {
    setPhase("idle");
    setTargetPath(null);
    pendingRef.current = null;
    document.documentElement.classList.remove("is-page-transitioning");
  }, []);

  const navigateWithTransition = useCallback(
    (href: string) => {
      const path = normalizePath(href);
      if (path === pathname) {
        closeMenu();
        return;
      }

      closeMenu();

      if (reducedRef.current) {
        router.push(href.startsWith("http") ? path : href);
        return;
      }

      clearTimers();
      pendingRef.current = href.startsWith("http") ? path : href;
      setTargetPath(path);
      setLabel(getRouteLabel(path));
      setPhase("leaving");
      document.documentElement.classList.add("is-page-transitioning");

      leaveTimer.current = setTimeout(() => {
        const next = pendingRef.current;
        if (next) router.push(next);
      }, LEAVE_MS);
    },
    [pathname, router, closeMenu, clearTimers],
  );

  // Pathname changed → enter phase
  useEffect(() => {
    setLabel(getRouteLabel(pathname));
    scrollToTop();

    if (reducedRef.current) {
      setPhase("idle");
      document.documentElement.classList.remove("is-page-transitioning");
      return;
    }

    // Coming from our leave, or browser back/forward
    if (pendingRef.current || phase === "leaving") {
      pendingRef.current = null;
      setPhase("entering");
      enterTimer.current = setTimeout(finishEnter, ENTER_MS);
    } else {
      // Soft enter on first mount only — keep idle
      setPhase("idle");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- react to pathname
  }, [pathname]);

  // Intercept internal link clicks
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      if (anchor.dataset.noTransition === "true") return;

      const href = anchor.getAttribute("href");
      if (!href || !isInternalHref(href)) return;

      const path = normalizePath(href);
      if (path === pathname && !href.includes("#")) {
        e.preventDefault();
        return;
      }
      // Allow in-page hash on same path
      if (path === pathname && href.includes("#")) return;

      e.preventDefault();
      navigateWithTransition(href);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname, navigateWithTransition]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const value = useMemo(
    () => ({
      phase,
      label,
      targetPath,
      isTransitioning: phase !== "idle",
      navigateWithTransition,
    }),
    [phase, label, targetPath, navigateWithTransition],
  );

  return (
    <TransitionContext.Provider value={value}>
      {children}
    </TransitionContext.Provider>
  );
}

export function usePageTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) {
    throw new Error("usePageTransition must be used within TransitionProvider");
  }
  return ctx;
}
