import API from "./index";

// myListings APIs
export const fetchMyListingsApi = (userId) => API.get(`/user-listings/${userId}`);
export const fetchMyListingsByIdApi = (userId, apartmentId) => API.get(`/user-listings/${userId}/apartment/${apartmentId}`);
export const createNewListingApi = (data) => API.post("/apartments/create", data); 
export const deactivateMyListingApi = (id) => API.put(`/user-listings/deactivate/${id}`);
export const fetchUserStatsApi = () => API.get('/user-listings/count/dashboard')
export const fetchMyListingsBySearchApi = (query) => API.get(`/user-listings/search/active?keyword=${query}`)
