(() => {
  const meta = {
    name: "Establishments",
    icon: "🏢",
    description: "Lists all known buildings, shops, and facilities in the region."
  };

  class EstablishmentsCard extends HTMLElement {
    connectedCallback() {
      this.innerHTML = /*html*/`
        <div class="p-4 text-sm text-gray-700">${meta.description}</div>
      `;
    }
  }

  if (window.saveMetadataIfNew) {
    window.saveMetadataIfNew(meta);
  }

  if (!customElements.get('establishments-card')) {
    customElements.define('establishments-card', EstablishmentsCard);
  }
})();
