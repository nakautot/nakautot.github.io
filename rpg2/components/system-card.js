class SystemCard extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div class="p-4 text-sm text-gray-700">Game settings, save/load options, and debug tools.</div>`;
  }
}
if (!customElements.get('system-card')) {
  customElements.define('system-card', SystemCard);
}