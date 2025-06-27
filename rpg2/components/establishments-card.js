class EstablishmentsCard extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="p-4 text-sm text-gray-700">
        Lists all known buildings, shops, and facilities in the region.
      </div>
    `;
  }
}
if (!customElements.get('establishments-card')) {
  customElements.define('establishments-card', EstablishmentsCard);
}