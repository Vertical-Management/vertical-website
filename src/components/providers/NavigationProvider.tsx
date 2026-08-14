"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import type { LenisInstance } from "@/lib/lenis";

type NavigationContextValue = {
  menuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
  setLenis: (instance: LenisInstance | null) => void;
};

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lenis, setLenisState] = useState<LenisInstance | null>(null);
  const pathname = usePathname();

  const setLenis = useCallback((instance: LenisInstance | null) => {
    setLenisState(instance);
  }, []);

  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock scroll and isolate background while the modal menu is open
  useEffect(() => {
    const root = document.documentElement;
    const isolated = Array.from(
      document.querySelectorAll<HTMLElement>("[data-nav-inert]"),
    );

    const setIsolated = (on: boolean) => {
      isolated.forEach((el) => {
        if (on) {
          el.setAttribute("inert", "");
          el.setAttribute("aria-hidden", "true");
        } else {
          el.removeAttribute("inert");
          el.removeAttribute("aria-hidden");
        }
      });
    };

    if (menuOpen) {
      root.classList.add("nav-menu-open");
      lenis?.stop();
      document.body.style.overflow = "hidden";
      setIsolated(true);
    } else {
      root.classList.remove("nav-menu-open");
      lenis?.start();
      document.body.style.overflow = "";
      setIsolated(false);
    }

    return () => {
      root.classList.remove("nav-menu-open");
      document.body.style.overflow = "";
      setIsolated(false);
      // Ensure scroll is not left stopped if provider unmounts with menu open
      lenis?.start();
    };
  }, [menuOpen, lenis]);

  // Escape to close
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const value = useMemo(
    () => ({
      menuOpen,
      openMenu,
      closeMenu,
      toggleMenu,
      setLenis,
    }),
    [menuOpen, openMenu, closeMenu, toggleMenu, setLenis],
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) {
    throw new Error("useNavigation must be used within NavigationProvider");
  }
  return ctx;
}
