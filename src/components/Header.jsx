import React, { useState } from 'react';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="vm-header">
      <div className="vm-container vm-header-inner">
        <a className="vm-logo" href="/">
          <img src="/assets/logo/VERTICAL-BLACK.png" alt="Vertical Management" />
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
