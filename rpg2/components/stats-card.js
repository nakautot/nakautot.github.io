class StatsCard extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div class="p-4 text-sm text-gray-700">Current character stats including health, stamina, and attributes.</div>`;
  }
}
if (!customElements.get('stats-card')) {
  customElements.define('stats-card', StatsCard);
}