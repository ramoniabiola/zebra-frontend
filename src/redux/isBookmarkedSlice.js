import { createSlice } from '@reduxjs/toolkit';

// Slice
const isBookmarkedSlice = createSlice({
    name: 'isBookmarked',
    initialState: {
        apartments: [],
        error: null,
    },
    reducers: {

        // ADD BOOKMARK
        addBookmarkSuccess: (state, action) => {
            // action.payload should be the apartmentId
            const apartmentId = action.payload;
            // Only add if not already bookmarked
            const alreadyExists = state.apartments.some(
                (bookmark) => bookmark.apartmentId === apartmentId
            );
            if (!alreadyExists) {
                state.apartments.unshift({ apartmentId });
            }
        },
        
        addBookmarkFailure: (state, action) => {
            state.error = action.payload;
        },
        
        
        // REMOVE BOOKMARK
        removeBookmarkSuccess: (state, action) => {
            // action.payload should be the apartmentId to remove
            const apartmentId = action.payload;
            state.apartments = state.apartments.filter(
                (bookmark) => bookmark.apartmentId !== apartmentId
            );
        },
        
        removeBookmarkFailure: (state, action) => {
            state.error = action.payload;
        },

        // CLEAR ALL BOOKMARK
        clearBookmark: () => ({
            apartments: [],
            error: null,
        })

    } 
});

export const { addBookmarkSuccess, addBookmarkFailure, 
    removeBookmarkSuccess, removeBookmarkFailure, clearBookmark  
} = isBookmarkedSlice.actions;
export default isBookmarkedSlice.reducer;
