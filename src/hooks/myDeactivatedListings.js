import { fetchMyDeactivatedListingsApi } from "../api/myDeactivatedListings";
import {
    getMyDeactivatedListingsSuccess,
    getMyDeactivatedListingsLoading,
    getMyDeactivatedListingsError
} from "../redux/myDeactivatedListingsSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";


// FETCH USER DEACTIVATED LISTINGS CUSTOM HOOK
export const useGetMyDeactivatedListings = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)

    const fetchMyDeactivatedListings = async (userId) => {
        dispatch(getMyDeactivatedListingsLoading());
        setIsLoading(true);
        setError(null)

        try {
            const response = await fetchMyDeactivatedListingsApi(userId);
            if(response.status >= 200 && response.status < 300) {
                dispatch(getMyDeactivatedListingsSuccess(response.data));
                setError(null);
                setIsLoading(false);
            } else {
                // If the response status is not in the success range, handle the error
                throw new Error(response.data?.error || 'Failed to fetch  deactivated listings');
            }
        } catch (err) {
            // If there's an error, set the error state to display 
            setError(error.response?.data?.error || 'Failed to fetch deactivated listings'); 
            setIsLoading(false);
            dispatch(
                getMyDeactivatedListingsError(err.response?.data?.message || "Failed to fetch  deactivated listings")
            );   
        }
    };

    return { fetchMyDeactivatedListings, isLoading, error };
};




