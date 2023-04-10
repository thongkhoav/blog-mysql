import { useState, createContext, useEffect, useContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("buser") || null)
  );
  // Side Effect
  useEffect(() => {
    localStorage.setItem("buser", JSON.stringify(currentUser));
  }, [currentUser]);

  // Functions
  const login = async (inputs) => {
    const res = await axios.post("/auth/login", inputs);
    setCurrentUser(res.data);
  };
  const logout = async () => {
    await axios.post("/auth/logout");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
