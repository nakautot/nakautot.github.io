function openDb(callback) {
  const request = indexedDB.open('rpg-db', 1);
  let db;

  request.onupgradeneeded = function (event) {
    db = event.target.result;
    if (!db.objectStoreNames.contains('state')) {
      db.createObjectStore('state');
    }
  };

  request.onsuccess = function (event) {
    db = event.target.result;
    // Defensive: If upgrade was needed, it has happened by now.
    callback(db);
  };

  request.onerror = function () {
    console.error("IndexedDB open failed");
  };
}
window.dbSet = function (value) {
  openDb(function (db) {
    const tx = db.transaction('state', 'readwrite');
    const store = tx.objectStore('state');
    store.put(value, 'selectedPill');
    tx.oncomplete = function () { db.close(); };
  });
};
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
