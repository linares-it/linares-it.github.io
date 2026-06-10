/**
 * src/services/chatWorkflow.js
 *
 * Define el flujo conversacional del chatbot y la lógica de navegación
 * entre nodos. Separado de la presentación (ChatWidget).
 */

import { submitToWeb3Forms } from "./web3forms.service.js";

export const CHAT_FLOW = {
  inicio: {
    texto: "\u00A1Hola! \uD83D\uDC4B Gracias por visitarnos. \u00BFEn qu\u00E9 te puedo ayudar hoy?",
    opciones: [
      { texto: "\uD83D\uDD0E Ver servicios/productos", siguiente: "servicios" },
      { texto: "\uD83D\uDCDE Hablar con un especialista", siguiente: "contacto" }
    ]
  },
  servicios: {
    texto: "Ofrecemos consultor\u00EDas en arquitectura TI y desarrollo de software a medida. \u00BFTe interesa agendar una sesi\u00F3n estrat\u00E9gica?",
    opciones: [
      { texto: "\uD83D\uDDD5\uFE0F S\u00ED, me interesa", siguiente: "captura_lead" },
      { texto: "\u2B05\uFE0F Volver al men\u00FA", siguiente: "inicio" }
    ]
  },
  contacto: {
    texto: "Perfecto. D\u00E9janos tu correo y te contactaremos.",
    opciones: [
      { texto: "\u270D\uFE0F Dejar mis datos", siguiente: "captura_lead" },
      { texto: "\u2B05\uFE0F Volver al men\u00FA", siguiente: "inicio" }
    ]
  },
  captura_lead: {
    texto: "Por favor, ingresa tu correo electr\u00F3nico para agendar el contacto:",
    tipo: "input",
    siguiente: "fin"
  },
  fin: {
    texto: "\u00A1Datos recibidos con \u00E9xito! \uD83D\uDE80 Nos pondremos en contacto contigo muy pronto. \u00A1Que tengas un excelente d\u00EDa!",
    opciones: [
      { texto: "\uD83D\uDD04 Reiniciar chat", siguiente: "inicio" }
    ]
  }
};

/**
 * Obtiene el nodo del flujo con el ID dado.
 * @param {string} nodeId
 * @returns {object|null} El nodo del flujo o null si no existe.
 */
export function getNode(nodeId) {
  return CHAT_FLOW[nodeId] ?? null;
}

/**
 * Captura un lead registrado en el chat.
 * Envía los datos a Web3Forms para notificación por email.
 * @param {string} email
 * @returns {Promise<{ok: boolean, error?: string}>}
 */
export async function captureLead(email) {
  const payload = new FormData();
  payload.append("name", "Lead desde Chatbot");
  payload.append("email", email);
  payload.append("message", `Lead capturado desde el chat de la landing: ${email}`);
  return submitToWeb3Forms(payload);
}
