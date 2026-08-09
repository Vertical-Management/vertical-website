---
name: commit
description: >
  Flujo estricto de git commit para este repo (Conventional Commits, calidad,
  obediencia a invariantes como órdenes, sin secretos, sin commit a main).
  Usar cuando el usuario pida commit, /commit, "haz commit", "commitea",
  "crea un commit", o prepare un mensaje de commit.
---

# Commit (Vertical)

## Cuándo commitear

**Siempre** al cerrar un trabajo pedido por el usuario (no dejes el diff sin
commit). Excepción: el usuario prohíbe el commit, o no se pueden asegurar las
invariantes (entonces informa y no marques OK en falso).

## 0. Invariantes = órdenes (no comandos)

Lee **`.grok/rules/invariantes.md`**.

Esas entradas **INV-XX son órdenes que debes haber obedecido** en el trabajo que
vas a commitear. No son:

- scripts a lanzar “para cumplir el INV”,
- ni un ritual de checkboxes vacío,
- ni sinónimo de `npm run …`.

| Concepto | Qué es |
|----------|--------|
| **Invariante** | Orden de calidad/producto: cómo debe quedar el cambio |
| **Herramienta** (`lint`, `typecheck`, `build`, Lighthouse…) | Medio para *comprobar* si desobedeciste; no reemplaza la orden |
| **Declaración en el mensaje** | Afirmas que **obedeciste** cada orden (`INV-01: OK` …) |

Antes de commitear, recorre cada `**INV-XX**` del archivo y asegúrate de que el
diff **no la viola**. Si alguna no se puede asegurar, **no marques OK** y no
hagas commit: arregla o avisa al usuario.

El PreToolUse gate exige la declaración de **todas** las órdenes del archivo.
Solo `Inv-OK` no basta. `GROK_INV_OK` no sustituye la lista.

## 1. Contexto git

En paralelo:

- `git status`
- `git diff` y `git diff --staged`
- `git branch --show-current`
- `git log -8 --oneline`

Si la rama es `main` o `master`: **parar** salvo orden explícita del usuario
(`GROK_ALLOW_MAIN_COMMIT=1` solo con esa orden).

## 2. Alcance

- Solo archivos del cambio pedido.
- Nunca: `.env`, secretos, `node_modules/`, `.next/`, basura.
- Paths concretos al stage; no `git add .` a ciegas.

## 3. Comprobaciones mecánicas (aparte de las órdenes)

Sirven de **red de seguridad**, no “ejecutan” las invariantes:

```bash
npm run lint
npm run typecheck
```

Si el staging toca producto (`src/`, `public/`, configs, deps): también
`npm run build`. El hook puede repetir esto.

Si fallan: no commitees (además de desobedecer, en la práctica, INV-03).

## 4. Mensaje

Conventional Commits + **declaración de obediencia** (ids actuales del archivo):

```text
tipo(scope): resumen

Obedecidas:
INV-01: OK
INV-02: OK
… (todas las **INV-NN** actuales del archivo, incl. las que se hayan añadido)
```

Incluye **todas** las del markdown (hoy hasta INV-15 si existen). El mensaje
**debe** ir en `-m` o `-F`. El hook no valida el editor interactivo.

## 5. Prohibido

- Commit en `main`/`master` sin orden explícita
- `--no-verify` / `-n`
- Declarar `INV-XX: OK` sin haber obedecido esa orden
- Tratar las invariantes como “comandos a correr” y saltarse el criterio real
- Force-push a `main`/`master`
- Cambiar git `user.name` / `user.email`
- Commit si el hook deniega

## 6. Hooks

- Repo: `.grok/hooks/before-commit.json` → `pre-commit-gate.mjs`
- Global: `~/.grok/hooks/vertical-pre-commit.json`
- Fuente de las **órdenes**: `.grok/rules/invariantes.md`
