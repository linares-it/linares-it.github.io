/**
 * src/services/gist.service.js
 *
 * Fetch de health-data.json desde Gist público.
 * Si el endpoint falla, cae al mock local para no romper el componente.
 */

import { ENDPOINT_FIREBASE as MOCK } from "../mocks/mockFirebase.js";

// TODO: reemplazar con tu GIST_ID real o leerlo desde un meta tag / variable de entorno
const GIST_RAW_URL = "https://gist.githubusercontent.com/linares-it/a8a06976abef25d65744407486b88964/raw/health-data.json";

/**
 * Intenta fetch al Gist. Si falla, retorna { ok: false, error }.
 */
async function fetchGist() {
    try {
        const res = await fetch(GIST_RAW_URL, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        return { ok: true, data };
    } catch (err) {
        console.warn("[GistService] Gist no disponible, usando mock.", err.message);
        return { ok: false, error: err.message };
    }
}

export const GistService = {

    async getProjects() {
        const result = await fetchGist();
        if (!result.ok) return MOCK.getProjects();
        return {
            ok:   true,
            data: result.data.projects ?? [],
        };
    },

    async getKPIs() {
        const result = await fetchGist();
        if (!result.ok) return MOCK.getKPIs();
        return {
            ok:   true,
            data: result.data.kpis ?? {
                totalProjects: 0,
                avgProgress:   0,
                budgetUsedPct: 0,
                activeAlerts:  0,
            },
        };
    },

    async getAlerts() {
        const result = await fetchGist();
        if (!result.ok) return MOCK.getAlerts();
        return {
            ok:   true,
            data: result.data.alerts ?? [],
        };
    },
};
