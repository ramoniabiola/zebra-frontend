import API from "./index";

// myDeactivatedListings APIs
export const fetchDeactivatedListings = (query) => API.get(`/apartments?${query}`);
export const fetchDeactivatedListingsById = (id) => API.get(`/apartments/${id}`); 
export const reactivateListing = (id) => API.put(`/reactivate/${id}`);
