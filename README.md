# linares-it.github.io — Portafolio Profesional

Repositorio central de mi portafolio profesional y landing page, diseñado bajo la metodología **Spec-Driven Development (SDD)**. Este sitio funciona como un resumen ejecutivo estático de arquitectura técnica, capacidades operativas en modernización SAP y soluciones de Inteligencia Artificial aplicada.

## 🛠️ Stack Tecnológico

*   **Frontend:** HTML5, Tailwind CSS (Arquitectura limpia vía CDN, optimizado para rendimiento y escaneabilidad).
*   **Iconografía:** FontAwesome 6.
*   **Automatización de Contacto:** Integración con Web3Forms API para gestión de formularios sin backend dedicado.
*   **Hosting:** GitHub Pages.

## 🧠 Arquitectura de Desarrollo (AI-Assisted & SDD)

Este repositorio implementa un flujo de trabajo agnóstico y desacoplado para el desarrollo asistido por IA, manteniendo las reglas de negocio y diseño dentro del control de versiones:

*   `landing-page.spec.md`: Especificación técnica viva del proyecto (fases Specify, Plan, Tasks, Implement).
*   `agent.md`: Archivo de contexto normativo que rige el comportamiento de las herramientas CLI de asistencia de código (Aider / Claude Code).
*   `skills/diseno.md`: Guía estricta de UI, paleta de colores y patrones de Tailwind CSS para evitar regresiones de diseño por alucinación de modelos.

## 🚀 Ejecución en Entorno Local

Para levantar el entorno de desarrollo local y previsualizar los cambios en el navegador (ej. bajo Ubuntu/WSL o Windows), clona el repositorio y ejecuta el servidor nativo de Python:

```bash
# Clonar el repositorio
git clone https://github.com/linares-it/linares-it.github.io.git
# ir al directorio
cd linares-it.github.io
```
# Levantar servidor local

```bash
python3 -m http.server 8000
```

Una vez levantado, abre tu navegador en http://localhost:8000.

# 📂 Estructura del Proyecto
```text
├── .aider.conf.yml         # Configuración del agente de desarrollo local
├── agent.md                # Reglas de comportamiento para LLMs en el repositorio
├── index.html              # Archivo principal de la landing page
├── landing-page.spec.md    # Registro de especificaciones técnicas (SDD)
├── robots.txt              # Configuración de indexación para SEO técnico
├── sitemap.xml             # Mapa del sitio para motores de búsqueda
└── skills/
    └── diseno.md           # Restricciones e identidad visual del framework CSS
```    

## Guía de Desarrollo Local con IA

El proyecto utiliza la metodología **Spec-Driven Development (SDD)** apoyada por la herramienta CLI de desarrollo asistido por IA, **Aider**. Para replicar el entorno de desarrollo y aplicar cambios basados en especificaciones:

```bash
# Definir la API Key de Google AI Studio
export GEMINI_API_KEY="tu_api_key_aquí"

# Lanzar el agente forzando el modelo óptimo y cargando el contexto
aider index.html --model gemini/gemini-3-flash-preview --no-show-model-warnings

aider --architect --model gemini/gemini-3-flash-preview --editor-model gemini/gemini-3-flash-preview specs/landing/credentials.spec.md --no-show-model-warnings
```
