class StackGrid extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        *, *::before, *::after { box-sizing: border-box; }

        :host {
          display: block;
          font-family: "72", "72full", Arial, Helvetica, sans-serif;
        }

        .section {
          padding: 80px 24px;
          background-color: #0f172a;
        }

        .inner {
          max-width: 1152px;
          margin: 0 auto;
        }

        .header {
          text-align: center;
          margin-bottom: 48px;
        }

        .header h2 {
          font-size: 2.25rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 12px;
        }

        .header p {
          font-size: 1.125rem;
          color: #9ca3af;
          max-width: 640px;
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
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .card {
          background-color: #1e293b;
          padding: 24px;
          border-radius: 16px;
          border: 1px solid #1f2937;
          transition: border-color 0.2s;
        }
        .card:hover {
          border-color: rgba(59, 130, 246, 0.5);
        }

        .card-icon {
          font-size: 2.25rem;
          margin-bottom: 16px;
        }

        .sap-logo {
          height: 28px;
          width: auto;
        }

        .card h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 8px;
        }

        .card p {
          font-size: 0.875rem;
          color: #9ca3af;
        }

        .footer-link {
          text-align: center;
          margin-top: 40px;
        }

        .footer-link a {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #60a5fa;
          font-weight: 500;
          text-decoration: none;
        }
        .footer-link a:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .grid { grid-template-columns: repeat(2, 1fr); }
        }
      </style>

      <section class="section">
        <div class="inner">
          <h2 class="section-title">Stack Tecnol&oacute;gico</h2>         
          
          <div class="grid">
            <div class="card">
              <div class="card-icon">
                <img src="https://www.sap.com/dam/application/shared/logos/sap-logo-svg.svg/sap-logo-svg.svg"
                     alt="SAP" class="sap-logo" width="28" height="28" loading="lazy">
              </div>
              <h3>SAP</h3>
              <p>ABAP &bull; RAP &bull; Clean Core &bull; Fiori Elements &bull; OData &bull; BTP</p>
            </div>

            <div class="card">
              <div class="card-icon">&#x1F9E0;</div>
              <h3>Inteligencia Artificial</h3>
              <p>LangChain &bull; Llama.cpp &bull; RAG &bull; Agentes Aut&oacute;nomos &bull; MCP &bull; Ollama</p>
            </div>

            <div class="card">
              <div class="card-icon">&#x1F40D;</div>
              <h3>Backend</h3>
              <p>Python &bull; FastAPI &bull; Docker &bull; PostgreSQL &bull; SQLite</p>
            </div>

            <div class="card">
              <div class="card-icon">&#x26A1;</div>
              <h3>Frontend</h3>
              <p>JavaScript &bull; Tailwind CSS &bull; HTML5 &bull; UI5/Fiori</p>
            </div>
          </div>

          <div class="footer-link">
            <a href="#proyectos">Ver proyectos con estas tecnolog&iacute;as &rarr;</a>
          </div>
        </div>
        </div>
      </section>
    `;

    this._wireAnchors();
  }

  _wireAnchors() {
    this.shadowRoot.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }
}

customElements.define('stack-grid', StackGrid);
