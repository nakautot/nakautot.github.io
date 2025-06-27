class HarvestiblesCard extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div class="p-4 text-sm text-gray-700">Gathered natural resources like herbs, minerals, and materials.</div>`;
  }
}
if (!customElements.get('harvestibles-card')) {
  customElements.define('harvestibles-card', HarvestiblesCard);
}