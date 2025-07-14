import { fetchUserBookmarksApi, addBookmarkApi, removeBookmarkApi } from "../api/bookmarks";
import {getBookmarksLoading, getBookmarksSuccess, getBookmarksFailure, 
    addBookmarkSuccess, removeBookmarkSuccess, addBookmarkFailure, 
    removeBookmarkFailure, clearError } from "../redux/bookmarkSlice";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";


// GET USER BOOKMARKS
export const useGetUserBookmarks = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)


    const getUserBookmarks = useCallback(async () => {
        dispatch(getBookmarksLoading());
        setIsLoading(true);
        setError(null)

        try {
            const response = await fetchUserBookmarksApi();
            if(response.status >= 200 && response.status < 300) {
                dispatch(getBookmarksSuccess(response.data));
                setError(null);
             } else {
                // If the response status is not in the success range, handle the error
                throw new Error(response.data?.error || 'Failed to fetch apartments');
            }
        } catch (error) {
            if (error.response?.status === 404) {
              // 404 - Not Found
              setError(error.response?.data?.message);
            } else {
              // 500 - Internal Server Error (or any other error)
              setError(error.response?.data?.message || 'Internal server error');
            }
            dispatch(
                getBookmarksFailure(
                    error.response?.data?.message || "Failed to fetch your bookmarks"
                )  
            );
        } finally {
            setIsLoading(false);
        }
    }, [dispatch])
   
    return { getUserBookmarks, isLoading, error };
};


// ADD OR REMOVE APARTMENT BOOKMARKED CUSTOM HOOK
export const useToggleBookmark = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState(null);

    const toggleBookmark = async (apartmentId, isBookmarked) => {
        try {
            let response;

            if (isBookmarked) {
                // Remove bookmark
                response = await removeBookmarkApi(apartmentId);
            
                if (response.status >= 200 && response.status < 300) {
                    // Pass the apartmentId to the reducer
                    dispatch(removeBookmarkSuccess(apartmentId));
                } else {
                    throw new Error("Failed to remove from wishlist.");
                }   
            } else {
                // Add bookmark
                response = await addBookmarkApi({ apartmentId });
                if (response.status >= 200 && response.status < 300) {
                    // Pass the apartmentId to the reducer
                    dispatch(addBookmarkSuccess(response.data));
                } else {
                    throw new Error("Failed to add to wishlist.");
                }
            }
        
            setError(null);
            dispatch(clearError())
        } catch (error) {
            console.error('Bookmark toggle error:', error);
            
            const errMsg =
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                error.message ||
                "Something went wrong with bookmark action.";
            
            setError(errMsg);
            
            // Dispatch appropriate error action
            if (isBookmarked) {
                dispatch(removeBookmarkFailure(errMsg));
            } else {
                dispatch(addBookmarkFailure(errMsg));
            }
        
            // Auto-clear error after 4s
            setTimeout(() => setError(null), 4000);
        }
    }

    return { toggleBookmark, error, setError };
};
