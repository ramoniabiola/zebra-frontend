import { createSlice } from "@reduxjs/toolkit";

const myDeactivatedListingsSlice = createSlice({
    name: "myDeactivatedListings",
    initialState: {
        deactivatedListings: [],
        loading: false,
        error: null,
    },

    reducers: {
        setMyDeactivatedListingsLoading: (state) => {
            state.loading = true;
            state.error = null;
        },

        setMyDeactivatedListings: (state, action) => {
            state.deactivatedListings = action.payload;
            state.loading = false;
            state.error = null;
        },

        setMyDeactivatedListingsError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        
        reactivateListing: (state, action) => {
            const id = action.payload;
            const index = state.deactivatedListings.findIndex((item) => item._id === id);
            if (index !== -1) {
                state.deactivatedListings[index].status = "active"; // or use a flag depending on schema
            }
        },
    },
});

export const {
    setMyDeactivatedListings,
    setMyDeactivatedListingsLoading,
    setMyDeactivatedListingsError,
    reactivateListing,
} = myDeactivatedListingsSlice.actions;

export default myDeactivatedListingsSlice.reducer;
