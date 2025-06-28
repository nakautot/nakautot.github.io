(() => {
  class ChatStatus extends HTMLElement {
    connectedCallback() {
      this.innerHTML = /*html*/`
        <div class="text-gray-500 text-sm">
          Chat mode: <strong>World Simulation</strong>
        </div>
      `;

      document.addEventListener('new-game', async (e) => {
        const { name, bio } = e.detail;
        const ts = Date.now().toString();

        const gameEntry = { ts, name, bio };

        // Save to games list
        await window.saveGame?.(gameEntry);

        // Set active game ID
        await window.setActiveGame?.(ts);

        // Emit game-created
        document.dispatchEvent(new CustomEvent('game-created', {
          detail: gameEntry,
          bubbles: true
        }));
      });
    }
  }

  if (!customElements.get('chat-status')) {
    customElements.define('chat-status', ChatStatus);
  }
})();
