// src/context/AdminAuthContext.jsx
import { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("adminToken") || null);
  const [loading, setLoading] = useState(true); // جديد

  useEffect(() => {
    const loadAdmin = async () => {
      if (token) {
        try {
          const res = await api.get("/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.data.user.role === "admin") {
            setAdmin(res.data.user);
          } else {
            logout();
          }
        } catch (err) {
          console.error(err);
          logout();
        }
      }
      setLoading(false); // بعد ما نخلص التحميل
    };
    loadAdmin();
  }, [token]);

  const login = async (email, password) => {
    const res = await api.post("/login", { email, password });
    if (res.data.user.role !== "admin") throw new Error("Not authorized");

    localStorage.setItem("adminToken", res.data.token);
    setToken(res.data.token);
    setAdmin(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider value={{ admin, token, login, logout, loading }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
