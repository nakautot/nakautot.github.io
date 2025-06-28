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
    request.onsuccess = function (event) {
      callback(request.result);
    };
  }

  // Save selected pill name
  window.dbSet = function (value) {
    openDb(function (db) {
      const tx = db.transaction('state', 'readwrite');
      const store = tx.objectStore('state');
      store.put(value, 'selectedPill');
      tx.oncomplete = function () { db.close(); };
    });
  };

  // Load selected pill name
  window.dbGet = function () {
    return new Promise(function (resolve) {
      openDb(function (db) {
        const tx = db.transaction('state', 'readonly');
        const store = tx.objectStore('state');
        const getRequest = store.get('selectedPill');
        getRequest.onsuccess = function () {
          resolve(getRequest.result);
          db.close();
        };
        getRequest.onerror = function () {
          resolve(null);
          db.close();
        };
      });
    });
  };

  // Save metadata entry if it doesn't exist
  window.saveMetadataIfNew = function (meta) {
    openDb(function (db) {
      const tx = db.transaction('metadata', 'readwrite');
      const store = tx.objectStore('metadata');
      const getRequest = store.get(meta.name);
      getRequest.onsuccess = function () {
        if (!getRequest.result) {
          store.put(meta);
        }
      };
      tx.oncomplete = function () { db.close(); };
    });
  };

  // Fetch all metadata entries
  window.getAllMetadata = function () {
    return new Promise(function (resolve) {
      openDb(function (db) {
        const tx = db.transaction('metadata', 'readonly');
        const store = tx.objectStore('metadata');
        const request = store.getAll();
        request.onsuccess = function () {
          resolve(request.result || []);
          db.close();
        };
        request.onerror = function () {
          resolve([]);
          db.close();
        };
      });
    });
  };
})();