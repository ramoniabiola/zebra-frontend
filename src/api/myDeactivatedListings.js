import API from "./index";

// myDeactivatedListings APIs
export const fetchMyDeactivatedListingsApi = (query) => API.get(`/deactivated?${query}`);
export const fetchMyDeactivatedListingByIdApi = (id) => API.get(`/deactivated/find/${id}`); 
export const reactivateMyListingApi = (id) => API.put(`/user-post/reactivate/${id}`);
