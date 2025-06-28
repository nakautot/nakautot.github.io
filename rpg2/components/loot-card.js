(() => {
  const meta = {
    name: "Loot",
    icon: "🎁",
    description: "Recovered treasure, valuables, or spoils from encounters."
  };

  class LootCard extends HTMLElement {
    connectedCallback() {
      this.innerHTML = /*html*/`
        <div class="p-4 text-sm text-gray-700">${meta.description}</div>
      `;
    }
  }

  if (window.saveMetadataIfNew) {
    window.saveMetadataIfNew(meta);
  }

  if (!customElements.get('loot-card')) {
    customElements.define('loot-card', LootCard);
  }
})();
