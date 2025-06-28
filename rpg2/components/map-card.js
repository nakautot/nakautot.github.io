(() => {
  const meta = {
    name: "Map",
    icon: "🗺️",
    description: "Explored areas, unlocked locations, and travel markers."
  };

  class MapCard extends HTMLElement {
    connectedCallback() {
      this.innerHTML = /*html*/`
        <div class="p-4 text-sm text-gray-700">${meta.description}</div>
      `;
    }
  }

  if (window.saveMetadataIfNew) {
    window.saveMetadataIfNew(meta);
  }

  if (!customElements.get('map-card')) {
    customElements.define('map-card', MapCard);
  }
})();
