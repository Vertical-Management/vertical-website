import React, { useEffect, useRef } from 'react';

export default function HeroAnimated() {
  const imgRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    // trigger animation on load or after visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          img.classList.add('in-view');
          observer.unobserve(img);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(img);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="hero hero-animated">
      <svg className="hero-clip" ref={svgRef} viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <clipPath id="clipHero" clipPathUnits="objectBoundingBox">
            <path
              className="clip-path-anim"
              d="M 0,0.5 Q 0.15,0.1 0.3,0.2 T 0.6,0.05 T 1,0.3 L 1,1 L 0,1 Z"
            />
          </clipPath>
        </defs>
      </svg>

      <div className="hero-media hero-media-masked">
        <img
          ref={imgRef}
          src="/assets/1. PAG DE ENTRADA/PORTFOLIO 2026.gif"
          alt="Impact portfolio"
          className="hero-img"
        />
      </div>

      <div className="hero-cta">
        <a className="btn-primary" href="/servicios">
          Ver servicios
        </a>
      </div>
    </section>
  );
}
