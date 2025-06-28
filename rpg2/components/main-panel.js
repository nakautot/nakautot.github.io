(() => {
    class MainPanel extends HTMLElement {
        connectedCallback() {
            this.className = 'flex-1 overflow-y-auto container mx-auto p-4 space-y-4';
            this.wrapper = document.createElement('div');
            this.wrapper.className = 'space-y-4';
            this.appendChild(this.wrapper);

            this.batchSize = 10;
            this.loadedCount = 0;
            this.messages = [];
            this.chatContainer = null;
            this.activeGameId = null;
            this.scrolling = false;

            this.setupListeners();
            this.load();
        }

        setupListeners() {
            document.addEventListener('game-created', () => this.load(true));
            document.addEventListener('game-loaded', () => this.load(true));
            document.addEventListener('game-deleted', () => this.load(true));
            document.addEventListener('game-updated', () => this.load(true));
        }

        async load(reset = false) {
            this.wrapper.innerHTML = '';

            this.activeGameId = await window.db.dbGetKey?.('activeGameId');
            if (!this.activeGameId) {
                this.renderInfoNotice();
                return;
            }

            // Reset state if needed
            if (reset) {
                this.loadedCount = 0;
                this.messages = [];
            }

            // Setup chat UI
            this.chatContainer = document.createElement('div');
            this.chatContainer.className = 'flex flex-col-reverse gap-3 max-h-[70vh] overflow-y-auto p-2 border rounded bg-white';
            this.wrapper.appendChild(this.chatContainer);

            this.chatContainer.addEventListener('scroll', () => {
                if (this.chatContainer.scrollTop === (this.chatContainer.scrollHeight - this.chatContainer.clientHeight)) {
                    this.fetchMoreMessages();
                }
            });

            await this.fetchMoreMessages();
        }

        async fetchMoreMessages() {
            if (!window.db.getMessagesForGame) return;

            const all = await window.db.getMessagesForGame(this.activeGameId);
            const sorted = all.sort((a, b) => b.ts - a.ts);
            const nextBatch = sorted.slice(this.loadedCount, this.loadedCount + this.batchSize);

            nextBatch.reverse().forEach(msg => {
                const bubble = this.createBubble(msg);
                this.chatContainer.prepend(bubble);
            });

            this.loadedCount += nextBatch.length;
        }

        createBubble(msg) {
            const wrapper = document.createElement('div');
            const isRequest = msg.type === 'request';

            wrapper.className = `max-w-[70%] px-3 py-2 rounded text-sm ${isRequest
                    ? 'self-end bg-blue-100 text-blue-800'
                    : 'self-start bg-gray-100 text-gray-700'
                }`;

            wrapper.innerHTML = msg.messageRTF;
            return wrapper;
        }

        renderInfoNotice() {
            const msg = document.createElement('div');
            msg.className = 'text-sm text-blue-700 bg-blue-50 border border-blue-200 p-4 rounded';
            msg.innerHTML = /*html*/`
        <strong>Heads up!</strong><br>
        No active game session found. Please start or load a game from the <em>System</em> panel.
      `;
            this.wrapper.appendChild(msg);
        }
    }

    if (!customElements.get('main-panel')) {
        customElements.define('main-panel', MainPanel);
    }
})();
