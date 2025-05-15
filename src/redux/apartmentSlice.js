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
        setApartments: (state, action) => {
            state.list = action.payload;
            state.loading = false;
            state.error = null;
        },

        setApartmentDetails: (state, action) => {
            state.selected = action.payload;
            state.loading = false;
            state.error = null;
        },

        setApartmentsLoading: (state) => {
            state.loading = true;
            state.error = null;
        },

        setApartmentsError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        
        clearSelectedApartment: (state) => {
            state.selected = null;
        },
    },
});

export const {
    setApartments,
    setApartmentDetails,
    setApartmentsLoading,
    setApartmentsError,
    clearSelectedApartment,
} = apartmentSlice.actions;

export default apartmentSlice.reducer;
