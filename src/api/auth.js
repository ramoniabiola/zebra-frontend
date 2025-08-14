import API from "./index";

// Auth APIs
export const loginApi = (credentials) => API.post("/user/auth/login", credentials);
export const registerUserApi = (credentials) => API.post("/user/auth/register", credentials);
export const sendVerificationCodeApi = (userEmail) => API.post("/user/auth/send-verification-code", userEmail);
export const codeVerificationApi = (credentials) => API.post("/user/auth/code-verification", credentials)


