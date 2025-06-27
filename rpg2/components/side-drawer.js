class SideDrawer extends HTMLElement {
  connectedCallback() {
    this.render();
    this.cacheElements();

    this.closeBtn.addEventListener('click', () => this.close());
    this.overlay.addEventListener('click', () => this.close());

    document.addEventListener('pill-clicked', () => {
      this.open();
    });
  }

  cacheElements() {
    this.sdTitle = this.querySelector('[data-title]');
    this.drawer = this.querySelector('[data-drawer]');
    this.overlay = this.querySelector('[data-overlay]');
    this.closeBtn = this.querySelector('[data-close]');
    this.contentWrapper = this.querySelector('[data-content]');
    this.slots = this.querySelectorAll('slot[name]');
    this.fallback = this.querySelector('[data-fallback]');
  }

  async open() {
    this.cacheElements();
    const selected = await window.dbGet?.();
    const title = (typeof selected === 'string' && selected) ? selected : 'Selected';
    this.sdTitle.textContent = title;

    // Hide all named slots first
    this.slots.forEach(slot => {
      slot.hidden = (slot.name !== title);
    });

    // Show fallback if no matching slot
    const matchFound = Array.from(this.slots).some(slot => slot.name === title);
    this.fallback.classList.toggle('hidden', matchFound);

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
        <div data-content class="p-4 flex-1 overflow-y-auto">
          <p data-fallback class="text-gray-400 italic">No content available for this section.</p>
          <!-- Named slots will be injected by user HTML -->
          <!-- They start hidden and get toggled on match -->
        </div>
      </div>
    `;
  }
}

if (!customElements.get('side-drawer')) {
  customElements.define('side-drawer', SideDrawer);
}
