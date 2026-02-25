import React, { useState } from 'react';

const BASE_URL = import.meta.env.BASE_URL;
const basePrefix = BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`;
const withBase = (path) => `${basePrefix}${path.replace(/^\/+/, '')}`;

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="vm-header">
      <div className="vm-container vm-header-inner">
        <a className="vm-brand" href={import.meta.env.BASE_URL}>
          <span className="vm-brand-text">Vertical Management</span>
        </a>

        <a className="vm-logo" href={import.meta.env.BASE_URL}>
          <img src={withBase('assets/logo/VERTICAL-BLACK.png')} alt="Vertical Management" />
        </a>

        <button
          className="vm-hamburger"
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>

        <nav className={`vm-nav ${open ? 'open' : ''}`}>
          <a href={withBase('servicios')}>Servicios</a>
          <a href={withBase('proyectos')}>Proyectos</a>
          <a href={withBase('contacto')}>Contacto</a>
        </nav>
      </div>
    </header>
  );
}
