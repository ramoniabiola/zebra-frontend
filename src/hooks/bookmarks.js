import { fetchUserBookmarksApi, addBookmarkApi, removeBookmarkApi } from "../api/bookmarks";
import {getBookmarksLoading, getBookmarksSuccess, 
    getBookmarksFailure, addBookmarkSuccess, addBookmarkFailure, 
    removeBookmarkSuccess, removeBookmarkFailure  
} from "../redux/bookmarkSlice";
import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";


// GET USER BOOKMARKS
export const useGetUserBookmarks = () => {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((state) => state.bookmarks);

    useEffect(() => {
        const getUserBookmarks = async () => {
            dispatch(getBookmarksLoading());
            try {
                const response = await fetchUserBookmarksApi();
                dispatch(getBookmarksSuccess(response.data));
            } catch (err) {
                dispatch(
                    getBookmarksFailure(
                        err.response?.data?.message || "Failed to fetch your bookmarks"
                    )
                );
            }
        };

        getUserBookmarks();
    }, [dispatch]);

    return { bookmarks: items, loading, error };
};


// ADD AN APARTMENT TO BOOKMARK
export const useAddBookmark = () => {
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.bookmarks);

    const addToBookmark = useCallback(async (apartmentId) => {

        try {
            const response = await addBookmarkApi(apartmentId);
            dispatch(addBookmarkSuccess(response.data)); // Assume response returns the new bookmark
        } catch (err) {
            dispatch(
                addBookmarkFailure(
                err.response?.data?.message || "Failed to add to bookmarks"
              )
            );
        }
    }, [dispatch]);

  return { addToBookmark, error };
};


