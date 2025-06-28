(() => {
  const meta = {
    name: "Stats",
    icon: "📊",
    description: "Current character stats including health, stamina, and attributes."
  };

  class StatsCard extends HTMLElement {
    connectedCallback() {
      this.innerHTML = /*html*/`
        <div class="p-4 text-sm text-gray-700">${meta.description}</div>
      `;
    }
  }

  if (window.saveMetadataIfNew) {
    window.saveMetadataIfNew(meta);
  }

  if (!customElements.get('stats-card')) {
    customElements.define('stats-card', StatsCard);
  }
})();
