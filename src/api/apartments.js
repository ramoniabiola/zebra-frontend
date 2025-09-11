import API from "./index";

// Apartment APIs
export const fetchApartmentsApi = (params = {}) => API.get('/apartments', { params });
export const fetchApartmentByIdApi = (apartmentId) => API.get('/apartments/find/'+apartmentId);
export const fetchApartmentBySearchApi = (query, page = 1, limit = 10) => API.get(`/apartments/search?q=${query}&page=${page}&limit=${limit}`);
export const uploadApartmentImagesApi = (images) => API.post('/apartments/upload', images)
