class SideDrawer extends HTMLElement {
    connectedCallback() {
        this.render();
        this.cacheElements();

        this.closeBtn.addEventListener('click', () => this.close());
        this.overlay.addEventListener('click', () => this.close());

        // Listen for pill-clicked and open the drawer (header from DB)
        document.addEventListener('pill-clicked', () => {
            this.open();
        });
    }

    cacheElements() {
        this.sdTitle = this.querySelector('[data-title]');
        this.drawer = this.querySelector('[data-drawer]');
        this.overlay = this.querySelector('[data-overlay]');
        this.closeBtn = this.querySelector('[data-close]');
    }

    async open() {
        this.cacheElements();
        const selected = await window.dbGet?.();
        this.sdTitle.textContent = (typeof selected === 'string' && selected) ? selected : 'Selected';
        this.drawer.classList.remove('translate-x-full');
        this.overlay.classList.remove('hidden');
    }

    close() {
        this.cacheElements();
        this.drawer.classList.add('translate-x-full');
        this.overlay.classList.add('hidden');
    }

    render() {
        this.innerHTML = `
      <div data-overlay class="fixed inset-0 bg-black bg-opacity-30 hidden z-40"></div>
      <div data-drawer class="fixed top-0 right-0 w-80 h-full bg-white shadow-lg border-l border-gray-300 transform translate-x-full transition-transform z-50 flex flex-col">
        <div class="flex justify-between items-center p-4 border-b">
          <h2 data-title class="text-lg font-bold">Selected</h2>
          <button data-close class="text-gray-500 hover:text-gray-800 text-xl">&times;</button>
        </div>
        <div class="p-4">
          <p>This drawer opens when you click a pill and shows the current selectedPill from IndexedDB.</p>
        </div>
      </div>
    `;
    }
}

if (!customElements.get('side-drawer')) {
    customElements.define('side-drawer', SideDrawer);
}
