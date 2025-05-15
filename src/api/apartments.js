import API from "./index";

// Apartment APIs
export const fetchApartments = (query) => API.get(`/apartments?${query}`);
export const fetchApartmentById = (id) => API.get(`/apartments/${id}`);
