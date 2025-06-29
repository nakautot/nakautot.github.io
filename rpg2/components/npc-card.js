(() => {
  const meta = {
    name: "NPC",
    icon: "🧍",
    description: "Profiles and reputations of non-player characters you've met."
  };

  const npcIcons = [
    { "icon": "🧠", "tags": ["scholar", "alchemist", "sage", "astronomer", "philosopher", "scribe", "runemaster", "psion", "oracle", "enchanter"] },
    { "icon": "🗣️", "tags": ["bard", "herald", "diplomat", "orator", "storyteller", "ambassador", "minstrel", "chanter", "prophet", "town crier"] },
    { "icon": "👤", "tags": ["scout", "wanderer", "survivor", "nomad", "drifter", "tracker", "vagabond", "stranger", "ranger", "explorer"] },
    { "icon": "👥", "tags": ["tribesman", "clansman", "militia", "caravaner", "guildmaster", "raiding party", "cultist", "entourage", "fellowship", "brigade"] },
    { "icon": "🤖", "tags": ["golem", "automatron", "clockwork knight", "arcane construct", "steel sentinel", "spellforged", "mechadwarf", "manikin", "runebot", "iron monk"] },
    { "icon": "👽", "tags": ["voidspawn", "starborn", "eldritch kin", "planar exile", "cosmic herald", "fleshshaper", "dreamwalker", "mind leech", "dimensionalist", "outsider"] },
    { "icon": "👮", "tags": ["guard", "watchman", "marshal", "sheriff", "sentinel", "constable", "bailiff", "enforcer", "warden", "militiaman"] },
    { "icon": "🕵️", "tags": ["inquisitor", "spymaster", "agent", "interrogator", "tracker", "shadowblade", "cloak", "informant", "truthseeker", "sleuth"] },
    { "icon": "👷", "tags": ["builder", "stonemason", "blacksmith", "tinkerer", "architect", "engineer", "repairman", "laborer", "forgemaster", "digger"] },
    { "icon": "🧑‍⚕️", "tags": ["healer", "medic", "plague doctor", "physician", "apothecary", "anatomist", "herbalist", "lifeweaver", "bonebinder", "chirurgeon"] },
    { "icon": "🧑‍🏫", "tags": ["mentor", "trainer", "lecturer", "coach", "headmaster", "instructor", "loremaster", "drillmaster", "spell tutor", "guild elder"] },
    { "icon": "🧑‍🍳", "tags": ["cook", "camp chef", "feastmaster", "baker", "butcher", "provisioner", "brewer", "culinarian", "rationmaster", "spice monk"] },
    { "icon": "🧙", "tags": ["wizard", "sorcerer", "warlock", "magus", "conjurer", "necromancer", "archmage", "evoker", "diviner", "abjurer"] },
    { "icon": "🧛", "tags": ["vampire", "nightkin", "bloodlord", "nosferatu", "leech prince", "fang maiden", "thrall master", "daywalker", "dark noble", "crimson shade"] },
    { "icon": "🧝", "tags": ["elf", "highborn", "moon dancer", "grovekeeper", "blade singer", "arcane archer", "forest warden", "loreweaver", "sunstrider", "willow whisper"] },
    { "icon": "🧞", "tags": ["djinn", "wishkeeper", "elemental", "lampbound", "tempest lord", "genie", "etherkin", "sandshaper", "smokewalker", "binding spirit"] }
  ];

  const npcPrime = {
    "x": -1,
    "y": -1,
    "name": "The Witness of Shattered Skies",
    "bio": "A veiled figure who exists between places, haunted by visions they cannot silence. They offer to share their torment, and in doing so, may alter your fate — for better or worse.",
    "type": "oracle"
  };

  class NpcCard extends HTMLElement {
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

  if (window.db.addToListIfMissing) {
    window.db.addToListIfMissing("NPC", npcPrime, "name");
  }

  if (!customElements.get('npc-card')) {
    customElements.define('npc-card', NpcCard);
  }
})();
