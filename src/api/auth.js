import API from "./index";

// Auth APIs
export const login = (credentials) => API.post("/auth/login", credentials);
export const register = (credentials) => API.post("/auth/register", credentials);
export const logout = () => API.post("/auth/logout");
