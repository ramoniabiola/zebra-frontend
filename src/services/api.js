import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // Enable cookies for auth
});

// Authentication
export const login = (credentials) => API.post("/auth/login", credentials);
export const register = (userData) => API.post("/auth/register", userData);

// Apartments
export const fetchApartments = (query) => API.get(`/apartments?${query}`);
export const fetchApartmentById = (id) => API.get(`/apartments/${id}`);

// Bookmarks
export const fetchBookmarks = () => API.get("/bookmarks");
export const addBookmark = (apartmentId) => API.post("/bookmarks", { apartmentId });
export const removeBookmark = (apartmentId) => API.delete(`/bookmarks/${apartmentId}`);

export default API;
