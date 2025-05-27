import API from "./index";

// Apartment APIs
export const fetchApartmentsApi = (query) => API.get(`/apartments?${query}`);
export const fetchApartmentByIdApi = (id) => API.get(`/apartments/find/${id}`);
