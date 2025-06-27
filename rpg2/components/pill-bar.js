class PillBar extends HTMLElement {
  connectedCallback() {
    this.render();
    this.attachEvents();
  }

  render() {
    const categories = [
      {
        name: "Establishments",
        icon: "🏢",
        description: "Lists all known buildings, shops, and facilities in the region."
      },
      {
        name: "NPC",
        icon: "🧍",
        description: "Profiles and reputations of non-player characters you've met."
      },
      {
        name: "Gear",
        icon: "🧰",
        description: "Your current inventory of equipment, weapons, and tools."
      },
      {
        name: "Loot",
        icon: "🎁",
        description: "Recovered treasure, valuables, or spoils from encounters."
      },
      {
        name: "Consumables",
        icon: "🥤",
        description: "Food, potions, scrolls, and items that can be used or depleted."
      },
      {
        name: "Harvestibles",
        icon: "🌿",
        description: "Gathered natural resources like herbs, minerals, and materials."
      },
      {
        name: "Map",
        icon: "🗺️",
        description: "Explored areas, unlocked locations, and travel markers."
      },
      {
        name: "Stats",
        icon: "📊",
        description: "Current character stats including health, stamina, and attributes."
      },
      {
        name: "Attributes",
        icon: "🎛️",
        description: "Core character traits such as Strength, Intelligence, and Luck."
      },
      {
        name: "System",
        icon: "⚙️",
        description: "Game settings, save/load options, and debug tools."
      }
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
              data-description="${cat.description}"
              data-icon="${cat.icon}"
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
          bubbles: true
        }));
      });
    });
  }
}

if (!customElements.get('pill-bar')) {
  customElements.define('pill-bar', PillBar);
}
