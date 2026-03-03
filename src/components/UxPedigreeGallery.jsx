import React, { useMemo, useState, useCallback, useEffect, memo } from 'react';

const FeatureCard = memo(({ img, idx, onOpen }) => (
  <button type="button" className="pedigree-feature-card" onClick={() => onOpen(img)} aria-label={`Abrir vista ${idx + 1}`}>
    <img src={img} alt={`Vista UX ${idx + 1}`} loading="lazy" decoding="async" />
    <span className="pedigree-feature-index">0{idx + 1}</span>
  </button>
));

FeatureCard.displayName = 'FeatureCard';

const UxPedigreeGallery = ({ images = [], short = '' }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const openImage = useCallback((img) => setSelectedImage(img), []);
  const closeLightbox = useCallback((event) => {
    if (event.target === event.currentTarget) {
      setSelectedImage(null);
    }
  }, []);

  const data = useMemo(() => {
    if (!images || images.length === 0) return null;

    const appCarouselImages = images.filter((img) =>
      /UNIVERSITY GB APP(?:2|3|4)?\.webp$/i.test(img)
    );

    const growBookImage = images.find((img) => img.includes('GROW BOOK'));
    const app6Image = images.find((img) => img.includes('APP 6'));
    const app7Image = images.find((img) => img.includes('APP7'));
    const dogImage = images.find((img) => img.includes('DOG'));
    const sourcesImage = images.find((img) => img.includes('SOURCES'));

    const orderedImages = (growBookImage
      ? [growBookImage, ...images.filter((img) => img !== growBookImage)]
      : images
    ).filter((img) => img !== app6Image && img !== dogImage);

    return {
      hero: orderedImages[0],
      walkthrough: orderedImages.slice(1, 6),
      appCarousel: appCarouselImages,
      login: orderedImages[6] || orderedImages[0],
      system: app7Image || orderedImages[7] || orderedImages[1] || orderedImages[0],
      finalSet: orderedImages.slice(8),
      dogHero: dogImage,
      sourcesHero: sourcesImage,
      closingHero: app6Image || orderedImages[orderedImages.length - 1],
      total: images.length,
    };
  }, [images]);

  useEffect(() => {
    if (!data?.appCarousel?.length) return;

    const timer = window.setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % data.appCarousel.length);
    }, 2200);

    return () => window.clearInterval(timer);
  }, [data?.appCarousel]);

  if (!data) return null;

  return (
    <div className="pedigree-gallery-container">
      <section className="pedigree-hero">
        <span className="pedigree-hero-side" aria-hidden="true" />
        <div className="pedigree-hero-image-wrap">
          <img src={data.hero} alt="University GB app" className="pedigree-hero-image" loading="eager" decoding="async" />
        </div>
        <span className="pedigree-hero-side" aria-hidden="true" />
        <div className="pedigree-hero-copy">
          <p>UX / UI CASE</p>
          <h2>University GB App</h2>
          <span>{short}</span>
        </div>
      </section>

      <section className="pedigree-stats">
        <span><strong>{data.total}</strong> pantallas</span>
        <span><strong>Design System</strong> consistencia visual</span>
        <span><strong>Mobile-first</strong> experiencia enfocada</span>
      </section>

      <section className="pedigree-story">
        <div className="pedigree-story-copy">
          <h3>Experiencia clara desde el primer toque</h3>
          <p>
            Esta propuesta UX/UI prioriza comprensión inmediata, navegación limpia y
            una estética académica moderna para conectar estudiantes con contenido, progreso y comunidad.
          </p>
          <p>
            El flujo reduce fricción en onboarding, login y consumo de información,
            manteniendo una identidad visual coherente en cada vista.
          </p>
        </div>
        <button type="button" className="pedigree-story-image" onClick={() => openImage(data.login)} aria-label="Abrir login">
          <img src={data.login} alt="Pantalla de login" loading="lazy" decoding="async" />
        </button>
      </section>

      {data.appCarousel.length > 0 && (
        <section className="pedigree-app-carousel" aria-label="Carrusel University GB App">
          <div className="pedigree-app-carousel-viewport">
            <div className="pedigree-app-carousel-track" style={{ transform: `translateX(-${carouselIndex * 100}%)` }}>
              {data.appCarousel.map((img, idx) => (
                <button
                  key={img}
                  type="button"
                  className="pedigree-app-slide"
                  onClick={() => openImage(img)}
                  aria-label={`Abrir APP ${idx + 1}`}
                >
                  <img src={img} alt={`UNIVERSITY GB APP ${idx + 1}`} loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
          </div>
          <div className="pedigree-app-carousel-dots" aria-hidden="true">
            {data.appCarousel.map((img, idx) => (
              <span key={img} className={idx === carouselIndex ? 'is-active' : ''} />
            ))}
          </div>
        </section>
      )}

      <section className="pedigree-system">
        <button type="button" className="pedigree-system-preview" onClick={() => openImage(data.system)} aria-label="Abrir design system">
          <img src={data.system} alt="Design system" loading="lazy" decoding="async" />
        </button>
        <div className="pedigree-system-copy">
          <p className="label">Design Foundations</p>
          <h3>Sistema visual listo para escalar</h3>
          <p>
            Tipografía, colores, componentes y jerarquías están diseñados para mantener
            legibilidad, consistencia y velocidad de implementación.
          </p>
        </div>
      </section>

      {data.finalSet.length > 0 && (
        <section className="pedigree-feature-grid">
          {data.finalSet.map((img, idx) => (
            <FeatureCard key={img} img={img} idx={idx} onOpen={openImage} />
          ))}
        </section>
      )}

      {(data.sourcesHero || data.dogHero || data.closingHero) && (
        <div className="pedigree-closing-pair">
          {data.sourcesHero && (
            <section className="pedigree-hero pedigree-closing-hero">
              <span className="pedigree-hero-side" aria-hidden="true" />
              <div className="pedigree-hero-image-wrap">
                <img
                  src={data.sourcesHero}
                  alt="UNIVERSITY GB SOURCES duplicada"
                  className="pedigree-hero-image"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <span className="pedigree-hero-side" aria-hidden="true" />
            </section>
          )}

          {data.dogHero && (
            <section className="pedigree-hero pedigree-closing-hero pedigree-dog-hero">
              <span className="pedigree-hero-side" aria-hidden="true" />
              <div className="pedigree-hero-image-wrap">
                <span className="pedigree-dog-top-rect" aria-hidden="true" />
                <img
                  src={data.dogHero}
                  alt="UNIVERSITY GB DOG"
                  className="pedigree-hero-image"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <span className="pedigree-hero-side" aria-hidden="true" />
            </section>
          )}

          {data.closingHero && (
            <section className="pedigree-hero pedigree-closing-hero">
              <span className="pedigree-hero-side" aria-hidden="true" />
              <div className="pedigree-hero-image-wrap">
                <img
                  src={data.closingHero}
                  alt="UNIVERSITY GB APP 6"
                  className="pedigree-hero-image"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <span className="pedigree-hero-side" aria-hidden="true" />
            </section>
          )}
        </div>
      )}

      {selectedImage && (
        <div className="pedigree-lightbox" onClick={closeLightbox}>
          <div className="pedigree-lightbox-content">
            <button
              type="button"
              className="pedigree-lightbox-close"
              onClick={() => setSelectedImage(null)}
              aria-label="Cerrar imagen"
            >
              ✕
            </button>
            <img src={selectedImage} alt="Vista UX ampliada" decoding="async" />
          </div>
        </div>
      )}
    </div>
  );
};

export default UxPedigreeGallery;
