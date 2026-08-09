# Git safety (siempre)

- **Siempre commit** al cerrar trabajo pedido por el usuario (salvo que prohíba
  el commit en ese turno, o que no se puedan asegurar las invariantes).
- No hagas **push** salvo que el usuario lo pida.
- Preferir rama de feature; no commit a `main` / `master` salvo orden explícita.
- No force-push a `main` / `master`.
- No commitees `.env`, secretos, ni credenciales.
- Conventional Commits; preferir commits atómicos.
- Para el flujo completo de commit, sigue la skill `commit` (`.grok/skills/commit/SKILL.md`).
