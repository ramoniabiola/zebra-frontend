import API from "./index";

// myDeactivatedListings APIs
export const fetchMyDeactivatedListingsApi = (userId) => API.get(`/user-listings/deactivated/${userId}`);
export const fetchMyDeactivatedListingByIdApi = (userId, apartmentId) => API.get(`/user-listings/${userId}/apartment/deactivated/${apartmentId}`);
export const reactivateMyListingApi = (apartmentId, data) => API.put(`/user-listings/reactivate/${apartmentId}`, data);
export const fetchMyDeactivatedListingsBySearchApi = (query) => API.get(`/user-listings/search/deactivated?keyword=${query}`)

