# PROJECT_CONTEXT.md — Endless Pirates (repositorio FanGameOne)

> Memoria técnica para asistentes de programación. Actualizar solo tras cambios confirmados en el repositorio. Fecha de revisión de los ZIP: 2026-10-21.

## 1. Identidad y objetivo
- Repositorio: `SebastianMonsalveDev/FanGameOne`, rama principal `main`.
- Proyecto: fangame **no oficial y no comercial** de One Piece, pixel art 2D top-down, supervivencia/roguelite inspirado en la experiencia de PokeSurvivor.
- Prioridad: jugabilidad, rendimiento, coherencia visual, evolución progresiva y conservación de lo que funciona.
- No se autoriza implementar ni subir cambios hasta que el propietario lo pida expresamente.

## 2. Fuentes de referencia revisadas (NO asumir que ya están en GitHub)
- `OnePiece-GrandLine-Survivors-v0.2.zip`: prototipo local inspeccionado. Contiene una carpeta `dist/` y una versión autónoma `OnePiece-Jugar-v0.2.html`.
- `pokesurvivor-main(1).zip`: código de referencia inspeccionado. No incorporarlo automáticamente al repositorio.
- Imágenes del usuario: pixel art para sprites/animaciones; ilustraciones más detalladas para retratos y UI.
- Prototipo v0.2 importado a `dist/` en `main` el 2026-10-21 (sin cambios de código, mecánicas, gráficos ni rutas). PokeSurvivor **no** está en el repositorio ni debe añadirse sin revisar licencia.

## 3. Stack actual del prototipo
- HTML5, CSS3, JavaScript vanilla y Canvas 2D.
- Sin dependencias de ejecución ni backend necesarios para jugar; guardado local del navegador.
- `OnePiece-Jugar-v0.2.html` permite jugar desde un único archivo; `dist/index.html` es la entrada de la versión editable.
- En la versión editable, `dist/js/game.js` concentra parte importante de la lógica; modularización futura, sin reescritura ciega.

## 4. Árbol relevante del prototipo v0.2
```text
OnePiece-Jugar-v0.2.html
README.md
LEEME-v0.2.txt
ART-DIRECTION-v0.2.md
dist/
  index.html
  style.css
  polish.css
  CREDITS.md
  LICENSE-REFERENCE.md
  js/
    data.js       # personajes y capítulos
    assets.js     # recursos
    art.js        # arte/renderizado de recursos
    scenery.js    # elementos visuales del escenario
    game.js       # simulación, movimiento y combate
    ui.js         # interfaz
    polish.js     # pulido/UI
  assets/
    bosses.png
    classic-chibi.png
    crew.png
    enemies-chibi.png
    harbor.png
    reference/     # imágenes originales de referencia
```
Estructura real en el repositorio: `dist/` (index.html, style.css, polish.css, CREDITS.md, LICENSE-REFERENCE.md, js/, assets/{classic-chibi,enemies-chibi}.png, assets/reference/{atlas,walk,hero,collection}.png) y `docs/ART-DIRECTION.md`. Excluidos por no usarse o duplicar: `OnePiece-Jugar-v0.2.html` (18,7 MB, copia con todo embebido), `assets/{bosses,crew,harbor}.png` (sin referencias en js/css/html), `LEEME-v0.2.txt` y el README del ZIP. Verificar rutas antes de editar.

## 5. Lo que ya incluye v0.2 (según archivos)
- Jugables: Luffy, Zoro, Nami, Usopp y Sanji, con estadísticas y especialidades diferenciadas.
- Capítulos: Shells Town/Morgan; Orange Town/Buggy; Villa Syrup/Kuro; Baratie/Don Krieg; Arlong Park/Arlong.
- Jefes a los ~90 s por isla, campaña East Blue.
- Movimiento WASD/flechas; ataques automáticos; esquiva con Espacio; especial con E; pausa Esc/P; 1/2/3 para mejoras.
- Experiencia y selección de mejoras, recompensas, berries, mejoras permanentes, guardado local y registro de expediciones.
- Controles táctiles, sonido sintetizado y modo de dificultad tranquilo opcional.
- Carrera de cuatro fotogramas para Luffy y Zoro; galería con 18 referencias; algunos recursos nuevos para otros personajes y enemigos.
- **No** hay cooperativo, cuentas, monetización ni campaña completa del anime.
- Lo anterior procede de inspección estática, no implica validación de funcionamiento o rendimiento en navegador.

## 6. PokeSurvivor: referencia técnica, no copia automática
- Stack compatible: JavaScript vanilla + Canvas 2D.
- Organización relevante: `js/core/`, `js/entities/`, `js/systems/`, `js/world/`, `js/ui/`.
- Módulos estudiables: `js/systems/combat.js`, `spawner.js`, `levelup.js`, `progress.js`, `js/entities/enemy.js`, `projectile.js` y sistemas de mundo/cámara.
- Aprender sus patrones de diseño, progresión, variedad, control de oleadas, animación y optimización; no copiar recursos Pokémon, música, servicios de terceros ni módulos sin revisar licencia.
- En el ZIP recibido, el código posterior al 14-10-2026 declara **PolyForm Noncommercial 1.0.0** con aviso obligatorio `Required Notice: Copyright 2026 JPTER78 (https://github.com/JPTER78/pokesurvivor)`; verificar siempre los términos de la versión exacta antes de reutilizar.
- Personajes y marcas One Piece pertenecen a sus titulares. No asumir que ser fan/no comercial elimina los riesgos de propiedad intelectual.

## 7. Brechas y prioridades (plan, NO completadas)
1. **Validación**: probar el prototipo en navegador, identificar errores reales, hacer medición FPS y perfiles de carga.
2. **Arquitectura**: separar responsabilidades de `game.js` en módulos de bajo acoplamiento, gradualmente y con pruebas de regresión.
3. **Animaciones**: ampliar idle, caminar, atacar, daño, especiales y derrota sin romper escalas ni pixel art.
4. **Combate**: patrones enemigos, élites, jefes, equilibrio y rendimiento con gran cantidad de entidades.
5. **Progresión**: profundizar mejoras, sinergias, evoluciones y variedad de builds.
6. **Escenarios e interfaces**: islas detalladas, legibilidad del terreno y HUD compacto; ilustraciones elaboradas para pantallas, pixel art para acción.
7. **Contenido**: incorporar más islas y personajes solo tras estabilizar el núcleo.
No presentar estas tareas propuestas como funcionalidades existentes.

## 8. Reglas de continuidad
- Antes de trabajar: leer `CLAUDE.md`, este documento y solo archivos relacionados con la tarea.
- Confirmar rama, árbol y estado Git; nunca asumir que el ZIP coincide con el código subido.
- Sin orden explícita: solo analizar y proponer, NO modificar, instalar, ejecutar ni publicar.
- Con autorización: cambios mínimos por etapa; probar lo modificado y registrar el resultado real.
- Nunca subir secretos, material sin licencia compatible ni archivos generados pesados por defecto.
- Al completar un cambio aprobado, actualizar este archivo con: fecha, qué cambió, rutas concretas, pruebas efectuadas y pendiente. Mantenerlo corto; no pegar chats ni código completo.

## 9. Estado comprobado
- **Comprobado en ZIP:** funcionalidades y rutas listadas anteriormente.
- **Comprobado:** prototipo v0.2 en `dist/` del repositorio (2026-10-21); ver pruebas en el registro.
- **Sin comprobar:** FPS, rendimiento y balance; licencias individuales de todas las imágenes.
- **Último avance:** prototipo v0.2 publicado correctamente en GitHub Pages y documentación de despliegue actualizada.

## 10. Registro
- **2026-10-21 — Importación del prototipo v0.2** a `dist/` y `docs/ART-DIRECTION.md`, sin tocar código ni rutas. Pruebas: SHA-256 de los 18 archivos de `dist/` idéntico al ZIP; servido con `http.server` y abierto en Chromium sin 404 ni errores de consola; partida con Luffy en Shells Town iniciada, sprites renderizados, 5 s de movimiento sin fallos. No probado: jefe, subida de nivel, resto de personajes/capítulos, táctil, FPS.
- Pendiente: mejoras propuestas del análisis (catálogo de mejoras en módulo de datos, evoluciones, enemigos/oleadas, modularización, meta-progresión).

## 11. Publicación web — 2026-10-21

### Estado del despliegue
- Repositorio: `SebastianMonsalveDev/FanGameOne`
- Rama principal: `main`
- Hosting: GitHub Pages.
- URL: https://sebastianmonsalvedev.github.io/FanGameOne/
- Workflow: `.github/workflows/static.yml`
- Carpeta publicada: `dist/`
- Despliegue automático al actualizar `main`.
- GitHub Actions confirmó una ejecución exitosa.

### Comprobaciones realizadas
- La página principal carga desde GitHub Pages.
- Las imágenes principales y el retrato de Luffy se visualizan correctamente.
- Aparecen las secciones Aventura, Tripulación, Mejoras, Bitácora y Galería.
- Se muestra Shells Town como primera isla.
- La interfaz se visualiza correctamente en la captura proporcionada.

### Pruebas pendientes
- Iniciar y completar una partida desde GitHub Pages.
- Verificar movimiento, ataques y habilidades.
- Comprobar experiencia, niveles y selección de mejoras.
- Probar los cinco personajes y sus animaciones.
- Verificar los jefes de las cinco islas.
- Comprobar guardado y carga de progreso.
- Medir FPS, rendimiento y comportamiento con numerosos enemigos.

### Instrucciones para las IA
- Trabajar sobre el código de `main`, no sobre los ZIP antiguos.
- Conservar el funcionamiento de GitHub Pages.
- No modificar las rutas de `dist/` sin verificar el despliegue.
- Validar los cambios antes de considerarlos terminados.
- Actualizar este documento después de cada mejora autorizada.
- No implementar cambios sin autorización explícita.

## 12. Diseño aprobado y documentación — 2026-10-22
- **Nombre oficial:** Endless Pirates; el nombre del repositorio y URL de Pages permanecen como `FanGameOne` hasta orden expresa.
- **Fuente normativa de reglas:** [docs/GAME_DESIGN.md](docs/GAME_DESIGN.md). Este archivo sigue describiendo el estado **implementado** del prototipo v0.2; no confundir plan con código existente.
- **README actualizado:** explica identidad del juego, campaña planeada de 10 escenarios/30 min, sets, Taberna y supervivencia extrema, señalando que está pendiente de implementación.
- Cinco imágenes de interfaz aprobadas **en la conversación**, pero **no incorporadas como archivos al repositorio**. El siguiente prompt de desarrollo será sobre interfaces y el usuario deberá suministrar esos archivos a Work.
- Rama modificada por esta tarea documental: `work`. **Sin cambios a `main`, `claude` ni `dist/`**.
- **No programar nada por iniciativa propia.** Siguiente tarea autorizable: interfaz menú principal primero; continuar con las otras solo tras aprobación.

## 13. UI local y estructura temporal — 2026-10-22
- Cambios locales autorizados en `work`, **sin commit, push ni despliegue**. Las cuatro interfaces están en `dist/js/pirate-ui.js` y `dist/pirate-ui.css`; el arte oficial reutilizado se encuentra en `dist/assets/ui-{port,crew,tavern}.jpeg`. Entrada: `dist/index.html`.
- Taberna: eliminada la navegación superior; muestra tickets/Berries y regreso al menú. Tasas provisionales 1/5/24/70 % y costes 1/5 tickets confirmados por el usuario. **Botones de reclutamiento desactivados**: no hay sorteos, gasto ni concesión de tickets; rarezas individuales, obtención y duplicados pendientes. Retratos del catálogo sin asignación de rareza.
- Guardado: `dist/js/progression.js` amplía el formato v1 con `tickets: 0` para partidas antiguas, conserva progreso y campos adicionales; no escribe automáticamente al cargar ni cambia los desbloqueos de East Blue.
- `dist/js/campaign.js`: motor de calendario independiente con las diez islas, cortes de 180 s, transición exacta a Caos en 1800 s, retirada de jefe sin elegibilidad de recompensa y conteo de las dos primeras victorias principales; minibosses no cuentan. No contiene valores de balance ni entrega recompensas.
- El itinerario se consulta desde **Elegir isla → Travesía de 30 minutos**. **La campaña nueva aún no es jugable**: falta integrar el calendario con el motor, encuentros/arte/patrones aprobados, sets ejecutables y dificultad/oleadas del Caos. East Blue conserva su motor y controles originales.
- Pruebas: 5 pruebas de migración/recursos y 8 de calendario en `tests/*.test.cjs`; pruebas de navegador de Taberna, itinerario, navegación, persistencia y combate previo. No confundir pruebas unitarias del calendario con una partida real de 30 minutos.
- Pendientes: contenido y balance por isla (incluyendo decisiones de Water 7/God Valley/Elbaf), momento de aparición de jefes, catálogo de técnicas/versiones, configuración de sets, adquisición de tickets/rareza/duplicados, objetos y sus tasas, misiones/logros y backend de clasificación. Astillero sigue reutilizando las mejoras permanentes existentes; no se añadieron reglas nuevas a estos sistemas.

## 14. Mecánicas conectadas al prototipo — 2026-10-22
- Conservados los cambios locales de `work`; sin commits, push ni cambios a `main`.
- `dist/js/loadout.js` y conexiones pequeñas en `game.js`: selección de una técnica con Q/E antes del primer jefe; R y el botón táctil conservan la activación manual de la especial. Solo ejecutan las técnicas seleccionadas; las dos técnicas secundarias tienen recargas independientes con los valores existentes. No se añadieron técnicas ni estadísticas de combate.
- Tras vencer al primer y segundo jefe principal de una **expedición de East Blue**, se habilitan Set 1 y Set 2. Editor real desde el HUD: hasta cuatro técnicas por set, sin duplicarlas entre sets, selección con Q/E y controles táctiles; únicamente actúa el set seleccionado. El catálogo actual contiene las cuatro técnicas existentes por personaje, no ocho técnicas nuevas. El primer set conserva la técnica seleccionada; las demás se incorporan manualmente en el editor.
- `dist/js/runtime-ui.js`: **Continuar expedición** avanza al capítulo siguiente de East Blue conservando vida/máximo, velocidad, experiencia/nivel, mejoras, técnicas, recargas y sets. Regresar al puerto o reintentar después de perder comienza una expedición nueva. Cada etapa mantiene el reloj y jefe del prototipo; esto **no es la campaña de diez islas** y no altera su orden aprobado.
- Hasta cuatro pasivas totales, contando el rasgo propio del personaje; las cartas existentes mantienen sus valores. Al llenar los espacios se siguen ofreciendo mejoras de pasivas ya obtenidas, técnicas y curación. Si se agota el catálogo, subir de nivel no abre un diálogo vacío.
- `dist/js/journal.js`: bestiario de enemigos originales con avistamientos/derrotas reales al cerrar cada etapa, estadísticas por personaje y tiempo total de expedición; migración aditiva v1 sin escribir al cargar. Clasificación **local**, agrupada por expedición, y misiones funcionales que reutilizan objetivos/recompensas existentes de East Blue. Astillero conserva sus compras reales originales. No hay logros extra ni ranking online.
- Límite de 85 enemigos del prototipo aplicado también al generar oleadas; se reserva espacio para el jefe sustituyendo un enemigo común lejano si se alcanzó el límite.
- Verificación mínima en navegador: seleccionar habilidades, adquirir las técnicas secundarias, vencer jefes y continuar conservando mejoras, habilitar ambos sets, asignar técnicas y verificar que solo se invocan las del set seleccionado; bestiario, clasificación y cinco objetivos de misión. Se comprobaron sintaxis y ausencia de errores de JavaScript en estos flujos.
- **Bloqueos reales del GDD que siguen vigentes:** reclutamiento prohibido hasta definir fuentes de tickets, distribución por rareza y duplicados; encuentros/representación y balance de las islas nuevas, horario de jefes y dificultad/reaparición del Caos; estadísticas/técnicas de nuevas unidades; tasas de objetos; condiciones/recompensas de logros y backend de clasificación. El calendario de diez islas sigue independiente del combate y no se presenta como campaña jugable.

## 15. Alabasta jugable — 2026-10-22
- `dist/js/voyage.js` conecta el calendario al motor en un modo Grand Line separado de East Blue. **Zarpar** abre Alabasta; **Elegir isla** conserva el acceso explícito a los capítulos originales. Los cambios anteriores de `work` permanecen locales, sin commit/push.
- Alabasta ocupa 00:00–03:00. Escenario desértico con casas, dunas, cactus, oasis, cofres y barriles; agentes/élites de Baroque Works, Mr. 1 como miniboss y Crocodile como principal. `island-art.js` reutiliza primitivas Canvas y dibuja siluetas provisionales, conservando los sprites originales de jugadores. Terreno y sprites se cachean; se mantiene el límite de 85 enemigos.
- `dist/js/islands.js` separa perfiles de isla y **balance provisional, no aprobado como definitivo**. Reutiliza los tiempos base del prototipo: oleadas desde 20 s y cada 25 s; Mr. 1 a 60 s; principal a 90 s. Élite: doble vida del común. Plantillas originales para vida/daño/velocidad del principal y miniboss. Berries por derrota común/élite/mini/principal: **1/5/25/80**; XP respectivamente **1×4 / 1×8 / 7×3 / 15×8**, usando denominaciones ya existentes. No se añadieron probabilidades de objetos ni reglas de reclutamiento.
- Crocodile tiene combate real: proyectil de arena direccional y tornado/área de arena con avisos previos; reutiliza daño, velocidad, duraciones y recargas existentes. Mr. 1 usa ataques de cuchillas/carga. La barra grande corresponde solo al principal. Referencias de identidad: [Crocodile](https://one-piece.com/character/Crocodile/index.html), [Daz Bonez/Mr. 1](https://one-piece.com/character/Daz_Bonez/index.html).
- Solo la derrota del principal da su recompensa y habilita el set; élites/minibosses no cuentan. Vencerlo antes mantiene combate y reloj hasta el corte de 180 s. Si vive al corte, se elimina sin pasar por el manejador de muerte: no monedas, XP, bajas ni sets. Historia de jefe vencido/retirado guardada por expedición.
- A 03:00 empieza Skypiea con escenario de nubes/ruinas y guardianes básicos. Vida, máximo, experiencia/nivel, técnicas, mejoras, recargas y sets conservan sus objetos/valores; reloj global continúa. Las amenazas y decoraciones anteriores se retiran; los drops pendientes se conservan. **Skypiea aún no tiene a Enel ni contenido completo**. Al alcanzar 06:00 se muestra un límite de contenido y se permite guardar resultados; no se fingen las ocho islas restantes ni el Caos.
- Guardado v1 aditivo: `campaignProgress` separado de `completed`/`chapter` de East Blue. Berries se consolidan al cambiar de isla o finalizar sin doble cobro; bestiario/estadísticas contabilizan incrementos, no nuevamente todas las bajas previas. Clasificación e historial reconocen el nombre real de la isla.
- Pruebas funcionales breves en navegador: arranque, oleadas/élite/miniboss, aparición/barra de Crocodile, ataques que reducen vida (130→83 en prueba controlada), victoria temprana (+80 Berries, un set, mismo tiempo), retirada a 03:00 (cero premios/XP/bajas/sets), transición conservando estado, guardianes de Skypiea, cierre a 06:00 sin doble cobro/contabilización y arranque/pausa de East Blue. Pasadas comprobaciones de sintaxis; no se presenta esta verificación como balance definitivo ni partida humana completa.
- Pendientes siguientes: ajustar/aprobar valores provisionales y mejorar arte enemigo; completar Skypiea y las ocho islas posteriores; Caos y demás decisiones pendientes del GDD.

## 16. Animaciones y apariencias enemigas — 2026-10-22
- `dist/js/enemy-animation.js`: presentación separada del combate; preparación, ataque, recuperación, impacto recibido y caída siguen los disparos, cargas, contacto y tornados existentes. La pausa detiene sus tiempos. No modifica daño, probabilidades, recompensas, controles ni formato de guardado.
- `dist/assets/enemies-grand-line.png`: hoja transparente compacta generada con imagegen, recortada y alineada para Baroque Works común/élite, Mr. 1, Crocodile y guardián de Skypiea. Reposo, dos pasos, preparación, ataque y recuperación; el guardián reutiliza su reposo durante la recuperación. Variantes de color estables y equipo según el rol existente; no introduce desbloqueos cosméticos. Conserva jugadores y skins originales de East Blue, añadiendo poses/efectos de ataque sobre estos últimos.
- Fotogramas y variantes compartidos en caché, carga directa de la hoja sin recortes costosos durante la partida; dibujos procedurales de `island-art.js` como respaldo si falla el recurso. `game.js`, `voyage.js` e `index.html` conectan únicamente eventos y representación.
- Verificación breve en navegador: disparo, carga y su recuperación, golpe con daño real, tornado, muerte/recompensa existente, pausa de animaciones/reloj, reutilización de caché y arranque de East Blue. Sintaxis y revisión visual de fotogramas; sin errores JavaScript en estos flujos. Cambios locales conservados en `work`, sin commit ni push.
