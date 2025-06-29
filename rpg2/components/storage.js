(() => {
  window.db = window.db || {};
  window.db.version = '1.0.0';

  function openDb(callback) {
    const request = indexedDB.open('rpg-db', 1);
    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('state')) db.createObjectStore('state');
      if (!db.objectStoreNames.contains('metadata')) db.createObjectStore('metadata', { keyPath: 'name' });
      if (!db.objectStoreNames.contains('games')) db.createObjectStore('games', { keyPath: 'ts' });
      if (!db.objectStoreNames.contains('stats')) db.createObjectStore('stats', { keyPath: 'shortName' });
      if (!db.objectStoreNames.contains('directives')) db.createObjectStore('directives', { keyPath: 'stat' });
      if (!db.objectStoreNames.contains('NPC')) db.createObjectStore('NPC', { keyPath: 'name' });
      if (!db.objectStoreNames.contains('messages')) {
        const store = db.createObjectStore('messages', { keyPath: 'ts' });
        store.createIndex('by_gameId', 'gameId', { unique: false });
      }
    };
    request.onsuccess = function () {
      callback(request.result);
    };
  }

  window.db.dbSet = function (value) {
    openDb(db => {
      const tx = db.transaction('state', 'readwrite');
      tx.objectStore('state').put(value, 'selectedPill');
      tx.oncomplete = () => db.close();
    });
  };

  window.db.dbGet = function () {
    return new Promise(resolve => {
      openDb(db => {
        const tx = db.transaction('state', 'readonly');
        const store = tx.objectStore('state');
        const req = store.get('selectedPill');
        req.onsuccess = () => {
          resolve(req.result);
          db.close();
        };
        req.onerror = () => {
          resolve(null);
          db.close();
        };
      });
    });
  };

  window.db.saveMetadataIfNew = function (meta) {
    openDb(db => {
      const tx = db.transaction('metadata', 'readwrite');
      const store = tx.objectStore('metadata');
      const getRequest = store.get(meta.name);
      getRequest.onsuccess = function () {
        if (!getRequest.result) {
          store.put(meta);
        }
      };
      tx.oncomplete = () => db.close();
    });
  };

  window.db.getAllMetadata = function () {
    return new Promise(resolve => {
      openDb(db => {
        const tx = db.transaction('metadata', 'readonly');
        const store = tx.objectStore('metadata');
        const request = store.getAll();
        request.onsuccess = () => {
          resolve(request.result || []);
          db.close();
        };
        request.onerror = () => {
          resolve([]);
          db.close();
        };
      });
    });
  };

  window.db.setApiKey = function (key) {
    openDb(db => {
      const tx = db.transaction('state', 'readwrite');
      tx.objectStore('state').put(key, 'openai_api_key');
      tx.oncomplete = () => db.close();
    });
  };

  window.db.getApiKey = function () {
    return new Promise(resolve => {
      openDb(db => {
        const tx = db.transaction('state', 'readonly');
        const store = tx.objectStore('state');
        const req = store.get('openai_api_key');
        req.onsuccess = () => {
          resolve(req.result);
          db.close();
        };
        req.onerror = () => {
          resolve(null);
          db.close();
        };
      });
    });
  };

  window.db.hasActiveGame = function () {
    return new Promise(resolve => {
      openDb(db => {
        const tx = db.transaction('state', 'readonly');
        const store = tx.objectStore('state');
        const get = store.get('activeGameId');
        get.onsuccess = () => resolve(!!get.result);
        get.onerror = () => resolve(false);
      });
    });
  };

  window.db.saveGame = function (game) {
    return new Promise(resolve => {
      openDb(db => {
        if (!db.objectStoreNames.contains('games')) {
          console.warn("Games store not found in DB.");
          resolve(false);
          return;
        }
        const tx = db.transaction('games', 'readwrite');
        const store = tx.objectStore('games');
        store.put(game);
        tx.oncomplete = () => {
          db.close();
          resolve(true);
        };
      });
    });
  };

  window.db.setActiveGame = function (ts) {
    openDb(db => {
      const tx = db.transaction('state', 'readwrite');
      const store = tx.objectStore('state');
      store.put(ts, 'activeGameId');
      tx.oncomplete = () => db.close();
    });
  };

  window.db.dbGetKey = function (key) {
    return new Promise(function (resolve) {
      openDb(function (db) {
        const tx = db.transaction('state', 'readonly');
        const store = tx.objectStore('state');
        const request = store.get(key);
        request.onsuccess = function () {
          resolve(request.result);
          db.close();
        };
        request.onerror = function () {
          resolve(null);
          db.close();
        };
      });
    });
  };

  window.db.getAllGames = function () {
    return new Promise((resolve) => {
      openDb(function (db) {
        if (!db.objectStoreNames.contains('games')) {
          console.warn("Games store not found in DB.");
          resolve([]);
          db.close();
          return;
        }

        const tx = db.transaction('games', 'readonly');
        const store = tx.objectStore('games');
        const request = store.getAll();

        request.onsuccess = () => {
          resolve(request.result || []);
          db.close();
        };
        request.onerror = () => {
          resolve([]);
          db.close();
        };
      });
    });
  };

  window.db.deleteGame = function (ts) {
    return new Promise((resolve) => {
      openDb(function (db) {
        const tx = db.transaction('games', 'readwrite');
        const store = tx.objectStore('games');
        store.delete(ts);
        tx.oncomplete = function () {
          db.close();
          resolve();
        };
        tx.onerror = function () {
          db.close();
          resolve();
        };
      });
    });
  };

  window.db.dbDeleteKey = function (key) {
    return new Promise((resolve) => {
      openDb(function (db) {
        const tx = db.transaction('state', 'readwrite');
        const store = tx.objectStore('state');
        store.delete(key);
        tx.oncomplete = function () {
          db.close();
          resolve();
        };
        tx.onerror = function () {
          db.close();
          resolve();
        };
      });
    });
  };

  window.db.saveMessage = function (entry) {
    openDb(function (db) {
      const tx = db.transaction('messages', 'readwrite');
      const store = tx.objectStore('messages');
      store.put(entry);
      tx.oncomplete = function () { db.close(); };
    });
  };

  window.db.getMessagesForGame = function (gameId) {
    return new Promise(resolve => {
      openDb(function (db) {
        const tx = db.transaction('messages', 'readonly');
        const store = tx.objectStore('messages');
        const request = store.getAll();

        request.onsuccess = function () {
          const filtered = request.result?.filter(m => m.gameId === parseInt(gameId)) || [];
          resolve(filtered);
          db.close();
        };

        request.onerror = function () {
          resolve([]);
          db.close();
        };
      });
    });
  };

  window.db.deleteMessagesByGameId = function (gameId) {
    return new Promise((resolve) => {
      openDb((db) => {
        const tx = db.transaction('messages', 'readwrite');
        const store = tx.objectStore('messages');
        const index = store.index('by_gameId');
        const range = IDBKeyRange.only(Number(gameId));

        const request = index.openCursor(range);
        request.onsuccess = function (event) {
          const cursor = event.target.result;
          if (cursor) {
            cursor.delete();
            cursor.continue();
          }
        };

        tx.oncomplete = function () {
          db.close();
          resolve(true);
        };
        tx.onerror = function () {
          db.close();
          resolve(false);
        };
      });
    });
  };

  window.db.saveStatsToDb = function (statsArray) {
    openDb(function (db) {
      const tx = db.transaction('stats', 'readwrite');
      const store = tx.objectStore('stats');
      statsArray.forEach(stat => store.put(stat));
      tx.oncomplete = () => db.close();
    });
  };

  window.db.getAllStats = function () {
    return new Promise(resolve => {
      openDb(function (db) {
        const tx = db.transaction('stats', 'readonly');
        const store = tx.objectStore('stats');
        const request = store.getAll();
        request.onsuccess = () => {
          resolve(request.result || []);
          db.close();
        };
        request.onerror = () => {
          resolve([]);
          db.close();
        };
      });
    });
  };

  window.db.saveDirective = function (stat, type, text) {
    openDb(db => {
      const tx = db.transaction('directives', 'readwrite');
      const store = tx.objectStore('directives');

      const getReq = store.get(stat);
      getReq.onsuccess = () => {
        const current = getReq.result || { stat }; // ✅ ensures 'stat' exists

        const existing = Array.isArray(current[type]) ? current[type] : [];
        if (!existing.includes(text)) {
          current[type] = [...existing, text];
          store.put(current); // ✅ object now always includes 'stat'
        }
      };

      getReq.onerror = () => {
        console.error('Failed to get directive:', getReq.error);
      };

      tx.oncomplete = () => db.close();
    });
  };

  window.db.addToListIfMissing = function (storeName, item, keyField = 'name') {
    openDb(db => {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const request = store.get(item[keyField]);

      request.onsuccess = () => {
        if (!request.result) {
          store.put(item);
        }
      };

      request.onerror = () => {
        console.error(`Failed to check for existing item in ${storeName}`, request.error);
      };

      tx.oncomplete = () => db.close();
    });
  };

})();
