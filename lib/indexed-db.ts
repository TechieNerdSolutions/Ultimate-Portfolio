export class IndexedDB {
  private db: IDBDatabase | null = null
  private dbName: string
  private version: number

  constructor(dbName: string, version: number = 1) {
    this.dbName = dbName
    this.version = version
  }

  async connect() {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve(request.result)
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result

        // Create object stores
        if (!db.objectStoreNames.contains('projects')) {
          db.createObjectStore('projects', { keyPath: 'id' })
        }

        if (!db.objectStoreNames.contains('profile')) {
          db.createObjectStore('profile', { keyPath: 'id' })
        }
      }
    })
  }

  async get<T>(
    storeName: string,
    key: IDBValidKey
  ): Promise<T | undefined> {
    if (!this.db) await this.connect()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(
        storeName,
        'readonly'
      )
      const store = transaction.objectStore(storeName)
      const request = store.get(key)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
    })
  }

  async put(
    storeName: string,
    value: any,
    key?: IDBValidKey
  ): Promise<IDBValidKey> {
    if (!this.db) await this.connect()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(
        storeName,
        'readwrite'
      )
      const store = transaction.objectStore(storeName)
      const request = store.put(value, key)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
    })
  }

  async delete(
    storeName: string,
    key: IDBValidKey
  ): Promise<void> {
    if (!this.db) await this.connect()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(
        storeName,
        'readwrite'
      )
      const store = transaction.objectStore(storeName)
      const request = store.delete(key)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  }

  async getAll<T>(storeName: string): Promise<T[]> {
    if (!this.db) await this.connect()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(
        storeName,
        'readonly'
      )
      const store = transaction.objectStore(storeName)
      const request = store.getAll()

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
    })
  }
}
