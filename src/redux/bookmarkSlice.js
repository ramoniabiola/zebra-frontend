import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBookmarks, addBookmark, removeBookmark } from '../../api'; // adjust path if needed

// Thunks
export const getBookmarks = createAsyncThunk(
    'bookmarks/getBookmarks',
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetchBookmarks();
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch bookmarks');
        }
    }
);

export const saveBookmark = createAsyncThunk(
    'bookmarks/saveBookmark',
    async (apartmentId, { rejectWithValue }) => {
        try {
            const res = await addBookmark(apartmentId);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to add bookmark');
        }
    }
);

export const deleteBookmark = createAsyncThunk(
    'bookmarks/deleteBookmark',
    async (apartmentId, { rejectWithValue }) => {
        try {
            await removeBookmark(apartmentId);
            return apartmentId; // return ID to remove from local state
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to remove bookmark');
        }
    }
);

// Slice
const bookmarkSlice = createSlice({
    name: 'bookmarks',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
        // Fetch bookmarks
        .addCase(getBookmarks.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getBookmarks.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
        })
        .addCase(getBookmarks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // Add bookmark
        .addCase(saveBookmark.fulfilled, (state, action) => {
            state.items.unshift(action.payload);
        })
        .addCase(saveBookmark.rejected, (state, action) => {
            state.error = action.payload;
        })

        // Remove bookmark
        .addCase(deleteBookmark.fulfilled, (state, action) => {
            state.items = state.items.filter(b => b._id !== action.payload);
        })
        .addCase(deleteBookmark.rejected, (state, action) => {
            state.error = action.payload;
        });
    },
}) ;

export default bookmarkSlice.reducer;
