class EspecialidadesGrid extends HTMLElement {
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
          padding: 64px 24px;
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
          gap: 24px;
        }

        .card {
          padding: 32px;
          background-color: #1e293b;
          border-radius: 16px;
          border: 1px solid #1f2937;
          transition: border-color 0.2s;
        }
        .card:hover {
          border-color: rgba(59, 130, 246, 0.5);
        }

        .icon {
          color: #3b82f6;
          margin-bottom: 16px;
          font-size: 2rem;
          transition: transform 0.2s;
        }
        .card:hover .icon {
          transform: scale(1.1);
        }

        .card h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 12px;
        }

        .card p {
          font-size: 0.875rem;
          color: #9ca3af;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .grid { grid-template-columns: 1fr; }
        }
      </style>

      <section class="section">
      <div class="inner">
          <h2 class="section-title">Especialidades</h2>         
        <div class="grid">
          <div class="card">
            <div class="icon"><i class="fas fa-database"></i></div>
            <h3>Modernizaci&oacute;n SAP</h3>
            <p>Evoluci&oacute;n del c&oacute;digo hacia el paradigma Clean Core
              mediante SAP RAP. Exposici&oacute;n de l&oacute;gica de negocio limpia v&iacute;a OData y Fiori Elements.</p>
          </div>
          <div class="card">
            <div class="icon"><i class="fas fa-brain"></i></div>
            <h3>Arquitectura de IA</h3>
            <p>Dise&ntilde;o e implementaci&oacute;n de sistemas RAG locales y
              agentes aut&oacute;nomos utilizando frameworks modernos como LangChain y Model Context Protocol (MCP).</p>
          </div>
          <div class="card">
            <div class="icon"><i class="fas fa-cogs"></i></div>
            <h3>Eficiencia Operativa</h3>
            <p>Optimizaci&oacute;n de servicios AMS mediante la
              automatizaci&oacute;n de procesos cr&iacute;ticos y scripts avanzados en Python, asegurando la continuidad
              operacional.</p>
          </div>
        </div>
        </div>
      </section>
    `;
  }
}

customElements.define('especialidades-grid', EspecialidadesGrid);
