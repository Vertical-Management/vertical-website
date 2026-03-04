import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import DeviceContainer from './DeviceContainer';
import ContactWidget from './ContactWidget';
import SocialFeed from './SocialFeed';
import GmailClientPro from './GmailClientPro';

export type ContactDesktopSceneProps = {
  assetBase: string;
};

const popIn = {
  hidden: { opacity: 0, y: 12, scale: 0.99, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
};

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M5 4.8c0-.44.36-.8.8-.8h2.56c.38 0 .7.27.78.64l.58 2.73a.8.8 0 0 1-.23.74l-1.5 1.46a13.18 13.18 0 0 0 5.44 5.44l1.46-1.5a.8.8 0 0 1 .74-.23l2.73.58c.37.08.64.4.64.78v2.56a.8.8 0 0 1-.8.8h-1.6C10.15 20 4 13.85 4 6.4V4.8H5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <rect x="3.2" y="5.2" width="17.6" height="13.6" rx="2.8" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M4.8 7.2 12 12.6l7.2-5.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DigitalClockCard() {
  const [now, setNow] = React.useState(() => new Date());

  const timeLabel = React.useMemo(() => {
    return now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  }, [now]);

  const minuteAngle = React.useMemo(() => {
    const minutes = now.getMinutes() + now.getSeconds() / 60;
    return minutes * 6;
  }, [now]);

  const hourAngle = React.useMemo(() => {
    const hours = (now.getHours() % 12) + now.getMinutes() / 60;
    return hours * 30;
  }, [now]);

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setNow(new Date());
    }, 1_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="ng-glass ng-squircle contact-unified-card aspect-square text-white flex flex-col justify-between">
      <p className="ng-text-body m-0 text-xs tracking-[0.14em] uppercase font-[750] text-white/70">Reloj</p>

      <div className="mt-3 flex items-center gap-4">
        <div className="relative h-[76px] w-[76px] shrink-0 rounded-full border border-white/20 bg-white/5">
          <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
            <circle cx="50" cy="50" r="2.8" fill="rgba(255,255,255,0.9)" />
            <line
              x1="50"
              y1="50"
              x2="50"
              y2="28"
              stroke="rgba(255,255,255,0.92)"
              strokeWidth="4"
              strokeLinecap="round"
              transform={`rotate(${hourAngle} 50 50)`}
            />
            <line
              x1="50"
              y1="50"
              x2="50"
              y2="20"
              stroke="rgba(255,255,255,0.82)"
              strokeWidth="2.8"
              strokeLinecap="round"
              transform={`rotate(${minuteAngle} 50 50)`}
            />
          </svg>
        </div>

        <div>
          <p className="ng-text-title m-0 text-[42px] leading-[0.95] font-bold tracking-[-0.05em]">{timeLabel}</p>
          <p className="ng-text-body mt-2 mb-0 text-xs text-white/65">Andorra · CET</p>
        </div>
      </div>
    </div>
  );
}

function LocationMapCard() {
  return (
    <div className="ng-glass ng-squircle contact-unified-card text-white overflow-hidden">
      <div className="aspect-video rounded-[18px] border border-white/10 overflow-hidden bg-white/6">
        <iframe
          title="Mapa de Andorra"
          src="https://www.google.com/maps?q=Andorra&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0"
        />
      </div>

      <div className="pt-3">
        <p className="ng-text-body m-0 text-xs tracking-[0.14em] uppercase font-[750] text-white/70">Ubicación</p>
        <p className="ng-text-title mt-2 mb-0 text-lg font-[700] text-white">Andorra</p>
        <p className="ng-text-body mt-1 mb-0 text-sm text-white/72">Disponible para proyectos internacionales.</p>
        <a
          href="https://maps.apple.com/?q=Andorra"
          target="_blank"
          rel="noreferrer"
          className="ng-text-body mt-3 inline-flex h-9 items-center justify-center rounded-full bg-white/15 px-4 text-sm font-[700] text-white/92 transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-[0.98]"
        >
          Abrir mapa
        </a>
      </div>
    </div>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="ng-glass ng-squircle contact-unified-card text-white">
      <p className="ng-text-body m-0 text-xs tracking-[0.14em] uppercase font-[750] text-white/70">{title}</p>
      <div className="mt-2 ng-text-body text-sm leading-[1.45] text-white/80">{children}</div>
    </div>
  );
}

export default function ContactDesktopScene({ assetBase }: ContactDesktopSceneProps) {
  const prefersReducedMotion = useReducedMotion();
  const transition = prefersReducedMotion
    ? { duration: 0.01 }
    : ({ type: 'spring', stiffness: 420, damping: 34 } as const);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(360px,430px)_minmax(300px,1fr)] xl:grid-cols-[minmax(300px,1fr)_minmax(360px,430px)_minmax(300px,1fr)] gap-4 xl:gap-5 items-start">
      {/* Left - Secondary (hidden on tablet range) */}
      <div
        className="hidden xl:grid gap-4 xl:gap-5 max-h-[calc(100vh-12rem)] overflow-hidden"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}
      >
        <motion.div initial="hidden" animate="show" variants={popIn} transition={transition}>
          <LocationMapCard />
        </motion.div>

        <motion.div initial="hidden" animate="show" variants={popIn} transition={prefersReducedMotion ? transition : { ...transition, delay: 0.04 }}>
          <DigitalClockCard />
        </motion.div>

        <motion.div initial="hidden" animate="show" variants={popIn} transition={prefersReducedMotion ? transition : { ...transition, delay: 0.08 }}>
          <GmailClientPro />
        </motion.div>
      </div>

      {/* Center - Anchor */}
      <div className="flex flex-col gap-4 xl:gap-5 order-1">
        <DeviceContainer baseUrl={assetBase} showNav={false} title="Contacto" subtitle="Disponible para nuevos proyectos">
          <div className="grid grid-cols-1 gap-3">
            <ContactWidget label="Teléfono" title="+376 625 303" href="tel:+376625303" icon={<PhoneIcon />} meta="Andorra" />
            <ContactWidget
              label="Email"
              title="esteban@vertical-management.com"
              href="mailto:esteban@vertical-management.com"
              icon={<MailIcon />}
              meta="Respuesta rápida"
            />
          </div>

          <div className="mt-4">
            <p className="ng-text-body m-0 text-white/60 text-xs leading-[1.4]">
              Datos de redes: simulados con skeleton + delay para demostrar interacción tipo iOS.
            </p>
          </div>
        </DeviceContainer>
      </div>

      {/* Right */}
      <div
        className="grid gap-4 xl:gap-5 order-2 max-h-[calc(100vh-12rem)] overflow-hidden"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}
      >
        <SocialFeed
          assetBase={assetBase}
          instagramProfileUrl="https://www.instagram.com/vertical_________/"
          xProfileUrl="https://x.com/verticalmanagement"
          linkedinProfileUrl="https://www.linkedin.com/in/esteban-ferrer-3777521a8/"
        />

        <motion.div className="hidden xl:block" initial="hidden" animate="show" variants={popIn} transition={prefersReducedMotion ? transition : { ...transition, delay: 0.06 }}>
          <InfoCard title="Misión">
            <p className="m-0">
              (Placeholder) Construir productos y experiencias digitales claras, veloces y elegantes — con foco en resultado y detalle.
            </p>
          </InfoCard>
        </motion.div>

        <motion.div className="hidden xl:block" initial="hidden" animate="show" variants={popIn} transition={prefersReducedMotion ? transition : { ...transition, delay: 0.1 }}>
          <InfoCard title="Visión">
            <p className="m-0">
              (Placeholder) Operar como un sistema: diseño, ingeniería y marca integrados en una sola interfaz, consistente y escalable.
            </p>
          </InfoCard>
        </motion.div>
      </div>
    </div>
  );
}
