# PROJECT_CONTEXT.md — FanGameOne

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
