import { DB_NAME } from "./constants";

export function openDatabase(storeName: string) {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (event) => {
      const target = event.target as IDBOpenDBRequest;
      const db = target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id" });
      }
    };

    request.onsuccess = (event) => {
      const target = event.target as IDBOpenDBRequest;
      resolve(target.result);
    };

    request.onerror = (event) => {
      const target = event.target as IDBOpenDBRequest;
      reject(target.error);
    };
  });
}

export function storeBlob(
  db: IDBDatabase,
  storeName: string,
  id: string,
  blob: Blob,
) {
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.put({ id, blob });

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      const target = event.target as IDBRequest;
      reject(target.error);
    };
  });
}

export function retrieveBlob(db: IDBDatabase, storeName: string, id: string) {
  return new Promise<string>((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.get(id);

    request.onsuccess = (event) => {
      const target = event.target as IDBRequest;

      const result = target.result;
      if (result) {
        resolve(URL.createObjectURL(result.blob));
      } else {
        reject(new Error("Blob not found"));
      }
    };

    request.onerror = (event) => {
      const target = event.target as IDBRequest;
      reject(target.error);
    };
  });
}

export function deleteBlob(db: IDBDatabase, storeName: string, id: string) {
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = (event) => {
      const target = event.target as IDBRequest;
      reject(target.error);
    };
  });
}
