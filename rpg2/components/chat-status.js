(() => {
  class ChatStatus extends HTMLElement {
    connectedCallback() {
      this.innerHTML = /*html*/`
        <div class="text-gray-500 text-sm">
          Chat mode: <strong>World Simulation</strong>
        </div>
      `;

      document.addEventListener('new-game', (e) => {
        console.log('[New Game Event]', e.detail);
      });
    }
  }

  if (!customElements.get('chat-status')) {
    customElements.define('chat-status', ChatStatus);
  }
})();
