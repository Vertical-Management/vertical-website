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
  const [timeLabel, setTimeLabel] = React.useState(() => {
    const now = new Date();
    return now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  });

  React.useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTimeLabel(now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }));
    };
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="ng-glass ng-squircle p-4 text-white">
      <p className="ng-text-body m-0 text-xs tracking-[0.14em] uppercase font-[750] text-white/70">Reloj</p>
      <p className="ng-text-title mt-2 mb-0 text-[42px] leading-[0.95] font-bold tracking-[-0.05em]">{timeLabel}</p>
      <p className="ng-text-body mt-2 mb-0 text-xs text-white/65">Andorra · CET</p>
    </div>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="ng-glass ng-squircle p-4 text-white">
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
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(220px,0.9fr)_minmax(320px,430px)_minmax(260px,1.1fr)] 2xl:grid-cols-[minmax(260px,1fr)_minmax(360px,460px)_minmax(320px,1.25fr)] gap-4 items-start">
      {/* Left */}
      <div className="flex flex-col gap-4">
        <motion.div initial="hidden" animate="show" variants={popIn} transition={transition}>
          <InfoCard title="Ubicación">
            <p className="m-0 font-[700]">Andorra</p>
            <p className="m-0">Disponible para proyectos internacionales.</p>
          </InfoCard>
        </motion.div>

        <motion.div initial="hidden" animate="show" variants={popIn} transition={prefersReducedMotion ? transition : { ...transition, delay: 0.04 }}>
          <DigitalClockCard />
        </motion.div>

        <motion.div initial="hidden" animate="show" variants={popIn} transition={prefersReducedMotion ? transition : { ...transition, delay: 0.08 }}>
          <GmailClientPro />
        </motion.div>
      </div>

      {/* Center */}
      <div className="flex flex-col gap-4">
        <DeviceContainer baseUrl={assetBase} showNav={false} title="Contacto" subtitle="Disponible para nuevos proyectos">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
      <div className="flex flex-col gap-4">
        <SocialFeed
          assetBase={assetBase}
          instagramProfileUrl="https://www.instagram.com/vertical_________/"
          xProfileUrl="https://x.com/verticalmanagement"
          linkedinProfileUrl="https://www.linkedin.com/in/esteban-ferrer-3777521a8/"
        />

        <motion.div initial="hidden" animate="show" variants={popIn} transition={prefersReducedMotion ? transition : { ...transition, delay: 0.06 }}>
          <InfoCard title="Misión">
            <p className="m-0">
              (Placeholder) Construir productos y experiencias digitales claras, veloces y elegantes — con foco en resultado y detalle.
            </p>
          </InfoCard>
        </motion.div>

        <motion.div initial="hidden" animate="show" variants={popIn} transition={prefersReducedMotion ? transition : { ...transition, delay: 0.1 }}>
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
