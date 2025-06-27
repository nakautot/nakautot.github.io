class LootCard extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div class="p-4 text-sm text-gray-700">Recovered treasure, valuables, or spoils from encounters.</div>`;
  }
}
if (!customElements.get('loot-card')) {
  customElements.define('loot-card', LootCard);
}