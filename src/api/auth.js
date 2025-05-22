import API from "./index";

// Auth APIs
export const loginApi = (credentials) => API.post("/auth/login", credentials);
export const registerUserApi = (credentials) => API.post("/auth/register", credentials);
