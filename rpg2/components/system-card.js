(() => {
  const meta = {
    name: "System",
    icon: "⚙️",
    description: "Game settings, save/load options, and debug tools."
  };

  class SystemCard extends HTMLElement {
    connectedCallback() {
      this.innerHTML = /*html*/`
        <div class="p-4 text-sm text-gray-700">${meta.description}</div>
      `;
    }
  }

  if (window.saveMetadataIfNew) {
    window.saveMetadataIfNew(meta);
  }

  if (!customElements.get('system-card')) {
    customElements.define('system-card', SystemCard);
  }
})();
