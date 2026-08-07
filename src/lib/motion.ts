import type { Transition, Variants } from "framer-motion";

/** Shared motion language — Framer Motion presets for Vertical. */

export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_IN_OUT_EXPO: [number, number, number, number] = [0.87, 0, 0.13, 1];
export const EASE_OUT_QUART: [number, number, number, number] = [0.25, 1, 0.5, 1];
export const EASE_SPRING: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

export const duration = {
  instant: 0.12,
  fast: 0.2,
  base: 0.4,
  slow: 0.7,
  cinematic: 1.1,
} as const;

export const transitionBase: Transition = {
  duration: duration.base,
  ease: EASE_OUT_EXPO,
};

export const transitionSlow: Transition = {
  duration: duration.slow,
  ease: EASE_OUT_EXPO,
};

export const transitionSpring: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 28,
  mass: 0.8,
};

/** Fade + lift — default entrance */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionSlow,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.base, ease: EASE_OUT_EXPO },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitionSlow,
  },
};

/** Stagger parent for children reveals */
export const staggerContainer = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionSlow,
  },
};

/** Instant variants when reduced motion is preferred */
export const reducedMotionVariants: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

export function getRevealVariants(reduced: boolean): Variants {
  return reduced ? reducedMotionVariants : fadeUp;
}
