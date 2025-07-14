import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

import authReducer from './authSlice';
import bookmarkReducer from './bookmarkSlice';
import apartmentReducer from './apartmentSlice';
import myListingsReducer from './myListingSlice';
import myDeactivatedListingsReducer from './myDeactivatedListingsSlice';

// Combine all your reducers
const rootReducer = combineReducers({
  auth: authReducer,
  bookmarks: bookmarkReducer,
  apartments: apartmentReducer,
  myListings: myListingsReducer,
  myDeactivatedListings: myDeactivatedListingsReducer,
});

// Persist configuration (only auth + bookmarks)
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'bookmarks'], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // redux-persist actions must be ignored
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Create persistor
export const persistor = persistStore(store);
export default store;
