(() => {
  class ChatStatus extends HTMLElement {
    connectedCallback() {
      this.innerHTML = /*html*/`
        <div class="text-gray-500 text-sm">
          Chat mode: <strong>World Simulation</strong>
        </div>
      `;

      // Handle new-game event
      document.addEventListener('new-game', async (e) => {
        const { name, bio } = e.detail;
        const ts = Date.now().toString();
        const gameEntry = { ts, name, bio };

        await window.saveGame?.(gameEntry);
        await window.setActiveGame?.(ts);

        document.dispatchEvent(new CustomEvent('game-created', {
          detail: gameEntry,
          bubbles: true
        }));
      });

      // Handle delete-game event
      document.addEventListener('delete-game', async (e) => {
        const ts = e.detail;
        const active = await window.dbGetKey?.('activeGameId');

        await window.deleteGame?.(ts);

        if (active === ts) {
          await window.dbDeleteKey?.('activeGameId');
        }

        document.dispatchEvent(new CustomEvent('game-deleted', {
          detail: ts,
          bubbles: true
        }));
      });
    }
  }

  if (!customElements.get('chat-status')) {
    customElements.define('chat-status', ChatStatus);
  }
})();
