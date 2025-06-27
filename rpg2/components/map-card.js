class MapCard extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div class="p-4 text-sm text-gray-700">Explored areas, unlocked locations, and travel markers.</div>`;
  }
}
if (!customElements.get('map-card')) {
  customElements.define('map-card', MapCard);
}