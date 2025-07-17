import API from "./index";

// myDeactivatedListings APIs
export const fetchMyDeactivatedListingsApi = (userId) => API.get('/user-listings/deactivated', userId);
export const fetchMyDeactivatedListingByIdApi = (id) => API.get(`/user-listings/deactivated/find/${id}`); 
export const reactivateMyListingApi = (id) => API.put(`/user-listings/reactivate/${id}`);
