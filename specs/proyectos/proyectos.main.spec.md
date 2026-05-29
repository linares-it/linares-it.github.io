# Spec Principal: Páginas de Proyecto (Casos de Estudio)

## Dominio
Governa la creación de páginas HTML individuales por proyecto.
Cada página es un archivo estático con slug SEO-friendly en la raíz del repo.

## Template de Página
Cada proyecto genera su propio HTML siguiendo esta estructura:

### Secciones obligatorias
| Sección | Descripción |
|---|---|
| Hero | Título del proyecto, descripción corta, stack tecnológico |
| El Problema | Contexto y motivación técnica |
| Decisiones Técnicas | Arquitectura, tradeoffs y razonamiento |
| El Twist IA | Cómo se incorporaron agentes o automatización |
| CTA | Enlace al repositorio GitHub |

### Convención de nombres
`{slug-descriptivo}.html` en raíz del repo.
Ejemplos: `auditoria-biometrica.html`, `agente-ia.html`

### Consistencia visual
- Mismo nav y footer que `index.html`
- Paleta Slate/Blue definida en `skills/diseno.md`
- Tailwind CDN + FontAwesome 6

## Proyectos y sus Specs
| Proyecto | Spec | HTML | Estado |
|---|---|---|---|
| Auditoría Biométrica | auditoria-biometrica.spec.md | auditoria-biometrica.html | Pendiente |
| Asistente IA | agente-ia.spec.md | agente-ia.html | FREEZE — repo privado aún |

## Regla para el Agente
Al implementar un proyecto:
1. Lee `proyectos.main.spec.md` (este archivo) para entender el template
2. Lee el spec específico del proyecto
3. Genera el HTML en la raíz del repo
4. NO modifiques `index.html` — las tarjetas de proyectos se actualizan en una iteración separada