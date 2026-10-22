# CLAUDE.md — Reglas de trabajo para FanGameOne

## Objetivo
Desarrollar gradualmente un fangame One Piece 2D pixel art top-down, inspirado en la **jugabilidad** de PokeSurvivor. Mantener JavaScript vanilla + Canvas 2D mientras sean adecuados. Preservar el código funcional y respetar las licencias.

## Inicio de cada tarea
1. Leer `PROJECT_CONTEXT.md` una sola vez y consultar solamente los archivos necesarios.
2. Verificar el árbol real del repositorio y el estado de Git: no asumir que el prototipo ZIP ya está subido.
3. Distinguir hechos comprobados de objetivos propuestos.
4. **Sin autorización expresa, no editar archivos, ejecutar comandos, instalar, hacer commits, push ni desplegar.** Solicitar autorización para la acción concreta.

## Eficiencia de tokens
- Responder en **español**, breve, técnico y sin relleno.
- Evitar releer grandes archivos, listados masivos, dependencias, bundles y arte binario si no hacen falta.
- Buscar símbolos/rutas concretas; abrir solo los fragmentos relevantes.
- No reproducir archivos ni diffs completos en el chat; resumir rutas y cambios.
- No regenerar documentos largos en cada paso; mantener `PROJECT_CONTEXT.md` condensado.
- No crear dependencias, abstracciones, documentación ni optimizaciones especulativas.
- Priorizar acciones pequeñas y comprobables; conservar patrones ya funcionales.
- Si falta información crítica, señalarla; no inventar rutas, resultados, rendimiento ni funcionalidades.

## Código y calidad
- Cambios pequeños, separados por responsabilidades; evitar reescritura masiva de `dist/js/game.js`.
- Respetar escala, estilo y nitidez del pixel art; UI discreta y legible.
- Medir antes de optimizar; aplicar object pooling, partición espacial u otras técnicas solo cuando aporten beneficio comprobable.
- No copiar recursos, marcas, música o código de PokeSurvivor sin verificar autorización y avisos correspondientes.
- Mantener créditos/licencias pertinentes. El proyecto no es comercial.
- No introducir cambios de tecnología o arquitectura sin justificación y autorización.

## Flujo con autorización
1. Informar en 1–3 líneas del alcance y archivos previstos.
2. Hacer solo lo autorizado; no añadir funcionalidades extra.
3. Ejecutar pruebas relevantes cuando estén autorizadas; nunca afirmar que se probaron si no ocurrió.
4. Registrar brevemente en `PROJECT_CONTEXT.md` cambios confirmados, resultados y pendientes.
5. No hacer commit, push, publicar, borrar ni reemplazar archivos sin orden explícita.

## Formato de respuesta final
**Cambios:** ...
**Pruebas:** ...
**Pendiente:** ...

Si fue solo análisis: **Hallazgos:** ... / **Propuesta:** ... / **Archivos modificados:** ninguno.

## Integración de Skills del proyecto

@AGENTS.md
