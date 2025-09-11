import { fetchMyDeactivatedListingsApi } from "../api/myDeactivatedListings";
import {
    getMyDeactivatedListingsSuccess,
    getMyDeactivatedListingsLoading,
    getMyDeactivatedListingsError
} from "../redux/myDeactivatedListingsSlice";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";


// FETCH USER DEACTIVATED LISTINGS CUSTOM HOOK
export const useGetMyDeactivatedListings = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)

    const fetchMyDeactivatedListings = useCallback(async (userId, page = 1, limit = 10) => {
        dispatch(getMyDeactivatedListingsLoading());
        setIsLoading(true);
        setError(null)

        try {
            const response = await fetchMyDeactivatedListingsApi(userId, page, limit);

            if(response.status >= 200 && response.status < 300) {
                const { currentPage, totalPages, totalListings, listingsPerPage, apartments } = response.data;

                dispatch(getMyDeactivatedListingsSuccess({
                    currentPage,
                    totalPages,
                    totalListings,
                    listingsPerPage,
                    apartments,
                }));
            } else {
                // If the response status is not in the success range, handle the error
                throw new Error(response.data?.error || 'Failed to fetch  deactivated listings');
            }
        } catch (err) {
            // If there's an error, set the error state to display 
            setError(error.response?.data?.error || 'Failed to fetch deactivated listings'); 
            dispatch(
                getMyDeactivatedListingsError(err.response?.data?.error || "Failed to fetch  deactivated listings")
            );   
        } finally {
            setIsLoading(false);
        }
    }, [dispatch]);

    return { fetchMyDeactivatedListings, isLoading, error };
};








