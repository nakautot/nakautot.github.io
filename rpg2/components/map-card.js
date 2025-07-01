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

  if (window.db.saveMetadataIfNew) {
    window.db.saveMetadataIfNew(meta);
  }

  if (!customElements.get('map-card')) {
    customElements.define('map-card', MapCard);
  }

  window.addEventListener("game-created", (e) => {
    const gameId = e.detail?.ts;
    if (!gameId) return;

    const startTile = {
      tag: "village",
      name: "The Heart of the Village",
      description: "A modest but lively gathering place where travelers arrive, stories begin, and the scent of fresh bread mingles with the clang of distant anvils."
    };

    window.db.saveGameSessionState(gameId, "MAP", {3: {3: startTile}}); //x,y
    window.db.saveGameSessionState(gameId, "CURRENT_LOCATION", {x: 3, y: 3});
  });
})();
