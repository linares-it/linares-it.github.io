class ProyectosGrid extends HTMLElement {
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
          background-color: #0f172a;
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
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }

        .card {
          background-color: #1e293b;
          overflow: hidden;
          border-radius: 16px;
          border: 1px solid #1f2937;
          transition: box-shadow 0.3s;
        }
        .card:hover {
          box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.2);
        }

        .card-body {
          padding: 32px;
        }

        .tag {
          font-size: 0.75rem;
          font-weight: 900;
          color: #3b82f6;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .card h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
          margin-top: 12px;
          margin-bottom: 16px;
        }

        .card p {
          color: #9ca3af;
          font-size: 0.875rem;
          margin-bottom: 24px;
          line-height: 1.6;
        }

        .card-link {
          display: inline-flex;
          align-items: center;
          color: #60a5fa;
          font-weight: 700;
          font-size: 0.875rem;
          text-decoration: none;
          transition: color 0.2s;
        }
        .card-link:hover {
          color: #93c5fd;
        }
        .card-link i {
          margin-left: 8px;
        }

        @media (max-width: 768px) {
          .grid { grid-template-columns: 1fr; }
        }
      </style>

      <section class="section">
        <div class="inner">
          <h2 class="section-title">Proyectos Destacados</h2>
          <div class="grid">
            <div class="card">
              <div class="card-body">
                <span class="tag">IA &amp; RAG</span>
                <h3>Laboratorio RAG Local</h3>
                <p>Desarrollo de un ecosistema RAG local
                  optimizado para entornos de hardware restringidos. Soluci&oacute;n dise&ntilde;ada mediante la compilaci&oacute;n
                  a medida de componentes de inferencia y orquestaci&oacute;n con herramientas ag&eacute;nticas,
                  garantizando la soberan&iacute;a de los datos.</p>
                <a href="https://github.com/linares-it/demo-laboratorio-rag-langchain"
                  target="_blank" class="card-link">
                  EXPLORAR REPOSITORIO <i class="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
            <div class="card">
              <div class="card-body">
                <span class="tag">Seguridad Biom&eacute;trica</span>
                <h3>Auditor&iacute;a de Identidad</h3>
                <p>Soluci&oacute;n de visi&oacute;n artificial para
                  validaci&oacute;n de identidad facial, integrada en flujos de check-in y control de accesos ERP.</p>
                <a href="https://github.com/linares-it/auditoria-identidad-biometrica"
                  target="_blank" class="card-link">
                  EXPLORAR REPOSITORIO <i class="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
            <div class="card">
              <div class="card-body">
                <span class="tag">IA &amp; IoT</span>
                <h3>Mantenimiento Predictivo Ac&uacute;stico</h3>
                <p>Sistema de monitoreo industrial basado en
                  IA para la detecci&oacute;n temprana de fallas mec&aacute;nicas mediante an&aacute;lisis de audio y
                  espectrogramas.</p>
                <a href="https://github.com/linares-it/sistema-mantenimiento-predictivo"
                  target="_blank" class="card-link">
                  EXPLORAR REPOSITORIO <i class="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('proyectos-grid', ProyectosGrid);
