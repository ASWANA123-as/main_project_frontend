import axios from "axios";

const API = axios.create({
  baseURL: "https://mainproject-8vc6.onrender.com/api/attendee",
});
const APIPayment = axios.create({
  baseURL: "https://mainproject-8vc6.onrender.com/api/payment",
});

// Add token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
APIPayment.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


// API FUNCTIONS
export const getMyProfileAttandee = () => API.get("/me");
export const createProfile = (data) => API.post("/create-profile", data);
export const updatePreferences = (data) => API.patch("/preferences", data);

export const getMyEvents = () => API.get("/my-events");
export const registerEvent = (id) => API.post(`/register/${id}`);
export const unregisterEvent = (id) => API.delete(`/unregister/${id}`);
export const getAllEvents=()=>API.get("/events/all");
export const addLoyaltyPoints = (data) => API.patch("/loyalty/add", data, {
  headers: { "Content-Type": "application/json" }
});
export const downloadTicket=(userId,eventId)=>API.get(`/ticket/${eventId}`,{responseType: "blob",})
export const getLoyaltyPoints=()=>API.get("/loyalty")
export const Paymentcheckout=(eventId,data)=>APIPayment.post(`/payments/create-checkout-session/${eventId}`,data)

