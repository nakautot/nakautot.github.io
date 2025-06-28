(() => {
  const meta = {
    name: "Map",
    icon: "🗺️",
    description: "Explored areas, unlocked locations, and travel markers."
  };

  class MapCard extends HTMLElement {
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

  if (!customElements.get('map-card')) {
    customElements.define('map-card', MapCard);
  }
})();
