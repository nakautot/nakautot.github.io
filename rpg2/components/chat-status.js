(() => {
  const schemas = {
    "messages": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "type": "object",
      "properties": {
        "ts": {
          "type": "string",
          "pattern": "^[0-9]+$",
          "description": "A numeric timestamp represented as a string."
        },
        "type": {
          "type": "string",
          "enum": ["request", "response"],
          "description": "The type of the message, either 'request' or 'response'."
        },
        "message": {
          "type": "string",
          "description": "The message content."
        }
      },
      "required": ["ts", "type", "message"],
      "additionalProperties": false
    },
    "gameMeta": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "type": "object",
      "properties": {
        "ts": {
          "type": "string",
          "pattern": "^[0-9]+$",
          "description": "Unique game ID, represented as a numeric string."
        },
        "name": {
          "type": "string",
          "description": "The name of the player or character."
        },
        "bio": {
          "type": "string",
          "description": "A short biography or backstory."
        }
      },
      "required": ["ts", "name", "bio"],
      "additionalProperties": false
    },
  };

  class ChatStatus extends HTMLElement {
    connectedCallback() {
      this.innerHTML = /*html*/`
        <div class="text-gray-500 text-sm">
          Chat mode: <strong>World Simulation</strong>
        </div>
      `;

      // Handle new-game event
      document.addEventListener('new-game', async (e) => {
        const { name, bio } = e.detail;
        const ts = Date.now();
        const gameEntry = { ts: ts.toString(), name, bio };

        await window.db.saveGame?.(gameEntry);
        await window.db.setActiveGame?.(gameEntry.ts);

        const introMessage = {
          gameId: Number(gameEntry.ts),
          ts: ts - 1,
          messageRTF: `Welcome <b>${name}</b>. <i>${bio}</i><br><br>Your journey begins now...`,
          type: "response"
        };

        await window.db.saveMessage?.(introMessage);

        document.dispatchEvent(new CustomEvent('game-created', {
          detail: gameEntry,
          bubbles: true
        }));
      });

      // Handle delete-game event
      document.addEventListener('delete-game', async (e) => {
        const ts = e.detail;
        const active = await window.db.dbGetKey?.('activeGameId');

        await window.db.deleteGame?.(ts);
        await window.db.deleteMessagesByGameId?.(ts); // ✅ Remove all messages for this game

        if (active === ts) {
          await window.db.dbDeleteKey?.('activeGameId');
        }

        document.dispatchEvent(new CustomEvent('game-deleted', {
          detail: ts,
          bubbles: true
        }));
      });

      // Handle load-game event
      document.addEventListener('load-game', async (e) => {
        const ts = e.detail;

        await window.db.setActiveGame?.(ts);

        document.dispatchEvent(new CustomEvent('game-loaded', {
          detail: ts,
          bubbles: true
        }));
      });

      // Handle footer-send event
      document.addEventListener('footer-send', async (e) => {
        const activeGameId = await window.db.dbGetKey?.('activeGameId');
        const text = e.detail.message?.trim();
        if (!activeGameId || !text) return;

        const ts = Date.now();
        const message = {
          gameId: Number(activeGameId),
          ts,
          messageRTF: text,
          type: "request"
        };

        await window.db.saveMessage?.(message);

        document.dispatchEvent(new CustomEvent('game-updated', {
          detail: message,
          bubbles: true
        }));
      });
    }
  }

  if (!customElements.get('chat-status')) {
    customElements.define('chat-status', ChatStatus);
  }
})();
