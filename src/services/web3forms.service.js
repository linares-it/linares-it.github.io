/**
 * src/services/web3forms.service.js
 *
 * Servicio centralizado para el envío de formularios
 * a través de la API de Web3Forms.
 */

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = "6d4209bf-aebe-4a6a-8936-41f51c8616ad";

/**
 * Envía datos a Web3Forms.
 * @param {FormData|object} payload - FormData o plain object con name, email, message.
 * @returns {Promise<{ok: boolean, error?: string}>}
 */
export async function submitToWeb3Forms(payload) {
  try {
    const body = payload instanceof FormData ? payload : new FormData();
    if (!(payload instanceof FormData)) {
      Object.entries(payload).forEach(([key, value]) => body.append(key, value));
    }

    body.append("access_key", ACCESS_KEY);

    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      body,
    });

    if (!res.ok) {
      return { ok: false, error: `HTTP ${res.status}` };
    }

    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}
