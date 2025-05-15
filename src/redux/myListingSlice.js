import { createSlice } from "@reduxjs/toolkit";

const myListingsSlice = createSlice({
    name: "myListings",
    initialState: {
        listings: [],
        loading: false,
        error: null,
    },

    reducers: {
        setMyListingsLoading: (state) => {
            state.loading = true;
            state.error = null;
        },

        setMyListings: (state, action) => {
            state.listings = action.payload;
            state.loading = false;
            state.error = null;
        },

        setMyListingsError: (state, action) => {
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
    setMyListings,
    setMyListingsLoading,
    setMyListingsError,
    updateListing,
    deactivateListing,
} = myListingsSlice.actions;

export default myListingsSlice.reducer;
