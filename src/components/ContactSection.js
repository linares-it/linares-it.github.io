import { submitToWeb3Forms } from "../services/web3forms.service.js";

class ContactSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
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

        .section {
          padding: 80px 24px;
          background: linear-gradient(to bottom, #0f172a, #1e293b);
          border-top: 1px solid #1f2937;
        }

        .inner {
          max-width: 1024px;
          margin: 0 auto;
        }

        .section-title {
          font-size: 1.875rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 48px;
          display: flex;
          align-items: center;
        }

        .section-title::before {
          content: "";
          display: inline-block;
          width: 48px;
          height: 4px;
          background-color: #3b82f6;
          margin-right: 16px;
          border-radius: 2px;
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: start;
        }

        .info-text {
          color: #9ca3af;
          font-size: 1.125rem;
          line-height: 1.6;
          margin-bottom: 40px;
        }

        .contact-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .contact-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background-color: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #60a5fa;
        }

        .contact-label {
          font-size: 0.75rem;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 4px;
        }

        .contact-value {
          color: #d1d5db;
          font-size: 0.875rem;
        }

        .contact-value a {
          color: #d1d5db;
          text-decoration: none;
          transition: color 0.2s;
        }
        .contact-value a:hover {
          color: #60a5fa;
        }

        .form-card {
          background-color: #1e293b;
          border-radius: 16px;
          border: 1px solid #1f2937;
          padding: 32px;
          overflow: hidden;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-size: 0.75rem;
          font-weight: 500;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 8px;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          background-color: #0f172a;
          border: 1px solid #374151;
          color: #ffffff;
          border-radius: 8px;
          padding: 12px 16px;
          font-size: 0.875rem;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: #4b5563;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 1px #3b82f6;
        }

        .form-group textarea {
          resize: none;
        }

        .form-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 4px;
        }

        .form-status {
          font-size: 0.875rem;
          color: #4ade80;
          display: none;
        }
        .form-status.visible {
          display: inline;
        }

        .submit-btn {
          margin-left: auto;
          background-color: #3b82f6;
          color: white;
          border: none;
          padding: 12px 32px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          font-family: inherit;
          transition: background-color 0.2s, transform 0.1s;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .submit-btn:hover {
          background-color: #2563eb;
        }
        .submit-btn:active {
          transform: scale(0.95);
        }

        @media (max-width: 768px) {
          .grid { grid-template-columns: 1fr; gap: 40px; }
        }
      </style>

      <section class="section">
        <div class="inner">
          <h2 class="section-title">Contacto</h2>

          <div class="grid">
            <div>
              <p class="info-text">
                Encu&eacute;ntrame en mis redes sociales o env&iacute;ame un correo electr&oacute;nico desde el
                formulario de esta p&aacute;gina.
              </p>

              <div class="contact-list">
                <div class="contact-item">
                  <div class="contact-icon"><i class="fab fa-linkedin"></i></div>
                  <div>
                    <div class="contact-label">LinkedIn</div>
                    <div class="contact-value">
                      <a href="https://www.linkedin.com/in/linares-it" target="_blank" rel="noopener">
                        linkedin.com/in/linares-it
                      </a>
                    </div>
                  </div>
                </div>

                <div class="contact-item">
                  <div class="contact-icon"><i class="fab fa-github"></i></div>
                  <div>
                    <div class="contact-label">Github</div>
                    <div class="contact-value">
                      <a href="https://github.com/linares-it" target="_blank" rel="noopener">
                        https://github.com/linares-it
                      </a>
                    </div>
                  </div>
                </div>

                <div class="contact-item">
                  <div class="contact-icon"><i class="fas fa-map-marker-alt"></i></div>
                  <div>
                    <div class="contact-label">Ubicaci&oacute;n</div>
                    <div class="contact-value">Santiago, Chile</div>
                  </div>
                </div>
              </div>
            </div>

            <form class="form-card">
              <div class="form-group">
                <label for="name">Nombre</label>
                <input type="text" id="name" name="name" required placeholder="Tu nombre">
              </div>

              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required placeholder="tu@email.com">
              </div>

              <div class="form-group">
                <label for="message">Mensaje</label>
                <textarea id="message" name="message" required rows="5"
                  placeholder="Cu&eacute;ntame sobre tu proyecto..."></textarea>
              </div>

              <div class="form-footer">
                <span class="form-status">
                  <i class="fas fa-check-circle"></i> Mensaje enviado.
                </span>
                <button type="submit" class="submit-btn">
                  Enviar <i class="fas fa-paper-plane" style="font-size: 0.875rem;"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    `;

    this._wireForm();
  }

  _wireForm() {
    const form = this.shadowRoot.querySelector('.form-card');
    const status = this.shadowRoot.querySelector('.form-status');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const result = await submitToWeb3Forms(data);
      if (result.ok) {
        status.classList.add('visible');
        form.reset();
        setTimeout(() => status.classList.remove('visible'), 5000);
      }
    });
  }
}

customElements.define('contact-section', ContactSection);
