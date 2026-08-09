"use client";

import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "accent"
  | "arcade"
  | "inverse";

export type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  children: ReactNode;
  /** Soft lift + scale on hover (disabled with reduced motion) */
  magneticFeel?: boolean;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  id?: string;
  name?: string;
  form?: string;
  "aria-label"?: string;
  "data-cursor"?: string;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-ink text-paper hover:bg-ink-soft border border-transparent shadow-sm",
  secondary:
    "bg-transparent text-ink border border-border-strong hover:border-ink hover:bg-ink hover:text-paper",
  ghost: "bg-transparent text-ink border border-transparent hover:bg-ink/5",
  accent:
    "bg-accent text-paper border border-transparent hover:brightness-110 shadow-glow",
  arcade:
    "bg-accent-lime text-ink border-2 border-ink font-mono uppercase tracking-[0.14em] shadow-[4px_4px_0_0_var(--color-ink)] hover:shadow-[2px_2px_0_0_var(--color-ink)] hover:translate-x-px hover:translate-y-px active:shadow-none active:translate-x-0.5 active:translate-y-0.5",
  inverse: "bg-paper text-ink border border-transparent hover:bg-paper-warm",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-10 min-h-10 px-4 text-xs gap-1.5 rounded-pill",
  md: "h-12 min-h-12 px-6 text-sm gap-2 rounded-pill",
  lg: "h-14 min-h-12 px-8 text-base gap-2.5 rounded-pill",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      className,
      variant = "primary",
      size = "md",
      fullWidth,
      leadingIcon,
      trailingIcon,
      children,
      magneticFeel = true,
      disabled,
      type = "button",
      onClick,
      id,
      name,
      form,
      "aria-label": ariaLabel,
      "data-cursor": dataCursor,
    },
    ref,
  ) {
    const reduced = useReducedMotion();
    const isArcade = variant === "arcade";

    const classes = cn(
      "group relative inline-flex items-center justify-center font-medium",
      "transition-[transform,box-shadow,background-color,border-color,color,filter] duration-base ease-out-expo",
      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
      "disabled:pointer-events-none disabled:opacity-40",
      "select-none whitespace-nowrap",
      variantStyles[variant],
      sizeStyles[size],
      isArcade && "font-mono text-xs sm:text-sm",
      fullWidth && "w-full",
      className,
    );

    const content = (
      <>
        {leadingIcon ? (
          <span className="inline-flex shrink-0 transition-transform duration-base ease-out-expo group-hover:-translate-x-0.5">
            {leadingIcon}
          </span>
        ) : null}
        <span className="relative z-[1]">{children}</span>
        {trailingIcon ? (
          <span className="inline-flex shrink-0 transition-transform duration-base ease-out-expo group-hover:translate-x-0.5">
            {trailingIcon}
          </span>
        ) : null}
      </>
    );

    const shared = {
      ref,
      type,
      disabled,
      className: classes,
      onClick,
      id,
      name,
      form,
      "aria-label": ariaLabel,
      "data-cursor": dataCursor,
    };

    if (magneticFeel && !reduced && !disabled) {
      return (
        <motion.button
          {...shared}
          whileHover={{ scale: isArcade ? 1 : 1.03, y: isArcade ? 0 : -1 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
        >
          {content}
        </motion.button>
      );
    }

    return <button {...shared}>{content}</button>;
  },
);
