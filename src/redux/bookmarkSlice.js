import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from "@reduxjs/toolkit";

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
        limit: 2,
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
            state.items.totalBookmarks = action.payload.length;
            state.items.totalPages = Math.ceil(action.payload.length / state.limit); 
            state.items.bookmarks = action.payload; 
        },
        getBookmarksFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        setCurrentPage: (state, action) => {
            state.items.currentPage = action.payload;
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
            
            // Update total count if item was removed
            if (state.items.bookmarks.length < initialLength) {
                state.items.totalBookmarks -= 1;
                state.items.totalPages = Math.ceil(state.items.totalBookmarks / state.limit);

                if (state.items.currentPage > state.items.totalPages) {
                    state.items.currentPage = state.items.totalPages || 1;
                }

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
    setCurrentPage,
    clearError,
    clearBookmarks,
} = bookmarkSlice.actions;
export default bookmarkSlice.reducer;


export const selectPaginatedBookmarks = createSelector(
    [
        (state) => state.bookmarks.items.bookmarks,
        (state) => state.bookmarks.items.currentPage,
        (state) => state.bookmarks.limit,
    ],
    (bookmarks, currentPage, limit) => {
        const start = (currentPage - 1) * limit;
        const end = start + limit;
        return bookmarks.slice(start, end);
    }
);

