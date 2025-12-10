// src/api/organizerApi.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/organizer",
});

// Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Profile
export const createProfile = (data) => API.put("/create-profile", data);
export const getMyProfile = () => API.get("/me");
export const updateProfile = (data) => API.put("/update-profile", data);

// Docs upload
export const uploadDocs = (formData) =>
  API.post("/verification-docs", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// Events
export const getOrganizerEvents = () => API.get("/events");
export const createEvent = (data) => API.post("/event", data);
export const updateEvent = (id, data) => API.put(`/event/${id}`, data);
export const deleteEvent = (id) => API.delete(`/event/${id}`);
