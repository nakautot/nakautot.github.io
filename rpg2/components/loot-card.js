(() => {
  const meta = {
    name: "Loot",
    icon: "🎁",
    description: "Recovered treasure, valuables, or spoils from encounters."
  };

  class LootCard extends HTMLElement {
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

  if (!customElements.get('loot-card')) {
    customElements.define('loot-card', LootCard);
  }
})();
