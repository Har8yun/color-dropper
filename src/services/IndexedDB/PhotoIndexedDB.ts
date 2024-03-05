const PHOTO_DB_NAME = "uploadedPhotos";
const VERSION = 1;
const PHOTO_STORE = "photos";
const KEY_PATH = "id";

export class PhotoIndexedDB {
    request: IDBOpenDBRequest;
    db: IDBDatabase | null;
    isInitialized: boolean | null;

    constructor() {
        this.db = null;
        this.isInitialized = false;
        this.request = window.indexedDB.open(PHOTO_DB_NAME, VERSION);
        this.initialize();
    }

    initialize() {
        this.request.onerror = (ev: Event) => {
            console.error("Why didn't you allow my web app to use IndexedDB?!");
            const target = ev.target as IDBOpenDBRequest;
            console.error(`Database error: ${target.error?.message}`);
        };

        const handleSuccess = (ev: Event) => {
            const target = ev.target as IDBOpenDBRequest;
            this.db = target.result;
            this.isInitialized = true;
        }

        this.request.onsuccess = (ev: Event) => {
            handleSuccess(ev);
        }

        this.request.onupgradeneeded = (ev: Event) => {
            handleSuccess(ev);
            if (this.db) {
                const photoStore = this.db.createObjectStore(PHOTO_STORE, {keyPath: KEY_PATH, autoIncrement: true});
                // todo - add name for searching
                // photoStore.createIndex("name", "name", {unique: false});
            }
        }
    }

    async checkInitialized () {

        return new Promise((resolve) => {
            let intervalId = 0;
            const resolveHandler = () => {
                resolve(true);
                clearInterval(intervalId);
            };
            if (this.isInitialized) {
                resolveHandler();
            } else {
                // @ts-ignore
                intervalId = setInterval(() => {
                    if (this.isInitialized) {
                        resolveHandler();
                    }
                }, 50)
            }
        })
    }

    addPhoto(photoItem: any) {
        if (this.db) {
            const transaction = this.db.transaction(PHOTO_STORE, "readwrite");
            const photoStore = transaction.objectStore(PHOTO_STORE);
            const photoStoreRequest = photoStore.add(photoItem);
            // todo - success and error cases
        }
    }

    async getAllPhotos(): Promise<File[]> {
        await this.checkInitialized();

        return new Promise( (resolve) => {

            if (this.db) {
                const transaction = this.db.transaction(PHOTO_STORE);
                const photoStore = transaction.objectStore(PHOTO_STORE);
                const photoStoreRequest = photoStore.getAll();

                photoStoreRequest.onsuccess = (ev: Event) => {
                    const target = ev.target as IDBOpenDBRequest;
                    const result = target.result as unknown as File[];
                    resolve(result);
                };
            }
        })
    }
}

const PhotoIndexedDBInstance = new PhotoIndexedDB()
export default PhotoIndexedDBInstance;
