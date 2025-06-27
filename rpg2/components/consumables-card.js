class ConsumablesCard extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div class="p-4 text-sm text-gray-700">Food, potions, scrolls, and items that can be used or depleted.</div>`;
  }
}
if (!customElements.get('consumables-card')) {
  customElements.define('consumables-card', ConsumablesCard);
}