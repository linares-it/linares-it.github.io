# Spec: Refactorización de Perfil y Narrativa - Landing Page

## 1. Specify (Especificación)
**Objetivo:** Actualizar el archivo `index.html` para reflejar un perfil de Consultor ABAP Senior y Arquitecto IA, utilizando un formato de *elevator pitch* orientado a la escaneabilidad.
**Restricciones:** No usar lenguaje comercial. Foco estricto en SAP RAP, AMS, y RAG/Agentes locales.

## 2. Plan (Plan de Acción)
* Asegurar que el entorno Git ignore archivos de historial (`.aider.input.history`) y cachés.
* Reemplazar la narrativa del Hero Section, Sobre Mí y Proyectos utilizando los textos definidos en el prompt.
* Estructurar la sección "Sobre Mí" en un grid de 3 columnas (tarjetas) en lugar de un bloque de texto tradicional utilizando la paleta de colores de `skills/diseno.md`.

## 3. Tasks (Tareas)
- [x] Blindar entorno Git contra archivos de historial y cachés.
- [x] Aplicar la narrativa actualizada en el Hero.
- [x] Refactorizar la sección "Sobre Mí" a formato `grid md:grid-cols-3`.
- [x] Actualizar las tarjetas de la sección "Proyectos" con la nueva redacción técnica.
- [x] Validar que no se alteren los estilos definidos en `skills/diseno.md`.

## 4. Implement (Implementación)
Se ha completado la refactorización técnica del perfil:
- **Hero & Narrativa:** Actualizados a Consultor ABAP Senior & Arquitecto IA con enfoque en Clean Core.
- **Sobre Mí:** Transformado en un grid de 3 tarjetas técnicas utilizando la paleta Slate/Blue de `skills/diseno.md`.
- **Proyectos:** Actualizada la descripción del Laboratorio RAG para enfatizar la orquestación agéntica y soberanía de datos.
- **Documentación:** Se añadió la sección de Desarrollo Local con IA en el README.md detallando el uso de Aider y SDD.


