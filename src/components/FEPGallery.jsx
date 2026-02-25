import React, { useState, useCallback, useMemo, memo } from 'react';

const GalleryItem = memo(({ img, idx, onClick }) => (
  <div 
    className="fep-gallery-item"
    onClick={() => onClick(img)}
    role="button"
    tabIndex={0}
  >
    <div className="fep-item-inner">
      <img 
        src={img} 
        alt={`FEP animation ${idx + 1}`}
        loading="lazy"
        decoding="async"
      />
    </div>
  </div>
));

GalleryItem.displayName = 'GalleryItem';

const FEPGallery = ({ images = [], description = null, referenceImage = null, referenceText = null, creationText = null, creationImagesText = null, videoUrl = null }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = useCallback((img) => {
    setSelectedImage(img);
  }, []);

  const handleCloseLightbox = useCallback((e) => {
    if (e.target === e.currentTarget) {
      setSelectedImage(null);
    }
  }, []);

  const memoImages = useMemo(() => {
    if (!images || images.length === 0) return null;
    return {
      heroImage: images[0],
      galleryImages: images.slice(1, 4),
      creationImages: images.slice(4, 6),
      lastImage: images[6]
    };
  }, [images]);

  if (!memoImages) {
    return null;
  }

  const { heroImage, galleryImages, creationImages, lastImage } = memoImages;

  return (
    <div className="fep-gallery-container">
      {/* Hero Section - Full Width */}
      <section className="fep-hero">
        <div className="fep-hero-wrapper">
          <img 
            src={heroImage} 
            alt="FEP 2026 Portada"
            className="fep-hero-image"
            loading="eager"
            decoding="async"
          />
          <div className="fep-hero-overlay" />
        </div>
      </section>

      {/* Description Section */}
      {description && (
        <section className="fep-description">
          <div className="fep-description-content">
            {description.split('\n').map((paragraph, idx) => (
              paragraph.trim() && (
                <p key={idx} className="fep-description-text">
                  {paragraph}
                </p>
              )
            ))}
          </div>
        </section>
      )}

      {/* Reference Section - Image and Text Side by Side */}
      {referenceImage && referenceText && (
        <section className="fep-reference-section">
          <div className="fep-reference-container">
            <div className="fep-reference-image-wrapper">
              <img 
                src={referenceImage} 
                alt="FEP References"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="fep-reference-text-wrapper">
              <h2>Proceso creativo</h2>
              <p>{referenceText}</p>
            </div>
          </div>
        </section>
      )}

      {/* Project Info */}
      <section className="fep-info-header">
        <div className="fep-info-content">
          <div className="fep-project-stats">
            <span className="fep-stat">
              <strong>8</strong> Animaciones
            </span>
            <span className="fep-stat">
              <strong>Motion Graphics</strong> Loops
            </span>
            <span className="fep-stat">
              <strong>Festival Estéreo Picnic</strong> 2026
            </span>
          </div>
        </div>
      </section>

      {/* Creation Section - Text and Images Side by Side */}
      {creationText && creationImages.length > 0 && (
        <section className="fep-creation-section">
          <div className="fep-creation-container">
            <div className="fep-creation-text-wrapper">
              <h2>Creación de bucles</h2>
              <p>{creationText}</p>
            </div>
            <div className="fep-creation-images-wrapper">
              {creationImages.map((img, idx) => (
                <img 
                  key={img}
                  src={img} 
                  alt={`Creación animación ${idx + 1}`}
                  loading="lazy"
                  decoding="async"
                  onClick={() => handleImageClick(img)}
                  style={{ cursor: 'pointer' }}
                />
              ))}
              {creationImagesText && (
                <div className="fep-creation-images-text">
                  {creationImagesText}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Main Gallery Grid */}
      <section className="fep-gallery-main">
        <div className="fep-gallery-grid">
          {galleryImages.map((img, idx) => (
            <GalleryItem key={img} img={img} idx={idx} onClick={handleImageClick} />
          ))}
        </div>
      </section>

      {/* Last Featured Image */}
      {lastImage && (
        <section className="fep-final-gallery">
          <div className="fep-final-gallery-wrapper">
            <img 
              src={lastImage}
              alt="Estéreo Picnic"
              loading="lazy"
              decoding="async"
              onClick={() => handleImageClick(lastImage)}
              style={{ cursor: 'pointer' }}
            />
          </div>
        </section>
      )}

      {/* Lightbox */}
      {selectedImage && (
        <div className="fep-lightbox" onClick={handleCloseLightbox}>
          <div className="fep-lightbox-content">
            <button 
              className="fep-lightbox-close" 
              onClick={() => setSelectedImage(null)}
              aria-label="Cerrar imagen"
            >
              ✕
            </button>
            <img src={selectedImage} alt="Imagen ampliada" decoding="async" />
          </div>
        </div>
      )}

      {/* Video Section */}
      {videoUrl && (
        <section className="fep-video-section">
          <div className="fep-video-wrapper">
            <video 
              controls
              width="100%"
              height="auto"
              controlsList="nodownload"
              preload="metadata"
            >
              <source src={videoUrl} type="video/mp4" />
              Tu navegador no soporta video HTML5
            </video>
          </div>
        </section>
      )}

      {/* Footer */}
      <section className="fep-footer">
        <h3>FEP 2026 Animation Suite</h3>
        <p>
          Colección completa de motion graphics y loops animados para el Festival Estéreo Picnic 2026.
        </p>
      </section>
    </div>
  );
};

export default FEPGallery;
