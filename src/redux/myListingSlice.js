import { createSlice } from "@reduxjs/toolkit";

const myListingsSlice = createSlice({
    name: "myListings",
    initialState: {
        listings: [],
        loading: false,
        error: null,
    },

    reducers: {
        // GET MY-LISTINGS
        getMyListingsLoading: (state) => {
            state.loading = true;
            state.error = null;
        },

        getMyListingsSuccess: (state, action) => {
            state.listings = action.payload;
            state.loading = false;
            state.error = null;
        },

        getMyListingsError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // UPDATE MY-LISTING
        updateMyListingLoading: (state) => {
            state.loading = true;
            state.error = null;
        },

        updateMyListingSuccess: (state, action) => {
            const updated = action.payload;
            const index = state.listings.findIndex((item) => item._id === updated._id);
            if (index !== -1) {
                state.listings[index] = updated;
            }
        },

        updateMyListingError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        // CREATE NEW LISTING
        createNewListingLoading: (state) => {
            state.loading = true;
            state.error = null;
        },

        createNewListingSuccess: (state, action) => {
            state.loading = false;
            state.listings.unshift(action.payload); 
        },

        createNewListingFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        // DEACTIVATE MY-LISTING
        deactivateMyListingLoading: (state) => {
            state.loading = true;
            state.error = null;
        },

        deactivateMyListingSuccess: (state, action) => {
            const id = action.payload;
            const index = state.listings.findIndex((item) => item._id === id);
            if (index !== -1) {
              state.listings[index].isAvailable = false;
            }
        },

        deactivateMyListingError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    getMyListingsSuccess,
    getMyListingsLoading,
    getMyListingsError,
    updateMyListingSuccess,
    updateMyListingLoading,
    updateMyListingError,
    createNewListingSuccess,
    createNewListingLoading,
    createNewListingFailure,
    deactivateMyListingSuccess,
    deactivateMyListingLoading,
    deactivateMyListingError
} = myListingsSlice.actions;

export default myListingsSlice.reducer;
