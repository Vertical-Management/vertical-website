"use client";

import { useEffect, useRef } from "react";
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
 *
 * Dark-hero chrome uses light text from first paint (data-chrome="light")
 * so nav never starts as body ink (#0a0a0a) over the work wall.
 */
export function Header() {
  const { solid, direction, atTop } = useScrollDirection();
  const { menuOpen, closeMenu } = useNavigation();
  const { t } = useLanguage();
  const pathname = usePathname();
  const desktopNavRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = desktopNavRef.current;
    if (!nav) return;
    if (menuOpen) nav.setAttribute("inert", "");
    else nav.removeAttribute("inert");
  }, [menuOpen]);

  // Hide when scrolling down past solid threshold, unless menu open
  const hidden = !menuOpen && solid && direction === "down" && !atTop;

  // Routes whose first screen is a dark hero (light chrome until bar solidifies)
  const darkHeroRoute =
    (pathname === "/" && DEFAULT_HERO_VARIANT === "cinematic") ||
    pathname === "/nosotros" ||
    pathname === "/contacto";

  const overDarkHero = darkHeroRoute && !solid && !menuOpen;

  // Force light toggle lines when menu open (dark overlay) or over dark hero
  const toggleInverse = menuOpen || overDarkHero;

  // Light chrome: over dark hero OR menu open — never black text on dark
  const lightChrome = overDarkHero || menuOpen;

  const navLabel = (href: string) => {
    const key = NAV_I18N_KEYS[href as keyof typeof NAV_I18N_KEYS];
    return key ? t.nav[key] : href;
  };

  return (
    <>
      <header
        role="banner"
        data-chrome={lightChrome ? "light" : "dark"}
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
          // Soft scrim while transparent over the wall — stabilizes contrast
          overDarkHero && "header-over-dark",
        )}
      >
        <div className="mx-auto flex h-header max-w-site items-center justify-between gap-4 px-gutter">
          {/* Brand */}
          <Logo
            onNavigate={closeMenu}
            inverse={lightChrome}
            className={cn(lightChrome && "relative z-[61] text-paper")}
          />

          {/* Desktop nav */}
          <nav
            ref={desktopNavRef}
            className={cn(
              "absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block",
              menuOpen && "pointer-events-none opacity-0",
            )}
            aria-label={t.common.mainNav}
            aria-hidden={menuOpen}
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

          {/* Actions: language + menu (no Insert coin) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <LanguageSwitcher inverse={lightChrome} />
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
