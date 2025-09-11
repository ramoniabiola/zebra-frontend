import { createSlice } from "@reduxjs/toolkit";

const myDeactivatedListingsSlice = createSlice({
    name: "myDeactivatedListings",
    initialState: {
        deactivatedListings: {
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
        //GET MY DEACTIVATED LISTINGS
        getMyDeactivatedListingsLoading: (state) => {
            state.loading = true;
            state.error = null;
        },

        getMyDeactivatedListingsSuccess: (state, action) => {
            const {currentPage, totalPages, totalListings, listingsPerPage, apartments } = action.payload; 

            state.deactivatedListings.currentPage = currentPage;
            state.deactivatedListings.totalPages = totalPages;
            state.deactivatedListings.totalListings = totalListings;
            state.deactivatedListings.listingsPerPage = listingsPerPage;
            state.deactivatedListings.apartments = apartments;
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
            const apartmentId = action.payload;
            // Remove the reactivated apartment from the array
            state.deactivatedListings.apartments = state.deactivatedListings.apartments.filter(
                (apartment) => apartment._id !== apartmentId
            );
            // Update the total count
            state.deactivatedListings.totalListings = state.deactivatedListings.totalListings - 1;
            state.loading = false;
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
