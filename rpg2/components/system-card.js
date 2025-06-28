(() => {
  const meta = {
    name: "System",
    icon: "⚙️",
    description: "Game settings, save/load options, and debug tools."
  };

  class SystemCard extends HTMLElement {
    async connectedCallback() {
      this.innerHTML = /*html*/`
        <div class="p-4 text-sm text-gray-700 space-y-6">
          <div class="flex items-start gap-2 bg-blue-50 border border-blue-200 p-3 rounded text-xs text-blue-700">
            <span class="text-base">ℹ️</span>
            <p class="leading-snug">${meta.description}</p>
          </div>

          <!-- New Game Section -->
          <div class="pt-2 border-t">
            <h3 class="font-semibold text-base mb-2">New Game</h3>

            <label class="block text-xs font-medium text-gray-600 mb-1" for="char-name">Character Name</label>
            <input id="char-name" type="text" class="w-full mb-3 p-2 border border-gray-300 rounded" placeholder="Enter your hero's name">

            <label class="block text-xs font-medium text-gray-600 mb-1" for="char-bio">Character Bio</label>
            <textarea id="char-bio" rows="4" class="w-full p-2 border border-gray-300 rounded resize-none" placeholder="Tell us about your character..."></textarea>

            <button
              id="start-new-game"
              class="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed w-full"
              disabled
            >
              Start New Game
            </button>
          </div>

          <!-- Load Game Section -->
          <div class="pt-4 border-t">
            <h3 class="font-semibold text-base mb-2">Load Game</h3>
            <ul id="game-list" class="space-y-2"></ul>
          </div>
        </div>
      `;

      const nameInput = this.querySelector('#char-name');
      const bioInput = this.querySelector('#char-bio');
      const btn = this.querySelector('#start-new-game');
      const gameList = this.querySelector('#game-list');

      const updateBtnState = () => {
        const name = nameInput.value.trim();
        const bio = bioInput.value.trim();
        btn.disabled = !(name && bio);
      };

      nameInput.addEventListener('input', updateBtnState);
      bioInput.addEventListener('input', updateBtnState);

      btn.addEventListener('click', () => {
        const name = nameInput.value.trim();
        const bio = bioInput.value.trim();
        if (!name || !bio) return;

        document.dispatchEvent(new CustomEvent('new-game', {
          detail: { name, bio },
          bubbles: true
        }));

        nameInput.value = '';
        bioInput.value = '';
        btn.disabled = true;
      });

      const renderGameList = async () => {
        if (!window.db.getAllGames) return;
        gameList.innerHTML = '';

        const games = await window.db.getAllGames();
        if (!games.length) {
          const emptyMessage = document.createElement('li');
          emptyMessage.className = 'text-xs text-gray-500 italic';
          emptyMessage.textContent = 'No saved games found.';
          gameList.appendChild(emptyMessage);
          return;
        }

        games.forEach(game => {
          const item = document.createElement('li');
          item.className = 'flex justify-between items-center p-2 bg-gray-50 border rounded';
          item.innerHTML = /*html*/`
      <div>
        <div class="font-medium text-sm">${game.name}</div>
        <div class="text-xs text-gray-500 truncate max-w-[200px]">${game.bio}</div>
      </div>
      <div class="flex gap-2">
        <button title="Load" class="text-blue-600 hover:text-blue-800" data-ts="${game.ts}" data-action="load">📂</button>
        <button title="Delete" class="text-red-500 hover:text-red-700" data-ts="${game.ts}" data-action="delete">🗑️</button>
      </div>
    `;
          gameList.appendChild(item);
        });
      };

      await renderGameList();

      // Bind click handler
      gameList.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-action]');
        if (!btn) return;
        const ts = btn.dataset.ts;
        const action = btn.dataset.action;

        if (action === 'load') {
          document.dispatchEvent(new CustomEvent('load-game', { detail: ts, bubbles: true }));
        } else if (action === 'delete') {
          document.dispatchEvent(new CustomEvent('delete-game', { detail: ts, bubbles: true }));
        }
      });

      // Re-render when game-deleted event fires
      document.addEventListener('game-deleted', renderGameList);
    }
  }

  if (window.db.saveMetadataIfNew) {
    window.db.saveMetadataIfNew(meta);
  }

  if (!customElements.get('system-card')) {
    customElements.define('system-card', SystemCard);
  }
})();
