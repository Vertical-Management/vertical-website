# Vertical Management — Rediseño High-Craft

Experiencia digital para **Vertical Management** (Esteban Ferrer).  
Stack: **Next.js 14 · TypeScript · Tailwind · GSAP · Lenis · Framer Motion · R3F**.

Estética: **Editorial Digital Disruptivo + Playful High-Craft**.

---

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Servir build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript strict |
| `npm run deploy:preview` | Deploy preview (Vercel CLI) |
| `npm run deploy:prod` | Deploy production (Vercel CLI) |

## Deploy (Vercel + Resend)

Guía completa: **[DEPLOYMENT.md](./DEPLOYMENT.md)**

Resumen:

1. Push a GitHub → Import en [vercel.com/new](https://vercel.com/new)  
2. Env vars: `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`  
3. Dominio `somvertical.ad` en Vercel → DNS  
4. Verifica dominio en Resend para mails reales  

```bash
npx vercel login
npx vercel --prod
```

---

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Home inmersiva |
| `/servicios` | Bloques de color + proceso |
| `/proyectos` | Vertical OS (desktop) |
| `/proyectos/[slug]` | Caso de estudio |
| `/contacto` | Form + neo-iOS device |
| `/design-system` | Spec visual (noindex) |
| `/sitemap.xml` | Sitemap |
| `/robots.txt` | Robots |
| `/manifest.webmanifest` | PWA manifest |

---

## Estructura

```
src/
├── app/                 # App Router + SEO (sitemap, robots, manifest)
├── components/
│   ├── layout/          # Header, Footer, Nav
│   ├── ui/              # Design system
│   ├── home/ servicios/ proyectos/ contacto/
│   ├── transitions/     # Page wipe, intro, loaders
│   ├── seo/             # JSON-LD
│   └── providers/
├── data/ hooks/ lib/ styles/ types/
public/assets/           # Marca + portfolio
```

---

## Performance · A11y · SEO

### Performance
- `next/font` (Syne, Manrope, JetBrains) con `display: swap`
- Imágenes AVIF/WebP + cache largo en `/assets`
- Code-split del desktop OS (`dynamic` + `ssr: false`)
- `optimizePackageImports` para GSAP / Framer / Three
- Headers de seguridad + compresión
- Transiciones desactivadas con `prefers-reduced-motion`

### Accesibilidad
- Skip link → `#main-content`
- Landmarks: `banner`, `contentinfo`, `main`, diálogos con `aria-*`
- Focus visible, forced-colors
- Cursor custom solo en `(pointer: fine)`; inputs con cursor nativo
- Menú: Escape, `aria-expanded`, scroll lock
- Reduced motion en Lenis, GSAP, intro y page transitions

### SEO
- Metadata + Open Graph + Twitter por ruta
- **OG image** branded en `/og.svg` (1200×630); proyectos usan cover + fallback
- Canonicals
- `sitemap.ts` / `robots.ts` / `manifest.ts`
- JSON-LD: Organization, WebSite, Person, ContactPage, CreativeWork, Breadcrumbs
- `/design-system` noindex

### Contacto (API)
```bash
# .env.local
RESEND_API_KEY=re_xxx
CONTACT_TO_EMAIL=hola@somvertical.ad
CONTACT_FROM_EMAIL=Vertical <hola@somvertical.ad>
```
- `POST /api/contact` — validación, honeypot, rate limit
- Con Resend: email real · Sin key: log en servidor (dev-friendly)

---

## Roadmap

1. ✅ Proyecto limpio + estructura + deps  
2. ✅ Design System completo  
3. ✅ Header + Footer + navegación  
4. ✅ Home inmersiva  
5. ✅ Servicios  
6. ✅ Proyectos (desktop modernizado)  
7. ✅ Contacto  
8. ✅ Page transitions + loading  
9. ✅ Performance, a11y, SEO  

---

## Assets

Recursos de marca y proyectos en `public/assets/` (fuente en `recursos/`).
