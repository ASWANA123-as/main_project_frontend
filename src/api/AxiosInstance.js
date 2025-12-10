// src/api/axiosInstance.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "https://mainproject-8vc6.onrender.com/api",
  withCredentials: false, // using Authorization header, not cookies
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
