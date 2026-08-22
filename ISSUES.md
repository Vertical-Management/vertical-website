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
| [TASK-0007](#task-0007) | Tests de componentes con Testing Library (jsdom)              | 🔲 todo |
| [TASK-0008](#task-0008) | A11y E2E con `@axe-core/playwright`                           | 🔲 todo |
| [TASK-0009](#task-0009) | Regresión visual con screenshots de Playwright                | 🔲 todo |
| [TASK-0010](#task-0010) | Presupuesto CWV automatizado (Lighthouse CI)                  | 🔲 todo |
| [TASK-0011](#task-0011) | Dependabot para actualización de dependencias                 | 🔲 todo |
| [TASK-0012](#task-0012) | Limpieza de artefactos temporales del repo                    | 🔲 todo |
| [TASK-0013](#task-0013) | Pase de formato repo-wide y `format:check` en CI              | 🔲 todo |

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

**Commits**: `test(unit): … (TASK-0003)`

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

**Commits**: `test(e2e): … (TASK-0004)`

---

## TASK-0005 — Tooling de calidad: husky + lint-staged + CI (GitHub Actions)

- **Estado**: ✅ done · **Cierre**: 2026-08-22
- **Prioridad**: media · **Área**: tooling / CI

**Criterios de aceptación**

- [x] `husky` + `lint-staged`: pre-commit con ESLint --fix + Prettier sobre
      staged.
- [x] Pre-push: `typecheck` + `npm run test`.
- [x] `npm run format:check` para verificar formato sin escribir.
- [x] Workflow `.github/workflows/ci.yml`: lint → typecheck → unit → build →
      E2E en PRs y pushes a `main`.
- [x] `.gitignore` con `test-results/`, `playwright-report/`, `coverage/`.

**Commits**: `chore(quality): … (TASK-0005)`

---

## TASK-0006 — Workflow en `AGENTS.md` con reglas numeradas `RULE-001…N`

- **Estado**: ✅ done · **Cierre**: 2026-08-22
- **Prioridad**: alta · **Área**: docs / workflow

Reescribir `AGENTS.md` para que todo el proceso esté definido con reglas
estables e identificables (`RULE-001`, `RULE-002`…), manteniendo la integración
con Grok (hooks/skills) y las invariantes `INV-NN` como fuente de verdad de
producto.

**Criterios de aceptación**

- [x] Reglas numeradas cubren: jerarquía de docs, ciclo de vida de tareas
      (`ISSUES.md`), git/ramas/commits/push, puertas de calidad, política de tests,
      sincronización de `ARCHITECTURE.md`, secretos, dependencias y deploy.
- [x] Referencias cruzadas con `ISSUES.md` y `ARCHITECTURE.md`.
- [x] Sin romper el gate de commit de Grok (declaración `INV-NN: OK` intacta).

**Commits**: `docs(agents): … (TASK-0006)`

---

## Backlog

### TASK-0007 — Tests de componentes con Testing Library (jsdom)

- **Estado**: 🔲 todo · **Prioridad**: media · **Área**: testing

Añadir `jsdom` + `@testing-library/react` y tests de interacción para UI
crítica: `MobileMenu` (apertura, Escape, focus), `ContactForm` (errores
cliente), `LanguageSwitcher` (cambio de locale + persistencia).

**Criterios de aceptación**

- [ ] Vitest con proyectos `node` y `jsdom` separados.
- [ ] ≥3 componentes con tests de interacción.

### TASK-0008 — A11y E2E con `@axe-core/playwright`

- **Estado**: 🔲 todo · **Prioridad**: media · **Área**: testing / a11y

Escanear rutas principales con axe (serio y mobile) sin violaciones críticas;
integrar en CI.

### TASK-0009 — Regresión visual con screenshots de Playwright

- **Estado**: 🔲 todo · **Prioridad**: baja · **Área**: testing

Snapshots de secciones clave (hero, servicios, proyectos, contacto) en desktop
y mobile; umbral de diff; decidir política de actualización de baselines.

### TASK-0010 — Presupuesto CWV automatizado (Lighthouse CI)

- **Estado**: 🔲 todo · **Prioridad**: baja · **Área**: perf

Automatizar los umbrales de `INV-06` (LCP ≤ 2.5 s · INP ≤ 200 ms · CLS ≤ 0.1)
en las rutas principales.

### TASK-0011 — Dependabot para actualización de dependencias

- **Estado**: 🔲 todo · **Prioridad**: baja · **Área**: mantenimiento

`.github/dependabot.yml` (npm + actions), agrupando patches para reducir ruido.

### TASK-0012 — Limpieza de artefactos temporales del repo

- **Estado**: 🔲 todo · **Prioridad**: baja · **Área**: higiene

Perfiles `.tmp-chrome-*`, scripts `tmp-*.mjs`, `tmp-shots/`, `base.md`,
`images/`, `pilot-one.md`: decidir qué se gitignora, qué se archiva en
`recursos/` y qué se borra. **No borrar sin confirmación del usuario.**

### TASK-0013 — Pase de formato repo-wide y activar `format:check` en CI

- **Estado**: 🔲 todo · **Prioridad**: media · **Área**: tooling

El repo no está Prettier-clean (~100 ficheros heredados), así que CI aún no
ejecuta `format:check`. Plan: PR dedicado solo con `npm run format` (diff
cosmético, sin mezclar con features), verificar build + suites, y descomentar
el paso _Format check_ en `.github/workflows/ci.yml`.

**Criterios de aceptación**

- [ ] Diff único de formato, sin cambios semánticos.
- [ ] Paso _Format check_ activo en el job `quality` de CI.
- [ ] lint-staged mantiene los archivos nuevos formateados a partir de entonces.
