const container = document.getElementById('pill-bar');

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

container.innerHTML = `
  <div class="flex flex-wrap gap-2">
    ${categories.map((cat, index) => {
      const color = colorCycle[index % colorCycle.length];
      const bg = `bg-${color}-100`;
      const text = `text-${color}-800`;
      const hover = `hover:bg-${color}-200`;
      return `
        <button
          class="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${bg} ${text} ${hover}"
          data-name="${cat.name}"
        >
          <span>${cat.icon}</span> ${cat.name}
        </button>
      `;
    }).join('')}
  </div>
`;

container.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => {
    const name = btn.dataset.name;
    container.dispatchEvent(new CustomEvent('pill-clicked', {
      detail: { name },
      bubbles: true
    }));
  });
});
