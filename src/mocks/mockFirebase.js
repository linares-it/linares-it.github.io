// src/mocks/mockFirebase.js
// Simula ENDPOINT_FIREBASE — drop-in para desarrollo

const MOCK_DELAY_MS = 400;

const _db = {
  projects: [
    { id: "PRJ-001", title: "Migration SAP S/4HANA", status: "active",
      owner: "María García", progress: 72, budget: 120000, spent: 86400,
      updatedAt: "2026-05-28T10:30:00Z" },
    { id: "PRJ-002", title: "Fiori Launchpad Setup", status: "review",
      owner: "Carlos Ruiz", progress: 95, budget: 45000, spent: 43200,
      updatedAt: "2026-05-30T08:00:00Z" },
    { id: "PRJ-003", title: "IA Predictiva Inventario", status: "planned",
      owner: "Ana Torres", progress: 12, budget: 200000, spent: 24000,
      updatedAt: "2026-05-29T14:15:00Z" },
  ],
  kpis: {
    totalProjects: 3,
    activeAlerts: 5,
    budgetUsedPct: 64,
    avgProgress: 59,
  },
  alerts: [
    { id: "ALR-001", severity: "high", message: "Presupuesto PRJ-002 al 96%",
      timestamp: "2026-05-31T09:00:00Z" },
    { id: "ALR-002", severity: "medium", message: "Tarea pendiente: revisión QA",
      timestamp: "2026-05-30T17:30:00Z" },
  ],
};

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const ENDPOINT_FIREBASE = {
  /** GET /projects */
  getProjects: async () => {
    await delay(MOCK_DELAY_MS);
    return { ok: true, data: _db.projects };
  },

  /** GET /projects/:id */
  getProjectById: async (id) => {
    await delay(MOCK_DELAY_MS);
    const project = _db.projects.find((p) => p.id === id);
    if (!project) return { ok: false, error: "Not found" };
    return { ok: true, data: project };
  },

  /** GET /kpis */
  getKPIs: async () => {
    await delay(MOCK_DELAY_MS);
    return { ok: true, data: _db.kpis };
  },

  /** GET /alerts */
  getAlerts: async () => {
    await delay(MOCK_DELAY_MS);
    return { ok: true, data: _db.alerts };
  },

  /** POST /projects (crea uno nuevo) */
  createProject: async (payload) => {
    await delay(MOCK_DELAY_MS);
    const newProject = {
      ...payload,
      id: `PRJ-00${_db.projects.length + 1}`,
      updatedAt: new Date().toISOString(),
    };
    _db.projects.push(newProject);
    return { ok: true, data: newProject };
  },
};