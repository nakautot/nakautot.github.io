(() => {
  class ApiKeyDialog extends HTMLElement {
    connectedCallback() {
      this.render();
      this.dialog = this.querySelector('#api-key-modal');
      this.input = this.querySelector('#api-key-input');
      this.saveBtn = this.querySelector('#save-api-key');

      this.saveBtn.addEventListener('click', () => {
        const key = this.input.value.trim();
        if (key) {
          window.setApiKey?.(key);
          this.dialog.classList.add('hidden');
          alert('API key saved!');
        }
      });

      window.addEventListener('DOMContentLoaded', async () => {
        const existingKey = await window.getApiKey?.();
        if (!existingKey) {
          this.dialog.classList.remove('hidden');
        }
      });
    }

    render() {
      this.innerHTML = `
        <div id="api-key-modal" class="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center hidden">
          <div class="bg-white p-6 rounded shadow max-w-sm w-full">
            <h2 class="text-lg font-semibold mb-2">Enter OpenAI API Key</h2>
            <input id="api-key-input" type="text" placeholder="sk-..." class="w-full p-2 border border-gray-300 rounded mb-4" />
            <div class="flex justify-end gap-2">
              <button id="save-api-key" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      `;
    }
  }

  if (!customElements.get('api-key-dialog')) {
    customElements.define('api-key-dialog', ApiKeyDialog);
  }
})();
