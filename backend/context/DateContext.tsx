import React, { createContext, useContext } from 'react';
import { useLangs } from '../context/LanguageContext';


// تعريف نوع الـ Context
interface DateContextType {
    formatRelativeDate: (dateString: string) => string;
}

// إنشاء الـ Context
const DateContext = createContext<DateContextType | undefined>(undefined);

// دالة التحويل (نفس الدالة السابقة)
const formatRelativeDate = (dateString: string): string => {
    const { l } = useLangs();
    const now = new Date();
    const inputDate = new Date(dateString);
    const diffMs = now.getTime() - inputDate.getTime(); // استخدام getTime() للحصول على قيمة رقمية    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);


    const months = [
        "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
        "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
    ];

    const year = inputDate.getFullYear();
    const month = months[inputDate.getMonth()];
    const day = inputDate.getDate();
    const hours = inputDate.getHours();
    const minutes = inputDate.getMinutes().toString().padStart(2, '0');

    if (diffDays === 0) return l('date.0.day');
    if (diffDays === 1) return l('date.0.yesterday');
    if (diffDays >= 7 && diffDays < 14 && diffWeeks === 1) return "منذ أسبوع";
    if (diffDays > 1) return `${l('date.0.since')} ${diffDays} ${l('date.0.days')}`;

    return `${year} ${l('date.0.month')} ${month} ${day} ${l('date.0.hour')} ${hours}:${minutes}`;
};

// مزود الـ Context
export const DateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const value = {
        formatRelativeDate,
    };

    return <DateContext.Provider value={value}>{children}</DateContext.Provider>;
};

// هوك مخصص لاستخدام الـ Context
export const useDate = () => {
    const context = useContext(DateContext);
    if (!context) {
        throw new Error('useDate يجب أن يُستخدم داخل DateProvider');
    }
    return context;
};