/**
 * src/services/gist.service.js
 *
 * Fetch de health-data.json desde Gist público.
 * Si el endpoint falla, cae al mock local para no romper el componente.
 */

import { ENDPOINT_FIREBASE as MOCK } from "../mocks/mockFirebase.js";

const GIST_API_URL = "https://api.github.com/gists/a8a06976abef25d65744407486b88964";

async function fetchGist() {
    try {
        const res = await fetch(GIST_API_URL, {
            headers: { "Accept": "application/vnd.github+json" }
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const data = JSON.parse(json.files["health-data.json"].content);
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
