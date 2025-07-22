import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = process.env;

interface AuthContextType {
  user: any;
  fetchUser: (uuid: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const uuid = localStorage.getItem("uuid");

    if (uuid) {
      fetch(`${process.env.API_BASE_URL}/v1/verif`, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user.email) {
            setUser(data.user);
          } else {
            console.error("Error fetching user data:");
            localStorage.removeItem("uuid");
            navigate("/login");
          }
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
          navigate("/login");
        });
    }
  }, []);

  const fetchUser = (uuid: string) => {
    localStorage.setItem("uuid", uuid);
    fetch(`${process.env.API_BASE_URL}/v1/verif`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser(data.user);
        navigate('/', { replace: true });
      });
  };

  const logout = () => {
    localStorage.removeItem("uuid");
    setUser(null);
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, fetchUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};