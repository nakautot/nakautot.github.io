class SideDrawer extends HTMLElement {
  connectedCallback() {
    // Only inject layout once
    if (!this.querySelector('[data-drawer]')) {
      this.appendChild(this.buildLayout());
    }

    this.cacheElements();
    this.closeBtn.addEventListener('click', () => this.close());
    this.overlay.addEventListener('click', () => this.close());

    document.addEventListener('pill-clicked', () => this.open());
  }

  cacheElements() {
    this.sdTitle = this.querySelector('[data-title]');
    this.drawer = this.querySelector('[data-drawer]');
    this.overlay = this.querySelector('[data-overlay]');
    this.closeBtn = this.querySelector('[data-close]');
    this.contentWrapper = this.querySelector('[data-content]');
    this.fallback = this.querySelector('[data-fallback]');
    this.slottedCards = Array.from(this.children).filter(el => el.slot);
  }

  async open() {
    this.cacheElements();
    const selected = await window.dbGet?.();
    const title = (typeof selected === 'string' && selected) ? selected : 'Selected';
    this.sdTitle.textContent = title;

    // Find the matching slotted child
    const original = Array.from(this.children).find(el => el.slot === title);

    // Clear previous content from contentWrapper (except fallback)
    Array.from(this.contentWrapper.children).forEach(child => {
      if (!child.hasAttribute('data-fallback')) {
        this.contentWrapper.removeChild(child);
      }
    });

    if (original) {
      const clone = original.cloneNode(true);
      clone.hidden = false;
      this.fallback.classList.add('hidden');
      this.contentWrapper.appendChild(clone);
    } else {
      this.fallback.classList.remove('hidden');
    }

    this.drawer.classList.remove('translate-x-full');
    this.overlay.classList.remove('hidden');
  }

  close() {
    this.drawer.classList.add('translate-x-full');
    this.overlay.classList.add('hidden');
  }

  buildLayout() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = /*html*/`
      <div data-overlay class="fixed inset-0 bg-black bg-opacity-30 hidden z-40"></div>
      <div data-drawer class="fixed top-0 right-0 w-80 h-full bg-white shadow-lg border-l border-gray-300 transform translate-x-full transition-transform z-50 flex flex-col">
        <div class="flex justify-between items-center p-4 border-b">
          <h2 data-title class="text-lg font-bold">Selected</h2>
          <button data-close class="text-gray-500 hover:text-gray-800 text-xl">&times;</button>
        </div>
        <div data-content class="p-4 flex-1 overflow-y-auto space-y-2">
          <p data-fallback class="text-gray-400 italic">No content available for this section.</p>
        </div>
      </div>
    `;
    return wrapper;
  }
}

if (!customElements.get('side-drawer')) {
  customElements.define('side-drawer', SideDrawer);
}
