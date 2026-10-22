# Integración de Skills — Endless Pirates

Estas instrucciones de proyecto se aplican a ChatGPT Work y Codex. Claude Code
las incorpora desde `CLAUDE.md`. Las Skills originales no se editan ni duplican.

## Grill Me: ejecución directa

- Cuando el usuario solicite una entrevista con `Grill Me`, `/grill-me`,
  `$grill-me` o `grilling`, abre y lee `.agents/skills/grilling/SKILL.md`
  con las herramientas de lectura de archivos disponibles y ejecuta su
  procedimiento directamente en la conversación.
- La fuente del procedimiento es ese archivo, no la descripción del catálogo.
  Resuelve sus referencias relativas desde `.agents/skills/grilling/`.
- Esta integración sustituye únicamente el paso `Call the Skill tool with
  "grilling"` de los wrappers originales `.agents/skills/grill-me/SKILL.md`
  y `.claude/skills/grill-me/SKILL.md`. No llames ni esperes una herramienta
  llamada `Skill`, aunque el wrapper la mencione; no inventes una llamada ni
  solicites instalarla. La detección nativa de una Skill no es un requisito
  para leer y seguir el procedimiento.
- Conserva las rondas, el árbol de decisiones, las recomendaciones y las
  esperas de respuesta definidos en la Skill. No implementes las decisiones
  hasta que el usuario confirme el entendimiento compartido.
- Usa las herramientas reales del entorno para comprobar hechos. Si la Skill
  pide un subagente y el entorno no dispone de esa capacidad, investiga
  directamente; no simules herramientas ni bloquees la entrevista por ello.
- Una petición para configurar, revisar o probar esta integración no inicia
  una entrevista. Si falta el archivo fuente, informa de la ruta ausente;
  no sustituyas el procedimiento por uno inventado.
