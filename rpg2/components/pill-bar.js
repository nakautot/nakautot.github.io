(() => {
  class PillBar extends HTMLElement {
    async connectedCallback() {
      const categories = await window.getAllMetadata?.();
      if (!Array.isArray(categories) || categories.length === 0) {
        this.innerHTML = `<div class="text-sm text-gray-400 p-2">No categories found in IndexedDB.</div>`;
        return;
      }

      this.render(categories);
      this.attachEvents();
    }

    render(categories) {
      const colorCycle = ['blue', 'green', 'yellow', 'red', 'purple'];

      this.innerHTML = `
        <div class="flex flex-wrap gap-2">
          ${categories.map((cat, i) => {
            const color = colorCycle[i % colorCycle.length];
            return `
              <button
                class="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-${color}-100 text-${color}-800 hover:bg-${color}-200"
                data-name="${cat.name}"
                data-description="${cat.description}"
                data-icon="${cat.icon}"
                type="button"
              >
                <span>${cat.icon}</span>
                <span class="hidden sm:inline">${cat.name}</span>
              </button>
            `;
          }).join('')}
        </div>
      `;
    }

    attachEvents() {
      this.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', async () => {
          const name = btn.dataset.name;
          await window.dbSet?.(name);
          document.dispatchEvent(new CustomEvent('pill-clicked', {
            bubbles: true
          }));
        });
      });
    }
  }

  if (!customElements.get('pill-bar')) {
    customElements.define('pill-bar', PillBar);
  }
})();
