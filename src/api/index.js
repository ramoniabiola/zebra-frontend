import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    (import.meta.env.DEV
      ? "http://localhost:5000/api"
      : "https://zebra-backend-6eu3.onrender.com/api"),
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
