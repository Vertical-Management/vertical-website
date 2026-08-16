# Invariantes de somvertical.ad

## Qué son (léelo bien)

Las invariantes son **órdenes permanentes**. No son scripts, no son checklist de
comandos npm, no son “pasos a ejecutar al final”.

- **Debes obedecerlas** al diseñar, al escribir código y al proponer un commit.
- Si un cambio las viola, **el cambio es incorrecto** aunque lint pase.
- Correr `npm run lint` / `build` **no sustituye** obedecer una orden: como mucho
  aporta evidencia de una parte (p. ej. que el proyecto compila).
- Si al trabajar identificas una necesidad estable del producto que **aún no** está
  cubierta aquí, **añade una nueva orden** `**INV-NN**` a este archivo (con el mismo
  tono: orden a obedecer, no comando a ejecutar) y cúmplela en el cambio.

El gate de commit (`.grok/hooks/scripts/pre-commit-gate.mjs`) solo **recuerda y
exige que declares haber obedecido** cada orden. No “ejecuta” las invariantes.

---

## Órdenes (debes cumplir todas)

**INV-01** — No introduzcas regresiones  
Debes analizar el cambio de forma crítica. El código no debe romper otras
páginas, componentes compartidos ni flujos existentes. Si hay efecto colateral,
corrígelo o no lo entregues.

**INV-02** — Haz exactamente lo pedido  
Debes implementar lo que el usuario definió: ni más (refactors/docs/features no
pedidos) ni menos (requisitos a medias).

**INV-03** — El sitio debe poder construirse y ser válido  
El resultado debe compilar y servir sin errores de TypeScript/build y con
HTML/CSS/JS coherente. Un estado que no construye **desobedece** esta orden.
(Herramientas como lint/typecheck/build sirven para *comprobar* obediencia; no
son la orden en sí.)

**INV-04** — Debe verse y usarse bien en mobile y desktop  
Layout, tipografía, espaciados e interacción deben ser correctos en resoluciones
pequeñas y grandes. No entregues UI que solo “funciona en tu viewport”.

**INV-05** — Debe cargar y responder con rendimiento razonable  
Recursos optimizados, sin bloquear el render de más, sin peso absurdo de assets
para el valor que aportan. No des por buena una página lenta “porque se ve bien”.

**INV-06** — Respeta umbrales de Core Web Vitals  
Debes mantener (o no empeorar de forma injustificada)  
LCP ≤ 2.5 s · INP ≤ 200 ms · CLS ≤ 0.1  
(en p75 o con Lighthouse como proxy estricto en la ruta afectada).

**INV-07** — El motion debe ser fluido  
Animaciones, scroll-triggered y microinteracciones: objetivo estable **≥ 55–60 FPS**,
presupuesto de frame **~16.7 ms**, sin tareas largas injustificadas en el main
thread **> 50 ms**. Prioriza `transform` y `opacity` (GPU). No aceptes jank
conocido en scroll lento o móvil.

**INV-08** — Los assets deben estar optimizados  
Imágenes en formato moderno y tamaño de visualización adecuado, lazy donde
corresponda; fuentes solo con pesos usados y `font-display: swap`; JS crítico
contenido; vídeo/3D/motion no deben bloquear el primer render; sin basura ni
duplicados innecesarios.

**INV-09** — Debe ser usable y accesible  
Contraste suficiente, navegación completa por teclado, focus visible, textos
alternativos donde haga falta. Objetivo Lighthouse Accessibility ≥ 90 en páginas
tocadas. No rompas a11y “por estética”.

**INV-10** — Mantén el craft visual del producto  
Tipografía brutal, bloques de color, hovers, transiciones y estética arcade
deben seguir coherentes en las páginas afectadas. Las microinteracciones deben
sentirse intencionadas y al mismo nivel de craft que el resto del sitio.

**INV-11** — Respeta el presupuesto de media (vídeo / loops)  
En paredes de trabajo, heroes y galerías: no lances decodificadores de vídeo sin
límite. Usa el presupuesto existente (`useMediaBudget` o equivalente): menos
concurrencia en móvil, posters primero, pause fuera de viewport, y `staticOnly`
cuando proceda. Un hero “bonito” que funde el dispositivo **desobedece** esta orden.

**INV-12** — Respeta `prefers-reduced-motion`  
Toda animación, scrub de scroll, autoplay de media y microinteracción debe
degradar o desactivarse cuando el usuario pide menos movimiento. No ignores el
sistema ni el hook del proyecto.

**INV-13** — Textos de producto vía i18n  
Copys de UI y marketing van por `src/lib/i18n/` (claves por locale). No hardcodees
en componentes strings de producto ya cubiertos por diccionario, salvo nombres
propios o tokens técnicos inevitables.

**INV-14** — Terceros y privacidad no pueden romper la experiencia  
Llamadas a APIs externas (geo, analytics, email, etc.) deben fallar en silencio
con fallback usable, timeouts razonables y sin bloquear el render crítico. No
dejes secretos en el cliente. El comportamiento debe ser coherente con las
páginas legales del sitio cuando trate datos o ubicación aproximada.

**INV-15** — Economía de narrativa en páginas de marketing  
Cada bloque de la home (y landings similares) debe aportar claridad o conversión.
No rellenes con marquee, CTAs duplicados, tags o decoración que compitan con el
mensaje principal, maten legibilidad en móvil o añadan peso sin valor.

**INV-16** — Un look exclusivo de una ruta no puede filtrarse  
Si una página tiene un sistema visual propio (tokens, glass, wrappers), debe
quedar acotado a esa ruta. No alteres el chrome compartido (header, footer,
menú) ni reutilices esas clases o estilos en otras páginas.

**INV-17** — El cursor nativo del sistema es el cursor del sitio  
No sustituyas el puntero del sistema por un cursor custom (anillo, blend,
`cursor: none` global). El hover de botones y links usa el cursor por defecto
del navegador en todas las páginas.

---

## Declaración al commitear (no es “ejecutar” la orden)

Al hacer commit, el mensaje debe declarar **obediencia** a cada orden, con el id
tal como aparece arriba (`**INV-NN**`). Eso es un **juramento de cumplimiento**,
no un comando.

```text
tipo(scope): resumen

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
INV-11: OK
INV-12: OK
INV-13: OK
INV-14: OK
INV-15: OK
INV-16: OK
INV-17: OK
```

Formas aceptadas por el gate: `INV-01: OK` · `INV-01=OK` · `INV-01 OK` · `[x] INV-01`  
Tokens: `OK` | `yes` | `pass` | `checked` | `done` | `✓` | `✅`

- Solo marca `OK` si **obedeciste** esa orden en el cambio.
- Si no puedes asegurar obediencia, **no commitees**: corrige o dilo al usuario.
- Escribir `Inv-OK` suelto **no basta**.

Si se añaden nuevas órdenes con el formato `**INV-NN**` en este archivo, el gate
las exige en la declaración automáticamente.
