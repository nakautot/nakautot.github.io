(() => {
  const meta = {
    name: "System",
    icon: "⚙️",
    description: "Game settings, save/load options, and debug tools."
  };

  class SystemCard extends HTMLElement {
    connectedCallback() {
      this.innerHTML = /*html*/`
        <div class="p-4 text-sm text-gray-700 space-y-4">
          <div class="flex items-start gap-2 bg-blue-50 border border-blue-200 p-3 rounded text-xs text-blue-700">
            <span class="text-base">ℹ️</span>
            <p class="leading-snug">${meta.description}</p>
          </div>

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
        </div>
      `;

      const nameInput = this.querySelector('#char-name');
      const bioInput = this.querySelector('#char-bio');
      const btn = this.querySelector('#start-new-game');

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

        // Emit custom event
        document.dispatchEvent(new CustomEvent('new-game', {
          detail: { name, bio },
          bubbles: true
        }));

        // ✅ Clear inputs and disable button
        nameInput.value = '';
        bioInput.value = '';
        btn.disabled = true;
      });
    }
  }

  if (window.saveMetadataIfNew) {
    window.saveMetadataIfNew(meta);
  }

  if (!customElements.get('system-card')) {
    customElements.define('system-card', SystemCard);
  }
})();
