const DB_NAME = 'todoApp';
const DB_VERSION = 1; // La versione del DB
const STORE_NAME = 'todos'; // Il nome dello store (tabella)

let db: IDBDatabase | null = null;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = (event) => {
      const result = (event.target as IDBRequest).result;
      if (!result) {
        reject('Database connection failed');
        return;
      }
      db = result;
      resolve(result);
    };

    request.onerror = (event) => {
      reject(`Database error: ${(event.target as IDBRequest).error}`);
    };
  });
}

function addTodo(todo: any) {
  return openDB().then((db) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    store.add(todo);
  });
}

function getTodos() {
  return openDB().then((db) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    return store.getAll();
  });
}

function updateTodo(todo: any) {
  return openDB().then((db) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    store.put(todo);
  });
}

function deleteTodo(id: string) {
  return openDB().then((db) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    store.delete(id);
  });
}

export { openDB, db, STORE_NAME, addTodo, getTodos, updateTodo, deleteTodo };