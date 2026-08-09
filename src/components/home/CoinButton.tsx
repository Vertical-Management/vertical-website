"use client";

import type { ReactNode } from "react";
import NextLink from "next/link";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/ui/Magnetic";

type CoinButtonProps = {
  href?: string;
  children?: ReactNode;
  className?: string;
  size?: "md" | "lg" | "xl";
  magnetic?: boolean;
};

const sizes = {
  md: "h-12 px-6 text-[0.65rem]",
  lg: "h-14 px-8 text-xs",
  xl: "h-16 px-10 text-sm",
} as const;

/**
 * Signature “Insert coin” arcade CTA — Vertical personality mark.
 */
export function CoinButton({
  href = "/contacto",
  children = "Insert coin",
  className,
  size = "lg",
  magnetic = true,
}: CoinButtonProps) {
  const el = (
    <NextLink
      href={href}
      data-cursor="hover"
      className={cn(
        "group relative inline-flex items-center justify-center gap-2",
        "rounded-pill border-2 border-ink bg-accent-lime font-mono font-medium uppercase tracking-[0.16em] text-ink",
        "shadow-[4px_4px_0_0_var(--color-ink)]",
        "transition-[transform,box-shadow,background-color] duration-base ease-out-expo",
        "hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0_0_var(--color-ink)]",
        "active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        sizes[size],
        className,
      )}
    >
      <span
        className="inline-block h-2 w-2 rounded-full bg-ink transition-transform duration-base ease-spring group-hover:scale-125"
        aria-hidden
      />
      {children}
    </NextLink>
  );

  if (!magnetic) return el;
  return <Magnetic strength={16}>{el}</Magnetic>;
}
