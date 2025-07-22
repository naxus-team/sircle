import React, { createContext, useContext, useState, useEffect } from "react";
import { generateKey, encryptData, decryptData } from "../utils/crypto";

interface EncryptionContextType {
    encrypt: (data: string) => Promise<string>;
    decrypt: (encryptedData: string) => Promise<string>;
}

const EncryptionContext = createContext<EncryptionContextType | null>(null);

export const EncryptionProvider: React.FC<{ token: string; children: React.ReactNode }> = ({ token, children }) => {
    const [cryptoKey, setCryptoKey] = useState<CryptoKey | null>(null);

    useEffect(() => {
        async function initKey() {
            const key = await generateKey(token);
            setCryptoKey(key);
        }
        initKey();
    }, [token]);

    const encrypt = async (data: string) => {
        if (!cryptoKey) throw new Error("Error crypto.");
        return encryptData(data, cryptoKey);
    };

    const decrypt = async (encryptedData: string) => {
        if (!cryptoKey) throw new Error("Error crypto.");
        return decryptData(encryptedData, cryptoKey);
    };

    return (
        <EncryptionContext.Provider value={{ encrypt, decrypt }}>
            {children}
        </EncryptionContext.Provider>
    );
};

export const useEncryption = () => {
    const context = useContext(EncryptionContext);
    if (!context) {
        throw new Error("useEncryption يجب استخدامه داخل EncryptionProvider");
    }
    return context;
};
