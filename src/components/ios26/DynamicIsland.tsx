import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

export type DynamicIslandProps = {
  baseUrl: string;
  currentSection?: string;
};

function withBase(baseUrl: string, path: string) {
  const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const clean = path.replace(/^\/+/, '');
  return clean ? `${base}${clean}` : base;
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();

    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    }

    // Safari < 14
    mql.addListener(onChange);
    return () => mql.removeListener(onChange);
  }, [query]);

  return matches;
}

export default function DynamicIsland({ baseUrl, currentSection = 'Contacto' }: DynamicIslandProps) {
  const [isOpen, setIsOpen] = useState(false);
  const supportsHover = useMediaQuery('(hover: hover) and (pointer: fine)');
  const prefersReducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement | null>(null);

  const shellTransition = prefersReducedMotion ? { duration: 0.01 } : ({ type: 'spring', stiffness: 520, damping: 34 } as const);
  const navTransition = prefersReducedMotion ? { duration: 0.01 } : ({ type: 'spring', stiffness: 520, damping: 38 } as const);

  const links = useMemo(
    () => [
      { label: 'Inicio', href: withBase(baseUrl, '') },
      { label: 'Servicios', href: withBase(baseUrl, 'servicios') },
      { label: 'Proyectos', href: withBase(baseUrl, 'proyectos') },
      { label: 'Contacto', href: withBase(baseUrl, 'contacto') },
    ],
    [baseUrl]
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      const root = rootRef.current;
      if (!root) return;
      if (!isOpen) return;
      if (root.contains(event.target as Node)) return;
      setIsOpen(false);
    };
    window.addEventListener('pointerdown', onPointerDown);
    return () => window.removeEventListener('pointerdown', onPointerDown);
  }, [isOpen]);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        ref={rootRef}
        layout
        transition={shellTransition}
        className="ng-glass contact-island-shell text-white rounded-full px-4 py-2"
        style={{ ['--ng-glass-alpha' as string]: 0.1, ['--ng-border-alpha' as string]: 0.2 }}
        onMouseEnter={() => {
          if (supportsHover) setIsOpen(true);
        }}
        onMouseLeave={() => {
          if (supportsHover) setIsOpen(false);
        }}
        onFocusCapture={() => setIsOpen(true)}
        aria-label="Dynamic Island"
      >
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="flex items-center gap-2 rounded-full px-2 py-1 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-[0.98]"
            onClick={() => setIsOpen((v) => !v)}
            aria-expanded={isOpen}
            aria-controls="dynamic-island-nav"
          >
            <span className="ng-text-body text-xs font-[750] tracking-[-0.02em]">{currentSection}</span>
            <span className="ng-text-body text-[11px] text-white/75 font-[650] flex items-center gap-2">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Disponible
            </span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen ? (
              <motion.nav
                id="dynamic-island-nav"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={navTransition}
                className="flex items-center gap-1"
                aria-label="Navegación"
              >
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className={
                      link.label === currentSection
                        ? 'ng-text-body text-xs font-[700] px-3 py-1 rounded-full bg-white/12 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-[0.98]'
                        : 'ng-text-body text-xs font-[650] px-3 py-1 rounded-full text-white/75 hover:text-white hover:bg-white/10 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-[0.98]'
                    }
                  >
                    {link.label}
                  </a>
                ))}
              </motion.nav>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
