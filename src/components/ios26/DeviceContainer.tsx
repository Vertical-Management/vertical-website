import React, { useCallback, useEffect, useMemo, useRef } from 'react';

export type DeviceContainerProps = {
  title: string;
  subtitle?: string;
  baseUrl?: string;
  showNav?: boolean;
  children: React.ReactNode;
  className?: string;
};

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function withBase(baseUrl: string, path: string) {
  const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const clean = path.replace(/^\/+/, '');
  return clean ? `${base}${clean}` : base;
}

export default function DeviceContainer({ title, subtitle, baseUrl = '/', showNav = true, children, className }: DeviceContainerProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const sizeRafRef = useRef<number | null>(null);

  const [deviceSize, setDeviceSize] = React.useState<{ width: number; height: number } | null>(null);

  const [timeLabel, setTimeLabel] = React.useState(() => {
    const now = new Date();
    return now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  });

  const baseClassName = useMemo(() => {
    const parts = ['ng-glass', 'ng-squircle'];
    if (className) parts.push(className);
    return parts.join(' ');
  }, [className]);

  const handleBack = useCallback(() => {
    const fallbackUrl = withBase(baseUrl, '');

    if (typeof window === 'undefined') return;

    if (window.history.length <= 1) {
      window.location.assign(fallbackUrl);
      return;
    }

    let didNavigate = false;

    const onPageHide = () => {
      didNavigate = true;
      window.removeEventListener('pagehide', onPageHide);
    };

    window.addEventListener('pagehide', onPageHide, { once: true });

    try {
      window.history.back();
      window.setTimeout(() => {
        if (!didNavigate) {
          window.removeEventListener('pagehide', onPageHide);
          window.location.assign(fallbackUrl);
        }
      }, 450);
    } catch {
      window.removeEventListener('pagehide', onPageHide);
      window.location.assign(fallbackUrl);
    }
  }, [baseUrl]);

  useEffect(() => {
    const aspect = 19.5 / 9;
    const minWidth = 286;
    const maxWidth = 420;
    const horizontalGutter = 20;
    const verticalGutter = 28;

    const el = rootRef.current;
    if (!el) return;

    let parentWidth: number | null = null;
    let parentHeight: number | null = null;

    const compute = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const availableWidthViewport = Math.max(0, vw - horizontalGutter);
      const availableHeightViewport = Math.max(0, vh - verticalGutter);

      const availableWidthParent = parentWidth == null ? availableWidthViewport : Math.max(0, parentWidth - horizontalGutter);
      const availableHeightParent = parentHeight == null ? availableHeightViewport : Math.max(0, parentHeight - verticalGutter);

      const availableWidth = Math.min(availableWidthViewport, availableWidthParent);
      const availableHeight = Math.min(availableHeightViewport, availableHeightParent);

      if (availableWidth <= 0 || availableHeight <= 0) return;

      const widthByAspect = availableHeight / aspect;
      const maxAllowedWidth = Math.min(maxWidth, availableWidth, widthByAspect);
      const minAllowedWidth = Math.min(minWidth, availableWidth);
      const width = Math.max(minAllowedWidth, maxAllowedWidth);
      const height = Math.round(width * aspect);

      const nextSize = { width: Math.round(width), height };
      setDeviceSize((prev) => {
        if (prev && prev.width === nextSize.width && prev.height === nextSize.height) return prev;
        return nextSize;
      });
    };

    const scheduleCompute = () => {
      if (sizeRafRef.current) cancelAnimationFrame(sizeRafRef.current);
      sizeRafRef.current = requestAnimationFrame(compute);
    };

    const readParent = () => {
      const parent = el.parentElement;
      if (!parent) {
        parentWidth = null;
        parentHeight = null;
        return;
      }
      const rect = parent.getBoundingClientRect();
      parentWidth = rect.width;
      parentHeight = rect.height;
    };

    readParent();
    scheduleCompute();

    const onResize = () => scheduleCompute();
    window.addEventListener('resize', onResize, { passive: true } as AddEventListenerOptions);

    let observer: ResizeObserver | null = null;
    const parent = el.parentElement;

    if (parent && typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (entry) {
          parentWidth = entry.contentRect.width;
          parentHeight = entry.contentRect.height;
        } else {
          readParent();
        }
        scheduleCompute();
      });
      observer.observe(parent);
    }

    return () => {
      window.removeEventListener('resize', onResize);
      observer?.disconnect();
      if (sizeRafRef.current) cancelAnimationFrame(sizeRafRef.current);
    };
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const readBlurBounds = () => {
      const styles = window.getComputedStyle(el);
      const minRaw = styles.getPropertyValue('--ng-blur-min').trim();
      const maxRaw = styles.getPropertyValue('--ng-blur-max').trim();
      const min = Number.parseFloat(minRaw) || 25;
      const max = Number.parseFloat(maxRaw) || 25;
      return { min, max };
    };

    const setVars = (clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect();
      const px = clamp01((clientX - rect.left) / rect.width);
      const py = clamp01((clientY - rect.top) / rect.height);

      const dx = px - 0.5;
      const dy = py - 0.45;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const t = clamp01(distance / 0.75);

      const bounds = readBlurBounds();
      const blur = Math.round((bounds.min + (bounds.max - bounds.min) * (1 - t)) * 10) / 10;

      el.style.setProperty('--ng-px', String(px));
      el.style.setProperty('--ng-py', String(py));
      el.style.setProperty('--ng-blur', `${blur}px`);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => setVars(event.clientX, event.clientY));
    };

    const onPointerLeave = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      el.style.setProperty('--ng-px', '0.5');
      el.style.setProperty('--ng-py', '0.35');
      el.style.setProperty('--ng-blur', 'var(--ng-blur-min)');
    };

    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerleave', onPointerLeave);

    // Prime with center-ish values
    onPointerLeave();

    return () => {
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerleave', onPointerLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTimeLabel(now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }));
    };
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      ref={rootRef}
      className={baseClassName}
      style={{
        width: deviceSize ? `${deviceSize.width}px` : 'clamp(240px, min(88vw, 100%), 420px)',
        height: deviceSize ? `${deviceSize.height}px` : undefined,
        maxWidth: 'min(100%, calc(100vw - 1.25rem))',
        maxHeight: 'calc(100vh - 1.75rem)',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
      }}
      aria-label="Ventana de dispositivo"
    >
      <div className="px-5 pt-4 pb-3 shrink-0">
        <div className="flex items-center justify-between text-white/80">
          <span className="ng-text-body text-xs font-[750] tracking-[-0.01em]">{timeLabel}</span>
          <div className="flex items-center gap-2">
            <div className="flex items-end gap-[2px]" aria-hidden="true">
              <span className="w-[3px] h-[6px] rounded-full bg-white/70" />
              <span className="w-[3px] h-[8px] rounded-full bg-white/70" />
              <span className="w-[3px] h-[10px] rounded-full bg-white/70" />
              <span className="w-[3px] h-[12px] rounded-full bg-white/70" />
            </div>
            <div className="h-[10px] w-[18px] rounded-[3px] border border-white/55 relative" aria-hidden="true">
              <div className="absolute inset-[2px] rounded-[2px] bg-white/70" />
              <div className="absolute -right-[3px] top-[3px] h-[4px] w-[2px] rounded bg-white/55" />
            </div>
          </div>
        </div>

        {showNav ? (
          <div className="mt-3 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-white/80 transition hover:text-white/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-[0.98] active:bg-white/20"
              aria-label="Volver"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                <path
                  d="M15.2 5.8 9 12l6.2 6.2"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="ng-text-body text-xs font-[650]">Atrás</span>
            </button>

            <nav className="flex items-center gap-1" aria-label="Navegación">
              <a
                href={withBase(baseUrl, '')}
                className="ng-text-body rounded-full px-2.5 py-1 text-xs font-[650] text-white/75 transition hover:text-white/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-[0.98] active:bg-white/10"
              >
                Inicio
              </a>
              <a
                href={withBase(baseUrl, 'servicios')}
                className="ng-text-body rounded-full px-2.5 py-1 text-xs font-[650] text-white/75 transition hover:text-white/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-[0.98] active:bg-white/10"
              >
                Servicios
              </a>
              <a
                href={withBase(baseUrl, 'proyectos')}
                className="ng-text-body rounded-full px-2.5 py-1 text-xs font-[650] text-white/75 transition hover:text-white/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-[0.98] active:bg-white/10"
              >
                Proyectos
              </a>
              <a
                href={withBase(baseUrl, 'contacto')}
                aria-current="page"
                className="ng-text-body rounded-full bg-white/10 px-2.5 py-1 text-xs font-[650] text-white/95 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-[0.98] active:bg-white/20"
              >
                Contacto
              </a>
            </nav>
          </div>
        ) : null}

        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="ng-text-title text-[clamp(28px,5.6vw,40px)] leading-[0.95] text-white font-bold tracking-[-0.05em]">
              {title}
            </h1>
            {subtitle ? (
              <p className="ng-text-body mt-2 text-white/85 text-[clamp(14px,2.7vw,16px)] leading-[1.35] font-[520]">
                {subtitle}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <span className="ng-text-body text-white/70 text-xs tracking-[0.14em] font-[700] uppercase">
              Vertical
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-white/70" />
              <span className="ng-text-body text-white/78 text-xs font-[650]">Disponible</span>
            </span>
          </div>
        </div>
      </div>

      <div className="ng-hairline" />

      <div className="px-4 py-4 flex-1 overflow-auto overscroll-contain">{children}</div>
    </div>
  );
}
