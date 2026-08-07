"use client";

import NextLink from "next/link";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/ui/Magnetic";
import { SITE } from "@/lib/constants";

type LogoProps = {
  className?: string;
  /** Invert colors for dark surfaces */
  inverse?: boolean;
  /** Called when logo is activated (e.g. close menu) */
  onNavigate?: () => void;
  magnetic?: boolean;
};

/**
 * Vertical wordmark — typographic logo with accent mark.
 */
export function Logo({
  className,
  inverse,
  onNavigate,
  magnetic = true,
}: LogoProps) {
  const mark = (
    <NextLink
      href="/"
      onClick={onNavigate}
      className={cn(
        "group relative inline-flex items-baseline gap-0 font-display text-lg font-extrabold tracking-tight sm:text-xl",
        inverse ? "text-paper" : "text-ink",
        className,
      )}
      aria-label={`${SITE.name} — inicio`}
      data-cursor="hover"
    >
      <span className="relative">
        VERTICAL
        <span
          className={cn(
            "absolute -right-1.5 -top-0.5 h-1.5 w-1.5 rounded-full transition-transform duration-base ease-out-expo group-hover:scale-125",
            inverse ? "bg-accent-lime" : "bg-accent",
          )}
          aria-hidden
        />
      </span>
    </NextLink>
  );

  if (!magnetic) return mark;

  return <Magnetic strength={12}>{mark}</Magnetic>;
}
