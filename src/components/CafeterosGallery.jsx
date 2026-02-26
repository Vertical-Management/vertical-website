import React, { useState, useCallback, memo, useEffect, useRef } from 'react';
import { Stage, Layer, Image as KonvaImage, Rect } from 'react-konva';

const BASE_URL = import.meta.env.BASE_URL;
const basePrefix = BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`;
const withBase = (path) => `${basePrefix}${path.replace(/^\/+/, '')}`;
const COFFE_BACK_SRC = withBase('assets/PAG BRANDING CAFETEROS CO/PNG COFFE/COFFE BCP.png?v=20260226c');

const HERO_HEIGHT_DESKTOP = 500;
const HERO_HEIGHT_MOBILE = 350;
const HERO_LAYERS_STORAGE_KEY = 'cafeteros-hero-layers-v5';
const REFERENCE_STAGE_WIDTH = 609;
const REFERENCE_STAGE_HEIGHT = 420;
const COFFEE_FRAME = {
  x: 0,
  y: 0,
  width: 609,
  height: 420,
  anchorX: 0.5,
  anchorY: 0,
  scaleX: 1,
  scaleY: 1,
  opacity: 1,
};
const DISPLAY_LAYER_ORDER = {
  'coffee-back': 0,
  'coffee-bck': 0,
};

const getResponsiveFrame = (frame, stageWidth, stageHeight) => {
  const viewportScaleX = stageWidth / REFERENCE_STAGE_WIDTH;
  const viewportScaleY = stageHeight / REFERENCE_STAGE_HEIGHT;

  const anchorGlobalX = (frame.x + (frame.width * frame.anchorX)) * viewportScaleX;
  const anchorGlobalY = (frame.y + (frame.height * frame.anchorY)) * viewportScaleY;

  const width = frame.width * viewportScaleX * frame.scaleX;
  const height = frame.height * viewportScaleY * frame.scaleY;

  return {
    x: anchorGlobalX - (width * frame.anchorX),
    y: anchorGlobalY - (height * frame.anchorY),
    width,
    height,
    opacity: frame.opacity,
  };
};

const getCoffeeFrame = (stageWidth, stageHeight) => getResponsiveFrame(COFFEE_FRAME, stageWidth, stageHeight);

const getHeroHeight = (viewportWidth) => {
  if (viewportWidth <= 768) {
    return Math.max(260, Math.min(viewportWidth * 0.7, 420));
  }
  return Math.max(320, Math.min(viewportWidth * 0.42, 500));
};

const buildInitialLayers = (stageWidth, stageHeight) => {
  const coffeeFrame = getCoffeeFrame(stageWidth, stageHeight);

  return [
    {
      id: 'coffee-back',
      name: 'COFFE BACK',
      src: COFFE_BACK_SRC,
      x: coffeeFrame.x,
      y: coffeeFrame.y,
      width: coffeeFrame.width,
      height: coffeeFrame.height,
      opacity: coffeeFrame.opacity,
    },
  ];
};

const getStoredLayers = (stageWidth, stageHeight) => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(HERO_LAYERS_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;

    const valid = parsed.every((layer) =>
      layer &&
      typeof layer.id === 'string' &&
      typeof layer.name === 'string' &&
      typeof layer.src === 'string' &&
      typeof layer.x === 'number' &&
      typeof layer.y === 'number' &&
      typeof layer.width === 'number' &&
      typeof layer.height === 'number' &&
      typeof layer.opacity === 'number'
    );

    if (!valid) return null;

    const coffeeFrame = getCoffeeFrame(stageWidth, stageHeight);
    return parsed.map((layer) => {
      const migratedId = layer.id === 'coffee-bck' ? 'coffee-back' : layer.id;

      if (migratedId === 'coffee-back') {
        return {
          ...layer,
          id: 'coffee-back',
          src: COFFE_BACK_SRC,
          x: coffeeFrame.x,
          y: coffeeFrame.y,
          width: coffeeFrame.width,
          height: coffeeFrame.height,
          opacity: coffeeFrame.opacity,
        };
      }

      return null;
    }).filter(Boolean);
  } catch {
    return buildInitialLayers(stageWidth, stageHeight);
  }
};

const useLoadedImage = (src) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!src || typeof window === 'undefined') {
      setImage(null);
      return;
    }

    const img = new window.Image();
    img.src = src;
    img.onload = () => setImage(img);
    img.onerror = () => setImage(null);

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return image;
};

const GalleryItem = memo(({ img, idx, onClick }) => (
  <div 
    className="cafeteros-item"
    onClick={() => onClick(img)}
    role="button"
    tabIndex={0}
  >
    <img 
      src={img} 
      alt={`Cafeteros design ${idx + 1}`}
      loading="lazy"
      decoding="async"
    />
  </div>
));

GalleryItem.displayName = 'GalleryItem';

const CafeterosGallery = ({ images = [], description = null, referenceImage = null, referenceText = null, creationText = null, creationImagesText = null }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditor, setIsEditor] = useState(false);
  const [selectedLayerId, setSelectedLayerId] = useState('coffee-back');
  const [stageSize, setStageSize] = useState({ width: 1200, height: HERO_HEIGHT_DESKTOP });
  const [layers, setLayers] = useState([]);
  const [copiedConfig, setCopiedConfig] = useState(false);
  const [savedConfig, setSavedConfig] = useState(false);
  const [restoredPublicView, setRestoredPublicView] = useState(false);
  const editorCanvasRef = useRef(null);

  const handleImageClick = useCallback((img) => {
    setSelectedImage(img);
  }, []);

  const handleCloseLightbox = useCallback((e) => {
    if (e.target === e.currentTarget) {
      setSelectedImage(null);
    }
  }, []);

  if (!images || images.length === 0) {
    return null;
  }

  // Separar imágenes: CCDC (0-5), PNG COFFE (6-10)
  const brandingImages = images.slice(0, 6);  // CCDC1-6
  const productImages = images.slice(6, 11);   // PNG COFFE x5
  const cupCoffeeImage = productImages.find((img) => img.includes('CUP COFFE'));
  const visibleProductImages = cupCoffeeImage
    ? productImages.filter((img) => img !== cupCoffeeImage)
    : productImages;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    setIsEditor(params.get('edit') === '1');
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateSize = () => {
      const containerWidth = editorCanvasRef.current?.clientWidth || window.innerWidth;
      setStageSize({
        width: Math.max(320, containerWidth),
        height: getHeroHeight(window.innerWidth),
      });
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [isEditor]);

  useEffect(() => {
    if (!stageSize.width) return;
    if (isEditor) {
      const storedLayers = getStoredLayers(stageSize.width, stageSize.height);
      if (storedLayers) {
        setLayers(storedLayers);
        return;
      }
    }
    setLayers(buildInitialLayers(stageSize.width, stageSize.height));
  }, [isEditor, stageSize.width, stageSize.height]);

  const bckImage = useLoadedImage(COFFE_BACK_SRC);

  const getImageByLayer = useCallback((layerId) => {
    if (layerId === 'coffee-back' || layerId === 'coffee-bck') return bckImage;
    return null;
  }, [bckImage]);

  const updateLayerPosition = useCallback((layerId, x, y) => {
    setLayers((prevLayers) =>
      prevLayers.map((layer) =>
        layer.id === layerId ? { ...layer, x, y } : layer
      )
    );
  }, []);

  const updateLayerValue = useCallback((layerId, field, value) => {
    const numericValue = Number(value);
    if (Number.isNaN(numericValue)) return;

    setLayers((prevLayers) =>
      prevLayers.map((layer) => {
        if (layer.id !== layerId) return layer;
        if (field === 'opacity') {
          const clamped = Math.max(0, Math.min(1, numericValue));
          return { ...layer, [field]: clamped };
        }
        return { ...layer, [field]: numericValue };
      })
    );
  }, []);

  const moveLayer = useCallback((layerId, direction) => {
    setLayers((prevLayers) => {
      const index = prevLayers.findIndex((layer) => layer.id === layerId);
      if (index === -1) return prevLayers;
      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= prevLayers.length) return prevLayers;

      const reordered = [...prevLayers];
      [reordered[index], reordered[newIndex]] = [reordered[newIndex], reordered[index]];
      return reordered;
    });
  }, []);

  const sendToBack = useCallback((layerId) => {
    setLayers((prevLayers) => {
      const index = prevLayers.findIndex((layer) => layer.id === layerId);
      if (index <= 0) return prevLayers;
      const reordered = [...prevLayers];
      const [layer] = reordered.splice(index, 1);
      reordered.unshift(layer);
      return reordered;
    });
  }, []);

  const bringToFront = useCallback((layerId) => {
    setLayers((prevLayers) => {
      const index = prevLayers.findIndex((layer) => layer.id === layerId);
      if (index === -1 || index === prevLayers.length - 1) return prevLayers;
      const reordered = [...prevLayers];
      const [layer] = reordered.splice(index, 1);
      reordered.push(layer);
      return reordered;
    });
  }, []);

  const resetLayers = useCallback(() => {
    setLayers(buildInitialLayers(stageSize.width, stageSize.height));
    setSelectedLayerId('coffee-back');
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(HERO_LAYERS_STORAGE_KEY);
    }
  }, [stageSize.width, stageSize.height]);

  const saveLayers = useCallback(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(HERO_LAYERS_STORAGE_KEY, JSON.stringify(layers));
    setSavedConfig(true);
    setTimeout(() => setSavedConfig(false), 1400);
  }, [layers]);

  const copyConfig = useCallback(async () => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return;
    await navigator.clipboard.writeText(JSON.stringify(layers, null, 2));
    setCopiedConfig(true);
    setTimeout(() => setCopiedConfig(false), 1400);
  }, [layers]);

  const restorePublicView = useCallback(() => {
    setLayers(buildInitialLayers(stageSize.width, stageSize.height));
    setSelectedLayerId('coffee-back');
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(HERO_LAYERS_STORAGE_KEY);
    }
    setRestoredPublicView(true);
    setTimeout(() => setRestoredPublicView(false), 1600);
  }, [stageSize.width, stageSize.height]);

  const selectedLayer = layers.find((layer) => layer.id === selectedLayerId);
  const resolvedLayers = layers.length
    ? layers
    : buildInitialLayers(stageSize.width || 1200, stageSize.height || HERO_HEIGHT_DESKTOP);

  const displayedLayers = isEditor
    ? resolvedLayers
    : [...resolvedLayers].sort(
      (a, b) => (DISPLAY_LAYER_ORDER[a.id] ?? 99) - (DISPLAY_LAYER_ORDER[b.id] ?? 99)
    );
  const mainHeroLayer = displayedLayers.find((layer) => layer.id === 'coffee-back') || displayedLayers[0];

  return (
    <div className="cafeteros-gallery-container">
      {/* Hero Hero - Empaque Principal */}
      {isEditor ? (
        <>
          <section className="cafeteros-main-hero cafeteros-main-hero-editor" ref={editorCanvasRef}>
            <Stage width={stageSize.width} height={stageSize.height}>
              <Layer>
                <Rect x={0} y={0} width={stageSize.width} height={stageSize.height} fill="#ffffff" />
                {layers.map((layer) => {
                  const image = getImageByLayer(layer.id);
                  if (!image) return null;

                  return (
                    <KonvaImage
                      key={layer.id}
                      image={image}
                      x={layer.x}
                      y={layer.y}
                      width={layer.width}
                      height={layer.height}
                      opacity={layer.opacity}
                      draggable
                      onClick={() => setSelectedLayerId(layer.id)}
                      onTap={() => setSelectedLayerId(layer.id)}
                      onDragEnd={(event) => {
                        updateLayerPosition(layer.id, event.target.x(), event.target.y());
                      }}
                    />
                  );
                })}
              </Layer>
            </Stage>
          </section>

          <div className="cafeteros-editor-controls">
            <div className="cafeteros-editor-head">
              <h4>Editor de capas</h4>
              <p>Arrastra elementos y ajusta su orden (frente/fondo)</p>
            </div>

            <div className="cafeteros-editor-actions">
              <button type="button" onClick={() => moveLayer(selectedLayerId, 1)}>Subir capa</button>
              <button type="button" onClick={() => moveLayer(selectedLayerId, -1)}>Bajar capa</button>
              <button type="button" onClick={() => bringToFront(selectedLayerId)}>Al frente</button>
              <button type="button" onClick={() => sendToBack(selectedLayerId)}>Al fondo</button>
              <button type="button" onClick={saveLayers}>{savedConfig ? 'Guardado' : 'Guardar fijo'}</button>
              <button type="button" onClick={restorePublicView}>{restoredPublicView ? 'Vista restaurada' : 'Restaurar vista pública'}</button>
              <button type="button" onClick={resetLayers}>Reset</button>
              <button type="button" onClick={copyConfig}>{copiedConfig ? 'Copiado' : 'Copiar JSON'}</button>
            </div>

            <div className="cafeteros-editor-layers">
              {layers.slice().reverse().map((layer, index) => (
                <button
                  key={layer.id}
                  type="button"
                  className={selectedLayerId === layer.id ? 'active' : ''}
                  onClick={() => setSelectedLayerId(layer.id)}
                >
                  <strong>{layer.name}</strong>
                  <span>z: {layers.length - 1 - index}</span>
                  <span>x: {Math.round(layer.x)} · y: {Math.round(layer.y)}</span>
                </button>
              ))}
            </div>

            {selectedLayer && (
              <div className="cafeteros-editor-form">
                <label>
                  X
                  <input
                    type="number"
                    value={Math.round(selectedLayer.x)}
                    onChange={(e) => updateLayerValue(selectedLayer.id, 'x', e.target.value)}
                  />
                </label>
                <label>
                  Y
                  <input
                    type="number"
                    value={Math.round(selectedLayer.y)}
                    onChange={(e) => updateLayerValue(selectedLayer.id, 'y', e.target.value)}
                  />
                </label>
                <label>
                  Ancho
                  <input
                    type="number"
                    min="1"
                    value={Math.round(selectedLayer.width)}
                    onChange={(e) => updateLayerValue(selectedLayer.id, 'width', e.target.value)}
                  />
                </label>
                <label>
                  Alto
                  <input
                    type="number"
                    min="1"
                    value={Math.round(selectedLayer.height)}
                    onChange={(e) => updateLayerValue(selectedLayer.id, 'height', e.target.value)}
                  />
                </label>
                <label>
                  Opacidad
                  <input
                    type="number"
                    min="0"
                    max="1"
                    step="0.05"
                    value={selectedLayer.opacity}
                    onChange={(e) => updateLayerValue(selectedLayer.id, 'opacity', e.target.value)}
                  />
                </label>
              </div>
            )}

            {selectedLayer && (
              <pre className="cafeteros-editor-selected">
{JSON.stringify(selectedLayer, null, 2)}
              </pre>
            )}
          </div>
        </>
      ) : (
        <section className="cafeteros-main-hero">
          {mainHeroLayer && (
            <img
              src={mainHeroLayer.src}
              alt=""
              aria-hidden="true"
              className="cafeteros-hero-main-image"
              loading="eager"
              decoding="async"
              style={{ opacity: mainHeroLayer.opacity }}
            />
          )}
        </section>
      )}

      {/* Description Section */}
      {description && (
        <section className="cafeteros-description-section">
          <div className="cafeteros-description-wrapper">
            {description.split('\n').map((paragraph, idx) => (
              paragraph.trim() && (
                <p key={idx} className="cafeteros-description-text">
                  {paragraph}
                </p>
              )
            ))}
          </div>
        </section>
      )}

      {cupCoffeeImage && (
        <section className="cafeteros-cup-bridge" aria-label="Tazas de café">
          <img
            src={cupCoffeeImage}
            alt="Tazas de café"
            className="cafeteros-bridge-cup"
            loading="lazy"
            decoding="async"
          />
        </section>
      )}

      {/* Products Showcase - PNG COFFE */}
      <section className="cafeteros-products-section">
        <div className="cafeteros-section-header">
          <h2>Línea de Productos</h2>
          <p>Expresiones visuales del café</p>
          <div className="cafeteros-expression-images">
            {[brandingImages[4], brandingImages[3]].filter(Boolean).map((img, idx) => (
              <img
                key={img}
                src={img}
                alt={`Expresión visual ${idx + 1}`}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </div>
        <div className="cafeteros-products-grid">
          {visibleProductImages.map((img, idx) => (
            <div 
              key={img}
              className="cafeteros-product-card"
              onClick={() => handleImageClick(img)}
            >
              <div className="cafeteros-product-image">
                <img 
                  src={img} 
                  alt={`Producto ${idx + 1}`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="cafeteros-product-info">
                <span className="product-number">0{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reference Section */}
      {referenceImage && referenceText && (
        <section className="cafeteros-reference-section">
          <div className="cafeteros-reference-content">
            <div className="cafeteros-reference-image">
              <img 
                src={referenceImage} 
                alt="Referencia branding"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="cafeteros-reference-text">
              <h3>Concepto Creativo</h3>
              <p>{referenceText}</p>
            </div>
          </div>
        </section>
      )}

      {/* Creation Process */}
      {creationText && (
        <section className="cafeteros-creation-section">
          <div className="cafeteros-creation-wrapper">
            <div className="cafeteros-creation-text">
              <h2>Proceso de Diseño</h2>
              <p>{creationText}</p>
            </div>
          </div>
        </section>
      )}

      {/* Visual Identity Gallery - CCDC */}
      <section className="cafeteros-identity-section">
        <div className="cafeteros-section-header">
          <h2>Identidad Visual</h2>
          <p>Sistema de diseño integral</p>
        </div>
        <div className="cafeteros-identity-grid">
          {brandingImages.map((img, idx) => (
            <GalleryItem 
              key={img} 
              img={img} 
              idx={idx} 
              onClick={handleImageClick} 
            />
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div className="cafeteros-lightbox" onClick={handleCloseLightbox}>
          <div className="cafeteros-lightbox-content">
            <button 
              className="cafeteros-lightbox-close" 
              onClick={() => setSelectedImage(null)}
              aria-label="Cerrar imagen"
            >
              ✕
            </button>
            <img src={selectedImage} alt="Imagen ampliada" decoding="async" />
          </div>
        </div>
      )}

      {/* Footer */}
      <section className="cafeteros-footer">
        <h3>Cafeteros CO — Branding Integral 2025</h3>
        <p>
          Identidad visual que celebra la excelencia del café colombiano en cada aplicación.
        </p>
      </section>
    </div>
  );
};

export default CafeterosGallery;
