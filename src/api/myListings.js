import API from "./index";

// myListings APIs
export const fetchMyListingsApi = () => API.get("/user-listings/");
export const fetchMyListingsByIdApi = (id) => API.get(`/user-listings/${id}`);
export const createNewListingApi = (data) => API.post("/apartments/create", data); 
export const updateMyListingApi = (id, data) => API.put(`/user-listings/${id}`, data); 
export const deactivateMyListingApi = (id) => API.put(`/user-listings/deactivate/${id}`);
