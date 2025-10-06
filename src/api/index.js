import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.DEV
    ? import.meta.env.VITE_API_BASE_URL_DEV
    : import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});



// Optional: Set auth token automatically if using JWT
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });
   

export default API;
