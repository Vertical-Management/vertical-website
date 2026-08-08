"use client";

import Image from "next/image";
import NextLink from "next/link";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/ui/Magnetic";
import { SITE } from "@/lib/constants";
import { asset } from "@/lib/assets";

type LogoProps = {
  className?: string;
  /** White mark + light type for dark surfaces (hero, menu, inverse) */
  inverse?: boolean;
  /** Called when logo is activated (e.g. close menu) */
  onNavigate?: () => void;
  magnetic?: boolean;
  /**
   * sm  — header
   * md  — footer / blocks
   * lg  — statement moments
   */
  size?: "sm" | "md" | "lg";
};

const MARK = {
  sm: { height: 28, width: 20, className: "h-7 w-auto" },
  md: { height: 40, width: 28, className: "h-10 w-auto" },
  lg: { height: 56, width: 40, className: "h-12 w-auto md:h-14" },
} as const;

const WORD = {
  sm: "text-lg sm:text-xl",
  md: "text-xl sm:text-2xl",
  lg: "text-2xl sm:text-3xl",
} as const;

const LOGO = {
  black: asset("/assets/logo/VERTICAL-BLACK.png"),
  white: asset("/assets/logo/VERTICAL-WHITE.png"),
} as const;

/**
 * Brand lockup: official mark PNG + typographic “VERTICAL”.
 * Keeps the previous wordmark voice with the new graphic identity.
 */
export function Logo({
  className,
  inverse,
  onNavigate,
  magnetic = true,
  size = "sm",
}: LogoProps) {
  const mark = MARK[size];
  const src = inverse ? LOGO.white : LOGO.black;

  const el = (
    <NextLink
      href="/"
      onClick={onNavigate}
      className={cn(
        "group relative inline-flex items-center gap-2.5 sm:gap-3",
        className,
      )}
      aria-label={`${SITE.name} — inicio`}
      data-cursor="hover"
    >
      <Image
        src={src}
        alt=""
        width={mark.width}
        height={mark.height}
        className={cn(
          mark.className,
          "shrink-0 object-contain object-center",
          "transition-transform duration-base ease-out-expo group-hover:scale-[1.04]",
        )}
        // Header logo is chrome, not LCP — avoid fighting the hero wall poster
        priority={false}
      />

      <span
        className={cn(
          "relative font-display font-extrabold tracking-tight",
          WORD[size],
          inverse ? "text-paper" : "text-ink",
        )}
      >
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

  if (!magnetic) return el;

  return <Magnetic strength={12}>{el}</Magnetic>;
}
