(() => {
  const meta = {
    name: "Stats",
    icon: "📊",
    description: "Current character stats including health, stamina, and attributes."
  };

  const statsData = [
    { shortName: "END", name: "Endurance", description: "Physical stamina, resistance to hunger, cold, and exhaustion. Affects HP, travel, and survival in harsh conditions.", type: "core", icon: "🥾" },
    { shortName: "AWR", name: "Awareness", description: "Perception, danger sense, noticing details like traps, tracks, and resources. Key for ambushes and scavenging.", type: "core", icon: "👁️" },
    { shortName: "WIT", name: "Wits", description: "Quick thinking, puzzle solving, and adaptability. Used in crafting, problem solving, and tactical decisions.", type: "core", icon: "🧠" },
    { shortName: "RES", name: "Resolve", description: "Mental toughness, morale, resistance to fear, panic, and stress. Affects recovery and psychological stability.", type: "core", icon: "🛡️" },
    { shortName: "SKL", name: "Skill", description: "Practical ability with tools, weapons, repairs, and traps. Core for crafting and combat accuracy.", type: "core", icon: "🛠️" },
    { shortName: "CHA", name: "Charisma", description: "Leadership, negotiation, group morale, recruiting or commanding NPCs.", type: "core", icon: "🗣️" },
    { shortName: "LCK", name: "Luck", description: "Chance-based edge in risky scenarios like rare finds or escaping death.", type: "adv", icon: "🍀" },
    { shortName: "VIT", name: "Vitality", description: "Physical health and hardiness. Useful if separating HP from stamina.", type: "adv", icon: "❤️" },
    { shortName: "ING", name: "Ingenuity", description: "Creativity and engineering knowledge. Used in building tools, traps, and solving complex challenges.", type: "adv", icon: "⚙️" },
    { shortName: "FAI", name: "Faith", description: "Spiritual conviction and belief. Useful for games with mysticism, curses, or divine mechanics.", type: "adv", icon: "🙏" },
    { shortName: "HP", name: "Health Points", description: "The total amount of damage a character can take before death.", type: "derived", formula: "END * 5", icon: "🩸" },
    { shortName: "STA", name: "Stamina", description: "The energy available for physical or mental exertion. Used in travel, combat, and hard labor.", type: "derived", formula: "END + RES", icon: "⚡" },
    { shortName: "CARRY", name: "Carry Capacity", description: "The maximum inventory weight the character can carry without penalties.", type: "derived", formula: "END + (SKL / 2)", icon: "🎒" },
    { shortName: "ACC", name: "Combat Accuracy", description: "The precision of attacks with weapons or tools.", type: "derived", formula: "SKL + WIT", icon: "🎯" },
    { shortName: "INFL", name: "Social Influence", description: "A measure of persuasive power in negotiations, commands, or diplomacy.", type: "derived", formula: "CHA + WIT", icon: "🤝" }
  ];

  function renderSection(title, list) {
    const section = document.createElement('section');
    section.className = 'space-y-2';

    const header = document.createElement('h3');
    header.className = 'text-sm font-semibold border-b pb-1';
    header.textContent = title;
    section.appendChild(header);

    list.forEach(stat => {
      const row = document.createElement('div');
      row.className = 'flex items-center justify-between gap-4';

      const label = document.createElement('div');
      label.className = 'flex items-center gap-2 text-sm';

      const icon = document.createElement('span');
      icon.textContent = stat.icon;

      const labelText = document.createElement('span');
      labelText.innerHTML = `${stat.name} <span class="text-gray-400 text-xs">(${stat.shortName})</span>`;

      const info = document.createElement('span');
      info.className = 'cursor-help text-gray-400';
      info.title = stat.description;
      info.textContent = 'ⓘ';

      label.appendChild(icon);
      label.appendChild(labelText);
      label.appendChild(info);

      const value = document.createElement('span');
      value.setAttribute('data-target', stat.shortName);
      value.className = 'font-mono text-sm bg-gray-100 border border-gray-300 rounded px-2 py-0.5 min-w-[2rem] text-center';

      row.appendChild(label);
      row.appendChild(value);

      section.appendChild(row);
    });

    return section;
  }

  class StatsCard extends HTMLElement {
    connectedCallback() {
      this.innerHTML = '';

      const wrapper = document.createElement('div');
      wrapper.className = 'space-y-4 text-sm text-gray-800';

      // Info box
      const infoBox = document.createElement('div');
      infoBox.className = 'flex items-start gap-2 bg-blue-50 border border-blue-200 p-3 rounded text-xs text-blue-700';
      infoBox.innerHTML = /*html*/`
        <span class="text-base">ℹ️</span>
        <p class="leading-snug">${meta.description}</p>
      `;
      wrapper.appendChild(infoBox);

      const derived = statsData.filter(s => s.type === 'derived');
      const core = statsData.filter(s => s.type === 'core');
      const adv = statsData.filter(s => s.type === 'adv');

      wrapper.appendChild(renderSection('Derived Stats', derived));
      wrapper.appendChild(renderSection('Core Stats', core));
      wrapper.appendChild(renderSection('Advanced Stats', adv));

      this.appendChild(wrapper);

      // Save stats to IndexedDB
      if (window.db?.saveStatsToDb) {
        window.db.saveStatsToDb(statsData);
      }
    }
  }

  if (window.db?.saveMetadataIfNew) {
    window.db.saveMetadataIfNew(meta);
  }

  if (!customElements.get('stats-card')) {
    customElements.define('stats-card', StatsCard);
  }
})();
