# 🏴‍☠️ Endless Pirates

**Endless Pirates** es un videojuego fanmade **no oficial, gratuito y no comercial**, inspirado en el universo de *One Piece* y en la estructura de supervivencia roguelite de *PokéSurvivor*. El juego se desarrolla en **2D top-down y pixel art**, con personajes, técnicas propias, oleadas y jefes temáticos.

> **Estado:** prototipo v0.2 jugable y **nueva visión de diseño documentada**; los sistemas descritos para la versión futura **no están todos implementados**. El repositorio conserva el nombre técnico histórico `FanGameOne`.

## 🎮 Visión del juego

- **Partida continua de 30 minutos:** diez escenarios de tres minutos cada uno, desde Arabasta hasta Elbaf, en el orden de diseño acordado.
- **Jefes de isla:** al vencerlos recibes recompensas; si el reloj de la isla termina, escapan y no dejan premio. El reloj general no se adelanta.
- **Sistema de sets:** el primer jefe efectivamente vencido desbloquea un set de hasta cuatro técnicas automáticas; el segundo habilita otro. **Solo el set seleccionado actúa**; Q/E cambia la selección. Los minijefes no desbloquean sets.
- **Identidad de personaje:** técnicas exclusivas basadas en lo que cada versión hace en One Piece; hasta cuatro pasivas y apoyos genéricos neutrales.
- **Taberna:** personajes y transformaciones como unidades reclutables independientes, con rarezas y apertura de 1 o 5; pendientes probabilidades y balance.
- **Exploración:** cofres poco frecuentes con experiencia y posible objeto especial, vegetación rompible que puede dejar manzanas y cajas/barriles con posibilidad de carne.
- **Mar del Caos:** comienza exactamente en **30:00**; sobrevives a oleadas cada vez más peligrosas y a jefes ya vencidos reforzados. La clasificación por tiempo requiere backend y validación para ser real.

Estas son **reglas de diseño aprobadas**, no una lista de funcionalidades terminadas. El texto completo y sus excepciones se encuentran en [docs/GAME_DESIGN.md](docs/GAME_DESIGN.md).

## 🧭 Escenarios planeados

| Minutos | Escenario | Minutos | Escenario |
|---|---|---|---|
| 00–03 | Arabasta | 15–18 | Dressrosa |
| 03–06 | Skypiea | 18–21 | Whole Cake |
| 06–09 | Water 7 | 21–24 | Wano |
| 09–12 | Impel Down | 24–27 | God Valley |
| 12–15 | Punk Hazard | 27–30 | Elbaf |

El **prototipo actual** conserva sus cinco capítulos iniciales de East Blue: **Shells Town (Morgan), Orange Town (Buggy), Villa Syrup (Kuro), Baratie (Don Krieg) y Arlong Park (Arlong)**. No se han eliminado.

## 👒 Personajes del prototipo

| Personaje | Estilo |
|---|---|
| Luffy | Técnicas elásticas |
| Zoro | Santoryu y cortes |
| Nami | Bastón y técnicas climáticas |
| Usopp | Tirachinas y proyectiles |
| Sanji | Patadas |

La visión nueva contempla más personajes y versiones, cada uno con su repertorio compatible de técnicas y sprites del estilo aprobado. El catálogo exacto se definirá con las láminas originales.

## 🎨 Interfaces aprobadas como referencia

**Cinco pantallas:** menú principal, Taberna/reclutamiento, subida de nivel/HUD, Tripulación, Astillero/Misiones/Logros. Estética pirata pixel art con madera, pergamino, azul marino, dorado, crema y rojo; botones alineados, lectura cómoda, animaciones suaves y adaptación móvil. **Son referencias visuales todavía no implementadas** y las imágenes deben incorporarse como archivos al repositorio para trabajar con fidelidad.

Menú previsto: **Zarpar · Tripulación · Astillero · Misiones y Logros · Clasificación · Bestiario · Noticias · Taberna**.

## 🛠️ Tecnología y estado actual

- **HTML5, CSS3, JavaScript vanilla y Canvas 2D**, sin dependencias de juego obligatorias.
- Entrada del prototipo editable: `dist/index.html`.
- GitHub Pages publica `dist/` desde `main`: https://sebastianmonsalvedev.github.io/FanGameOne/
- Guardado local y mecánicas básicas del prototipo; revisar [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) para el estado verificado, pendientes y arquitectura.
- El trabajo de desarrollo se organiza en `work`, con `main` estable y `claude` aislada. No integrar ramas ni publicar cambios sin autorización.

## 📚 Documentos del proyecto

| Archivo | Para qué sirve |
|---|---|
| [docs/GAME_DESIGN.md](docs/GAME_DESIGN.md) | **Reglas oficiales aprobadas** y decisiones pendientes |
| [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) | Estado técnico **real**, código y pruebas verificadas |
| [WORK.md](WORK.md) | Instrucciones de desarrollo para Work |
| [CLAUDE.md](CLAUDE.md) | Instrucciones del agente Claude |
| [docs/ART-DIRECTION.md](docs/ART-DIRECTION.md) | Dirección artística y referencias del prototipo |

## 🚀 Siguiente etapa autorizable

**Implementar las interfaces**, empezando por el menú principal, **solo cuando el propietario envíe el prompt y las imágenes**. Luego desarrollar nuevas mecánicas por etapas con pruebas. La aprobación de estas reglas **no autoriza programación, merges ni despliegues**.

## ⚖️ Créditos y derechos

*One Piece* y sus personajes pertenecen a sus respectivos titulares. *PokéSurvivor* sirve como referencia conceptual; **no** se autoriza copiar su código, recursos o música sin verificar licencia y atribuciones aplicables. Este proyecto no está afiliado ni respaldado por los titulares.
