class PillBar extends HTMLElement {
  connectedCallback() {
    this.render();
    this.attachEvents();
  }

  render() {
    const categories = [
      { name: "Establishments", icon: "🏢" },
      { name: "NPC", icon: "🧍" },
      { name: "Gear", icon: "🧰" },
      { name: "Loot", icon: "🎁" },
      { name: "Consumables", icon: "🥤" },
      { name: "Harvestibles", icon: "🌿" },
      { name: "Map", icon: "🗺️" },
      { name: "Stats", icon: "📊" },
      { name: "Attributes", icon: "🎛️" }
    ];

    const colorCycle = ['blue', 'green', 'yellow', 'red', 'purple'];

    this.innerHTML = `
      <div class="flex flex-wrap gap-2">
        ${categories.map((cat, i) => {
          const color = colorCycle[i % colorCycle.length];
          return `
            <button
              class="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-${color}-100 text-${color}-800 hover:bg-${color}-200"
              data-name="${cat.name}"
              type="button"
            >
              <span>${cat.icon}</span>
              <span class="hidden sm:inline">${cat.name}</span>
            </button>
          `;
        }).join('')}
      </div>
    `;
  }

  attachEvents() {
    this.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', async () => {
        const name = btn.dataset.name;
        await window.dbSet?.(name);
        document.dispatchEvent(new CustomEvent('pill-clicked', {
          detail: { name },
          bubbles: true
        }));
      });
    });
  }
}

if (!customElements.get('pill-bar')) {
  customElements.define('pill-bar', PillBar);
}
