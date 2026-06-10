class SiteHero extends HTMLElement {
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

        header {
          padding: 96px 24px;
          background: linear-gradient(to bottom, #0f172a, #1e293b);
          border-bottom: 1px solid #1f2937;
        }

        .inner {
          max-width: 896px;
          margin: 0 auto;
          text-align: center;
        }

        h1 {
          font-size: 2.5rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 24px;
          line-height: 1.2;
        }

        .subtitle {
          font-size: 1.125rem;
          color: #9ca3af;
          margin-bottom: 40px;
          line-height: 1.6;
        }

        .subtitle strong {
          color: #ffffff;
        }

        .ctas {
          display: flex;
          justify-content: center;
          gap: 16px;
        }

        .btn {
          display: inline-block;
          padding: 12px 32px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 16px;
          text-decoration: none;
          transition: background-color 0.2s;
          cursor: pointer;
        }

        .btn-primary {
          background-color: #3b82f6;
          color: white;
          border: none;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
        }
        .btn-primary:hover {
          background-color: #2563eb;
        }

        .btn-secondary {
          background-color: #1f2937;
          color: white;
          border: 1px solid #374151;
        }
        .btn-secondary:hover {
          background-color: #374151;
        }

        @media (max-width: 768px) {
          h1 { font-size: 1.875rem; }
          .ctas { flex-direction: column; align-items: center; }
        }
      </style>

      <header>
        <div class="inner">
          <h1>Eduardo Linares Pe&ntilde;ailillo 
          </h1>
          <h2>
            Consultor ABAP Senior &amp; Arquitecto de  Soluciones IA
          </h2>
          <p class="subtitle">
            Especializado en la modernizaci&oacute;n de sistemas empresariales bajo estrategia
            <strong>Clean Core</strong> y el dise&ntilde;o de arquitecturas de Inteligencia Artificial locales y
            ag&eacute;nticas.
          </p>
          <div class="ctas">
            <a href="#contacto" class="btn btn-primary">Contactar</a>
            <a href="#proyectos" class="btn btn-secondary">Portafolio</a>
          </div>
        </div>
      </header>
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

customElements.define('site-hero', SiteHero);
