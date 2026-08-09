"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Logo } from "@/components/layout/Logo";
import { MenuToggle } from "@/components/layout/MenuToggle";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { NavLink } from "@/components/layout/NavLink";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useNavigation } from "@/components/providers/NavigationProvider";
import { DEFAULT_HERO_VARIANT } from "@/components/home/hero/constants";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { NAV_LINKS } from "@/lib/constants";
import { NAV_I18N_KEYS } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Site header — sticky, scroll-aware, high-craft nav.
 * Hides on scroll down (when solid), returns on scroll up.
 */
export function Header() {
  const { solid, direction, atTop } = useScrollDirection();
  const { menuOpen, closeMenu } = useNavigation();
  const { t } = useLanguage();
  const pathname = usePathname();

  // Hide when scrolling down past solid threshold, unless menu open
  const hidden =
    !menuOpen && solid && direction === "down" && !atTop;

  // Dark heroes — light chrome until the bar becomes solid
  const overDarkHero =
    ((pathname === "/" && DEFAULT_HERO_VARIANT === "cinematic") ||
      pathname === "/nosotros" ||
      pathname === "/contacto") &&
    !solid &&
    !menuOpen;

  // Force light toggle lines when menu open (dark overlay) or over dark hero
  const toggleInverse = menuOpen || overDarkHero;

  const navLabel = (href: string) => {
    const key = NAV_I18N_KEYS[href as keyof typeof NAV_I18N_KEYS];
    return key ? t.nav[key] : href;
  };

  return (
    <>
      <header
        role="banner"
        className={cn(
          "fixed inset-x-0 top-0 z-header",
          "transition-[transform,background-color,box-shadow,border-color] duration-base ease-out-expo",
          hidden && "-translate-y-full",
          // Sit above fullscreen menu so logo + toggle remain interactive
          menuOpen && "z-[61]",
          menuOpen
            ? "border-b border-transparent bg-transparent"
            : solid
              ? "border-b border-border bg-paper/80 shadow-sm backdrop-blur-md"
              : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-header max-w-site items-center justify-between gap-4 px-gutter">
          {/* Brand */}
          <Logo
            onNavigate={closeMenu}
            inverse={menuOpen || overDarkHero}
            className={cn(
              (menuOpen || overDarkHero) && "relative z-[61] text-paper",
            )}
          />

          {/* Desktop nav */}
          <nav
            className={cn(
              "absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block",
              menuOpen && "pointer-events-none opacity-0",
            )}
            aria-label={t.common.mainNav}
          >
            <ul className="flex items-center gap-1 xl:gap-3">
              {NAV_LINKS.filter((l) => l.href !== "/").map((link) => (
                <li key={link.href}>
                  <NavLink
                    href={link.href}
                    label={navLabel(link.href)}
                    index={link.index}
                    variant="desktop"
                    inverse={overDarkHero}
                  />
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions: language + smaller Insert coin + menu */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <LanguageSwitcher inverse={menuOpen || overDarkHero} />

            <NextLink
              href="/contacto"
              data-cursor="hover"
              className={cn(
                "hidden min-h-8 items-center rounded-pill border-2 border-ink bg-accent-lime px-2.5 py-1.5",
                "font-mono text-[0.58rem] font-medium uppercase tracking-[0.12em] text-ink",
                "shadow-[2px_2px_0_0_var(--color-ink)]",
                "transition-[transform,box-shadow] duration-base ease-out-expo",
                "hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0_0_var(--color-ink)]",
                "sm:inline-flex",
                (menuOpen || overDarkHero) &&
                  "relative z-[61] border-paper bg-accent-lime shadow-[2px_2px_0_0_#f4f1ea]",
                pathname === "/contacto" && !menuOpen && "opacity-90",
              )}
              onClick={closeMenu}
            >
              {t.header.insertCoin}
            </NextLink>

            <MenuToggle inverse={toggleInverse} />
          </div>
        </div>

        {/* Active route progress tick */}
        <div
          className={cn(
            "pointer-events-none absolute bottom-0 left-0 h-[2px] origin-left bg-accent transition-opacity duration-base",
            solid && !menuOpen ? "opacity-100" : "opacity-0",
          )}
          style={{ width: "100%", transform: "scaleX(0)" }}
          aria-hidden
          id="header-scroll-progress"
        />
      </header>

      <MobileMenu />
    </>
  );
}
