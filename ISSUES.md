# ISSUES.md — Tablero de tareas

Registro operativo de todo el trabajo del proyecto. **Regla madre** (`RULE-002`
en [AGENTS.md](./AGENTS.md)): todo cambio de producto o infraestructura se
describe aquí **antes o durante** su ejecución, con un ID estable.

## Convenciones

- **ID**: `TASK-XXXX`, secuencial de 4 dígitos, **nunca se recicla**.
- **Estados**: `todo` → `in-progress` → `done` · `wontfix` (con motivo).
- Una tarea = un propósito = idealmente un commit (o serie atómica). El mensaje
  de commit referencia el ID: `feat(x): … (TASK-0003)`.
- Al cerrar: marcar `done`, fecha de cierre y hash del commit
  (`RULE-003`). La actualización del propio `ISSUES.md` va en el mismo commit
  o en el inmediatamente siguiente.
- Las tareas nuevas se añaden al final de la tabla índice y con su ficha
  completa; no se reordenan las existentes.

## Índice

| ID                      | Título                                                        | Estado  |
| ----------------------- | ------------------------------------------------------------- | ------- |
| [TASK-0001](#task-0001) | Documentar la arquitectura en `ARCHITECTURE.md`               | ✅ done |
| [TASK-0002](#task-0002) | Crear tablero de tareas `ISSUES.md` con IDs `TASK-XXXX`       | ✅ done |
| [TASK-0003](#task-0003) | Suite de tests unitarios (Vitest) para lógica en `src/lib`    | ✅ done |
| [TASK-0004](#task-0004) | Tests E2E con Playwright contra build de producción           | ✅ done |
| [TASK-0005](#task-0005) | Tooling de calidad: husky + lint-staged + CI (GitHub Actions) | ✅ done |
| [TASK-0006](#task-0006) | Workflow en `AGENTS.md` con reglas numeradas `RULE-001…N`     | ✅ done |
| [TASK-0007](#task-0007) | Tests de componentes con Testing Library (jsdom)              | ✅ done |
| [TASK-0008](#task-0008) | A11y E2E con `@axe-core/playwright`                           | ✅ done |
| [TASK-0009](#task-0009) | Regresión visual con screenshots de Playwright                | ✅ done |
| [TASK-0010](#task-0010) | Presupuesto CWV automatizado (Lighthouse CI)                  | ✅ done |
| [TASK-0011](#task-0011) | Dependabot para actualización de dependencias                 | ✅ done |
| [TASK-0012](#task-0012) | Limpieza de artefactos temporales del repo                    | ✅ done |
| [TASK-0013](#task-0013) | Pase de formato repo-wide y activar `format:check` en CI      | ✅ done |
| [TASK-0014](#task-0014) | Corregir deuda de contraste (axe `color-contrast`)            | 🔲 todo |
| [TASK-0015](#task-0015) | Apretar umbrales Lighthouse (quitar continue-on-error)        | 🔲 todo |

---

## TASK-0001 — Documentar la arquitectura en `ARCHITECTURE.md`

- **Estado**: ✅ done · **Cierre**: 2026-08-22 · **Commit**: `437775f`
- **Prioridad**: alta · **Área**: docs

Describir el proyecto completo: stack, rendering strategy (server components +
islas cliente), providers, i18n, design system, flujo de contacto, SEO/dominio,
performance/media/a11y, arquitectura de tests, deploy y decisiones clave
(ADR-lite).

**Criterios de aceptación**

- [x] Cubre todas las capas reales del repo (verificado contra el código).
- [x] Incluye mapa de directorios y diagrama de flujo.
- [x] Documenta el flujo `POST /api/contact` paso a paso.
- [x] Regla de mantenimiento: actualizar en el mismo PR ante cambios
      estructurales (enlazada desde `AGENTS.md`).

**Commits**: `docs(architecture): … (TASK-0001)`

---

## TASK-0002 — Crear tablero de tareas `ISSUES.md` con IDs `TASK-XXXX`

- **Estado**: ✅ done · **Cierre**: 2026-08-22 · **Commit**: `437775f`
- **Prioridad**: alta · **Área**: docs / workflow

Establecer el registro único de trabajo: IDs `TASK-XXXX` secuenciales no
reciclables, estados, criterios de aceptación, commits asociados y backlog.

**Criterios de aceptación**

- [x] Convención documentada en la cabecera del propio archivo.
- [x] Todas las tareas de este milestone (0001–0006) fichadas.
- [x] Backlog futuro (0007–0012) con alcance mínimo definido.
- [x] Workflow referenciado desde `AGENTS.md` (`RULE-002`, `RULE-003`).

**Commits**: `docs(issues): … (TASK-0002)` + cierres incrementales por tarea.

---

## TASK-0003 — Suite de tests unitarios (Vitest) para lógica en `src/lib`

- **Estado**: ✅ done · **Cierre**: 2026-08-22 · **Commit**: `665a47d`
- **Prioridad**: alta · **Área**: testing

Añadir Vitest (entorno `node`, rápido y estable en Windows) y cubrir la lógica
pura existente.

**Criterios de aceptación**

- [x] `npm run test` / `test:watch` en `package.json`.
- [x] Tests de `lib/contact.ts`: validación (campos, límites, honeypot,
      sanitización de headers) y `formatContactEmail` (asunto, escape HTML).
- [x] Tests de `lib/routes.ts` (labels, `isInternalHref`, `normalizePath`).
- [x] Tests i18n: paridad de claves entre los 4 locales, `getDictionary`
      fallback, `fill()`, `localize*()` sobre `src/data`.
- [x] Tests de `lib/utils.ts` (`cn`) y `lib/media.ts` (poster convention).
- [x] Suite en verde y integrada en pre-push y CI.

**Commits**: `test(unit): … (TASK-0003)` (+ formateo cosmico posterior)

---

## TASK-0004 — Tests E2E con Playwright contra build de producción

- **Estado**: ✅ done · **Cierre**: 2026-08-22 · **Commit**: `6a29c85`
- **Prioridad**: alta · **Área**: testing

Playwright con `webServer` que compila y sirve el build de producción (puerto 3000) y specs de los flujos críticos.

**Criterios de aceptación**

- [x] `playwright.config.ts` + script `npm run test:e2e`.
- [x] Spec home: render, landmarks, título.
- [x] Spec navegación: rutas principales desde header.
- [x] Spec contacto: 400 de validación real contra la API + happy path con
      red mockeada.
- [x] Spec SEO files: `sitemap.xml`, `robots.txt`, `manifest.webmanifest`.
- [x] Spec 404 + smoke `prefers-reduced-motion`.
- [x] Suite en verde en local (Chromium).

**Commits**: `test(e2e): … (TASK-0004)` ×2 (suite + formateo/emulateMedia)

---

## TASK-0005 — Tooling de calidad: husky + lint-staged + CI (GitHub Actions)

- **Estado**: ✅ done · **Cierre**: 2026-08-22 · **Commit**: `cd66281`
- **Prioridad**: media · **Área**: tooling / CI

**Criterios de aceptación**

- [x] `husky` + `lint-staged`: pre-commit con ESLint --fix + Prettier sobre
      staged.
- [x] Pre-push: `typecheck` + `npm run test`.
- [x] `npm run format:check` para verificar formato sin escribir.
- [x] Workflow `.github/workflows/ci.yml`: lint → typecheck → unit → build →
      E2E en PRs y pushes a `main`.
- [x] `.gitignore` con `test-results/`, `playwright-report/`, `coverage/`.

Nota Windows: el hook usa `lint-staged --max-arg-length 2000` para no superar
el límite de longitud de comando al commitear lotes grandes.

**Commits**: `chore(quality): … (TASK-0005)`

---

## TASK-0006 — Workflow en `AGENTS.md` con reglas numeradas `RULE-001…N`

- **Estado**: ✅ done · **Cierre**: 2026-08-22 · **Commit**: `0af084e`
- **Prioridad**: alta · **Área**: docs / workflow

Reescribir `AGENTS.md` para que todo el proceso esté definido con reglas
estables e identificables (`RULE-001`, `RULE-002`…), manteniendo la integración
con Grok (hooks/skills) y las invariantes `INV-NN` como fuente de verdad de
producto.

**Criterios de aceptación**

- [x] Reglas numeradas cubren: jerarquía de docs, ciclo de vida de tareas
      (`ISSUES.md`), git/ramas/commits/push, puertas de calidad, política de
      tests, sincronización de `ARCHITECTURE.md`, secretos, dependencias y
      deploy.
- [x] Referencias cruzadas con `ISSUES.md` y `ARCHITECTURE.md`.
- [x] Sin romper el gate de commit de Grok (declaración `INV-NN: OK` intacta).

**Commits**: `docs(agents): … (TASK-0006)`

---

## TASK-0007 — Tests de componentes con Testing Library (jsdom)

- **Estado**: ✅ done · **Cierre**: 2026-08-22 · **Commit**: `8824085`
- **Prioridad**: media · **Área**: testing

Tests de interacción para UI crítica sobre jsdom.

**Criterios de aceptación**

- [x] Vitest con proyectos `unit` (node) y `components` (jsdom) separados;
      `@vitejs/plugin-react` para transformar JSX y stub de `matchMedia`
      para framer-motion (`vitest.setup.ts`).
- [x] `ContactForm`: campos accesibles, honeypot presente, validación cliente
      sin llamada a API, email inválido, happy path con payload correcto y
      confirmación visible.
- [x] `LanguageSwitcher`: default es, listbox con los otros 3 locales, pick
      persiste en localStorage + sincroniza `<html lang>`, Escape cierra,
      hidratación desde storage.
- [x] `MobileMenu`: diálogo con `aria-modal`/label, links del nav, Escape
      cierra y libera scroll del body, click en link navega y cierra.
- [x] Suite completa verde: 53 tests (41 unit + 12 componentes).

**Commits**: `test(components): … (TASK-0007)`

---

## TASK-0008 — A11y E2E con `@axe-core/playwright`

- **Estado**: ✅ done · **Cierre**: 2026-08-22 · **Commit**: ver git log
  `(TASK-0008)`
- **Prioridad**: media · **Área**: testing / a11y

**Criterios de aceptación**

- [x] Escaneo axe (wcag2a/2aa/21aa) de `/`, `/nosotros`, `/servicios`,
      `/proyectos`, `/contacto`.
- [x] El spec falla con violaciones `critical` — hoy: **cero** en las 5 rutas.
- [x] Violaciones `serious` se listan en el output para triaje sin bloquear:
      solo `color-contrast` (1–8 nodos por ruta) → TASK-0014.

**Commits**: `test(a11y): … (TASK-0008)`

---

## TASK-0009 — Regresión visual con screenshots de Playwright

- **Estado**: ✅ done · **Cierre**: 2026-08-22 · **Commit**: ver git log
  `(TASK-0009)`
- **Prioridad**: baja · **Área**: testing

**Criterios de aceptación**

- [x] Baselines desktop de hero home, servicios y contacto.
- [x] Opt-in vía `PLAYWRIGHT_VISUAL=1`: los baselines son dependientes de
      plataforma (win32 generados; CI linux no ejecuta el spec sin la env).
- [x] Estabilidad: reduced-motion emulado, `animations: "disabled"` y vídeos
      congelados a poster.
- [x] Determinismo verificado: dos runs consecutivos en verde.

**Commits**: `test(visual): … (TASK-0009)`

---

## TASK-0010 — Presupuesto CWV automatizado (Lighthouse CI)

- **Estado**: ✅ done · **Cierre**: 2026-08-22 · **Commit**: ver git log
  `(TASK-0010)`
- **Prioridad**: baja · **Área**: perf

**Criterios de aceptación**

- [x] `lighthouserc.json`: 3 rutas (home, servicios, contacto), preset
      desktop, reporte a filesystem (sin storage público).
- [x] Job `lighthouse` en CI con aserciones base (perf ≥ 0.5, a11y/bp/seo
      ≥ 0.9) marcado `continue-on-error` como baseline no bloqueante.
- [x] Apriete de umbrales y bloqueo diferidos a TASK-0015 (tras estabilizar
      scores; objetivo final `INV-06`).

**Commits**: `chore(perf): … (TASK-0010)`

---

## TASK-0011 — Dependabot para actualización de dependencias

- **Estado**: ✅ done · **Cierre**: 2026-08-22 · **Commit**: `848aeb3`
- **Prioridad**: baja · **Área**: mantenimiento

**Criterios de aceptación**

- [x] `.github/dependabot.yml`: npm + github-actions, semanal.
- [x] Patches/minors agrupados por ecosistema; majors en PRs separados.
- [x] Cada PR de Dependabot pasa automáticamente por CI.

**Commits**: `chore(deps): … (TASK-0011)`

---

## TASK-0012 — Limpieza de artefactos temporales del repo

- **Estado**: ✅ done · **Cierre**: 2026-08-22 · **Commit**: ver git log
  `(TASK-0012)` / `(TASK-0013)`
- **Prioridad**: baja · **Área**: higiene

**Criterios de aceptación**

- [x] `.astro/` (artefactos de build de la era Astro, trackeados)
      des-trackeado con `git rm --cached` — los ficheros siguen en disco,
      nada borrado.
- [x] `.gitignore` cubre `.astro/` y los temporales locales (`.tmp-*`,
      `tmp-*`, `base.md`, `pilot-one.md`, `images`, `.studioPets`) vía
      `.prettierignore` + `.gitignore`.
- [x] Sin borrado físico: requiere confirmación explícita del usuario
      (pendiente si algún día se quiere purgar).

**Commits**: `chore(hygiene): untrack legacy Astro build artifacts`

---

## TASK-0013 — Pase de formato repo-wide y activar `format:check` en CI

- **Estado**: ✅ done · **Cierre**: 2026-08-22 · **Commit**: `4ca4cc4`
- **Prioridad**: media · **Área**: tooling

**Criterios de aceptación**

- [x] Diff único de formato (~105 ficheros), sin cambios semánticos; gates
      verificados después (lint/typecheck/unit/build en verde).
- [x] Paso _Format check_ activo en el job `quality` de CI.
- [x] lint-staged mantiene los archivos nuevos formateados a partir de
      entonces (verificado en cada commit posterior).
- [x] `.prettierignore` excluye assets (`public/`), carpetas externas
      (`viewer/`, `recursos/`, `.grok/`) y basura local.

**Commits**: `style: repo-wide prettier pass, enable format:check in CI`

---

## Backlog

### TASK-0014 — Corregir deuda de contraste (axe `color-contrast`)

- **Estado**: 🔲 todo · **Prioridad**: media · **Área**: design / a11y

El escaneo axe de TASK-0008 detectó violaciones `serious` de
`color-contrast`: `/nosotros` (4 nodos), `/servicios` (8), `/proyectos` (1),
`/contacto` (5). Ajustar tokens/textos afectados manteniendo el craft
(`INV-10`), sin bajar el gate `critical`.

**Criterios de aceptación**

- [ ] 0 violaciones serious en las rutas tocadas o excepciones justificadas
      aquí.
- [ ] Revisión visual de que el look no se degrada.

### TASK-0015 — Apretar umbrales Lighthouse (quitar `continue-on-error`)

- **Estado**: 🔲 todo · **Prioridad**: baja · **Área**: perf

Cuando el job `lighthouse` lleve varias runs estables en `main`: fijar
umbrales según scores observados y caminar hacia los objetivos de `INV-06`
(LCP ≤ 2.5 s · INP ≤ 200 ms · CLS ≤ 0.1); quitar `continue-on-error` del job
para que bloquee PRs.

**Criterios de aceptación**

- [ ] Umbrales definidos con datos (no a ojo) y documentados en la ficha.
- [ ] Job bloqueante en `ci.yml`.
