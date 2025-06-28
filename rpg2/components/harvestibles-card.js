(() => {
  const meta = {
    name: "Harvestibles",
    icon: "🌿",
    description: "Gathered natural resources like herbs, minerals, and materials."
  };

  class HarvestiblesCard extends HTMLElement {
    connectedCallback() {
      this.innerHTML = /*html*/`
        <div class="flex items-start gap-2 bg-blue-50 border border-blue-200 p-3 rounded text-xs text-blue-700">
          <span class="text-base">ℹ️</span>
          <p class="leading-snug">${meta.description}</p>
        </div>
      `;
    }
  }

  if (window.saveMetadataIfNew) {
    window.saveMetadataIfNew(meta);
  }

  if (!customElements.get('harvestibles-card')) {
    customElements.define('harvestibles-card', HarvestiblesCard);
  }
})();
