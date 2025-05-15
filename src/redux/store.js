import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // adjust path if different
import bookmarkReducer from './bookmarkSlice'
import apartmentReducer from './apartmentSlice'
import myListingsReducer from './myListingSlice'
import myDeactivatedListingsReducer from './myDeactivatedListingsSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    bookmarks: bookmarkReducer,
    apartments: apartmentReducer,
    myListings: myListingsReducer,
    myDeactivatedListings: myDeactivatedListingsReducer
  },
  devTools: process.env.NODE_ENV !== 'production', // for Redux DevTools in development
});

export default store;
