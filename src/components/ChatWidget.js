import { getNode, captureLead } from "../services/chatWorkflow.js";

class ChatWidget extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._currentNode = null;
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

        *, *::before, *::after { box-sizing: border-box; }

        :host {
          display: block;
          font-family: "72", "72full", Arial, Helvetica, sans-serif;
        }

        /* ── Pestaña lateral ── */
        .chat-tab {
          position: fixed;
          right: 0;
          bottom: 120px;
          background-color: #3b82f6;
          color: white;
          border: none;
          padding: 14px 10px;
          border-radius: 8px 0 0 8px;
          cursor: pointer;
          z-index: 1001;
          writing-mode: vertical-rl;
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.5px;
          box-shadow: -2px 4px 12px rgba(0, 0, 0, 0.25);
          transition: background-color 0.2s, padding 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .chat-tab:hover {
          background-color: #2563eb;
          padding-right: 14px;
        }
        .chat-tab i {
          font-size: 18px;
          writing-mode: horizontal-tb;
        }

        /* ── Overlay ── */
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.35);
          z-index: 1001;
          opacity: 1;
          transition: opacity 0.3s ease-in-out;
        }
        .overlay.hidden {
          opacity: 0;
          pointer-events: none;
        }

        /* ── Panel lateral ── */
        .panel {
          position: fixed;
          right: 0;
          top: 0;
          bottom: 0;
          width: 380px;
          max-width: 90vw;
          background-color: #1e293b;
          z-index: 1002;
          transform: translateX(100%);
          transition: transform 0.3s ease-in-out;
          display: flex;
          flex-direction: column;
          border-left: 1px solid #334155;
          box-shadow: -4px 0 20px rgba(0, 0, 0, 0.3);
        }
        .panel.open {
          transform: translateX(0);
        }

        /* ── Header del panel ── */
        .panel-header {
          background-color: #3b82f6;
          color: white;
          padding: 16px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-shrink: 0;
        }
        .panel-header h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
        }
        .close-btn {
          background: none;
          border: none;
          color: white;
          font-size: 22px;
          cursor: pointer;
          line-height: 1;
          padding: 0 4px;
          transition: opacity 0.2s;
        }
        .close-btn:hover { opacity: 0.8; }

        /* ── Body del panel ── */
        .panel-body {
          flex: 1;
          padding: 16px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
          background-color: #0f172a;
        }

        /* ── Mensajes ── */
        .msg {
          padding: 10px 14px;
          border-radius: 15px;
          max-width: 85%;
          font-size: 14px;
          line-height: 1.4;
        }
        .msg.bot {
          background-color: #1e293b;
          color: #d1d5db;
          align-self: flex-start;
          border-top-left-radius: 2px;
          border: 1px solid #334155;
        }
        .msg.user {
          background-color: #3b82f6;
          color: white;
          align-self: flex-end;
          border-top-right-radius: 2px;
        }

        /* ── Acciones ── */
        .panel-actions {
          padding: 12px;
          background-color: #1e293b;
          border-top: 1px solid #334155;
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex-shrink: 0;
        }

        .chat-btn {
          background-color: transparent;
          border: 1px solid #3b82f6;
          color: #60a5fa;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          font-family: inherit;
          transition: background-color 0.2s, color 0.2s;
          text-align: left;
        }
        .chat-btn:hover {
          background-color: #3b82f6;
          color: white;
        }

        .chat-form {
          display: flex;
          gap: 5px;
          width: 100%;
        }
        .chat-input {
          flex: 1;
          padding: 8px;
          border: 1px solid #475569;
          border-radius: 4px;
          background-color: #0f172a;
          color: white;
          font-size: 14px;
          font-family: inherit;
          outline: none;
        }
        .chat-input:focus {
          border-color: #3b82f6;
        }
        .chat-input::placeholder {
          color: #64748b;
        }
        .chat-submit {
          background-color: #16a34a;
          color: white;
          border: none;
          padding: 8px 15px;
          border-radius: 4px;
          cursor: pointer;
          font-family: inherit;
          font-size: 14px;
          transition: background-color 0.2s;
        }
        .chat-submit:hover {
          background-color: #15803d;
        }

        .hidden { display: none !important; }
      </style>

      <!-- Pestaña lateral -->
      <button class="chat-tab" aria-label="Abrir chat">
        <i class="fab fa-comments"></i>
        <span>Chat</span>
      </button>

      <!-- Overlay -->
      <div class="overlay hidden"></div>

      <!-- Panel lateral -->
      <div class="panel">
        <div class="panel-header">
          <h3>Asistente Virtual</h3>
          <button class="close-btn" aria-label="Cerrar chat">&times;</button>
        </div>
        <div class="panel-body"></div>
        <div class="panel-actions"></div>
      </div>
    `;

    this._tab = this.shadowRoot.querySelector('.chat-tab');
    this._overlay = this.shadowRoot.querySelector('.overlay');
    this._panel = this.shadowRoot.querySelector('.panel');
    this._body = this.shadowRoot.querySelector('.panel-body');
    this._actions = this.shadowRoot.querySelector('.panel-actions');

    this._tab.addEventListener('click', () => this._toggle());
    this._overlay.addEventListener('click', () => this._toggle());
    this.shadowRoot.querySelector('.close-btn').addEventListener('click', () => this._toggle());
  }

  _toggle() {
    const isOpen = this._panel.classList.toggle('open');
    this._overlay.classList.toggle('hidden', !isOpen);

    if (isOpen && this._body.children.length === 0) {
      this._irANodo('inicio');
    }
  }

  _irANodo(nodoId) {
    this._currentNode = nodoId;
    const nodo = getNode(nodoId);
    this._actions.innerHTML = '';
    if (nodoId === 'inicio') this._body.innerHTML = '';

    setTimeout(() => {
      const botMsg = document.createElement('div');
      botMsg.className = 'msg bot';
      botMsg.textContent = nodo.texto;
      this._body.appendChild(botMsg);
      this._body.scrollTop = this._body.scrollHeight;

      if (nodo.tipo === 'input') {
        this._renderizarInput(nodo.siguiente);
      } else if (nodo.opciones) {
        this._renderizarBotones(nodo.opciones);
      }
    }, 400);
  }

  _renderizarBotones(opciones) {
    opciones.forEach(opcion => {
      const btn = document.createElement('button');
      btn.className = 'chat-btn';
      btn.textContent = opcion.texto;
      btn.addEventListener('click', () => {
        const userMsg = document.createElement('div');
        userMsg.className = 'msg user';
        userMsg.textContent = opcion.texto;
        this._body.appendChild(userMsg);
        this._irANodo(opcion.siguiente);
      });
      this._actions.appendChild(btn);
    });
  }

  _renderizarInput(siguienteNodo) {
    const form = document.createElement('form');
    form.className = 'chat-form';
    form.innerHTML = `
      <input type="email" required placeholder="tu@correo.com" class="chat-input">
      <button type="submit" class="chat-submit">Enviar</button>
    `;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.chat-input');
      const emailValue = input.value;

      const userMsg = document.createElement('div');
      userMsg.className = 'msg user';
      userMsg.textContent = emailValue;
      this._body.appendChild(userMsg);

      captureLead(emailValue);

      this._irANodo(siguienteNodo);
    });

    this._actions.appendChild(form);
  }
}

customElements.define('chat-widget', ChatWidget);
