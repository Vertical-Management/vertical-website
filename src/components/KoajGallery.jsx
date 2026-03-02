import React, { useMemo, useState, useCallback, useEffect, memo } from 'react';

const KoajSequenceThumb = memo(({ img, idx, isActive, onSelect }) => (
  <button
    type="button"
    className={`koaj-sequence-thumb ${isActive ? 'is-active' : ''}`}
    onClick={() => onSelect(idx)}
    aria-label={`Ver render ${idx + 1}`}
  >
    <img src={img} alt={`Secuencia render ${idx + 1}`} loading="lazy" decoding="async" />
    <span>0{idx + 1}</span>
  </button>
));

KoajSequenceThumb.displayName = 'KoajSequenceThumb';

const KoajGallery = ({ images = [], short = '', description = null }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeSequenceIndex, setActiveSequenceIndex] = useState(0);

  const handleOpen = useCallback((img) => setSelectedImage(img), []);
  const handleClose = useCallback((event) => {
    if (event.target === event.currentTarget) {
      setSelectedImage(null);
    }
  }, []);

  const selectSequence = useCallback((index) => {
    setActiveSequenceIndex(index);
  }, []);

  const data = useMemo(() => {
    if (!images || images.length === 0) return null;

    return {
      hero: images[0],
      spotlight: images[1] || images[0],
      strip: images.slice(2, 5),
      finalSequence: images.slice(-7),
      total: images.length,
    };
  }, [images]);

  if (!data) return null;

  useEffect(() => {
    if (!data.finalSequence.length) return;

    const timer = window.setInterval(() => {
      setActiveSequenceIndex((prev) => (prev + 1) % data.finalSequence.length);
    }, 2800);

    return () => window.clearInterval(timer);
  }, [data.finalSequence.length]);

  const activeSequenceImage = data.finalSequence[activeSequenceIndex] || data.finalSequence[0];
  const sequenceProgress = data.finalSequence.length
    ? ((activeSequenceIndex + 1) / data.finalSequence.length) * 100
    : 0;

  return (
    <div className="koaj-gallery-container">
      <section className="koaj-hero">
        <img src={data.hero} alt="KOAJ 3D Hero" className="koaj-hero-image" loading="eager" decoding="async" />
        <div className="koaj-hero-overlay">
          <p>3D Visual Direction</p>
          <h2>KOAJ 3D EXPERIENCE</h2>
        </div>
      </section>

      <section className="koaj-stats">
        <span><strong>{data.total}</strong> renders finales</span>
        <span><strong>3D + Lookdev</strong> dirección visual</span>
        <span><strong>Moda digital</strong> narrativa de marca</span>
      </section>

      {description && (
        <section className="koaj-description">
          {description.split('\n').map((paragraph, idx) => (
            paragraph.trim() && <p key={idx}>{paragraph}</p>
          ))}
        </section>
      )}

      <section className="koaj-spotlight">
        <div className="koaj-spotlight-image-wrap">
          <img
            src={data.spotlight}
            alt="Spotlight render"
            className="koaj-spotlight-image"
            loading="lazy"
            decoding="async"
            onClick={() => handleOpen(data.spotlight)}
          />
        </div>
        <div className="koaj-spotlight-copy">
          <h3>Dirección de arte 3D</h3>
          <p>{short || 'Serie de visuales 3D para KOAJ, centrada en volumen, textura y una estética editorial de alto contraste.'}</p>
          <p>
            Cada encuadre fue diseñado para elevar producto y marca en una misma escena,
            combinando composición limpia, iluminación controlada y lenguaje visual contemporáneo.
          </p>
        </div>
      </section>

      {data.strip.length > 0 && (
        <section className="koaj-strip">
          {data.strip.map((img, idx) => (
            <img
              key={img}
              src={img}
              alt={`Render de detalle ${idx + 1}`}
              loading="lazy"
              decoding="async"
              onClick={() => handleOpen(img)}
            />
          ))}
        </section>
      )}

      <section className="koaj-final-sequence">
        <div className="koaj-final-sequence-head">
          <p>SECUENCIA FINAL</p>
          <h3>Los 7 renders que cierran el proyecto</h3>
          <div className="koaj-sequence-controls">
            <button
              type="button"
              onClick={() => setActiveSequenceIndex((prev) => (prev - 1 + data.finalSequence.length) % data.finalSequence.length)}
              aria-label="Render anterior"
            >
              Anterior
            </button>
            <button
              type="button"
              onClick={() => setActiveSequenceIndex((prev) => (prev + 1) % data.finalSequence.length)}
              aria-label="Siguiente render"
            >
              Siguiente
            </button>
          </div>
        </div>

        <div className="koaj-sequence-shell">
          <button
            type="button"
            className="koaj-sequence-stage"
            onClick={() => handleOpen(activeSequenceImage)}
            aria-label="Abrir imagen activa"
          >
            <img src={activeSequenceImage} alt={`Render destacado ${activeSequenceIndex + 1}`} loading="lazy" decoding="async" />
            <span className="koaj-sequence-index">0{activeSequenceIndex + 1}</span>
          </button>

          <div className="koaj-sequence-track" aria-hidden="true">
            <span style={{ width: `${sequenceProgress}%` }} />
          </div>

          <div className="koaj-sequence-thumbs">
            {data.finalSequence.map((img, idx) => (
              <KoajSequenceThumb
                key={img}
                img={img}
                idx={idx}
                isActive={idx === activeSequenceIndex}
                onSelect={selectSequence}
              />
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div className="koaj-lightbox" onClick={handleClose}>
          <div className="koaj-lightbox-content">
            <button
              type="button"
              className="koaj-lightbox-close"
              onClick={() => setSelectedImage(null)}
              aria-label="Cerrar imagen"
            >
              ✕
            </button>
            <img src={selectedImage} alt="Render KOAJ ampliado" decoding="async" />
          </div>
        </div>
      )}
    </div>
  );
};

export default KoajGallery;
