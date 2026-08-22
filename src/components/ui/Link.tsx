"use client";

import NextLink from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type LinkProps = ComponentProps<typeof NextLink> & {
  children: ReactNode;
  underline?: boolean;
  external?: boolean;
  mono?: boolean;
  className?: string;
};

/**
 * Editorial text link with animated underline.
 */
export function Link({
  children,
  className,
  underline = true,
  external,
  mono,
  ...props
}: LinkProps) {
  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <NextLink
      className={cn(
        "inline-flex items-center gap-1 transition-colors duration-base ease-out-expo",
        underline && "link-underline",
        mono && "tracking-label font-mono text-caption uppercase",
        className,
      )}
      {...externalProps}
      {...props}
    >
      {children}
      {external ? (
        <span aria-hidden className="text-[0.85em] opacity-60">
          ↗
        </span>
      ) : null}
    </NextLink>
  );
}
