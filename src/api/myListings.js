import API from "./index";

// myListings APIs
export const fetchListings = (query) => API.get(`/apartments?${query}`);
export const fetchListingsById = (id) => API.get(`/apartments/${id}`);
export const createNewListing = (data) => API.post("/apartments", data); 
export const updateListing = (id, data) => API.put(`/apartments/${id}`, data); 
export const deactivateListing = (id) => API.put(`/deactivate/${id}`);
