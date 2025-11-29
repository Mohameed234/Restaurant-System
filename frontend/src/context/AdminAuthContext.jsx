import { createContext, useState, useEffect } from "react";
import api from "../api/axios";
// import { useNavigate } from "react-router-dom";

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("adminToken") || null);
//   const navigate = useNavigate();

  useEffect(() => {
    if (token) fetchProfile();
  }, [token]);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/profile", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.user.role === "admin") {
        setAdmin(res.data.user);
      } else {
        logout();
      }
    } catch (err) {
      console.log(err);
      logout();
    }
  };

  const login = async (email, password) => {
    try {
      const res = await api.post("/login", { email: email.trim(), password: password.trim() });

      if (res.data.user.role !== "admin") {
        throw new Error("Not authorized");
      }

      setToken(res.data.token);
      localStorage.setItem("adminToken", res.data.token);
      setAdmin(res.data.user);
      
    } catch (err) {
      console.error(err.response?.data || err);
      throw err;
    }
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <AdminAuthContext.Provider value={{ admin, token, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
