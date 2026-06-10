class SiteFooter extends HTMLElement {
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

        footer {
          border-top: 1px solid #1f2937;
          padding: 16px 24px;
          background-color: #0f172a;
        }

        .inner {
          max-width: 1024px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .brand {
          font-weight: 700;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          justify-self: start;
        }

        .brand-accent {
          color: #3b82f6;
        }

        .copyright {
          text-align: center;
          font-size: 0.75rem;
          color: #64748b;
        }

        @media (max-width: 768px) {
          .inner {
            flex-direction: column;
            gap: 8px;
          }
        }
      </style>

      <footer>
        <div class="inner">
          <div class="brand">
            LINARES<span class="brand-accent">.IT</span>
          </div>
          <div class="copyright">
            &copy; 2026 Linares IT &middot; Santiago, Chile
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('site-footer', SiteFooter);
