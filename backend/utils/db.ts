import { openDB, IDBPDatabase } from 'idb';

// إعداد قاعدة البيانات
const DB_NAME = 'MyDatabase';
const DB_VERSION = 1;

export async function initDB(stores: string[]) {
    return openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            stores.forEach(store => {
                if (!db.objectStoreNames.contains(store)) {
                    db.createObjectStore(store, { keyPath: 'id', autoIncrement: true });
                }
            });
        },
    });
}

// إضافة عنصر جديد إلى أي جدول
export async function addItem<T>(storeName: string, item: T): Promise<void> {
    const db = await initDB([storeName]);
    await db.put(storeName, item);
}

// جلب جميع العناصر من أي جدول
export async function getAllItems<T>(storeName: string): Promise<T[]> {
    const db = await initDB([storeName]);
    return await db.getAll(storeName);
}

// تحديث عنصر في أي جدول
export async function updateItem<T>(storeName: string, item: T & { id: number }): Promise<void> {
    const db = await initDB([storeName]);
    await db.put(storeName, item);
}

// حذف عنصر من أي جدول
export async function deleteItem(storeName: string, id: number): Promise<void> {
    const db = await initDB([storeName]);
    await db.delete(storeName, id);
}
