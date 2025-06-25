class MyFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer style="margin-top: 2rem; text-align: center;">
        <sl-divider></sl-divider>
        <p>&copy; 2025 Your Name</p>
      </footer>
    `;
  }
}
customElements.define('my-footer', MyFooter);
