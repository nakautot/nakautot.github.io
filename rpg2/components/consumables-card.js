(() => {
  const meta = {
    name: "Consumables",
    icon: "🥤",
    description: "Food, potions, scrolls, and items that can be used or depleted."
  };

  class ConsumablesCard extends HTMLElement {
    connectedCallback() {
      this.innerHTML = /*html*/`
        <div class="flex items-start gap-2 bg-blue-50 border border-blue-200 p-3 rounded text-xs text-blue-700">
          <span class="text-base">ℹ️</span>
          <p class="leading-snug">${meta.description}</p>
        </div>
      `;
    }
  }

  if (window.db.saveMetadataIfNew) {
    window.db.saveMetadataIfNew(meta);
  }

  if (!customElements.get('consumables-card')) {
    customElements.define('consumables-card', ConsumablesCard);
  }
})();
