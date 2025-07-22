// SearchContext.tsx
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

// تعريف نوع للنتائج (يمكنك تعديله حسب بيانات API)
interface SearchResult {
  id: number;
  title: string;
  name: string;
}

// تعريف نوع للـ Context
interface SearchContextType {
  query: string;
  results: SearchResult[];
  loading: boolean;
  error: string | null;
  search: (searchQuery: string) => Promise<void>;
}

// إنشاء الـ Context مع نوع افتراضي
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// مزود الـ Context
export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (searchQuery: string) => {
    setQuery(searchQuery);
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<SearchResult[]>('https://192.168.1.100:3030/v1/search', {
        params: { q: searchQuery },
      });
      setResults(response.data);
    } catch (err) {
      setError('فشل في جلب نتائج البحث. حاول مرة أخرى.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // القيم التي سيتم مشاركتها
  const value: SearchContextType = {
    query,
    results,
    loading,
    error,
    search,
  };

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};

// هوك مخصص مع تحديد النوع
export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch يجب أن يُستخدم داخل SearchProvider');
  }
  return context;
};

export default SearchContext;