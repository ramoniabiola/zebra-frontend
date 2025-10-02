import { fetchUserBookmarksApi, addBookmarkApi, removeBookmarkApi, clearAllUserBookmarkApi } from "../api/bookmarks";
import {getBookmarksLoading, getBookmarksSuccess, getBookmarksFailure, 
    addBookmarkSuccess, removeBookmarkSuccess, addBookmarkFailure, 
    removeBookmarkFailure, clearError, 
    clearBookmarks} from "../redux/bookmarkSlice";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

export const useGetUserBookmarks = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getUserBookmarks = useCallback(async () => {
        dispatch(getBookmarksLoading());
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetchUserBookmarksApi();
            if (response.status >= 200 && response.status < 300) {
                dispatch(getBookmarksSuccess(response.data.bookmarks));

            } else {
                throw new Error(response.data?.error || "Failed to fetch bookmarks");
            }
        } catch (err) {
            setError(err.response?.data?.error || "Internal server error");
            dispatch(
            getBookmarksFailure(err.response?.data?.error || "Failed to fetch bookmarks")
        );
        } finally {
            setIsLoading(false);
        }
    }, [dispatch]);

    return { getUserBookmarks, isLoading, error };
};



// ADD OR REMOVE APARTMENT BOOKMARKED CUSTOM HOOK
export const useToggleBookmark = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null); 
    const [animateOut, setAnimateOut] = useState(false); // track slide out


    const toggleBookmark = async (apartmentId, isBookmarked) => {
        try {
            let response;

            if (isBookmarked) {
                // Remove bookmark
                response = await removeBookmarkApi(apartmentId);
                if (response.status >= 200 && response.status < 300) {
                    // Pass the apartmentId to the reducer
                    dispatch(removeBookmarkSuccess(apartmentId));

                    // set success message
                    setSuccess("Removed from wishlist!");
                } else {
                    throw new Error("Failed to remove from wishlist.");
                }   
            } else {
                // Add bookmark
                response = await addBookmarkApi({ apartmentId });
                if (response.status >= 200 && response.status < 300) {
                    // Pass the apartmentId to the reducer
                    dispatch(addBookmarkSuccess(response.data));

                    // set success message
                    setSuccess("Added to wishlist!");
                } else {
                    throw new Error("Failed to add to wishlist.");
                }
            }
        
            setError(null);
            dispatch(clearError())

            // Auto-slide out after 2s
            setTimeout(() => {
                setAnimateOut(true);
                setTimeout(() => {
                    setSuccess(null);
                    setAnimateOut(false); // reset
                }, 900); // matches slideOut animation duration
            }, 2000);
        } catch (error) {
            console.error('Bookmark toggle error:', error);
            
            const errMsg =
                error?.response?.data?.error ||
                "Something went wrong with bookmark action.";
            
            setError(errMsg);
            
            // Dispatch appropriate error action
            if (isBookmarked) {
                dispatch(removeBookmarkFailure(errMsg));
            } else {
                dispatch(addBookmarkFailure(errMsg));
            }
        
            // Auto-clear error after 3s
            setTimeout(() => setError(null), 3000);
        }
    }

    return { toggleBookmark, error, setError, success, setSuccess, animateOut };
};


// CLEAR ALL USER BOOKMARKS CUSTOM HOOK
export const useClearAllUserBookmarks = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const clearAllUserBookmark = async () => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await clearAllUserBookmarkApi(); // call backend
            if (response.status >= 200 && response.status < 300) {
                dispatch(clearBookmarks());   // update redux state instantly
                setSuccess(true);
            } else {
                throw new Error(response.data?.error || "Failed to clear bookmarks");
            }
        } catch (err) {
            setError(err.response?.data?.error || "Failed to clear bookmarks");
        } finally {
            setIsLoading(false);
        }
    };

    return { clearAllUserBookmark, error, success, isLoading };
};
