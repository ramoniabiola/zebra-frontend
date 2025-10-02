import API from "./index";

// Bookmark APIs
export const fetchUserBookmarksApi = () => API.get(`/bookmarks`); 
export const addBookmarkApi = (apartmentId) => API.post("/bookmarks", apartmentId);
export const removeBookmarkApi = (apartmentId) => API.delete(`/bookmarks/${apartmentId}`);
export const clearAllUserBookmarkApi = () => API.put(`/bookmarks/clear`);
