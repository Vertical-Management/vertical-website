"use client";

import { forwardRef, type ReactNode } from "react";
import NextLink from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion";

export const NOSOTROS_EASE = EASE_OUT_EXPO;

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: NOSOTROS_EASE },
  },
};

export const fadeInUpReduced: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0 } },
};

export function useNosotrosReveal() {
  const reduced = useReducedMotion();
  return reduced ? fadeInUpReduced : fadeInUp;
}

type ShellProps = {
  children: ReactNode;
  tone: "dark" | "light";
  className?: string;
  labelledBy?: string;
  ariaLabel?: string;
};

/** Rounded 2.5rem section wrapper — /nosotros only. */
export const NosotrosShell = forwardRef<HTMLElement, ShellProps>(function NosotrosShell(
  { children, tone, className, labelledBy, ariaLabel },
  ref,
) {
  return (
    <section
      ref={ref}
      data-nav-ground={tone === "dark" ? "color" : "paper"}
      aria-labelledby={labelledBy}
      aria-label={ariaLabel}
      className={cn(
        "n-shell relative overflow-hidden rounded-[2.5rem]",
        tone === "dark"
          ? "n-shell--dark bg-gradient-to-b from-[#0A0A0A] to-black text-white"
          : "n-shell--light bg-gradient-to-b from-zinc-50 via-[#F4F4F5] to-zinc-200/80 text-zinc-900",
        className,
      )}
    >
      {tone === "dark" ? <span className="n-grain" aria-hidden /> : null}
      {children}
    </section>
  );
});

type GlassStatCardProps = {
  value: string;
  label: string;
  className?: string;
};

export function GlassStatCard({ value, label, className }: GlassStatCardProps) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      className={cn(
        "n-glass rounded-[1.25rem] border border-white/10 bg-white/5 px-5 py-4 sm:px-6 sm:py-5 md:backdrop-blur-md",
        className,
      )}
      whileHover={reduced ? undefined : { scale: 1.05 }}
      transition={{ duration: 0.3, ease: NOSOTROS_EASE }}
    >
      <p className="font-display text-3xl font-medium tracking-[-0.05em] text-white">
        {value}
      </p>
      <p className="mt-1 text-sm font-light text-white/60">{label}</p>
    </motion.article>
  );
}

type ActionButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

/** Pill action — white body + ink disc icon. */
export function InteractiveActionButton({
  href,
  children,
  className,
}: ActionButtonProps) {
  const reduced = useReducedMotion();

  return (
    <NextLink
      href={href}
      data-cursor="hover"
      className={cn(
        "n-action group inline-flex items-center rounded-full bg-white py-2 pl-6 pr-2",
        "font-medium text-zinc-900",
        "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        !reduced && "hover:scale-105",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-lime",
        className,
      )}
    >
      <span>{children}</span>
      <span
        className="ml-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 transition-colors duration-300 group-hover:bg-zinc-700"
        aria-hidden
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.5 8h9M8.5 4l4 4-4 4"
            stroke="white"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </NextLink>
  );
}
