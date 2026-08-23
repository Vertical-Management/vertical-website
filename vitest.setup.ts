import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// jsdom no implementa matchMedia; framer-motion lo consulta para
// prefers-reduced-motion (useReducedMotion) — stub neutro.
if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList;
}

afterEach(() => {
  cleanup();
});
