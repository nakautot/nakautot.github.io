class FooterBar extends HTMLElement {
  connectedCallback() {
    this.render();
    this.textarea = this.querySelector('textarea');
    this.sendBtn = this.querySelector('button');

    this.textarea.addEventListener('input', () => {
      this.sendBtn.disabled = !this.textarea.value.trim();
    });

    this.sendBtn.addEventListener('click', () => {
      const text = this.textarea.value.trim();
      if (!text) return;

      document.dispatchEvent(new CustomEvent('footer-send', {
        detail: { message: text },
        bubbles: true,
      }));

      this.textarea.value = '';
      this.sendBtn.disabled = true;
    });
  }

  render() {
    this.innerHTML = /*html*/`
      <div class="w-full border-t bg-white p-3 flex items-end gap-2">
        <textarea
          rows="3"
          placeholder="What is thy response?"
          class="flex-1 resize-none border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 overflow-y-auto h-24"
        ></textarea>
        <button
          class="bg-blue-500 text-white w-20 h-24 rounded disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center justify-center"
          disabled
        >
          <svg class="w-5 h-5 mb-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span class="text-sm">Send</span>
        </button>
      </div>
    `;
  }
}

if (!customElements.get('footer-bar')) {
  customElements.define('footer-bar', FooterBar);
}
