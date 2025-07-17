import { createSlice } from "@reduxjs/toolkit";

const myListingsSlice = createSlice({
    name: "myListings",
    initialState: {
        listings: {
            currentPage: 0,
            totalPages: 0,
            totalListings: 0,
            listingsPerPage: 0,
            apartments: [],
        },
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

        // CREATE NEW LISTING
        createNewListingLoading: (state) => {
            state.loading = true;
            state.error = null;
        },

        createNewListingSuccess: (state, action) => {
            state.loading = false;
            state.listings.apartments.unshift(action.payload); 
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
            const index = state.listings.apartments.findIndex((item) => item._id === id);
            if (index !== -1) {
              state.listings.apartments[index].isAvailable = false;
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
    createNewListingSuccess,
    createNewListingLoading,
    createNewListingFailure,
    deactivateMyListingSuccess,
    deactivateMyListingLoading,
    deactivateMyListingError
} = myListingsSlice.actions;

export default myListingsSlice.reducer;
