import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const popIn = {
  hidden: { opacity: 0, y: 14, scale: 0.982, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
};

const CONTACT_EMAIL = 'esteban@vertical-management.com';
const DEFAULT_SUBJECT = 'Quiero contactar con Vertical Management';
const DEFAULT_BODY =
  'Hola equipo de Vertical Management,%0D%0A%0D%0AMe gustaría hablar sobre un proyecto.%0D%0A%0D%0ANombre:%0D%0AEmpresa:%0D%0AObjetivo:%0D%0A%0D%0AGracias.';

function GmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="14" rx="3" stroke="currentColor" strokeWidth="1.7" />
      <path d="M5.4 7.3 12 12.2l6.6-4.9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function GmailClientPro() {
  const prefersReducedMotion = useReducedMotion();

  const transition = prefersReducedMotion
    ? { duration: 0.01 }
    : ({ type: 'spring', stiffness: 420, damping: 34, delay: 0.18 } as const);

  const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(DEFAULT_SUBJECT)}&body=${DEFAULT_BODY}`;
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}&su=${encodeURIComponent(DEFAULT_SUBJECT)}&body=${DEFAULT_BODY}`;

  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={popIn}
      transition={transition}
      className="ng-glass ng-squircle contact-unified-card aspect-[16/9] max-h-[360px] text-white flex flex-col"
      style={{ willChange: 'transform, filter, opacity' }}
      aria-label="Gmail Client Pro"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/22 bg-white/12 text-white/90">
            <GmailIcon />
          </span>
          <div>
            <p className="ng-text-body m-0 text-white/78 text-[11px] tracking-[0.14em] font-[800] uppercase">Gmail</p>
            <p className="ng-text-body mt-1 mb-0 text-white text-sm font-[650]">Nueva redacción</p>
          </div>
        </div>
        <span className="ng-text-body rounded-full border border-white/18 bg-white/10 px-2.5 py-1 text-[11px] font-[720] uppercase tracking-[0.1em] text-white/80">
          Apple style
        </span>
      </div>

      <div className="mt-3 ng-squircle border border-white/12 bg-white/7 p-3.5 flex-1 overflow-auto">
        <div className="space-y-2.5 text-white/86">
          <div className="flex items-center gap-2">
            <span className="ng-text-body text-xs font-[720] text-white/65">Para</span>
            <p className="ng-text-body m-0 text-sm font-[620] truncate">{CONTACT_EMAIL}</p>
          </div>
          <div className="h-px bg-white/10" />

          <div className="flex items-center gap-2">
            <span className="ng-text-body text-xs font-[720] text-white/65">Asunto</span>
            <p className="ng-text-body m-0 text-sm font-[620] truncate">{DEFAULT_SUBJECT}</p>
          </div>

          <div className="h-px bg-white/10" />

          <div>
            <p className="ng-text-body m-0 text-xs font-[720] text-white/65">Mensaje</p>
            <p className="ng-text-body mt-1.5 mb-0 text-sm leading-[1.45] text-white/86">
              Hola equipo de Vertical Management, me gustaría hablar sobre un proyecto.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2.5">
        <a
          href={mailtoUrl}
          className="ng-text-body inline-flex items-center justify-center h-10 px-4 rounded-full bg-white/15 text-white text-sm font-[750] hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-[0.98]"
        >
          Enviar correo
        </a>

        <a
          href={gmailComposeUrl}
          target="_blank"
          rel="noreferrer"
          className="ng-text-body inline-flex items-center justify-center h-10 px-4 rounded-full border border-white/18 bg-white/8 text-white/88 text-sm font-[680] hover:bg-white/14 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-[0.98]"
        >
          Abrir Gmail
        </a>
      </div>
    </motion.section>
  );
}
