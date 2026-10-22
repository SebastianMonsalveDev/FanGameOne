# Endless Pirates — Diseño oficial del juego (GDD)
> Versión de planificación: 2026-10-22. **Diseño aprobado; NO implica implementación.**
> Proyecto fan no oficial y no comercial inspirado en One Piece. PokéSurvivor es referencia de género y ergonomía, no licencia para copiar código ni arte.

## 1. Identidad y alcance
- Nombre definitivo: **Endless Pirates** (repositorio heredado: `FanGameOne`; no renombrar repositorio sin autorización).
- Juego 2D top-down pixel art, supervivencia roguelite, oleadas, exploración, progresión de partida y reclutamiento.
- Prioridades: combate claro y fluido, partidas con progreso temprano rápido, baja saturación visual, consistencia del pixel art y rendimiento.
- Cinco pantallas de **referencia visual definitiva** aportadas en la conversación: menú principal; Taberna; subida de nivel/HUD; Tripulación; Astillero/Misiones/Logros. Son **maquetas de imagen, no pantallas implementadas**. Se deben adjuntar/almacenar los archivos de referencia en el repositorio antes de exigir fidelidad exacta; no asumir que están ya allí.
- Menú previsto: Zarpar, Tripulación, Astillero, Misiones y Logros, Clasificación, Bestiario, Noticias, Taberna. Diseños con paneles de madera/pergamino, tonos azul marino, crema, rojo, dorado, iconos y botones espaciados; responsive PC/móvil.

## 2. Personajes, versiones y fidelidad
- Personajes jugables iniciales del prototipo: Luffy, Zoro, Nami, Usopp y Sanji. Conservar su funcionamiento actual hasta que se autorice sustituirlo.
- Catálogo futuro: integrar el elenco y enemigos de las láminas visuales aprobadas; **inventariar nombres y versiones a partir de esas láminas** antes de afirmar que están implementados.
- Cada **versión/transformación** es una unidad reclutable independiente en Taberna (ejemplo: Luffy base, Gear 2, Gear 4, Gear 5), con rareza, sprites, estadísticas y técnicas propias. **No** se transforma automáticamente en otra versión durante la partida.
- Toda técnica ofensiva debe ser coherente con el personaje y la etapa representada: Luffy usa sus técnicas; Zoro espadas; Nami técnicas climáticas propias de su versión; Sanji patadas; Usopp tirachinas/munición/plantas según versión. Nada de goma para Zoro ni rayos de Enel para Luffy.
- Haki únicamente en personajes/versiones que lo posean en la obra; no otorgarlo genéricamente.
- Objetivo inicial de diseño: **8 a 12 técnicas exclusivas por personaje/versión**, sujeto al repertorio real disponible (no forzar técnicas inventadas).

## 3. Habilidades y sets
- Durante la partida se obtienen movimientos mediante experiencia y cartas; también se mejora el nivel/potencia de movimientos ya obtenidos.
- Hasta **8 técnicas/apoyos activos** repartidos en **2 sets de hasta 4**; no son ocho ataques que se ejecuten todos juntos.
- **Solo el set seleccionado** ejecuta automáticamente sus movimientos/apoyos; el otro queda inactivo. Cada técnica conserva su enfriamiento y condiciones de objetivo.
- Antes de agrupar, el jugador selecciona movimientos individuales. **Q y E sirven para recorrer la selección de movimiento o set**; controles táctiles equivalentes en móvil. Adaptar esta regla a los controles actuales al implementarla, sin romperlos inadvertidamente.
- Derrotar al **primer jefe principal vencido durante la partida** habilita agrupar hasta cuatro habilidades en Set 1; derrotar al **segundo jefe principal vencido** habilita Set 2. Los desbloqueos pertenecen a la **partida actual**, no son permanentes. Si un jefe escapa, no cuenta ni da recompensa; un jefe posterior puede ser el primero o segundo realmente vencido.
- **Minijefes jamás desbloquean sets**. Pueden dar experiencia, Berries, cofres u otras mejoras comunes.
- Mezclas permitidas dentro de un set: técnicas exclusivas compatibles y apoyos genéricos neutrales (agilidad, escudo, protección temporal). Los apoyos genéricos no conceden poderes o frutas de otros personajes.
- **Hasta 4 pasivas independientes**, p. ej. vida, daño, velocidad o reducción de enfriamiento; no ocupan espacios de set. Sinergias entre técnicas compatibles son posibles, sin cambiar las identidades de los personajes.
- Equilibrio pendiente: niveles máximos, catálogo concreto, porcentajes/valores, reglas exactas de sustitución de habilidades y detalle de UI para selección inicial.

## 4. Campaña de diez escenarios y reloj global
- Una **sola partida continua** atraviesa diez escenarios principales, con objetivo de **3 minutos por escenario** y reloj global fijo de **30:00** hasta el Mar del Caos.
- Orden de diseño acordado (no es orden canónico del anime):

| Tramo global | Escenario | Adversario de referencia |
|---|---|---|
| 00:00–03:00 | Arabasta | Crocodile / Baroque Works |
| 03:00–06:00 | Skypiea | Enel y sacerdotes |
| 06:00–09:00 | Water 7 | CP9; ajustar la representación al arco |
| 09:00–12:00 | Impel Down | Magellan y guardianes |
| 12:00–15:00 | Punk Hazard | Caesar, Monet y Vergo |
| 15:00–18:00 | Dressrosa | Doflamingo y su familia |
| 18:00–21:00 | Whole Cake | Big Mom, Katakuri y comandantes |
| 21:00–24:00 | Wano | Kaido y Piratas Bestia |
| 24:00–27:00 | God Valley | Encuentros legendarios por diseñar sin inventar canon |
| 27:00–30:00 | Elbaf | Enemigos/jefe por precisar al adaptar el material |

- Oleadas de enemigos característicos del arco, soldados comunes y **Marina donde tenga sentido temático**; no colocar marines idénticos de manera indiscriminada. Élites/minijefes y **un jefe principal del escenario**, basado en enfrentamientos de One Piece.
- Si derrotas al jefe antes del final de su tramo, **obtienes sus recompensas y la isla queda superada**. Para compatibilizarlo con el calendario global, el cambio de escenario jugable se efectúa en el siguiente corte de 3 minutos; puede mostrarse una transición breve y continuar la acción restante. **No adelantar el reloj global**.
- Si **no** derrotas al jefe cuando vence el tramo, **se retira, no entrega sus recompensas ni desbloquea set** y comienza el siguiente escenario de todas formas. Nunca bloquear la progresión por un jefe no vencido.
- La vida, técnicas, sets y mejoras de esa partida continúan entre escenarios. Curación y balance pendientes.
- La dificultad inicial y la obtención de experiencia deben ser rápidas; la progresión se desacelera gradualmente y las oleadas aumentan la presión.
- **Exactamente a los 30:00** comienza **Mar del Caos**, independientemente de qué jefes fueron vencidos.

## 5. Mar del Caos y clasificación
- A partir de 30:00 no hay más islas nuevas. Supervivencia prolongada con dificultad creciente.
- Reaparecen en oleadas **jefes ya derrotados** durante esa partida, con más vida y mayor peligro; definir comportamiento alternativo si el jugador no derrotó ninguno.
- Objetivo competitivo: mayor **tiempo total sobrevivido**. Mostrar resultados y récord personal; clasificación online real requiere backend, validación de partidas y protección contra trampas. **No anunciar ranking online funcional sin implementarlo**.
- Optimizar límites de enemigos y efectos para evitar caídas de FPS.

## 6. Exploración y recompensas
- **Cofres escasos** integrados en mapa: experiencia al abrir, Berries y **baja probabilidad** de objeto especial. Las tasas exactas NO están aprobadas.
- **Vegetación temática rompible** según escenario (hierba, cactus, bambú u otro equivalente apropiado): pequeña posibilidad de soltar **manzanas** curativas.
- **Cajas/barriles rompibles escasos**: pequeña posibilidad de **carne** que recupera más vida, y otras recompensas menores.
- No saturar el terreno: mantener espacios despejados y legibilidad del combate.
- Minijefes sueltan recompensas regulares; jefes vencidos sueltan recompensas relevantes y desbloquean los sets según orden de jefes efectivamente vencidos.
- La mecánica se inspira en la experiencia de supervivencia de PokéSurvivor, con ejecución y recursos propios.

## 7. Taberna y metaprogresión
- Reclutamiento mediante Taberna, con opciones **abrir 1 / abrir 5**, rarezas visibles y probabilidades transparentes, sin monetización real.
- Versiones del mismo personaje son reclutas distintos. Aprobación **provisional** del 2026-10-22: Legendario **1 %**, Épico **5 %**, Raro **24 %**, Común **70 %**; abrir 1 cuesta **1 ticket** y abrir 5 cuesta **5 tickets**.
- **No activar sorteos ni consumir tickets** hasta definir su obtención, la distribución de unidades por rareza y el tratamiento de duplicados. No se han aprobado fragmentos, compensaciones, garantías ni descuentos.
- Astillero: progresión permanente prevista. Misiones y Logros, Bestiario y Noticias como interfaces planificadas; distinguir lo implementado de los placeholders.
- Equipamiento, recompensas y guardado deberán integrarse progresivamente sin dañar el prototipo.

## 8. Prototipo actual vs. visión aprobada
- El prototipo v0.2 existente sigue basado en **cinco capítulos East Blue**: Shells Town, Orange Town, Villa Syrup, Baratie y Arlong Park; se conserva como base histórica y funcional.
- **No afirmar** que los 10 escenarios, dos sets, Taberna con reclutamiento o Mar del Caos están implementados por el hecho de estar descritos aquí.
- El contenido East Blue existente **no se elimina ni se sustituye automáticamente**; su reutilización o reubicación se decidirá durante la implementación.
- Los sprites aprobados por el usuario son canon visual del proyecto; evitar cambiar estilos o reemplazar arte original sin autorización.

## 9. Orden de desarrollo y autorizaciones
1. Documentar acuerdos y mantener el prototipo intacto.
2. **Próximo prompt de implementación** (solo con autorización): reproducir las **cinco interfaces** según imágenes aprobadas, por etapas, comenzando por **menú principal**, sin fingir sistemas funcionales.
3. Posteriormente, implementar sets/controles, progresión, enemigos e islas, objetos, Taberna y finalmente Mar del Caos/ranking.
4. Trabajar en **rama `work`**; `main` es estable/publicación; `claude` pertenece a tareas separadas. Sin merges ni despliegues no autorizados.
5. Leer este documento como fuente normativa de diseño; `PROJECT_CONTEXT.md` describe lo **realmente implementado** y `WORK.md` las normas del agente.
6. Prompts breves y específicos; cambios mínimos; pruebas reales y trazables.

## 10. Cuestiones deliberadamente pendientes
- Imágenes definitivas deben subirse como archivos identificables al repositorio cuando el propietario autorice esa acción.
- Distribución de unidades por rareza, obtención de tickets, duplicados, catálogo preciso de unidades y habilidades. Probabilidades y costes provisionales: sección 7; sorteos y consumo siguen expresamente desactivados.
- Ventana exacta de aparición del jefe dentro de cada tramo, efecto de una victoria anticipada, patrón y balance de enemigos; transición de isla sin romper reloj de 30 min.
- Qué ocurre al morir, pausas, opciones de accesibilidad, rendimiento y reglas detalladas de puntuación/antitrampas.
- Ajustes de canonicalidad para God Valley/Elbaf y selección exacta de jefes de Water 7.

> **Regla de control de cambios:** no inferir permiso para implementar de la aprobación del diseño. Toda modificación de código, assets, ramas o publicación requiere autorización específica.
