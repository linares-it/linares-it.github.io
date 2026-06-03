# Spec: Dashboard SAP — Web Component

## 1. Specify (Especificación)
**Objetivo:** Documentar e iterar el Web Component `<dashboard-sap>` embebido
en `index.html`. Muestra métricas en tiempo real de los repositorios GitHub
del propietario, consumidas desde un Gist público actualizado diariamente.

**Restricciones:**
- Sin framework — Web Component nativo (`customElements.define`)
- Sin build step — compatible con GitHub Pages estático
- Ante fallo del Gist, renderizar con datos del mock local
- Paleta visual consistente con `skills/diseno.md`

## 2. Plan (Plan de Acción)

**Flujo de datos:**
GitHub Actions (daily cron)
→ scripts/update_gist.py
→ Gist público (health-data.json)
→ src/services/gist.service.js (fetch + fallback mock)
→ src/components/DashboardSAP.js (render)
→ <dashboard-sap> en index.html

**Archivos del dominio:**
| Archivo | Rol |
|---|---|
| `scripts/update_gist.py` | Genera el JSON con datos de la API GitHub |
| `src/services/gist.service.js` | Fetch al Gist con fallback al mock |
| `src/mocks/mockFirebase.js` | Datos locales para desarrollo sin red |
| `src/components/DashboardSAP.js` | Web Component — UI con UI5 Web Components |
| `.github/workflows/update-gist.yml` | Cron diario que ejecuta el script |

## 3. Tasks (Tareas)

### Iteración 1 — completada ✓
- [x] Crear `update_gist.py` con fetch a API GitHub
- [x] Calcular `health`, `status`, `progress` por repo
- [x] Publicar `kpis` y `alerts` en el Gist
- [x] Crear `gist.service.js` con fallback al mock
- [x] Conectar `DashboardSAP.js` al servicio real
- [x] Reemplazar columna Presupuesto por Último Push
- [x] Reemplazar KPI Presupuesto por Sin Push +90d
- [x] Escalar severity de alertas por días sin actividad

### Iteración 2 — pendiente
- [ ] Alinear `mockFirebase.js` con estructura real del Gist
- [ ] Agregar botón "Ver repositorio" por fila en la tabla UI5
- [ ] Validar fallback al mock cuando Gist no responde
- [ ] Agregar `favicon.ico` para eliminar 404 en consola

### Backlog
- [ ] Filtrar repos forkeados o archivados del dashboard
- [ ] Reemplazar GIST_ID hardcodeado por meta tag en index.html
- [ ] Agregar token con scope mínimo (`gist` only) en GitHub Secrets

## 4. Implement (Implementación)

### Iteración 1 — 2026-06-03
Construcción inicial fuera de flujo SDD (deuda metodológica documentada aquí).
- `update_gist.py`: fetch API GitHub → calcula health/status/progress/kpis/alerts → patch Gist
- `gist.service.js`: fetch Gist público con `cache: no-store` → fallback a mock ante error
- `DashboardSAP.js`: import migrado de `ENDPOINT_FIREBASE` a `GistService`
- Columna Presupuesto eliminada → reemplazada por Último Push
- KPI Presupuesto eliminado → reemplazado por Sin Push +90d
- Severity de alertas escalada: >365d=high, >90d=medium, resto=low

**Lección aprendida:** mock debe reflejar estructura real del dato desde el inicio.