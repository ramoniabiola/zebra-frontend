import API from "./index";

// myListings APIs
export const fetchMyListingsApi = () => API.get("/user-post/");
export const fetchMyListingsByIdApi = (id) => API.get(`/user-post/${id}`);
export const createNewListingApi = (data) => API.post("/apartments/create", data); 
export const updateMyListingApi = (id, data) => API.put(`/user-post/${id}`, data); 
export const deactivateMyListingApi = (id) => API.put(`/user-post/deactivate/${id}`);
