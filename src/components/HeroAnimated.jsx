import React, { useEffect, useRef } from 'react';

const BASE_URL = import.meta.env.BASE_URL;
const basePrefix = BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`;
const withBase = (path) => `${basePrefix}${path.replace(/^\/+/, '')}`;

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
          src={withBase('assets/1.%20PAG%20DE%20ENTRADA/PORTFOLIO%202026.gif')}
          alt="Impact portfolio"
          className="hero-img"
        />
      </div>

      <div className="hero-cta">
        <a className="btn-primary" href={withBase('servicios')}>
          Ver servicios
        </a>
      </div>
    </section>
  );
}
