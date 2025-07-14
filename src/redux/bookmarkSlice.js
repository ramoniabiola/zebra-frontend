import { createSlice } from '@reduxjs/toolkit';

// Slice
const bookmarkSlice = createSlice({
    name: 'bookmarks',
    initialState: {
        items: {
            totalBookmarks: 0,
            currentPage: 1,
            totalPages: 0,
            bookmarks: [],
        },
        loading: false,
        error: null,
    },
    reducers: {

        // FETCH BOOKMARKS
        getBookmarksLoading: (state) => {
            state.loading = true;
            state.error = null;
        },
        getBookmarksSuccess: (state, action) => {
            state.loading = false;
            state.items = action.payload;
        },
        getBookmarksFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        // ADD BOOKMARK
        addBookmarkLoading: (state) => {
            state.loading = true;
            state.error = null;
        },
        addBookmarkSuccess: (state, action) => {
            state.loading = false;
            // action.payload should be the apartmentId
            const apartmentId = action.payload;

            // Check if bookmark already exists
            const alreadyExists = state.items.bookmarks.some(
                (bookmark) => bookmark.apartmentId._id === apartmentId._id
            );
            
            if (!alreadyExists) {
                state.items.bookmarks.unshift(apartmentId);
                state.items.totalBookmarks += 1;
            }
        },
        addBookmarkFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        // REMOVE BOOKMARK
        removeBookmarkLoading: (state) => {
            state.loading = true;
            state.error = null;
        },
        removeBookmarkSuccess: (state, action) => {
            state.loading = false;
            // action.payload should be the apartmentId to remove
            const apartmentId = action.payload;
            
            const initialLength = state.items.bookmarks.length;
            state.items.bookmarks = state.items.bookmarks.filter(
                (bookmark) => bookmark.apartmentId._id !== apartmentId
            );
            
            // Update total count if item was actually removed
            if (state.items.bookmarks.length < initialLength) {
                state.items.totalBookmarks -= 1;
            }
        },
        removeBookmarkFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // CLEAR ERROR
        clearError: (state) => {
            state.error = null;
        },

        // CLEAR ALL BOOKMARKS
        clearBookmarks: (state) => {
            state.items = {
                totalBookmarks: 0,
                currentPage: 1,
                totalPages: 0,
                bookmarks: [],
            };
            state.loading = false;
            state.error = null;
        },

        // SET PAGINATION INFO (useful for updating pagination without full refetch)
        setPaginationInfo: (state, action) => {
            const { currentPage, totalPages } = action.payload;
            state.items.currentPage = currentPage;
            state.items.totalPages = totalPages;
        },
    } 
});

export const {
    getBookmarksLoading,
    getBookmarksSuccess,
    getBookmarksFailure,
    addBookmarkLoading,
    addBookmarkSuccess,
    addBookmarkFailure,
    removeBookmarkLoading,
    removeBookmarkSuccess,
    removeBookmarkFailure,
    clearError,
    clearBookmarks,
    setPaginationInfo,
} = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
