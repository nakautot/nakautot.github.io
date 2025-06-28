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
})();
