(() => {
  const meta = {
    name: "Harvestibles",
    icon: "🌿",
    description: "Gathered natural resources like herbs, minerals, and materials."
  };

  class HarvestiblesCard extends HTMLElement {
    connectedCallback() {
      this.innerHTML = /*html*/`
        <div class="p-4 text-sm text-gray-700">${meta.description}</div>
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
