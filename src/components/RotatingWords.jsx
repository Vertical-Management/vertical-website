import React, { useEffect, useState } from 'react';

const DEFAULT_WORDS = [
  'Diseño estratégico',
  'Branding memorable',
  'UX/UI pensado',
  'Narrativa visual',
  'Proyectos con impacto'
];

export default function RotatingWords({ words = DEFAULT_WORDS, interval = 10000 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [interval, words.length]);

  return (
    <div className="rotating-words" aria-live="polite">
      <span key={index} className="word">{words[index]}</span>
    </div>
  );
}
