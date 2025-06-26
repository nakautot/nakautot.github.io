class InfoCard extends HTMLElement {
  connectedCallback() {
    this.render();
    this.attachEvents();
  }

  render() {
    this.innerHTML = /*html*/`
      <div class="bg-white shadow rounded-lg p-4 max-w-sm mx-auto" Style="margin-top: 10px;">
        <div class="font-bold text-lg mb-2">Card Title</div>
        <p>This is a simple card built with Tailwind.</p>
        <button
          class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          type="button"
        >
          Action
        </button>
      </div>
    `;
  }

  attachEvents() {
    this.querySelector('button')?.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('card-action', {
        detail: { message: 'Card action triggered' },
        bubbles: true
      }));
    });
  }
}

if (!customElements.get('info-card')) {
  customElements.define('info-card', InfoCard);
}
