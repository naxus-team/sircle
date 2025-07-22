import React, { createContext, useContext, ReactNode } from 'react';
import { addItem, getAllItems, updateItem, deleteItem } from '../utils/db';

interface DBContextType {
    add: <T>(storeName: string, item: T) => Promise<void>;
    getAll: <T>(storeName: string) => Promise<T[]>;
    update: <T extends { id: number }>(storeName: string, item: T) => Promise<void>;
    remove: (storeName: string, id: number) => Promise<void>;
}

const DBContext = createContext<DBContextType | undefined>(undefined);

export const DBProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const add = async <T,>(storeName: string, item: T) => {
        await addItem(storeName, item);
    };

    const getAll = async <T,>(storeName: string): Promise<T[]> => {
        return await getAllItems(storeName);
    };

    const update = async <T extends { id: number }>(storeName: string, item: T) => {
        await updateItem(storeName, item);
    };

    const remove = async (storeName: string, id: number) => {
        await deleteItem(storeName, id);
    };

    return (
        <DBContext.Provider value={{ add, getAll, update, remove }}>
            {children}
        </DBContext.Provider>
    );
};

// هوك لاستخدام الـ Context
export const useDB = () => {
    const context = useContext(DBContext);
    if (!context) {
        throw new Error("useDB يجب أن يكون داخل DBProvider");
    }
    return context;
};
