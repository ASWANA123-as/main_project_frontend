// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/AxiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    const usertype = localStorage.getItem("usertype");
    const email = localStorage.getItem("email");
    const name = localStorage.getItem("name");
    return token ? { token, usertype, email, name } : null;
  });

  useEffect(() => {
    // useful if you want to validate token on load
  }, []);

  const login = ({ token, userType, email, firstname }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("usertype", userType || userType /* depends backend */);
    localStorage.setItem("email", email || "");
    localStorage.setItem("name", firstname || "");
    setUser({ token, usertype: userType, email, name: firstname });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usertype");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
