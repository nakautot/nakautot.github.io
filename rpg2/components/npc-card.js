(() => {
  const meta = {
    name: "NPC",
    icon: "🧍",
    description: "Profiles and reputations of non-player characters you've met."
  };

  class NpcCard extends HTMLElement {
    connectedCallback() {
      this.innerHTML = /*html*/`
        <div class="p-4 text-sm text-gray-700">${meta.description}</div>
      `;
    }
  }

  if (window.saveMetadataIfNew) {
    window.saveMetadataIfNew(meta);
  }

  if (!customElements.get('npc-card')) {
    customElements.define('npc-card', NpcCard);
  }
})();
