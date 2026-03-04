import React, { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type Brand = 'instagram' | 'x' | 'linkedin';

export type SocialFeedProps = {
  assetBase: string;
  instagramProfileUrl: string;
  xProfileUrl: string;
  linkedinProfileUrl: string;
};

type FeedState =
  | { status: 'loading' }
  | {
      status: 'ready';
      instagram: { likes: number; imageUrl: string };
      x: { text: string };
      linkedin: { text: string };
    };

function MetallicIcon({ brand }: { brand: Brand }) {
  const title = brand === 'x' ? 'X' : brand === 'linkedin' ? 'LinkedIn' : 'Instagram';
  const path =
    brand === 'x'
      ? 'M5 4.8 19 19.2M19 4.8 5 19.2'
      : brand === 'linkedin'
        ? 'M6.4 10.4v7.2M6.4 7.6v.2M10.2 10.4v7.2M10.2 10.4c0-1.22.99-2.2 2.2-2.2 1.22 0 2.2.98 2.2 2.2v7.2M4.6 4.6h14.8v14.8H4.6z'
        : 'M7 4.6h10c1.33 0 2.4 1.07 2.4 2.4v10c0 1.33-1.07 2.4-2.4 2.4H7c-1.33 0-2.4-1.07-2.4-2.4V7c0-1.33 1.07-2.4 2.4-2.4zm5 4.1a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm5.1-.9a.95.95 0 1 0 0 1.9.95.95 0 0 0 0-1.9z';

  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-label={title}>
      <defs>
        <linearGradient id={`g-${brand}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="rgba(255,255,255,0.92)" />
          <stop offset="0.35" stopColor="rgba(255,255,255,0.62)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.82)" />
        </linearGradient>
      </defs>
      <path d={path} stroke={`url(#g-${brand})`} strokeWidth={brand === 'x' ? 2 : 1.8} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LiveActivityCard({
  profileUrl,
  imageUrl,
  likes,
  isLoading,
}: {
  profileUrl: string;
  imageUrl: string;
  likes: number;
  isLoading: boolean;
}) {
  return (
    <article className="ng-glass ng-squircle p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-white/10">
            <MetallicIcon brand="instagram" />
          </span>
          <div className="min-w-0">
            <p className="ng-text-body m-0 text-white/75 text-[11px] tracking-[0.14em] font-[800] uppercase">
              Live Activity
            </p>
            <p className="ng-text-body m-0 text-white/88 text-sm font-[650] truncate">@vertical_________</p>
          </div>
        </div>

        <a
          href={profileUrl}
          target="_blank"
          rel="noreferrer"
          className="ng-text-body inline-flex items-center justify-center h-9 px-4 rounded-full bg-white/15 text-white/92 text-sm font-[700] hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-[0.98]"
        >
          Seguir
        </a>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className={`h-12 w-12 rounded-[14px] bg-white/10 ${isLoading ? 'ng-skeleton' : ''} overflow-hidden`}>
          {!isLoading ? <img src={imageUrl} alt="Última publicación" className="h-full w-full object-cover" /> : null}
        </div>
        <div className="min-w-0 flex-1">
          <p className={`ng-text-body m-0 text-white/90 text-sm font-[700] ${isLoading ? 'ng-skeleton rounded-md h-4 w-[78%]' : ''}`}>
            {!isLoading ? 'Última publicación' : null}
          </p>
          <p className={`ng-text-body mt-1 mb-0 text-white/70 text-sm font-[550] ${isLoading ? 'ng-skeleton rounded-md h-4 w-[56%]' : ''}`}>
            {!isLoading ? `${likes.toLocaleString('es-ES')} likes` : null}
          </p>
        </div>
      </div>
    </article>
  );
}

function TextFeedCard({
  brand,
  label,
  href,
  isLoading,
  text,
}: {
  brand: 'x' | 'linkedin';
  label: string;
  href: string;
  isLoading: boolean;
  text: string;
}) {
  return (
    <article className="ng-glass ng-squircle p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-white/10">
            <MetallicIcon brand={brand} />
          </span>
          <p className="ng-text-body m-0 text-white/75 text-[11px] tracking-[0.14em] font-[800] uppercase truncate">
            {label}
          </p>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="ng-text-body text-white/80 text-xs font-[700] hover:text-white/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-md active:opacity-90"
        >
          Abrir
        </a>
      </div>

      <div className="mt-3">
        {isLoading ? (
          <div className="space-y-2">
            <div className="ng-skeleton rounded-md h-4 w-[92%]" />
            <div className="ng-skeleton rounded-md h-4 w-[76%]" />
          </div>
        ) : (
          <p className="ng-text-body m-0 text-white/88 text-sm leading-[1.45] font-[560]">{text}</p>
        )}
      </div>
    </article>
  );
}

const popIn = {
  hidden: { opacity: 0, y: 14, scale: 0.982, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
};

export default function SocialFeed({ assetBase, instagramProfileUrl, xProfileUrl, linkedinProfileUrl }: SocialFeedProps) {
  const [state, setState] = useState<FeedState>({ status: 'loading' });
  const prefersReducedMotion = useReducedMotion();

  const imageUrl = useMemo(() => {
    const base = assetBase.endsWith('/') ? assetBase : `${assetBase}/`;
    return `${base}assets/xp/fondo-de-pantalla.jpg`;
  }, [assetBase]);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setState({
        status: 'ready',
        instagram: { likes: 1287, imageUrl },
        x: {
          text: 'Trabajando en experiencias densas: claridad primero, movimiento mínimo, intención máxima.',
        },
        linkedin: {
          text: 'Disponible para proyectos: dirección creativa, UI engineering y producto con obsesión por el detalle.',
        },
      });
    }, 900);

    return () => window.clearTimeout(id);
  }, [imageUrl]);

  const isLoading = state.status === 'loading';

  const ready = state.status === 'ready' ? state : null;

  const transition = prefersReducedMotion ? { duration: 0.01 } : ({ type: 'spring', stiffness: 420, damping: 34 } as const);

  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: prefersReducedMotion ? { staggerChildren: 0 } : { staggerChildren: 0.08, delayChildren: 0.06 } },
      }}
      className="grid grid-cols-1 gap-3"
      aria-label="Feeds sociales"
    >
      <motion.div
        variants={popIn}
        transition={transition}
        style={{ willChange: 'transform, filter, opacity' }}
      >
        <LiveActivityCard
          profileUrl={instagramProfileUrl}
          imageUrl={ready?.instagram.imageUrl ?? imageUrl}
          likes={ready?.instagram.likes ?? 0}
          isLoading={isLoading}
        />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <motion.div
          variants={popIn}
          transition={transition}
          style={{ willChange: 'transform, filter, opacity' }}
        >
          <TextFeedCard
            brand="x"
            label="Último post"
            href={xProfileUrl}
            isLoading={isLoading}
            text={ready?.x.text ?? ''}
          />
        </motion.div>

        <motion.div
          variants={popIn}
          transition={transition}
          style={{ willChange: 'transform, filter, opacity' }}
        >
          <TextFeedCard
            brand="linkedin"
            label="Actividad reciente"
            href={linkedinProfileUrl}
            isLoading={isLoading}
            text={ready?.linkedin.text ?? ''}
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
