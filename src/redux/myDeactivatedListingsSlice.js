import { createSlice } from "@reduxjs/toolkit";

const myDeactivatedListingsSlice = createSlice({
    name: "myDeactivatedListings",
    initialState: {
        deactivatedListings: [],
        loading: false,
        error: null,
    },

    reducers: {
        //GET MY DEACTIVATED LISTINGS
        getMyDeactivatedListingsLoading: (state) => {
            state.loading = true;
            state.error = null;
        },

        getMyDeactivatedListingsSuccess: (state, action) => {
            state.deactivatedListings = action.payload;
            state.loading = false;
            state.error = null;
        },

        getMyDeactivatedListingsError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // REACTIVATE MY LISTING
        reactivateMyListingLoading: (state) => {
           state.loading = true; 
           state.error = null;
        },
        
        
        reactivateMyListingSuccess: (state, action) => {
          const id = action.payload;
          const index = state.listings.findIndex((item) => item._id === id);
          if (index !== -1) {
            state.listings[index].isAvailable = true;
          }
        },

        reactivateMyListingError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    getMyDeactivatedListingsSuccess,
    getMyDeactivatedListingsLoading,
    getMyDeactivatedListingsError,
    reactivateMyListingSuccess,
    reactivateMyListingLoading,
    reactivateMyListingError,
} = myDeactivatedListingsSlice.actions;

export default myDeactivatedListingsSlice.reducer;
