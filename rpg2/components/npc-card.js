class NpcCard extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div class="p-4 text-sm text-gray-700">Profiles and reputations of non-player characters you've met.</div>`;
  }
}
if (!customElements.get('npc-card')) {
  customElements.define('npc-card', NpcCard);
}