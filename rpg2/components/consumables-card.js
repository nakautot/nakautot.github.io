(() => {
  const meta = {
    name: "Consumables",
    icon: "🥤",
    description: "Food, potions, scrolls, and items that can be used or depleted."
  };

  class ConsumablesCard extends HTMLElement {
    connectedCallback() {
      this.innerHTML = /*html*/`
        <div class="p-4 text-sm text-gray-700">${meta.description}</div>
      `;
    }
  }

  if (window.saveMetadataIfNew) {
    window.saveMetadataIfNew(meta);
  }

  if (!customElements.get('consumables-card')) {
    customElements.define('consumables-card', ConsumablesCard);
  }
})();
