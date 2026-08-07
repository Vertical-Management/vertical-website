import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type EyebrowProps = HTMLAttributes<HTMLParagraphElement> & {
  children: ReactNode;
  /** Optional leading index e.g. "01" */
  index?: string;
  accent?: boolean;
};

/** Mono editorial label — section markers, meta, system voice. */
export function Eyebrow({
  children,
  className,
  index,
  accent,
  ...rest
}: EyebrowProps) {
  return (
    <p
      className={cn(
        "eyebrow inline-flex items-center gap-3",
        accent && "text-accent",
        className,
      )}
      {...rest}
    >
      {index ? (
        <span
          className={cn(
            "tabular-nums opacity-50",
            accent && "text-accent opacity-80",
          )}
          aria-hidden
        >
          {index}
        </span>
      ) : null}
      <span>{children}</span>
    </p>
  );
}
