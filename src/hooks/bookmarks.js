import { fetchUserBookmarksApi, addBookmarkApi, removeBookmarkApi } from "../api/bookmarks";
import {getBookmarksLoading, getBookmarksSuccess, 
    getBookmarksFailure, addBookmarkSuccess, addBookmarkFailure, 
    removeBookmarkSuccess, removeBookmarkFailure  
} from "../redux/bookmarkSlice";
import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


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
    const [success, setSuccess] = useState(false);
    
    

    const addToBookmark = useCallback(async (apartmentId) => {

        try {
            const response = await addBookmarkApi(apartmentId);
            dispatch(addBookmarkSuccess(response.data)); 
            setSuccess(true);
            setTimeout(() => setSuccess(false), 4000);
        } catch (err) {
            dispatch(
                addBookmarkFailure(
                    err.response?.data?.message || "Failed to add to bookmarks"
                )
            );
        }
    }, [dispatch]);

  return { addToBookmark, success, error };
};



// REMOVE AN APARTMENT FROM BOOKMARK
export const useRemoveBookmark = () => {
    const dispatch = useDispatch();

    const removeFromBookmark = useCallback(async (apartmentId) => {

        try {
            await removeBookmarkApi(apartmentId); 
            dispatch(removeBookmarkSuccess(apartmentId)); 
        } catch (err) {
            dispatch(
                removeBookmarkFailure(
                    err.response?.data?.message || "Failed to remove bookmark"
                )
            );
        }
    }, [dispatch]);

    return { removeFromBookmark };
};

