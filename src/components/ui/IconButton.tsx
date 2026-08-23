"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion";

type IconButtonProps = {
  children: ReactNode;
  label: string;
  size?: "sm" | "md" | "lg";
  variant?: "ghost" | "solid" | "outline";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  "data-cursor"?: string;
};

const sizes = {
  sm: "h-9 w-9",
  md: "h-11 w-11",
  lg: "h-14 w-14",
} as const;

const variants = {
  ghost: "bg-transparent hover:bg-ink/5 border-transparent",
  solid: "bg-ink text-paper hover:bg-ink-soft border-transparent",
  outline:
    "bg-transparent border-border-strong hover:border-ink hover:bg-ink hover:text-paper",
} as const;

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      children,
      label,
      className,
      size = "md",
      variant = "ghost",
      type = "button",
      disabled,
      onClick,
      "data-cursor": dataCursor = "hover",
    },
    ref,
  ) {
    const reduced = useReducedMotion();
    const classes = cn(
      "inline-flex items-center justify-center rounded-full border",
      "transition-colors duration-base ease-out-expo",
      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
      "disabled:pointer-events-none disabled:opacity-40",
      sizes[size],
      variants[variant],
      className,
    );

    const shared = {
      ref,
      type,
      "aria-label": label,
      disabled,
      className: classes,
      onClick,
      "data-cursor": dataCursor,
    };

    if (!reduced && !disabled) {
      return (
        <motion.button
          {...shared}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
        >
          {children}
        </motion.button>
      );
    }

    return <button {...shared}>{children}</button>;
  },
);
