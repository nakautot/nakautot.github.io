(() => {
  const meta = {
    name: "Stats",
    icon: "📊",
    description: "Current character stats including health, stamina, and attributes."
  };

  class StatsCard extends HTMLElement {
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

  if (!customElements.get('stats-card')) {
    customElements.define('stats-card', StatsCard);
  }
})();
