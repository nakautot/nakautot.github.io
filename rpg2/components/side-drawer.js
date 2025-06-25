class SideDrawer extends HTMLElement {
    connectedCallback() {
        this.render();

        // ✅ Fetch after render
        this.drawer = this.querySelector('[data-drawer]');
        this.overlay = this.querySelector('[data-overlay]');
        this.title = this.querySelector('[data-title]');
        this.closeBtn = this.querySelector('[data-close]');

        // ✅ Confirm they're real
        if (!(this.drawer && this.overlay && this.title && this.closeBtn)) {
            console.error("Drawer elements not found!");
            return;
        }

        this.closeBtn.addEventListener('click', () => this.close());
        this.overlay.addEventListener('click', () => this.close());

        document.getElementById('pill-bar')?.addEventListener('pill-clicked', e => {
            this.open(e.detail.name);
        });

        this.restore();
    }

    async restore() {
        const selected = await window.dbGet?.();
        if (selected) this.title.textContent = selected;
    }

    async open(name) {
        await window.dbSet?.(name);
        this.title.textContent = name;
        this.drawer.classList.remove('translate-x-full');
        this.overlay.classList.remove('hidden');
    }

    close() {
        this.drawer.classList.add('translate-x-full');
        this.overlay.classList.add('hidden');
    }

    render() {
        this.innerHTML = /*html*/`
      <div data-overlay class="fixed inset-0 bg-black bg-opacity-30 hidden z-40"></div>
      <div data-drawer class="fixed top-0 right-0 w-80 h-full bg-white shadow-lg border-l border-gray-300 transform translate-x-full transition-transform z-50 flex flex-col">
        <div class="flex justify-between items-center p-4 border-b">
          <h2 data-title class="text-lg font-bold">Selected</h2>
          <button data-close class="text-gray-500 hover:text-gray-800 text-xl">&times;</button>
        </div>
        <div class="p-4">
          <p>This drawer opens when you click a pill and stores your selection.</p>
        </div>
      </div>
    `;
    }
}

if (!customElements.get('side-drawer')) {
    customElements.define('side-drawer', SideDrawer);
}