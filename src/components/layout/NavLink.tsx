"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type NavLinkProps = {
  href: string;
  label: string;
  index?: string;
  onClick?: () => void;
  /** desktop | overlay (fullscreen menu) */
  variant?: "desktop" | "overlay" | "footer";
  /** Light text for dark surfaces (e.g. home cinematic hero) */
  inverse?: boolean;
  className?: string;
};

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Navigation link with active state + intentional hover craft.
 */
export function NavLink({
  href,
  label,
  index,
  onClick,
  variant = "desktop",
  inverse = false,
  className,
}: NavLinkProps) {
  const pathname = usePathname();
  const active = isActivePath(pathname, href);

  if (variant === "overlay") {
    return (
      <NextLink
        href={href}
        onClick={onClick}
        data-cursor="hover"
        className={cn(
          "group flex items-baseline gap-4 border-b border-white/10 py-5 transition-colors duration-base ease-out-expo",
          "hover:border-accent-lime/50",
          active && "border-accent-lime/40",
          className,
        )}
        aria-current={active ? "page" : undefined}
      >
        {index ? (
          <span
            className={cn(
              "font-mono text-caption tracking-label text-white/35 transition-colors duration-base group-hover:text-accent-lime",
              active && "text-accent-lime",
            )}
          >
            {index}
          </span>
        ) : null}
        <span
          className={cn(
            "font-display text-[clamp(2.5rem,8vw,5.5rem)] font-bold leading-[0.95] tracking-display text-paper",
            "transition-transform duration-slow ease-out-expo group-hover:translate-x-2",
            active && "text-accent-lime",
          )}
        >
          {label}
        </span>
      </NextLink>
    );
  }

  if (variant === "footer") {
    return (
      <NextLink
        href={href}
        onClick={onClick}
        data-cursor="hover"
        className={cn(
          "group inline-flex items-center gap-2 font-body text-sm text-ink-soft transition-colors duration-base ease-out-expo hover:text-ink",
          active && "text-ink",
          className,
        )}
        aria-current={active ? "page" : undefined}
      >
        {index ? (
          <span className="font-mono text-[0.6rem] tracking-label text-ink-faint">
            {index}
          </span>
        ) : null}
        <span className="link-underline">{label}</span>
      </NextLink>
    );
  }

  // desktop
  return (
    <NextLink
      href={href}
      onClick={onClick}
      data-cursor="hover"
      className={cn(
        "group relative inline-flex items-center gap-2 px-1 py-2",
        "font-body text-sm font-medium tracking-tight",
        "transition-colors duration-base ease-out-expo",
        inverse
          ? "text-paper/70 hover:text-paper"
          : "text-ink-soft hover:text-ink",
        active && (inverse ? "text-paper" : "text-ink"),
        className,
      )}
      aria-current={active ? "page" : undefined}
    >
      {index ? (
        <span
          className={cn(
            "font-mono text-[0.6rem] tracking-label transition-colors duration-base group-hover:text-accent",
            inverse ? "text-paper/40" : "text-ink-faint",
            active && "text-accent",
          )}
        >
          {index}
        </span>
      ) : null}
      <span className="relative">
        {label}
        <span
          className={cn(
            "absolute -bottom-0.5 left-0 h-px w-full origin-left transition-transform duration-base ease-out-expo",
            inverse ? "bg-paper" : "bg-ink",
            active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
          )}
          aria-hidden
        />
      </span>
    </NextLink>
  );
}
