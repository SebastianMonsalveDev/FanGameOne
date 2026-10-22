# Créditos

Versión 0.2: portada, lámina de colección, atlas de 18 personajes y hoja de carrera proporcionados por el usuario a partir de su prototipo. Se conservan en `assets/reference/`. Luffy y Zoro emplean cuatro fotogramas de carrera de esa hoja. Las ilustraciones de Nami, Usopp y Sanji clásicos y los enemigos se generaron mediante ImageGen tomando ese estilo como referencia, en `assets/classic-chibi.png` y `assets/enemies-chibi.png`. Los prompts se incluyen en `ART-DIRECTION-v0.2.md` del código fuente.

One Piece y sus personajes: Eiichiro Oda y sus respectivos titulares. Juego fan gratuito y no oficial. Los eventos de East Blue se resumen con texto propio. Las batallas son una adaptación de supervivencia.

Referencia aportada por el usuario: PokéSurvivor, de Jonathan Piera Torregrosa (JPTER78), https://github.com/JPTER78/pokesurvivor.

Required Notice: Copyright 2026 JPTER78 (https://github.com/JPTER78/pokesurvivor).

Se estudiaron `js/core/input.js`, `js/entities/player.js`, `js/entities/enemy.js`, `js/systems/combat.js`, `js/systems/spawner.js` y `js/systems/levelup.js`, además del README y documento de diseño. El nuevo juego sigue la separación entre datos, entrada, simulación, combate, oleadas, selección de mejoras y presentación. La implementación se escribió específicamente para esta adaptación; no reutiliza los sprites, la música, las cuentas, la configuración Firebase ni las marcas de Pokémon.

Se conserva la licencia PolyForm Noncommercial 1.0.0 de la referencia en `LICENSE-REFERENCE.md`. Este proyecto no incluye compras ni publicidad y se distribuye para uso no comercial.

Retratos, personajes jugables y jefes: ilustraciones generadas para este fan game mediante ImageGen, con diseños de East Blue. Sprites integrados en Canvas 2D; dibujos procedurales como respaldo. Sonido: síntesis Web Audio. Interfaz: fuentes del sistema, sin descarga de fuentes externas.

Ilustración del puerto: generada con la herramienta integrada ImageGen, guardada en `assets/harbor.png`. Prompt final: "Create an original illustrated wide landscape game background. A wooden sailing ship with a cheerful sheep-shaped figurehead and huge cream-colored sails anchored beside a tropical island harbor. Turquoise ocean, green island, village of Mediterranean houses and palm trees, dramatic fluffy clouds and sunny golden light. Hand-painted anime adventure scenery with dark ink outlines and detailed brushwork. Composition places the ship on the right half, and open dark teal ocean and sky on the left third to provide negative space for a website heading. No people, no text, no letters, no logos, no UI. Rich cinematic game key art, landscape 16:9."
