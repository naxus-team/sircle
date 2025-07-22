import { createContext, useState, useContext, ReactNode } from "react";
import axios from "axios";
const API_BASE_URL = process.env;

interface Class {
  class_code: string;
  class_name: string;
  access: boolean;
}

interface ClassContextType {
  classData: Class | null;
  fetchClass: (class_code: string) => Promise<void>;
}

const ClassContext = createContext<ClassContextType | undefined>(undefined);

export const ClassProvider = ({ children }: { children: ReactNode }) => {
  const [classData, setClass] = useState<Class | null>(null);

  const fetchClass = async (class_code: string) => {
    try {
      const { data } = await axios.get(`https://192.168.1.100:3030/v1/channel?cl=${class_code}`);
      setClass(data[0]);
    } catch (error) {
      console.error("❌ فشل جلب بيانات المستخدم:", error);
      setClass(null);
    }
  };

  return (
    <ClassContext.Provider value={{ classData, fetchClass }}>
      {children}
    </ClassContext.Provider>
  );
};

export const useClass = () => {
  const context = useContext(ClassContext);
  if (!context) throw new Error("useUser يجب أن يكون داخل UserProvider");
  return context;
};
