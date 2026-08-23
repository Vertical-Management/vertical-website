import type { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "accent" | "lime" | "outline" | "inverse" | "hot";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  variant?: BadgeVariant;
  index?: string;
};

const variants: Record<BadgeVariant, string> = {
  default: "bg-ink/5 text-ink-soft border-transparent",
  accent: "bg-accent text-paper border-transparent",
  lime: "bg-accent-lime text-ink border-ink/10",
  outline: "bg-transparent text-ink border-border-strong",
  inverse: "bg-surface-inverse text-paper border-transparent",
  hot: "bg-accent-hot text-paper border-transparent",
};

export function Badge({
  children,
  className,
  variant = "default",
  index,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-pill border px-3 py-1",
        "tracking-label font-mono text-[0.65rem] font-medium uppercase",
        variants[variant],
        className,
      )}
      {...rest}
    >
      {index ? (
        <span className="opacity-50" aria-hidden>
          {index}
        </span>
      ) : null}
      {children}
    </span>
  );
}
