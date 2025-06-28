(() => {
  const meta = {
    name: "Establishments",
    icon: "🏢",
    description: "Lists all known buildings, shops, and facilities in the region."
  };

  class EstablishmentsCard extends HTMLElement {
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

  if (!customElements.get('establishments-card')) {
    customElements.define('establishments-card', EstablishmentsCard);
  }
})();
