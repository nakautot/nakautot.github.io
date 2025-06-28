(() => {
    class RpgHeader extends HTMLElement {
        constructor() {
            super();
            this._initialized = false;
        }

        connectedCallback() {
            if (this._initialized) return;
            this._initialized = true;

            // Save current children before render
            this._slotContent = [...this.childNodes];

            // Listen for re-renders
            document.addEventListener('game-created', () => this.render());
            document.addEventListener('game-deleted', () => this.render());
            document.addEventListener('game-loaded', () => this.render());

            this.render();
        }

        async render() {
            this.innerHTML = ''; // Clear existing content

            const wrapper = document.createElement('header');
            wrapper.className = 'bg-blue-600 text-white p-4 shadow sticky top-0 z-30';

            const titleRow = document.createElement('div');
            titleRow.className = 'flex flex-col md:flex-row md:items-center md:justify-between gap-1';

            const titleGroup = document.createElement('div');
            titleGroup.className = 'flex items-center gap-2';

            const icon = document.createElement('img');
            icon.src = './favicon.png';
            icon.alt = 'RPG Logo';
            icon.className = 'w-6 h-6';

            const title = document.createElement('div');
            title.className = 'text-2xl font-bold';
            title.textContent = 'Ultimate RPG UI';

            titleGroup.appendChild(icon);
            titleGroup.appendChild(title);

            const subtitle = document.createElement('div');
            subtitle.className = 'text-sm text-blue-100 md:text-base';

            // Lookup active game
            let subtitleText = 'Adventure not yet started';
            try {
                const activeId = await window.db.dbGetKey?.('activeGameId');
                const games = await window.db.getAllGames?.();
                const activeGame = games?.find(g => g.ts === activeId);
                if (activeGame?.name) {
                    subtitleText = `${activeGame.name}'s Adventure`;
                }
            } catch (err) {
                console.warn('[RpgHeader] subtitle fallback:', err);
            }

            subtitle.textContent = subtitleText;
            titleRow.appendChild(titleGroup);
            titleRow.appendChild(subtitle);

            const hr = document.createElement('hr');
            hr.className = 'my-2';

            const childContainer = document.createElement('div');
            this._slotContent?.forEach(node => childContainer.appendChild(node.cloneNode(true)));

            wrapper.appendChild(titleRow);
            wrapper.appendChild(hr);
            wrapper.appendChild(childContainer);

            this.appendChild(wrapper);
        }
    }

    if (!customElements.get('rpg-header')) {
        customElements.define('rpg-header', RpgHeader);
    }
})();
