import { createSlice } from "@reduxjs/toolkit";

const myListingsSlice = createSlice({
    name: "myListings",
    initialState: {
        listings: [],
        loading: false,
        error: null,
    },

    reducers: {
        getMyListingsLoading: (state) => {
            state.loading = true;
            state.error = null;
        },

        getMyListings: (state, action) => {
            state.listings = action.payload;
            state.loading = false;
            state.error = null;
        },

        getMyListingsError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        updateListing: (state, action) => {
            const updated = action.payload;
            const index = state.listings.findIndex((item) => item._id === updated._id);
            if (index !== -1) {
                state.listings[index] = updated;
            }
        },

        deactivateListing: (state, action) => {
            const id = action.payload;
            const index = state.listings.findIndex((item) => item._id === id);
            if (index !== -1) {
                state.listings[index].status = "inactive"; // or use a flag depending on schema
            }
        },
    },
});

export const {
    getMyListings,
    getMyListingsLoading,
    getMyListingsError,
    updateListing,
    deactivateListing,
} = myListingsSlice.actions;

export default myListingsSlice.reducer;
