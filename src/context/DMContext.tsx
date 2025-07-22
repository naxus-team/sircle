import { createContext, useState, useContext, ReactNode } from "react";
import axios from "axios";
const API_BASE_URL = process.env;

interface Class {
  class_name: string;
  class_code: string;
  // email: string;
  // avatar: string;
  // bio?: string;
}

interface ClassContextType {
  classData: Class | null;
  fetchClass: (class_code: string) => Promise<void>;
}

const ClassContext = createContext<ClassContextType | undefined>(undefined);

export const DMProvider = ({ children }: { children: ReactNode }) => {
  const [classData, setClass] = useState<Class | null>(null);

  const fetchClass = async (class_code: string) => {
    try {
      const { data } = await axios.get(`https://192.168.1.100:3030/v1/class?cl=${class_code}`);
      setClass(data);
    } catch (error) {
      console.error("❌ فشل جلب بيانات المستخدم:", error);
      setClass(null);
    }
  };

  console.log(API_BASE_URL);

  return (
    <ClassContext.Provider value={{ classData, fetchClass }}>
      {children}
    </ClassContext.Provider>
  );
};

// ⏬ هوك لاستخدام `UserContext`
export const useClass = () => {
  const context = useContext(ClassContext);
  if (!context) throw new Error("useUser يجب أن يكون داخل UserProvider");
  return context;
};
