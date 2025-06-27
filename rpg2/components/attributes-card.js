class AttributesCard extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div class="p-4 text-sm text-gray-700">Core character traits such as Strength, Intelligence, and Luck.</div>`;
  }
}
if (!customElements.get('attributes-card')) {
  customElements.define('attributes-card', AttributesCard);
}
