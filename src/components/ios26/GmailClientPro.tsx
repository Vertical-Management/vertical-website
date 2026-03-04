import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const popIn = {
  hidden: { opacity: 0, y: 14, scale: 0.982, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
};

type EmailRow = {
  id: string;
  from: string;
  subject: string;
  preview: string;
  time: string;
};

const SAMPLE_INBOX: EmailRow[] = [
  {
    id: 'vm-propuesta',
    from: 'Vertical Management',
    subject: 'Propuesta — Sprint de UI iOS26',
    preview: 'Te comparto un plan de implementación con milestones y entregables…',
    time: 'Hoy',
  },
  {
    id: 'cliente-brief',
    from: 'Cliente',
    subject: 'Re: Brief + timing',
    preview: 'Perfecto. ¿Podemos alinear alcance y calendario esta semana?',
    time: 'Ayer',
  },
];

function SwipeHint() {
  return (
    <div className="flex items-center gap-2 text-white/55">
      <span className="ng-text-body text-[11px] tracking-[0.14em] font-[800] uppercase">Swipe</span>
      <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-white/10">›</span>
    </div>
  );
}

export default function GmailClientPro() {
  const prefersReducedMotion = useReducedMotion();
  const [rows, setRows] = React.useState<EmailRow[]>(SAMPLE_INBOX);

  const transition = prefersReducedMotion
    ? { duration: 0.01 }
    : ({ type: 'spring', stiffness: 420, damping: 34, delay: 0.18 } as const);

  const archiveRow = (rowId: string) => {
    setRows((prev) => prev.filter((row) => row.id !== rowId));
  };

  const replyToRow = (row: EmailRow) => {
    const subject = encodeURIComponent(`Re: ${row.subject}`);
    const body = encodeURIComponent(`Hola ${row.from},%0D%0A%0D%0A`);
    window.location.href = `mailto:esteban@vertical-management.com?subject=${subject}&body=${body}`;
  };

  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={popIn}
      transition={transition}
      className="ng-glass ng-squircle p-4"
      style={{ willChange: 'transform, filter, opacity' }}
      aria-label="Gmail Client Pro"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="ng-text-body m-0 text-white/75 text-[11px] tracking-[0.14em] font-[800] uppercase">
            Gmail Client Pro
          </p>
          <p className="ng-text-body mt-1 mb-0 text-white/88 text-sm font-[650]">Bandeja de entrada</p>
        </div>
        <SwipeHint />
      </div>

      <div className="mt-3 space-y-2">
        {rows.map((row) => (
          <div key={row.id} className="relative group">
            <div className="absolute inset-0 rounded-[18px] bg-white/8 flex items-center justify-end px-3 gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100 transition-opacity duration-200">
              <button
                type="button"
                onClick={() => archiveRow(row.id)}
                className="ng-text-body h-7 px-2.5 rounded-full bg-white/10 text-white/82 text-xs font-[700] hover:bg-white/16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-[0.98]"
              >
                Archivar
              </button>
              <button
                type="button"
                onClick={() => replyToRow(row)}
                className="ng-text-body h-7 px-2.5 rounded-full bg-white/10 text-white/82 text-xs font-[700] hover:bg-white/16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-[0.98]"
              >
                Responder
              </button>
            </div>

            <div className="ng-squircle relative bg-white/6 border border-white/10 px-4 py-3 transition-transform duration-300 ease-out sm:hover:translate-x-[-10px] active:translate-x-[-6px]">
              <div className="flex items-start justify-between gap-3 pr-[2px]">
                <div className="min-w-0 pr-2">
                  <p className="ng-text-body m-0 text-white/92 text-sm font-[750] truncate">{row.from}</p>
                  <p className="ng-text-body mt-1 mb-0 text-white/88 text-sm font-[650] truncate pr-16">{row.subject}</p>
                  <p className="ng-text-body mt-1 mb-0 text-white/65 text-sm truncate pr-16">{row.preview}</p>
                </div>
                <span className="ng-text-body text-white/55 text-xs font-[700] shrink-0">{row.time}</span>
              </div>
            </div>
          </div>
        ))}

        {rows.length === 0 ? (
          <div className="ng-squircle bg-white/6 border border-white/10 px-4 py-3">
            <p className="ng-text-body m-0 text-white/75 text-sm">Bandeja limpia por ahora.</p>
          </div>
        ) : null}
      </div>

      <div className="mt-4">
        <a
          href="mailto:esteban@vertical-management.com"
          className="ng-text-body inline-flex items-center justify-center h-10 px-4 rounded-full bg-white/15 text-white/92 text-sm font-[750] hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-[0.98]"
        >
          Redactar
        </a>
      </div>
    </motion.section>
  );
}
