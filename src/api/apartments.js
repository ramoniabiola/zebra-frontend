import API from "./index";

// Apartment APIs
export const fetchApartmentsApi = () => API.get('/apartments/');
export const fetchApartmentByIdApi = (id) => API.get('/apartments/find/'+id);
export const uploadApartmentImagesApi = (images) => API.post('/apartments/upload', images)
