import { createSlice } from "@reduxjs/toolkit";

const apartmentSlice = createSlice({
    name: "apartments",
    initialState: {
        list: [],
        selected: null,
        loading: false,
        error: null,
    },
    reducers: {
        getApartments: (state, action) => {
            state.list = action.payload;
            state.loading = false;
            state.error = null;
        },

        getApartmentDetails: (state, action) => {
            state.selected = action.payload;
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
        
        clearSelectedApartment: (state) => {
            state.selected = null;
        },
    },
});

export const {
    getApartments,
    getApartmentDetails,
    getApartmentsLoading,
    getApartmentsError,
    clearSelectedApartment,
} = apartmentSlice.actions;

export default apartmentSlice.reducer;
