import React from 'react';

const BASE_URL = import.meta.env.BASE_URL;
const basePrefix = BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`;
const withBase = (path) => `${basePrefix}${path.replace(/^\/+/, '')}`;

export default function Hero() {
  // add loaded class after image load for subtle entrance animation
  const handleLoad = (e) => {
    e.currentTarget.classList.add('loaded');
  };

  return (
    <section className="hero">
      <div className="hero-media">
        <img src={withBase('assets/1.%20PAG%20DE%20ENTRADA/PORTFOLIO%202026.gif')} alt="Impact portfolio" onLoad={handleLoad} />
      </div>
      <div className="hero-cta">
        <a className="btn-primary" href={withBase('servicios')}>Ver servicios</a>
      </div>
    </section>
  );
}
