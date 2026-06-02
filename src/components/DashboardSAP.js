// src/components/DashboardSAP.js

import { GistService } from "../services/gist.service.js";

// Carga UI5 Web Components via bundle comunitario (no requiere bundler)
import "https://ui5-community.github.io/ui5-webcomponents-bundle/assets/bundle.esm.js";

class DashboardSAP extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        this.shadowRoot.innerHTML = this._loading();
        try {
            const [pRes, kRes, aRes] = await Promise.all([
                GistService.getProjects(),
                GistService.getKPIs(),
                GistService.getAlerts(),
            ]);
            if (!pRes.ok) throw new Error(pRes.error);
            this.render(pRes.data, kRes.data, aRes.data);
        } catch (error) {
            this.shadowRoot.innerHTML = `
                <ui5-illustrated-message name="UnableToLoad">
                    <ui5-button slot="actions">Reintentar</ui5-button>
                </ui5-illustrated-message>`;
        }
    }

    _loading() {
        return `<div style="padding:2rem;text-align:center">
            <ui5-busy-indicator active size="Large"></ui5-busy-indicator>
        </div>`;
    }

    _statusColor(status) {
        return { active: "8", review: "6", planned: "1", closed: "3" }[status] ?? "1";
    }

    _valueState(progress) {
        if (progress >= 80) return "Positive";
        if (progress >= 50) return "Critical";
        return "Negative";
    }

    render(projects, kpis, alerts) {
        this.shadowRoot.innerHTML = `
        <style>
            :host { display: block; font-family: "72", "72full", Arial, Helvetica, sans-serif; }
            .section { padding: 2rem 1.5rem; background: #0f172a; }
            .section-title {
                font-size: 1.5rem; font-weight: 700; color: #fff;
                margin: 0 0 1.5rem; display: flex; align-items: center; gap: 1rem;
            }
            .section-title::before {
                content: ""; display: inline-block;
                width: 3rem; height: 4px; background: #3b82f6; border-radius: 2px;
            }
            .kpi-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
                gap: 1rem; margin-bottom: 2rem;
            }
            .kpi-card {
                background: #1e293b; border: 1px solid #334155;
                border-radius: 12px; padding: 1.25rem;
                transition: border-color 0.2s;
            }
            .kpi-card:hover { border-color: rgba(59,130,246,0.5); }
            .kpi-label { font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: .08em; margin-bottom: .5rem; }
            .kpi-value { font-size: 2rem; font-weight: 700; color: #fff; }
            .kpi-unit  { font-size: 1rem; color: #94a3b8; margin-left: 2px; }

            ui5-table { width: 100%; }
            ui5-table::part(table) { background: #1e293b; }

            .alert-list { display: flex; flex-direction: column; gap: .75rem; margin-top: 1.5rem; }
            .alert-item {
                display: flex; align-items: flex-start; gap: .75rem;
                background: #1e293b; border: 1px solid #334155;
                border-radius: 8px; padding: .875rem 1rem;
            }
            .alert-dot {
                width: 8px; height: 8px; border-radius: 50%;
                margin-top: 5px; flex-shrink: 0;
            }
            .dot-high   { background: #ef4444; }
            .dot-medium { background: #f59e0b; }
            .dot-low    { background: #22c55e; }
            .alert-msg  { font-size: .875rem; color: #e2e8f0; }
            .alert-time { font-size: .75rem; color: #64748b; margin-top: 2px; }
        </style>

        <section class="section">
            <h2 class="section-title">Dashboard SAP — Fiori</h2>

            <!-- KPIs -->
            <div class="kpi-grid">
                <div class="kpi-card">
                    <div class="kpi-label">Proyectos</div>
                    <div class="kpi-value">${kpis.totalProjects}</div>
                </div>
                <div class="kpi-card">
                    <div class="kpi-label">Progreso Promedio</div>
                    <div class="kpi-value">${kpis.avgProgress}<span class="kpi-unit">%</span></div>
                </div>
                <div class="kpi-card">
                    <div class="kpi-label">Sin Push +90d</div>
                    <div class="kpi-value" style="color:#f59e0b">${projects.filter(p => p.daysSincePush > 90).length}</div>
                </div>
                <div class="kpi-card">
                    <div class="kpi-label">Alertas Activas</div>
                    <div class="kpi-value" style="color:#ef4444">${kpis.activeAlerts}</div>
                </div>
            </div>

            <!-- Tabla UI5 -->
            <ui5-table>
                <ui5-table-header-row slot="headerRow">
                    <ui5-table-header-cell>ID</ui5-table-header-cell>
                    <ui5-table-header-cell>Proyecto</ui5-table-header-cell>
                    <ui5-table-header-cell>Responsable</ui5-table-header-cell>
                    <ui5-table-header-cell>Estado</ui5-table-header-cell>
                    <ui5-table-header-cell>Progreso</ui5-table-header-cell>
                    <ui5-table-header-cell>Último Push</ui5-table-header-cell>
                </ui5-table-header-row>

                ${projects.map(p => `
                <ui5-table-row>
                    <ui5-table-cell><ui5-label>${p.id}</ui5-label></ui5-table-cell>
                    <ui5-table-cell><ui5-label><strong>${p.title}</strong></ui5-label></ui5-table-cell>
                    <ui5-table-cell><ui5-label>${p.owner}</ui5-label></ui5-table-cell>
                    <ui5-table-cell>
                        <ui5-badge color-scheme="${this._statusColor(p.status)}">${p.status}</ui5-badge>
                    </ui5-table-cell>
                    <ui5-table-cell>
                        <ui5-progress-indicator
                            value="${p.progress}"
                            value-state="${this._valueState(p.progress)}"
                            style="min-width:120px">
                        </ui5-progress-indicator>
                    </ui5-table-cell>
                    <ui5-table-cell>
                        <ui5-label>${p.daysSincePush === 999 ? 'Sin actividad' : p.daysSincePush === 0 ? 'Hoy' : `Hace ${p.daysSincePush} días`}</ui5-label>
                    </ui5-table-cell>
                </ui5-table-row>`).join('')}
            </ui5-table>

            <!-- Alertas -->
            <div class="alert-list">
                ${alerts.map(a => `
                <div class="alert-item">
                    <div class="alert-dot dot-${a.severity}"></div>
                    <div>
                        <div class="alert-msg">${a.message}</div>
                        <div class="alert-time">${new Date(a.timestamp).toLocaleString('es-CL')}</div>
                    </div>
                </div>`).join('')}
            </div>
        </section>`;
    }
}

customElements.define('dashboard-sap', DashboardSAP);
