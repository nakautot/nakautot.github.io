(() => {
  const meta = {
    name: "Attributes",
    icon: "🎛️",
    description: "Core character traits such as Strength, Intelligence, and Luck."
  };

  class AttributesCard extends HTMLElement {
    connectedCallback() {
      this.innerHTML = /*html*/`
      <div class="p-4 text-sm text-gray-700">${meta.description}</div>`;
    }
  }

  if (window.saveMetadataIfNew) {
    window.saveMetadataIfNew(meta);
  }

  if (!customElements.get('attributes-card')) {
    customElements.define('attributes-card', AttributesCard);
  }
})();