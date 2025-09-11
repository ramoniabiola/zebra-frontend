import API from "./index";

// myListings APIs
export const fetchMyListingsByIdApi = (userId, apartmentId) => API.get(`/user-listings/${userId}/apartment/${apartmentId}`);
export const createNewListingApi = (data) => API.post("/apartments/create", data); 
export const deactivateMyListingApi = (apartmentId) => API.put(`/user-listings/deactivate/${apartmentId}`);
export const fetchUserStatsApi = () => API.get('/user-listings/count/dashboard')

export const fetchMyListingsBySearchApi = (query, page = 1, limit = 10) =>
  API.get(`/user-listings/search/active?keyword=${query}&page=${page}&limit=${limit}`);

export const fetchMyListingsApi = (userId, page = 1, limit = 10) =>
  API.get(`/user-listings/${userId}?page=${page}&limit=${limit}`);

