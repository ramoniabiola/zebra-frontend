import API from "./index";

// Bookmark APIs
export const fetchBookmarks = () => API.get("/bookmarks");
export const addBookmark = (apartmentId) => API.post("/bookmarks", { apartmentId });
export const removeBookmark = (apartmentId) => API.delete(`/bookmarks/${apartmentId}`);
