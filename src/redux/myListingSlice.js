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
            const apartmentId = action.payload;
            // Remove the deactivated apartment from the array
            state.listings.apartments = state.listings.apartments.filter(
                (apartment) => apartment._id !== apartmentId
            );
            // Update the total count
            state.listings.totalListings = state.listings.totalListings - 1;
            state.loading = false;
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