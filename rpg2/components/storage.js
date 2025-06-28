(() => {
  function openDb(callback) {
    const request = indexedDB.open('rpg-db', 1);
    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('state')) {
        db.createObjectStore('state');
      }
      if (!db.objectStoreNames.contains('metadata')) {
        db.createObjectStore('metadata', { keyPath: 'name' });
      }
      if (!db.objectStoreNames.contains('games')) {
        db.createObjectStore('games', { keyPath: 'ts' });
      }
    };
    request.onsuccess = function () {
      callback(request.result);
    };
  }

  window.dbSet = function (value) {
    openDb(db => {
      const tx = db.transaction('state', 'readwrite');
      tx.objectStore('state').put(value, 'selectedPill');
      tx.oncomplete = () => db.close();
    });
  };

  window.dbGet = function () {
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

  window.saveMetadataIfNew = function (meta) {
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

  window.getAllMetadata = function () {
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

  // Save and get API key
  window.setApiKey = function (key) {
    openDb(db => {
      const tx = db.transaction('state', 'readwrite');
      tx.objectStore('state').put(key, 'openai_api_key');
      tx.oncomplete = () => db.close();
    });
  };

  window.getApiKey = function () {
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

  window.hasActiveGame = function () {
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

  // Save a new game entry to 'games' store
  window.saveGame = function (game) {
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

  // Set active game ID
  window.setActiveGame = function (ts) {
    openDb(db => {
      const tx = db.transaction('state', 'readwrite');
      const store = tx.objectStore('state');
      store.put(ts, 'activeGameId');
      tx.oncomplete = () => db.close();
    });
  };

  window.dbGetKey = function (key) {
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
})();
