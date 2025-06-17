import API from "./index";

// Auth APIs
export const loginApi = (credentials) => API.post("/user/auth/login", credentials);
export const registerUserApi = (credentials) => API.post("/user/auth/register", credentials);
