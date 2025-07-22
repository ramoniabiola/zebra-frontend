import { createSlice } from "@reduxjs/toolkit";

const apartmentSlice = createSlice({
    name: "apartments",
    initialState: {
        list: [],
        total: 0,
        hasMore: false,
        loading: false,
        error: null,
    },
    reducers: {
        getApartmentsSuccess: (state, action) => {
            state.list = action.payload.listings;
            state.total = action.payload.total;
            state.hasMore = action.payload.hasMore;
            state.loading = false;
            state.error = null;
        },
        getApartmentsLoading: (state) => {
            state.loading = true;
            state.error = null;
        },

        getApartmentsError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    getApartmentsSuccess,
    getApartmentsLoading,
    getApartmentsError,
} = apartmentSlice.actions;

export default apartmentSlice.reducer;
