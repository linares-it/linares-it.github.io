# Spec: Páginas de Detalle de Proyectos

## 1. Specify (Especificación)
**Objetivo:** Crear páginas individuales detalladas para los proyectos principales (`rag-local.html` y `auditoria-biometrica.html`) para profundizar en la narrativa técnica sin sobrecargar la landing page principal.

**Alcance:**
- **Consistencia Visual:** Las nuevas páginas deben heredar el look & feel de `index.html` (Paleta Slate/Blue de `skills/diseno.md`, tipografía, navegación y footer).
- **Contenido por Página:**
    - **Hero Section:** Título del proyecto, descripción breve y badges del stack tecnológico (ej. SAP ABAP, Python, LangChain, etc.).
    - **Sección "El Problema":** Explicación del desafío técnico o la motivación detrás del proyecto.
    - **Sección "Decisiones Técnicas":** Detalle de la arquitectura, por qué se eligieron ciertas herramientas (ej. Ollama para soberanía de datos) y retos superados.
    - **Call to Action:** Enlace directo al repositorio de GitHub o demo técnica.

**Restricciones:**
- No se modifica `index.html` en esta fase (los enlaces se activarán en una iteración posterior).
- Las páginas deben residir en la raíz del proyecto.
- Se debe mantener el enfoque de "Arquitecto IA" y "Senior ABAP", evitando lenguaje comercial.

## 2. Plan (Plan de Acción)
1.  **Template Base:** Crear una estructura HTML base que replique el `nav` y `footer` de la landing page.
2.  **Página RAG Local:** Desarrollar `rag-local.html` enfocada en la orquestación agéntica y privacidad.
3.  **Página Auditoría Biométrica:** Desarrollar `auditoria-biometrica.html` enfocada en la integración de SAP con sistemas de seguridad.
4.  **Responsive Design:** Asegurar que el layout de las secciones de "Decisiones Técnicas" sea legible en móviles y escritorio.
5.  **Validación de Estilos:** Verificar que todos los colores y componentes sigan estrictamente `skills/diseno.md`.

## 3. Tasks (Tareas)
- [ ] Crear el archivo `rag-local.html` con la estructura de navegación y footer.
- [ ] Redactar e implementar la sección de arquitectura técnica para el Laboratorio RAG (Foco en Soberanía de Datos).
- [ ] Crear el archivo `auditoria-biometrica.html` con la estructura de navegación y footer.
- [ ] Redactar e implementar la sección de "El Problema" y "Decisiones Técnicas" para el Monitor de Auditoría.
- [ ] Aplicar clases de Tailwind CSS para garantizar la coherencia con el tema Dark (Slate 900/800).
- [ ] Verificar la correcta visualización de iconos de FontAwesome en ambas páginas.

## 4. Implement (Implementación)
(Vacío - A completar tras la ejecución de las tareas)
