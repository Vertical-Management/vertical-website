import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Width = "site" | "narrow" | "wide" | "full";

type ContainerProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  width?: Width;
  as?: ElementType;
};

const widthClass: Record<Width, string> = {
  site: "container-site",
  narrow: "container-narrow",
  wide: "container-wide",
  full: "w-full px-gutter",
};

export function Container({
  children,
  className,
  width = "site",
  as: Tag = "div",
  ...rest
}: ContainerProps) {
  return (
    <Tag className={cn(widthClass[width], className)} {...rest}>
      {children}
    </Tag>
  );
}

type SectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  /** Apply vertical section padding */
  padded?: boolean;
  inverse?: boolean;
  as?: "section" | "div" | "article" | "header" | "footer";
};

export function Section({
  children,
  className,
  padded = true,
  inverse,
  as: Tag = "section",
  ...rest
}: SectionProps) {
  return (
    <Tag
      className={cn(
        "relative",
        padded && "section-y",
        inverse && "bg-surface-inverse text-paper",
        className,
      )}
      data-theme={inverse ? "inverse" : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
