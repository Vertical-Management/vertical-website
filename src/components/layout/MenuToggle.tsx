"use client";

import { cn } from "@/lib/utils";
import { useNavigation } from "@/components/providers/NavigationProvider";
import { useLanguage } from "@/components/providers/LanguageProvider";

type MenuToggleProps = {
  className?: string;
  /** Force inverse line color (e.g. when header is over dark) */
  inverse?: boolean;
};

/**
 * Hamburger ↔ close morph. Accessible toggle for fullscreen nav.
 */
export function MenuToggle({ className, inverse }: MenuToggleProps) {
  const { menuOpen, toggleMenu } = useNavigation();
  const { t } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleMenu}
      className={cn(
        "group relative z-[61] flex h-11 w-11 items-center justify-center rounded-full",
        "border border-transparent transition-colors duration-base ease-out-expo",
        "hover:border-border-strong hover:bg-ink/5",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        menuOpen && "hover:bg-white/10 hover:border-white/20",
        className,
      )}
      aria-label={menuOpen ? t.header.closeMenu : t.header.openMenu}
      aria-expanded={menuOpen}
      aria-controls="mobile-navigation"
      data-menu-toggle
      data-cursor="hover"
    >
      <span className="relative flex h-3.5 w-5 flex-col justify-between" aria-hidden>
        <span
          className={cn(
            "block h-[1.5px] w-full origin-center rounded-full transition-all duration-base ease-out-expo",
            menuOpen
              ? "translate-y-[6px] rotate-45 bg-paper"
              : inverse
                ? "bg-paper"
                : "bg-ink",
            !menuOpen && "group-hover:w-full",
          )}
        />
        <span
          className={cn(
            "block h-[1.5px] w-full rounded-full transition-all duration-base ease-out-expo",
            menuOpen
              ? "scale-x-0 opacity-0 bg-paper"
              : inverse
                ? "bg-paper w-3.5 self-end"
                : "bg-ink w-3.5 self-end group-hover:w-full group-hover:self-auto",
          )}
        />
        <span
          className={cn(
            "block h-[1.5px] w-full origin-center rounded-full transition-all duration-base ease-out-expo",
            menuOpen
              ? "-translate-y-[6px] -rotate-45 bg-paper"
              : inverse
                ? "bg-paper"
                : "bg-ink",
          )}
        />
      </span>
    </button>
  );
}
