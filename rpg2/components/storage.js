function openDb(callback) {
  const request = indexedDB.open('rpg-db', 1);
  request.onupgradeneeded = function (event) {
    const db = event.target.result;
    if (!db.objectStoreNames.contains('state')) {
      db.createObjectStore('state');
    }
  };
  request.onsuccess = function (event) {
    callback(request.result);
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
