(() => {
  const meta = {
    name: "Gear",
    icon: "🧰",
    description: "Your current inventory of equipment, weapons, and tools."
  };

  class GearCard extends HTMLElement {
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

  if (!customElements.get('gear-card')) {
    customElements.define('gear-card', GearCard);
  }
})();
