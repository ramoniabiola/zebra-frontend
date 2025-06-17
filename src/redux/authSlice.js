import { createSlice } from '@reduxjs/toolkit';


// Initial state
const initialState = {
    user: null,
    loading: false,
    error: null,
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

        // LOGOUT
        setLogout: (state) => initialState


    },
});

export const { loginLoading,loginSuccess, 
    loginFailure,registerUserLoading, 
    registerUserSuccess, registerUserFailure, 
    setLogout 
} = authSlice.actions;
export default authSlice.reducer;
