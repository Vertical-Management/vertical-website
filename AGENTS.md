# Reglas del proyecto — Vertical Management

Portfolio high-craft de **Vertical Management** (Esteban Ferrer).  
Stack: **Next.js 14 (App Router) · TypeScript · Tailwind · GSAP · Lenis · Framer Motion**.

Grok carga este archivo automáticamente en cada sesión del repo.  
Reglas extra: `.grok/rules/*.md` · skill de commit · hooks en `.grok/hooks/`.

---

## Stack y convenciones

- **TypeScript estricto** en todo código nuevo. Sin `any` salvo justificación breve.
- **React**: componentes funcionales; `"use client"` solo cuando haga falta (hooks, eventos, browser APIs).
- **Estilos**: Tailwind + tokens en `src/styles/tokens.css` / `globals.css`. Prettier con `prettier-plugin-tailwindcss`.
- **Imports**: alias `@/` → `src/`.
- **i18n**: textos de UI vía `src/lib/i18n/`; no hardcodear copys de producto si ya hay claves.
- **Motion**: respetar `prefers-reduced-motion` (`usePrefersReducedMotion`, flags en Framer/GSAP).
- **Media**: presupuesto de vídeo/loop con hooks existentes (`useMediaBudget`); no lanzar muchos `<video>` a la vez en mobile.
- **A11y**: focus visible, labels, skip link; no romper teclado/navegación.
- Sigue el estilo del código vecino (nombres, estructura de props, `cn()` de `@/lib/utils`).
- Prettier: `semi: true`, comillas dobles, `trailingComma: "all"`, `printWidth: 90`, tab 2.

### Estructura relevante

```
src/app/           # rutas App Router + SEO
src/components/    # UI por dominio (home, servicios, proyectos, …)
src/data/          # contenido estático (proyectos, servicios, nav)
src/hooks/ src/lib/ src/styles/ src/types/
public/assets/     # assets servidos (no commitear secretos)
```

`viewer/` y `recursos/` están en `.gitignore` — no trabajar ahí salvo petición explícita.

---

## Build & calidad

| Comando | Uso |
|---------|-----|
| `npm run dev` | Desarrollo (puerto 3000) |
| `npm run lint` | ESLint (`next lint`) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run build` | Build de producción (antes de deploys serios) |
| `npm run format` | Prettier write |

- **Antes de un cambio importante o de un commit**: `npm run lint` y `npm run typecheck`.
- No hay suite de tests automatizada hoy; si se añade, ejecutarla antes de commit.
- Env de ejemplo: `.env.example`. Nunca commitear `.env`, `.env*.local`, claves Resend, ni tokens.

Variables conocidas: `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.

Docs humanas (no duplicar aquí): `README.md`, `DEPLOYMENT.md`. `DEVELOPMENT.md` / `COMMITS.md` pueden estar desfasados (histórico Astro); prioriza este archivo y el código real.

---

## Invariantes (órdenes, no comandos)

**Fuente de verdad:** `.grok/rules/invariantes.md`.

Las invariantes son **órdenes permanentes** (no regresiones, hacer lo pedido,
rendimiento, a11y, craft, media budget, i18n, privacidad de terceros…). Debes
**obedecerlas** mientras trabajas y al entregar. **No** son comandos npm ni un
ritual de “ejecutar el INV-0X”.

- Herramientas (`lint`, `typecheck`, `build`, Lighthouse…) solo **comprueban**
  partes del trabajo; no sustituyen la orden.
- El hook de commit exige que declares **obediencia** a cada `INV-XX` del
  archivo (`INV-01: OK` …). Eso es un juramento de cumplimiento, no un script.
- Si al aplicar las órdenes ves una necesidad estable del producto que **no**
  está cubierta, **añade** un nuevo `**INV-NN**` en `invariantes.md` y cúmplelo
  en el mismo trabajo.

## Git y commits (obligatorio)

Flujo: skill **`.grok/skills/commit/SKILL.md`** + hook **PreToolUse**  
(`.grok/hooks/scripts/pre-commit-gate.mjs`).

### Siempre commit al cerrar trabajo

Cuando termines un pedido del usuario (feature, fix, piloto, reglas, etc.),
**debes crear un commit** con el flujo de la skill — no dejes el diff solo en
working tree “por si acaso”. Excepciones solo si el usuario prohíbe el commit
en ese turno, o si las invariantes no se pueden asegurar (entonces avisa y no
marques OK en falso).

- Preferir **rama de feature**; no commitear en `main`/`master` salvo orden
  explícita del usuario.
- Un propósito por commit cuando sea razonable; varios commits atómicos si el
  trabajo es grande.

### Antes de cualquier commit

1. `git status` / `git diff` / `git log` — alcance.
2. **Obedecer** todas las órdenes de `.grok/rules/invariantes.md` en el cambio
   (si alguna se viola, no commitees).
3. Comprobaciones mecánicas: `npm run lint` y `npm run typecheck`; si el staging
   toca producto, también `npm run build` (el hook puede repetirlas).
4. Staging limpio: sin `.env`, secretos, `node_modules`, `.next`, basura.
5. **Conventional Commits** + mensaje con qué/por qué; commits atómicos.
6. Declarar en el mensaje **Obedecidas:** `INV-01: OK` … `INV-N: OK`
   (solo `Inv-OK` no basta). Mensaje con `-m` o `-F`.
7. Nunca commit a `main`/`master` ni force-push a main sin orden explícita.
8. Prohibido `--no-verify` / `-n`. No commitear si el usuario no lo pidió.

Ejemplo:

```text
feat(hero): reduce mobile carousel paint jank via media budget

Obedecidas:
INV-01: OK
INV-02: OK
INV-03: OK
INV-04: OK
INV-05: OK
INV-06: OK
INV-07: OK
INV-08: OK
INV-09: OK
INV-10: OK
```

### Hooks

- Repo: `.grok/hooks/before-commit.json` → `pre-commit-gate.mjs`
- Global: `~/.grok/hooks/vertical-pre-commit.json`
- Gate: declaración de obediencia por orden + red mecánica (lint/tsc/build) +
  main/secretos/Conventional Commits; bloquea `--no-verify`
- Trust: `~/.grok/trusted_folders.toml` · comprobar con `grok inspect`

### Push y PR

- Push solo si el usuario lo pide.
- PR: resumen en prosa, riesgos de test, no relleno de “checklist genérica”.

---

## Alcance del agente

- Cambios acotados al pedido; sin refactors colaterales ni docs no pedidos.
- No borrar assets de `public/` sin confirmación.
- Deploy (`vercel --prod`) solo con instrucción explícita del usuario.
- Verificar reglas/hooks: `grok inspect`. Si `Project trusted: no`, confiar con `/hooks-trust` (el gate global sigue activo igual).
