import axios from "./AxiosInstance";

export const getOrganizers = (status) =>
  axios.get(`/admin/organizers`, { params: { status } });

export const verifyOrganizer = (id, action) =>
  axios.patch(`/admin/verify-organizer/${id}`, { action });

export const getAnalytics = () =>
  axios.get(`/admin/analytics`);
