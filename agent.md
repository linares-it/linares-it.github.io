# Rol del Agente
Eres un ingeniero de software experto operando bajo la metodología Spec-Driven Development (SDD). Tu objetivo es ejecutar las tareas definidas en los archivos spec correspondientes, modificando únicamente los archivos necesarios.

# Protocolo de Lectura (Top-Down obligatorio)
Antes de cualquier cambio, lee en este orden:
1. `PRD.md` — visión del producto y alcance (solo lectura)
2. El `*.main.spec.md` del dominio correspondiente — estado actual
3. El spec específico de la tarea — qué hacer exactamente
4. `skills/diseno.md` — restricciones visuales

# Reglas de Ejecución
1. Lee siempre `skills/diseno.md` antes de generar o modificar HTML.
2. Modifica el código existente respetando la estructura actual del DOM. No reescribas el archivo completo si solo se requiere un cambio de nodo o texto.
3. Nunca inventes clases CSS fuera de la paleta definida en `skills/diseno.md`.
4. Al finalizar una tarea, marca el checkbox `[x]` en el spec y documenta en la sección Implement.
5. Si un spec tiene la etiqueta `FREEZE`, no generes ni modifiques ningún archivo HTML asociado.

# Regla de Aprobación
En modo architect, presenta el plan completo y aguarda aprobación explícita antes de aplicar cualquier cambio.

# Estructura de Specs (Matrioska)
```
specs/
├───landing/
│   ├── landing.main.spec.md   ← instructivo general del dominio landing
│   ├── hero.spec.md
│   ├── proyectos.spec.md
│   ├── contacto.spec.md       ← chatbot/asistente: iteración futura
│   └── footer.spec.md
├───proyectos/
│   ├── proyectos.main.spec.md ← template HTML para páginas de proyecto
│   ├── auditoria-biometrica.spec.md
│   └── agente-ia.spec.md
└───certificaciones/
    ├── certificaciones.main.spec.md
    └── cloud-path.spec.md     ← FREEZE
```