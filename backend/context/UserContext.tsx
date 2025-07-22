import { createContext, useState, useContext, ReactNode } from "react";
import axios from "axios";
const API_BASE_URL = process.env;

interface User {
  firstname: string;
  lastname: string;
  username: string;
  image: string;
  bio: string;
  mobile: string;
  createdat: string;
}

interface UserContextType {
  user: User | null;
  fetchUser: (username: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async (username: string) => {
    try {
      const { data } = await axios.get(`https://192.168.1.100:3030/v1/user?username=${username}`);
      setUser(data[0]);
    } catch (error) {
      console.error("❌ فشل جلب بيانات المستخدم:", error);
      setUser(null);
    }
  };

  return (
    <UserContext.Provider value={{ user, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

// ⏬ هوك لاستخدام `UserContext`
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser يجب أن يكون داخل UserProvider");
  return context;
};
