# AGENTS.md — Reglas del proyecto · Vertical Management

**Acata `.grok/rules/invariantes.md` en cada pedido, sin que el usuario lo
recuerde.** Son órdenes permanentes (`INV-01`…`INV-17`). No esperes "sigue las
rules" ni "haz los INV".

Portfolio high-craft de **Vertical Management** (Esteban Ferrer).
Stack: **Next.js 14 (App Router) · TypeScript · Tailwind · GSAP · Lenis ·
Framer Motion**.

Este archivo define el **workflow obligatorio** como reglas numeradas
(`RULE-001`, `RULE-002`…). Las reglas son estables: no se renumeran ni se
retiran; si una deja de aplicar se marca obsoleta con fecha. Los agentes
(Grok, Claude u otros) las acatan sin que el usuario las recuerde.

---

## 1. Fuentes de verdad

| Fuente                                                      | Contenido                                  |
| ----------------------------------------------------------- | ------------------------------------------ |
| `.grok/rules/invariantes.md`                                | Órdenes de producto permanentes (`INV-NN`) |
| [AGENTS.md](./AGENTS.md)                                    | Workflow y reglas de proceso (`RULE-NNN`)  |
| [ISSUES.md](./ISSUES.md)                                    | Tablero de tareas (`TASK-XXXX`)            |
| [ARCHITECTURE.md](./ARCHITECTURE.md)                        | Cómo está construido el sitio              |
| [README.md](./README.md) / [DEPLOYMENT.md](./DEPLOYMENT.md) | Onboarding y deploy                        |

`DEVELOPMENT.md` / `COMMITS.md` son históricos (era Astro): no los uses como
referencia. Si este archivo y cualquier doc humana discrepan, manda el código
real + este archivo, y corrige la doc (`RULE-007`).

---

## 2. Reglas de workflow

### RULE-001 — Jerarquía inmutable

Las invariantes `INV-NN` mandan sobre todo lo demás. Un cambio que viola una
invariante es incorrecto aunque compile y pase tests. Este archivo manda sobre
cualquier convención heredada de docs históricas.

### RULE-002 — Toda tarea vive en `ISSUES.md`

Todo cambio de producto o infraestructura se registra en `ISSUES.md`
**antes o durante** su ejecución, con ID `TASK-XXXX` secuencial de 4 dígitos
(los IDs nunca se reciclan ni reordenan). La ficha incluye: título, estado
(`todo` / `in-progress` / `done` / `wontfix`), descripción y criterios de
aceptación verificables. Trabajo sin tarea = trabajo mal hecho, salvo fixes
triviales (typo) que igualmente pueden agruparse bajo una tarea existente.

### RULE-003 — Cierre con trazabilidad

Al terminar una tarea: marca `done` con fecha de cierre y referencia al commit
en su ficha, en el mismo commit o en el inmediatamente siguiente. El mensaje
de commit referencia el ID: `(TASK-0003)`. Si una tarea se abandona,
estado `wontfix` + motivo. Nada se queda a medias en `in-progress` al cerrar
el turno.

### RULE-004 — Git: rama + commits atómicos + push frecuente

1. Se trabaja en **rama de feature** (`feat/...`, `fix/...`, `chore/...`);
   nunca en `main`/`master` salvo orden explícita del usuario.
2. **Conventional Commits**, un propósito por commit, commits atómicos.
3. **Push frecuente**: al cerrar cada milestone dentro del turno (docs, suite
   nueva, fix verificado), empuja la rama al remoto. No acumules horas de
   trabajo solo local.
4. Nunca force-push ni merge a `main` sin orden explícita.

### RULE-005 — Puertas de calidad antes de commit

Antes de commitear trabajo que toca producto:

```bash
npm run lint        # ESLint (next/core-web-vitals)
npm run typecheck   # tsc --noEmit, strict
```

Y según alcance:

- Toca lógica en `src/lib` o `src/data` → `npm run test` (unit).
- Toca páginas, flujos o UI → `npm run build`; si toca un flujo cubierto por
  E2E (home, nav, contacto, 404, SEO files) → `npm run test:e2e`.
- Formato → `npm run format:check` (lo aplica también lint-staged).

Si algo falla, se arregla o no se commitea.

### RULE-006 — Política de tests

- Lógica nueva o modificada en `src/lib/**` o `src/data/**` ⇒ **tests
  unitarios** (Vitest) en el mismo PR. Sin excepciones.
- Página o flujo nuevo visible ⇒ **spec E2E** (Playwright) que cubra el happy
  path y al menos un caso de error.
- Bug fixed ⇒ primero el test que lo reproduce, después el fix.
- No se desactiva ni salta un test sin justificarlo en el commit; un test
  roto en `main` bloquea merges hasta arreglarse.
- Cobertura actual y decisiones: ver [ARCHITECTURE.md §9](./ARCHITECTURE.md).

### RULE-007 — Documentación sincronizada

Cambios estructurales (nueva capa, provider, ruta relevante, decisión de stack,
tooling de calidad) ⇒ actualizar `ARCHITECTURE.md` en el mismo PR. Cambios de
proceso ⇒ actualizar este archivo. La doc desfasada es un bug silencioso.

### RULE-008 — Convenciones de código

- **TypeScript estricto**; sin `any` salvo justificación breve.
- React funcional; `"use client"` solo cuando haga falta.
- Estilos con Tailwind + tokens (`src/styles/tokens.css`); clases via `cn()`.
- Imports con alias `@/` → `src/`. Sigue el estilo del código vecino.
- Prettier: `semi: true`, comillas dobles, `trailingComma: "all"`,
  `printWidth: 90`, tab 2, plugin Tailwind.

### RULE-009 — i18n obligatorio para copy de producto

Textos de UI/marketing vía `src/lib/i18n/` (claves en los **4 locales**:
es, ca, en, fr). No hardcodear copys ya cubiertos por diccionario. El test de
paridad de claves fallará si falta un idioma — eso es intencional.

### RULE-010 — Motion, media y a11y (resumen operativo de INV)

- Respeta `prefers-reduced-motion` (`usePrefersReducedMotion`) — `INV-12`.
- Vídeo/loops vía presupuesto `useMediaBudget`; posters, pause fuera de
  viewport, concurrencia limitada en móvil — `INV-11`.
- Focus visible, teclado completo, skip link intactos — `INV-09`.
- Cursor nativo siempre; nada de cursor custom — `INV-17`.
- Look exclusivo de una ruta no sale de esa ruta — `INV-16`.

### RULE-011 — Secretos y entorno

Nunca commitear `.env`, `.env*.local`, claves Resend, tokens ni credenciales.
Variables conocidas: `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`,
`CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (ejemplo en `.env.example`). Staging
limpio antes de cada commit.

### RULE-012 — Dependencias y tooling

Cambios de dependencias en commits propios (no mezclados con features),
lockfile (`package-lock.json`) siempre incluido. Justifica en el mensaje qué
añade y por qué. Los cambios de config de calidad (eslint, playwright, CI)
también pasan por `ISSUES.md` y sus puertas (`RULE-005`).

### RULE-013 — Deploy solo con orden explícita

`npm run deploy:preview` / `deploy:prod` (Vercel CLI) únicamente cuando el
usuario lo pida. Push a `main` cuenta como deploy potencial (Vercel está
conectado al repo).

### RULE-014 — Alcance acotado

Haz exactamente lo pedido (`INV-02`): sin refactors colaterales, sin docs no
pedidas, sin features extra. Si detectas algo fuera de alcance, propón una
nueva `TASK-XXXX` en el backlog en vez de hacerlo sobre la marcha.

---

## 3. Stack y estructura

Convenciones detalladas en [ARCHITECTURE.md](./ARCHITECTURE.md). Resumen:

```
src/app/           # rutas App Router + SEO
src/components/    # UI por dominio (home, servicios, proyectos, …)
src/data/          # contenido estático tipado (proyectos, servicios, nav)
src/hooks/ src/lib/ src/styles/ src/types/
e2e/               # specs Playwright (build de producción)
public/assets/     # assets servidos (nunca secretos)
```

`viewer/` y `recursos/` están gitignored — no trabajar ahí salvo petición
explícita.

---

## 4. Comandos

| Comando                           | Uso                                       |
| --------------------------------- | ----------------------------------------- |
| `npm run dev`                     | Desarrollo (puerto 3000)                  |
| `npm run lint`                    | ESLint                                    |
| `npm run typecheck`               | TypeScript strict                         |
| `npm run test`                    | Unit tests (Vitest)                       |
| `npm run test:watch`              | Vitest watch                              |
| `npm run test:e2e`                | E2E Playwright (compila y sirve el build) |
| `npm run format` / `format:check` | Prettier write / check                    |
| `npm run build`                   | Build de producción                       |

Hooks locales (husky): pre-commit = lint-staged con `--max-arg-length`
(ESLint+Prettier sobre staged, troceado para el límite de Windows); pre-push =
typecheck + suite Vitest completa. CI (GitHub Actions,
`.github/workflows/ci.yml`) en PRs y pushes a `main`: job _quality_
(format:check → lint → typecheck → unit) + job _e2e_ (build → Playwright) +
job _lighthouse_ no bloqueante como baseline CWV. Dependabot actualiza npm y
actions semanalmente. Regresión visual: opt-in con `PLAYWRIGHT_VISUAL=1`.

---

## 5. Git y commits (obligatorio)

Flujo: skill **`.grok/skills/commit/SKILL.md`** + hook PreToolUse
(`.grok/hooks/scripts/pre-commit-gate.mjs`), complementado por husky local.

Cuando termines un pedido del usuario, **commit obligatorio** siguiendo
`RULE-004` (rama propia, push frecuente). Antes:

1. `git status` / `git diff` / `git log` — alcance.
2. Obedecer todas las órdenes de `.grok/rules/invariantes.md`.
3. Puertas de `RULE-005` según alcance.
4. Staging limpio (sin secretos, `node_modules`, `.next`, basura temporal).
5. Conventional Commits + referencia a la tarea: `feat(hero): … (TASK-0003)`.
6. Declarar obediencia por invariante en el mensaje (`INV-01: OK` …).
7. Prohibido `--no-verify` / `-n`.

Ejemplo:

```text
feat(contact): validate payload server-side with tests (TASK-0003)

Obedecidas:
INV-01: OK
INV-02: OK
…
INV-17: OK
```

El gate exige la declaración completa de invariantes; escribir `Inv-OK` suelto
no basta.

---

## 6. Alcance del agente

- Cambios acotados al pedido (`RULE-014`); propuestas fuera de alcance van al
  backlog de `ISSUES.md`.
- No borrar assets de `public/` sin confirmación.
- Deploy solo con instrucción explícita (`RULE-013`).
- Verificar reglas/hooks: `grok inspect`. Si `Project trusted: no`, confiar con
  `/hooks-trust`.
