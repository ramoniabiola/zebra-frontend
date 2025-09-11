import API from "./index";

// myDeactivatedListings APIs
export const fetchMyDeactivatedListingByIdApi = (userId, apartmentId) => API.get(`/user-listings/${userId}/apartment/deactivated/${apartmentId}`);
export const reactivateMyListingApi = (apartmentId, data) => API.put(`/user-listings/reactivate/${apartmentId}`, data);

export const fetchMyDeactivatedListingsApi = (userId, page = 1, limit = 10) => 
    API.get(`/user-listings/deactivated/${userId}?page=${page}&limit=${limit}`);

export const fetchMyDeactivatedListingsBySearchApi = (query, page = 1, limit = 10) => 
    API.get(`/user-listings/search/deactivated?keyword=${query}&page=${page}&limit=${limit}`)

