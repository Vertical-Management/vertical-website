import React from 'react';

export default function Hero() {
  // add loaded class after image load for subtle entrance animation
  const handleLoad = (e) => {
    e.currentTarget.classList.add('loaded');
  };

  return (
    <section className="hero">
      <div className="hero-media">
        <img src="/assets/1. PAG DE ENTRADA/PORTFOLIO 2026.gif" alt="Impact portfolio" onLoad={handleLoad} />
      </div>
      <div className="hero-cta">
        <a className="btn-primary" href="/servicios">Ver servicios</a>
      </div>
    </section>
  );
}
