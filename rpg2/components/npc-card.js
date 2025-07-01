(() => {
  const meta = {
    name: "NPC",
    icon: "🧍",
    description: "Profiles and reputations of non-player characters you've met."
  };

  const npcIcons = [
    { icon: "🧠", tags: ["scholar", "alchemist", "sage", "astronomer", "philosopher", "scribe", "runemaster", "psion", "oracle", "enchanter"] },
    { icon: "🗣️", tags: ["bard", "herald", "diplomat", "orator", "storyteller", "ambassador", "minstrel", "chanter", "prophet", "town crier"] },
    { icon: "👤", tags: ["scout", "wanderer", "survivor", "nomad", "drifter", "tracker", "vagabond", "stranger", "ranger", "explorer"] },
    { icon: "👥", tags: ["tribesman", "clansman", "militia", "caravaner", "guildmaster", "raiding party", "cultist", "entourage", "fellowship", "brigade"] },
    { icon: "🤖", tags: ["golem", "automatron", "clockwork knight", "arcane construct", "steel sentinel", "spellforged", "mechadwarf", "manikin", "runebot", "iron monk"] },
    { icon: "👽", tags: ["voidspawn", "starborn", "eldritch kin", "planar exile", "cosmic herald", "fleshshaper", "dreamwalker", "mind leech", "dimensionalist", "outsider"] },
    { icon: "👮", tags: ["guard", "watchman", "marshal", "sheriff", "sentinel", "constable", "bailiff", "enforcer", "warden", "militiaman"] },
    { icon: "🕵️", tags: ["inquisitor", "spymaster", "agent", "interrogator", "tracker", "shadowblade", "cloak", "informant", "truthseeker", "sleuth"] },
    { icon: "👷", tags: ["builder", "stonemason", "blacksmith", "tinkerer", "architect", "engineer", "repairman", "laborer", "forgemaster", "digger"] },
    { icon: "🧑‍⚕️", tags: ["healer", "medic", "plague doctor", "physician", "apothecary", "anatomist", "herbalist", "lifeweaver", "bonebinder", "chirurgeon"] },
    { icon: "🧑‍🏫", tags: ["mentor", "trainer", "lecturer", "coach", "headmaster", "instructor", "loremaster", "drillmaster", "spell tutor", "guild elder"] },
    { icon: "🧑‍🍳", tags: ["cook", "camp chef", "feastmaster", "baker", "butcher", "provisioner", "brewer", "culinarian", "rationmaster", "spice monk"] },
    { icon: "🧙", tags: ["wizard", "sorcerer", "warlock", "magus", "conjurer", "necromancer", "archmage", "evoker", "diviner", "abjurer"] },
    { icon: "🧛", tags: ["vampire", "nightkin", "bloodlord", "nosferatu", "leech prince", "fang maiden", "thrall master", "daywalker", "dark noble", "crimson shade"] },
    { icon: "🧝", tags: ["elf", "highborn", "moon dancer", "grovekeeper", "blade singer", "arcane archer", "forest warden", "loreweaver", "sunstrider", "willow whisper"] },
    { icon: "🧞", tags: ["djinn", "wishkeeper", "elemental", "lampbound", "tempest lord", "genie", "etherkin", "sandshaper", "smokewalker", "binding spirit"] }
  ];

  class NpcCard extends HTMLElement {
    connectedCallback() {
      this.render();
    }

    async render() {
      this.innerHTML = '';
      const wrapper = document.createElement('div');
      wrapper.className = 'space-y-4 text-sm text-gray-800';

      const infoBox = document.createElement('div');
      infoBox.className = 'flex items-start gap-2 bg-blue-50 border border-blue-200 p-3 rounded text-xs text-blue-700';
      infoBox.innerHTML = `
        <span class="text-base">ℹ️</span>
        <p class="leading-snug">${meta.description}</p>
      `;
      wrapper.appendChild(infoBox);

      const gameId = await window.db.dbGetKey?.('activeGameId');
      if (!gameId) {
        this.appendChild(wrapper);
        return;
      }

      const list = await window.db.getGameSessionState(gameId, "NPC") || [];
      const map = await window.db.getGameSessionState(gameId, "MAP") || [];

      if (!list.length) {
        this.appendChild(wrapper);
        return;
      }

      const grouped = list.reduce((acc, npc) => {
        const key = `${npc.x}:${npc.y}`;
        acc[key] = acc[key] || [];
        acc[key].push(npc);
        return acc;
      }, {});

      // Render -1,-1 first with name-based title
      const primeKey = "-1:-1";
      if (grouped[primeKey]) {
        const prime = grouped[primeKey];
        const section = document.createElement('section');
        section.className = 'border-t pt-2';

        const header = document.createElement('h3');
        header.className = 'text-xs text-gray-500';
        header.textContent = `${prime[0].name} (-1,-1)`;
        section.appendChild(header);

        prime.forEach(npc => {
          const row = document.createElement('div');
          row.className = 'pl-2 py-1';

          const icon = npcIcons.find(i => i.tags.includes(npc.type))?.icon || '❓';
          row.innerHTML = `<div class="flex gap-2 items-start">
            <span>${icon}</span>
            <div>
              <div class="font-semibold">${npc.name}</div>
              <div class="text-xs text-gray-600">${npc.bio}</div>
            </div>
          </div>`;
          section.appendChild(row);
        });

        wrapper.appendChild(section);
        delete grouped[primeKey]; // prevent double render
      }

      for (const [coord, npcs] of Object.entries(grouped)) {
        const [x, y] = coord.split(':').map(Number);
        const block = map.find(b => b.x === x && b.y === y);
        const title = block?.name ? `${block.name} (${x},${y})` : `(${x},${y})`;

        const section = document.createElement('section');
        section.className = 'border-t pt-2';

        const header = document.createElement('h3');
        header.className = 'text-xs text-gray-500';
        header.textContent = title;
        section.appendChild(header);

        npcs.forEach(npc => {
          const row = document.createElement('div');
          row.className = 'pl-2 py-1';

          const icon = npcIcons.find(i => i.tags.includes(npc.type))?.icon || '❓';
          row.innerHTML = `<div class="flex gap-2 items-start">
            <span>${icon}</span>
            <div>
              <div class="font-semibold">${npc.name}</div>
              <div class="text-xs text-gray-600">${npc.bio}</div>
            </div>
          </div>`;
          section.appendChild(row);
        });

        wrapper.appendChild(section);
      }

      this.appendChild(wrapper);
    }
  }

  if (window.db?.saveMetadataIfNew) {
    window.db.saveMetadataIfNew(meta);
  }

  window.addEventListener("game-created", (e) => {
    const gameId = e.detail?.ts;
    if (!gameId) return;

    const npcPrime = {
      x: -1,
      y: -1,
      name: "The Witness of Shattered Skies",
      bio: "A veiled figure who exists between places, haunted by visions they cannot silence. They offer to share their torment, and in doing so, may alter your fate — for better or worse.",
      type: "oracle"
    };

    window.db.saveGameSessionState(gameId, "NPC", [npcPrime]);

    const card = document.querySelector('npc-card');
    if (card?.render) card.render();
  });

  if (!customElements.get('npc-card')) {
    customElements.define('npc-card', NpcCard);
  }
})();
