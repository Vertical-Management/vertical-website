import React, { useMemo, useState, useCallback, memo } from 'react';

const KoajTile = memo(({ img, idx, onClick }) => (
  <button
    type="button"
    className={`koaj-tile koaj-tile-${(idx % 6) + 1}`}
    onClick={() => onClick(img)}
    aria-label={`Abrir render ${idx + 1}`}
  >
    <img src={img} alt={`KOAJ 3D render ${idx + 1}`} loading="lazy" decoding="async" />
  </button>
));

KoajTile.displayName = 'KoajTile';

const KoajGallery = ({ images = [], short = '', description = null }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpen = useCallback((img) => setSelectedImage(img), []);
  const handleClose = useCallback((event) => {
    if (event.target === event.currentTarget) {
      setSelectedImage(null);
    }
  }, []);

  const data = useMemo(() => {
    if (!images || images.length === 0) return null;

    return {
      hero: images[0],
      spotlight: images[1] || images[0],
      strip: images.slice(2, 5),
      renders: images.slice(5),
      total: images.length,
    };
  }, [images]);

  if (!data) return null;

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

      <section className="koaj-mosaic">
        {data.renders.map((img, idx) => (
          <KoajTile key={img} img={img} idx={idx} onClick={handleOpen} />
        ))}
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
