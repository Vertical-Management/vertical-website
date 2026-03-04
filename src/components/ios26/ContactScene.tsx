import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import DeviceContainer from './DeviceContainer';
import ContactWidget from './ContactWidget';
import SocialFeed from './SocialFeed';
import GmailClientPro from './GmailClientPro';

export type ContactSceneProps = {
  assetBase: string;
};

const popIn = {
  hidden: { opacity: 0, y: 14, scale: 0.982, filter: 'blur(10px)' },
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

export default function ContactScene({ assetBase }: ContactSceneProps) {
  const prefersReducedMotion = useReducedMotion();
  const transition = prefersReducedMotion ? { duration: 0.01 } : ({ type: 'spring', stiffness: 420, damping: 34 } as const);

  return (
    <DeviceContainer baseUrl={assetBase} showNav={false} title="Contacto" subtitle="Disponible para nuevos proyectos">
      <div className="grid grid-cols-1 gap-3">
        <motion.div
          initial="hidden"
          animate="show"
          variants={popIn}
          transition={transition}
          style={{ willChange: 'transform, filter, opacity' }}
        >
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
        </motion.div>

        <SocialFeed
          assetBase={assetBase}
          instagramProfileUrl="https://www.instagram.com/vertical_________/"
          xProfileUrl="https://x.com/verticalmanagement"
          linkedinProfileUrl="https://www.linkedin.com/in/esteban-ferrer-3777521a8/"
        />

        <GmailClientPro />
      </div>

      <div className="mt-4">
        <p className="ng-text-body m-0 text-white/60 text-xs leading-[1.4]">
          Datos de redes: simulados con skeleton + delay para demostrar interacción tipo iOS.
        </p>
      </div>
    </DeviceContainer>
  );
}
