class FooterBar extends HTMLElement {
  async connectedCallback() {
    this.render();
    this.cacheElements();
    this.attachEvents();
    await this.updateEnabledState();
  }

  cacheElements() {
    this.textarea = this.querySelector('textarea');
    this.sendBtn = this.querySelector('button');
  }

  attachEvents() {
    this.textarea.addEventListener('input', () => {
      this.sendBtn.disabled = !this.textarea.value.trim() || this.textarea.disabled;
    });

    this.sendBtn.addEventListener('click', () => {
      const text = this.textarea.value.trim();
      if (!text) return;

      document.dispatchEvent(new CustomEvent('footer-send', {
        detail: { message: text },
        bubbles: true
      }));

      this.textarea.value = '';
      this.sendBtn.disabled = true;
    });

    document.addEventListener('game-created', () => this.updateEnabledState());
    document.addEventListener('game-loaded', () => this.updateEnabledState());
    document.addEventListener('game-deleted', () => this.updateEnabledState());
  }

  async updateEnabledState() {
    const activeGameId = await window.db.dbGetKey?.('activeGameId');
    const enabled = !!activeGameId;

    this.textarea.disabled = !enabled;
    this.sendBtn.disabled = !enabled || !this.textarea.value.trim();
  }

  render() {
    if (this.querySelector('[data-footer-wrapper]')) return;

    const wrapper = document.createElement('div');
    wrapper.className = "w-full border-t bg-white px-3 pt-2 pb-3 flex flex-col gap-2";
    wrapper.setAttribute('data-footer-wrapper', '');

    const slotWrapper = document.createElement('div');
    const slot = document.createElement('slot');
    slotWrapper.appendChild(slot);

    const inputRow = document.createElement('div');
    inputRow.className = "w-full flex items-end gap-2";

    const textarea = document.createElement('textarea');
    textarea.rows = 3;
    textarea.placeholder = "Type your message...";
    textarea.className = "flex-1 resize-none border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 overflow-y-auto h-24";

    const button = document.createElement('button');
    button.disabled = true;
    button.className = "bg-blue-500 text-white w-20 h-24 rounded disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center justify-center";
    button.innerHTML = /*html*/`
      <svg class="w-5 h-5 mb-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      <span class="text-sm">Send</span>
    `;

    inputRow.appendChild(textarea);
    inputRow.appendChild(button);

    wrapper.appendChild(slotWrapper);
    wrapper.appendChild(inputRow);
    this.appendChild(wrapper);
  }
}

if (!customElements.get('footer-bar')) {
  customElements.define('footer-bar', FooterBar);
}
