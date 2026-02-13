# Vertical Management — Portfolio (Esteban Ferrer)

Proyecto estático generado con **Astro** + **React**. Portfolio profesional con landing minimalista y páginas de proyectos expresivas.

## ✨ Features

- **Astro + React**: Componentes estáticos con dinámicos en React donde sea necesario.
- **Responsive**: Diseño adaptable para móvil, tablet y desktop con menú hamburguesa.
- **Animaciones**: Transiciones suaves, entrada CSS, y rotación de palabras.
- **Optimizado**: SCSS modular, lazy loading, prefers-reduced-motion.
- **CI/CD**: GitHub Actions deploy automático a Pages en cada push.
- **Accesible**: ARIA labels, alt text, navegación clara.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ ([nodejs.org](https://nodejs.org) o [nvm](https://github.com/nvm-sh/nvm))
- Git

### Setup

```bash
# Clonar y entrar
cd vertical-website

# Instalar dependencias
npm install

# Sincronizar recursos a public/assets/
npm run sync:assets

# Iniciar servidor de desarrollo
npm run dev
# Abre http://localhost:3000
```

### Comandos principales

```bash
npm run dev       # Servidor de desarrollo (hot reload)
npm run build     # Build para producción (genera dist/)
npm run preview   # Previsualizar build
npm run format    # Formatear código con Prettier
```

## 📁 Project Structure

```
src/
  pages/              # Routes (Astro auto-routing)
    index.astro       # Landing page
    about.astro
    servicios.astro
    proyectos.astro
    contacto.astro
    proyectos/[slug].astro
  components/         # React & Astro components
    Header.jsx        # Nav + Mobile menu
    Hero.jsx          # Hero section
    RotatingWords.jsx
  layouts/
    BaseLayout.astro  # Main wrapper
  styles/
    global.scss       # Global styles
    animations.scss   # Advanced animations
  data/
    projects.json     # Portfolio data

public/
  favicon.svg
  assets/             # Synced from recursos/

.github/workflows/
  deploy.yml          # GitHub Actions CI/CD
```

## 📦 Despliegue (GitHub Pages)

El repo incluye GitHub Actions que automáticamente:
1. Detecta push en `main`
2. Instala dependencias
3. Compila el sitio (`npm run build`)
4. Publica en GitHub Pages

**Tu sitio estará en**: `https://<username>.github.io/<repo-name/`

Para usar **dominio personalizado**, ver [DEPLOYMENT.md](DEPLOYMENT.md).

## ✏️ Para desarrollo y features

→ Consulta [DEVELOPMENT.md](DEVELOPMENT.md) para:
- Agregar nuevas páginas
- Añadir componentes
- Estructurar datos
- Estilos y animaciones

## 🔄 Para commits y versioning

→ Consulta [COMMITS.md](COMMITS.md) para:
- Mensajes de commit sugeridos
- Estrategia de versioning (semver)
- Ejemplos de ramas y tags

## 📊 Optimización

### Optimizar imágenes

```bash
chmod +x scripts/*.sh
scripts/optimize-images.sh   # Compress to WebP
scripts/generate-favicon.sh  # Generate favicons
```

### Performance

- Lazy load en imágenes
- Minificación automática (Astro)
- SCSS modular
- Animations respetan `prefers-reduced-motion`

## 🎨 Personalización

**Colores** (en `src/styles/global.scss`):
```scss
:root {
  --vm-bg: #ffffff;
  --vm-fg: #0b0b0b;
  --vm-accent: #ff4d4f;
}
```

**Logo**: Reemplaza `public/assets/logo/vertical.svg` con tu SVG oficial.

**Contenido**: Edita `src/pages/*.astro` y `src/data/projects.json`.

## 📝 TODO

- [ ] Instalar Node.js (si falta)
- [ ] Ejecutar `npm install && npm run sync:assets`
- [ ] Reemplazar logo SVG con oficial
- [ ] Añadir textos reales (About, Services, Contact)
- [ ] Ampliar `projects.json` con tus proyectos
- [ ] Optimizar imágenes: `scripts/optimize-images.sh`
- [ ] Configurar dominio personalizado (opcional)
- [ ] Verificar deploy en GitHub Pages

## 📚 Recursos

- [Astro Docs](https://docs.astro.build)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [DEVELOPMENT.md](DEVELOPMENT.md) — Local dev guide
- [DEPLOYMENT.md](DEPLOYMENT.md) — Deploy & Pages setup
- [COMMITS.md](COMMITS.md) — Commit messages & versioning
