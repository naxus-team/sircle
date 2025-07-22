import { createContext, useState, useContext, ReactNode, useEffect, useMemo } from 'react';

import enLocale from '../locales/en.json'; // استيراد ملف en.json
import arLocale from '../locales/ar.json'; // استيراد ملف ar.json
import deLocale from '../locales/de.json'; // استيراد ملف ar.json
import frLocale from '../locales/fr.json'; // استيراد ملف ar.json

type Language = 'en' | 'ar' | 'de' | 'fr';

type Translations = Record<string, any>;

type LanguageContextType = {
    language: Language;
    changeLanguage: (lang: Language) => void;
    l: (key: string, params?: Record<string, string>) => any; // تغيير t إلى l
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

type LanguageProviderProps = {
    children: ReactNode;
};

const locales: Record<Language, Translations> = {
    en: enLocale,
    ar: arLocale,
    de: deLocale,
    fr: frLocale,
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
    const [language, setLanguage] = useState<Language>(() => {
        const savedLanguage = localStorage.getItem('locale') as Language;
        document.documentElement.lang = savedLanguage;
        document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
        return savedLanguage || 'en';
    });

    useEffect(() => {
        localStorage.setItem('locale', language);
    }, [language]);

    const changeLanguage = (lang: Language) => {
        setLanguage(lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    };

    const l = (key: string, params?: Record<string, string>) => { // تغيير t إلى l
        const keys = key.split('.');
        let translation: any = locales[language];

        for (const k of keys) {
            if (translation && typeof translation === 'object') {
                if (Array.isArray(translation)) {
                    const index = parseInt(k, 10);
                    if (!isNaN(index) && index < translation.length) {
                        translation = translation[index];
                    } else {
                        translation = key;
                        break;
                    }
                } else if (k in translation) {
                    translation = translation[k];
                } else {
                    translation = key;
                    break;
                }
            } else {
                translation = key;
                break;
            }
        }

        if (params && typeof translation === 'string') {
            translation = Object.keys(params).reduce((acc, param) => {
                return acc.replace(`{{${param}}}`, params[param]);
            }, translation);
        }

        return translation;
    };

    const value = useMemo(() => ({ language, changeLanguage, l }), [language]); // تغيير t إلى l

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLangs = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLangs must be used within a LanguageProvider');
    }
    return context;
};