# Development Guide — Vertical Management Portfolio

Quick reference for local development, project structure, and adding new features.

---

## Getting Started

### Prerequisites

- Node.js 18+ (get from [nodejs.org](https://nodejs.org) or use [nvm](https://github.com/nvm-sh/nvm))
- Git
- Text editor or IDE (VS Code recommended)

### Initial Setup

```bash
# Clone or navigate to your project
cd vertical-website

# Install dependencies
npm install

# Sync recursos/ to public/assets/ (one-time or before build)
npm run sync:assets

# Start development server
npm run dev
# Open http://localhost:3000 in your browser
```

The server will hot-reload when you make changes.

---

## Project Structure

```
vertical-website/
├── src/
│   ├── pages/              # Route pages (auto-routing)
│   │   ├── index.astro     # Homepage
│   │   ├── about.astro
│   │   ├── servicios.astro
│   │   ├── proyectos.astro
│   │   ├── contacto.astro
│   │   └── proyectos/
│   │       └── [slug].astro # Dynamic project detail page
│   │
│   ├── components/         # React & Astro components
│   │   ├── Header.jsx      # Navigation header with mobile menu
│   │   ├── Hero.jsx        # Hero section
│   │   ├── HeroAnimated.jsx # Advanced animated hero (optional)
│   │   ├── RotatingWords.jsx
│   │   └── ProjectGrid.jsx
│   │
│   ├── layouts/            # Page layouts
│   │   └── BaseLayout.astro # Main layout wrapper
│   │
│   ├── styles/             # Global and component styles
│   │   ├── global.scss
│   │   └── animations.scss
│   │
│   └── data/               # JSON data and content
│       └── projects.json
│
├── public/                 # Static assets (served as-is)
│   ├── favicon.svg
│   ├── assets/
│   │   ├── logo/
│   │   ├── 1. PAG DE ENTRADA/    # (synced from recursos/)
│   │   ├── PAG ANIMATION FEP2026/
│   │   ├── PAG BRANDING CAFETEROS CO/
│   │   ├── PAG KOAJ 3D/
│   │   └── PAG UX:UI PEDIGREE/
│   │
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions CI/CD
│
├── scripts/
│   ├── optimize-images.sh  # Image compression & WebP conversion
│   └── generate-favicon.sh # Favicon generation
│
├── astro.config.mjs        # Astro configuration
├── package.json
├── README.md
├── COMMITS.md              # Suggested commit messages
├── DEPLOYMENT.md           # Deployment & GitHub Pages guide
└── DEVELOPMENT.md          # This file
```

---

## Common Development Tasks

### Adding a New Page

1. **Create a new `.astro` file** in `src/pages/`:
   ```bash
   # Example: src/pages/blog.astro
   touch src/pages/blog.astro
   ```

2. **Template**:
   ```astro
   ---
   import BaseLayout from '../layouts/BaseLayout.astro';
   import Header from '../components/Header.jsx';
   ---
   <BaseLayout title="Blog — Vertical Management">
     <Header />
     <section className="blog vm-container">
       <h1>Blog Posts</h1>
       {/* Your content here */}
     </section>
   </BaseLayout>
   ```

3. **Update navigation**:
   - Edit `src/components/Header.jsx`
   - Add a new `<a href="/blog">Blog</a>` link

### Adding a New Component

1. **Create component file**:
   ```bash
   touch src/components/MyComponent.jsx
   ```

2. **Example React component**:
   ```jsx
   export default function MyComponent() {
     return <div className="my-component">Hello!</div>;
   }
   ```

3. **Use in a page**:
   ```astro
   ---
   import MyComponent from '../components/MyComponent.jsx';
   ---
   <MyComponent />
   ```

### Styling Components

Two approaches:

**1. Global styles** (in `src/styles/global.scss` or `animations.scss`):
```scss
.my-component {
  padding: 1rem;
  color: var(--vm-fg);
}
```

**2. Scoped styles** (in Astro component):
```astro
---
// Component logic
---
<div class="my-styles">
  {/* template */}
</div>

<style scoped>
  .my-styles {
    padding: 1rem;
  }
</style>
```

### Adding Project Data

Edit `src/data/projects.json`:

```json
{
  "projects": [
    {
      "title": "My Project",
      "slug": "my-project",
      "short": "Brief description",
      "images": ["/assets/project/image1.webp", "/assets/project/image2.webp"],
      "role": "Diseñador",
      "year": 2024
    }
  ]
}
```

Then projects auto-generate:
- Listing page: `/proyectos`
- Detail page: `/proyectos/my-project`

### Updating Content

Most text lives in these files:

- **About**: `src/pages/about.astro`
- **Services**: `src/pages/servicios.astro`
- **Contact**: `src/pages/contacto.astro`
- **Projects**: `src/data/projects.json`
- **Header links**: `src/components/Header.jsx`

Edit directly and save; dev server will hot-reload.

---

## Styling & Design System

### CSS Variables (Design Tokens)

```scss
/* In global.scss */
:root {
  --vm-bg: #ffffff;      /* Background */
  --vm-fg: #0b0b0b;      /* Foreground / text */
  --vm-accent: #ff4d4f;  /* Red accent */
}
```

Use in components:
```scss
.my-element {
  background: var(--vm-bg);
  color: var(--vm-fg);
  border: 2px solid var(--vm-accent);
}
```

### Add a New Color

1. Update `src/styles/global.scss`:
   ```scss
   :root {
     --vm-bg: #ffffff;
     --vm-fg: #0b0b0b;
     --vm-accent: #ff4d4f;
     --vm-secondary: #1890ff;  /* New color */
   }
   ```

2. Use in components:
   ```scss
   .secondary-btn { background: var(--vm-secondary); }
   ```

### Animations

Advanced animations are in `src/styles/animations.scss`. Add new ones:

```scss
@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.element-with-animation {
  animation: slide-in 600ms ease;
}
```

Always respect `prefers-reduced-motion`:
```scss
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
  }
}
```

---

## Working with Images

### Optimal Formats

- **Heroes/Full-width**: WebP (85% quality) or optimized JPEG
- **Thumbnails**: WebP 
- **Icons/Logos**: SVG
- **Animated content**: GIF or MP4 (MP4 is smaller)

### Optimize Before Committing

```bash
# Optimize and convert recursos/ to WebP
scripts/optimize-images.sh

# Generate favicons from SVG
scripts/generate-favicon.sh
```

Or manually with ImageMagick:

```bash
# Convert PNG to WebP
cwebp -q 85 image.png -o image.webp

# Compress JPEG
convert input.jpg -quality 85 output.jpg
```

### Lazy Load Images

In components:
```jsx
<img
  src="/assets/image.webp"
  alt="Description"
  loading="lazy"
  decoding="async"
/>
```

---

## Building & Testing

### Development Server

```bash
npm run dev
# http://localhost:3000
```

### Production Build

```bash
npm run build
# Generates dist/ folder
# No Hot Module Replacement; for final testing use:
npm run preview
```

### Check Build Size

```bash
npm run build
du -sh dist/
# Example output: 2.1M dist/
```

---

## Debugging

### View Build Logs

```bash
npm run build -- --verbose
```

### Check for Errors

```bash
npm run build
# Errors will be printed to console
```

### Test in Production Mode

```bash
npm run build
npm run preview
# Open http://localhost:3000 and test
```

---

## Code Quality

### Format Code

```bash
npm run format
# Uses Prettier to format all files
```

### Check for Issues

Look for any console warnings in:
1. Browser DevTools Console
2. Test Lighthouse audit: Right-click → Inspect → Lighthouse

---

## Useful Astro Docs

- [Astro: Pages & Routing](https://docs.astro.build/en/guides/routing/)
- [Astro: Components](https://docs.astro.build/en/core-concepts/astro-components/)
- [Astro: React Integration](https://docs.astro.build/en/guides/integrations-guide/react/)
- [Astro: Styling](https://docs.astro.build/en/guides/styling/)

---

## Next Steps

1. Install Node.js if you haven't already
2. Run `npm install && npm run sync:assets && npm run dev`
3. Open http://localhost:3000 and explore
4. Edit files and watch hot-reload in action
5. Commit changes using suggestions in `COMMITS.md`
6. Push to GitHub for automatic deployment

Happy coding! 🚀
