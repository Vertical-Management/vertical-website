"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  fadeUp,
  fadeIn,
  scaleIn,
  staggerContainer,
  staggerItem,
  reducedMotionVariants,
} from "@/lib/motion";

type RevealVariant = "fadeUp" | "fadeIn" | "scaleIn";

const map: Record<RevealVariant, Variants> = {
  fadeUp,
  fadeIn,
  scaleIn,
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
  once?: boolean;
  amount?: number;
  as?: "div" | "section" | "article" | "li" | "span";
};

/** Viewport entrance reveal — Framer Motion. */
export function Reveal({
  children,
  className,
  variant = "fadeUp",
  delay = 0,
  once = true,
  amount = 0.25,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const variants = reduced ? reducedMotionVariants : map[variant];
  const Comp = motion[as];

  return (
    <Comp
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={reduced ? { duration: 0 } : { delay }}
    >
      {children}
    </Comp>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  once?: boolean;
  amount?: number;
  as?: "div" | "ul" | "ol" | "section";
};

/** Parent that staggers child RevealItem / staggerItem variants. */
export function Stagger({
  children,
  className,
  stagger = 0.09,
  delay = 0,
  once = true,
  amount = 0.2,
  as = "div",
}: StaggerProps) {
  const reduced = useReducedMotion();
  const Comp = motion[as];

  return (
    <Comp
      className={className}
      variants={reduced ? reducedMotionVariants : staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </Comp>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article" | "span";
};

export function StaggerItem({ children, className, as = "div" }: StaggerItemProps) {
  const reduced = useReducedMotion();
  const Comp = motion[as];

  return (
    <Comp
      className={cn(className)}
      variants={reduced ? reducedMotionVariants : staggerItem}
    >
      {children}
    </Comp>
  );
}
