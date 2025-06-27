class GearCard extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div class="p-4 text-sm text-gray-700">Your current inventory of equipment, weapons, and tools.</div>`;
  }
}
if (!customElements.get('gear-card')) {
  customElements.define('gear-card', GearCard);
}