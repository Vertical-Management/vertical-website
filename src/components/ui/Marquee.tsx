"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type MarqueeProps = {
  children: ReactNode;
  className?: string;
  /** CSS animation speed class override */
  speed?: "normal" | "fast" | "slow";
  reverse?: boolean;
  pauseOnHover?: boolean;
  /** Repeat count for seamless loop (min 2) */
  repeat?: number;
  gap?: string;
};

const speedClass = {
  normal: "animate-marquee",
  fast: "animate-marquee-fast",
  slow: "[animation-duration:48s] animate-marquee",
} as const;

/**
 * Infinite horizontal marquee. Pauses on hover. Static when reduced-motion.
 */
export function Marquee({
  children,
  className,
  speed = "normal",
  reverse = false,
  pauseOnHover = true,
  repeat = 2,
  gap = "2.5rem",
}: MarqueeProps) {
  const reduced = usePrefersReducedMotion();
  const copies = Math.max(2, repeat);

  if (reduced) {
    return (
      <div
        className={cn("scrollbar-none flex overflow-x-auto", className)}
        style={{ gap }}
      >
        {children}
      </div>
    );
  }

  return (
    <div className={cn("group relative flex overflow-hidden", className)} aria-hidden>
      <div
        className={cn(
          "flex min-w-full shrink-0 items-center",
          speedClass[speed],
          reverse && "animate-marquee-reverse",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
        style={{ gap, columnGap: gap }}
      >
        {Array.from({ length: copies }).map((_, i) => (
          <div key={i} className="flex shrink-0 items-center" style={{ gap }}>
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}

type MarqueeItemProps = {
  children: ReactNode;
  className?: string;
};

export function MarqueeItem({ children, className }: MarqueeItemProps) {
  return (
    <div className={cn("inline-flex shrink-0 items-center", className)}>{children}</div>
  );
}
