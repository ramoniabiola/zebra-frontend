import { createSlice } from "@reduxjs/toolkit";

const apartmentSlice = createSlice({
    name: "apartments",
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {
        getApartments: (state, action) => {
            state.list = action.payload;
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
    getApartments,
    getApartmentsLoading,
    getApartmentsError,
} = apartmentSlice.actions;

export default apartmentSlice.reducer;
