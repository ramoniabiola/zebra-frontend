import { createSlice } from '@reduxjs/toolkit';

// Slice
const bookmarkSlice = createSlice({
    name: 'bookmarks',
    initialState: {
        items: [],
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
        addBookmarkSuccess: (state, action) => {
            state.items?.bookmarks.unshift(action.payload);
        },

        addBookmarkFailure: (state, action) => {
            state.error = action.payload;
        },

        // REMOVE BOOKMARK
        removeBookmarkSuccess: (state, action) => {
          state.items?.filter((b) => b.apartmentId?._id !== action.payload);
        },

        removeBookmarkFailure: (state, action) => {
            state.error = action.payload;
        },

        // CLEAR ALL BOOKMARK
        clearBookmark: () => ({
            items: [],
            loading: false,
            error: null,
        })

    } 
});

export const {getBookmarksLoading, getBookmarksSuccess, 
    getBookmarksFailure, addBookmarkSuccess, addBookmarkFailure, 
    removeBookmarkSuccess, removeBookmarkFailure, clearBookmark  
} = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
