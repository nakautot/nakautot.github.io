class MyHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header style="
        width: 100%;
        background-color: var(--sl-color-primary-600);
        color: white;
        padding: 1rem;
        font-size: 1.5rem;
        font-weight: bold;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      ">
        RPG
      </header>
    `;
  }
}

customElements.define('my-header', MyHeader);
