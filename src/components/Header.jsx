import React, { useState } from 'react';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="vm-header">
      <div className="vm-container vm-header-inner">
        <a className="vm-logo" href="/">
          <img src="/assets/logo/vertical.svg" alt="Vertical Management logo" />
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
          <a href="/servicios">Servicios</a>
          <a href="/proyectos">Proyectos</a>
          <a href="/contacto">Contacto</a>
        </nav>
      </div>
    </header>
  );
}
