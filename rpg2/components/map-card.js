(() => {
  const meta = {
    name: "Map",
    icon: "🗺️",
    description: "Explored areas, unlocked locations, and travel markers."
  };

  const startingLocation = { 
    x: 3,
    y: 3,
    tag: "village", 
    name: "The Heart of the Village",
    description: "A modest but lively gathering place where travelers arrive, stories begin, and the scent of fresh bread mingles with the clang of distant anvils."
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

  if (window.db.saveMetadataIfNew) {
    window.db.saveMetadataIfNew(meta);
  }

  if (!customElements.get('map-card')) {
    customElements.define('map-card', MapCard);
  }

  window.addEventListener("game-created", (e) => {
    const gameId = e.detail?.ts;
    if (!gameId) return;

    const entry = { ...startingLocation, gameId };

    if (window.db && window.db.addToListIfMissing) {
      window.db.addToListIfMissing("Map", entry, "gameId", "x", "y");
    }

    if (window.db && window.db.dbSet) {
      window.db.dbSet({ currentX: entry.x, currentY: entry.y, gameId }, "currentMapState");
    }
  });
})();
