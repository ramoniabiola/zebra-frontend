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
            const { listings, total, hasMore, page } = action.payload;

            // Merge with deduplication by _id
            const newList = [
                ...listings.filter(
                    (apt) => !state.list.some((existing) => existing._id === apt._id)
                ),
                ...state.list,
            ];

        
            state.list = newList;
            state.total = total;
            state.hasMore = hasMore;
            state.page = page;
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

        resetApartments: (state) => {
            state.list = [];
            state.total = 0;
            state.page = 1;
            state.hasMore = true;
            state.loading = false;
            state.error = null;
        },

        clearApartmentsError: (state) => {
            state.error = null;
        }
    },
});

export const {
    getApartmentsSuccess,
    getApartmentsLoading,
    getApartmentsError,
    resetApartments,
    clearApartmentsError
} = apartmentSlice.actions;

export default apartmentSlice.reducer;
