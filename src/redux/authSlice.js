import { createSlice } from '@reduxjs/toolkit';


// Initial state
const initialState = {
    user: null,
    loading: false,
    error: null,
    updateLoading: false,
    updateError: null,
    updateSuccess: false,
};

// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // LOGIN
        loginLoading: (state) => {
            state.loading = true;
            state.error = null;
        },

        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        },

        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // REGISTER
        registerUserLoading: (state) => {
            state.loading = true;
            state.error = null;
        },

        registerUserSuccess: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        },

        registerUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // UPDATE USER
        updateUserLoading: (state) => {
            state.updateLoading = true;
            state.updateError = null;
            state.updateSuccess = false;
        },
        updateUserSuccess: (state, action) => {
            state.user = action.payload;
            state.updateLoading = false;
            state.updateError = null;
            state.updateSuccess = true;
        },
        updateUserFailure: (state, action) => {
            state.updateLoading = false;
            state.updateError = action.payload;
            state.updateSuccess = false;
        },
        clearUpdateStatus: (state) => {
            state.updateLoading = false;
            state.updateError = null;
            state.updateSuccess = false;
        },

        // LOGOUT
        setLogout: () => ({
            user: null,
            loading: false,
            error: null,
            updateLoading: false,
            updateError: null,
            updateSuccess: false,
        })

    },
});



export const {loginLoading,
    loginSuccess,
    loginFailure,
    registerUserLoading,
    registerUserSuccess,
    registerUserFailure,
    updateUserLoading,
    updateUserSuccess,
    updateUserFailure,
    clearUpdateStatus,
    setLogout
} = authSlice.actions;
export default authSlice.reducer;
