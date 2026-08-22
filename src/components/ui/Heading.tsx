import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HeadingSize =
  "display-2xl" | "display-xl" | "display-lg" | "display-md" | "display-sm";

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  children: ReactNode;
  as?: HeadingLevel;
  size?: HeadingSize;
  balance?: boolean;
};

const sizeClass: Record<HeadingSize, string> = {
  "display-2xl": "text-display-2xl",
  "display-xl": "text-display-xl",
  "display-lg": "text-display-lg",
  "display-md": "text-display-md",
  "display-sm": "text-display-sm",
};

const defaultSize: Record<HeadingLevel, HeadingSize> = {
  h1: "display-xl",
  h2: "display-lg",
  h3: "display-md",
  h4: "display-sm",
  h5: "display-sm",
  h6: "display-sm",
};

export function Heading({
  children,
  className,
  as = "h2",
  size,
  balance = true,
  ...rest
}: HeadingProps) {
  const Tag = as as ElementType;
  const resolved = size ?? defaultSize[as];

  return (
    <Tag
      className={cn(
        "font-display text-ink",
        sizeClass[resolved],
        balance && "text-balance",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
