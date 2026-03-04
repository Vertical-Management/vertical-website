import React from 'react';

export type ContactWidgetProps = {
  label: string;
  title: string;
  href: string;
  icon: React.ReactNode;
  meta?: string;
};

export default function ContactWidget({ label, title, href, icon, meta }: ContactWidgetProps) {
  return (
    <article className="ng-glass ng-squircle p-4 transition-transform duration-300 ease-out hover:-translate-y-[2px] active:translate-y-0">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-white/10 text-white">{icon}</span>
        <p className="ng-text-body m-0 text-white/75 text-[11px] tracking-[0.14em] font-[750] uppercase">{label}</p>
      </div>
      <a
        className="ng-text-title mt-3 block text-white text-[clamp(16px,2.8vw,18px)] font-[650] leading-[1.2] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-md active:opacity-90"
        href={href}
      >
        {title}
      </a>
      {meta ? <p className="ng-text-body mt-2 mb-0 text-white/65 text-sm font-[520]">{meta}</p> : null}
    </article>
  );
}
