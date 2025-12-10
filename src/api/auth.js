// src/api/auth.js
import api from "./AxiosInstance";

export const login = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data; // expecting { token, userType, email, firstname }
};

export const register = async (payload) => {
  const res = await api.post("/auth/register", payload);
  return res.data;
};
