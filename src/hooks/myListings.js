import { fetchMyListingsApi, createNewListingApi, deactivateMyListingApi } from "../api/myListings";
import {
    getMyListingsSuccess,
    getMyListingsLoading,
    getMyListingsError,
    createNewListingSuccess,
    createNewListingLoading,
    createNewListingFailure,
    deactivateMyListingSuccess,
    deactivateMyListingLoading,
    deactivateMyListingError
} from "../redux/myListingSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";


// FETCH USER POSTED ACTIVE LISTINGS CUSTOM HOOK
export const useGetMyListings = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)

    const fetchMyListings = async (userId) => {
        dispatch(getMyListingsLoading());
        setIsLoading(true);
        setError(null)

        try {
            const response = await fetchMyListingsApi(userId);
            if(response.status >= 200 && response.status < 300) {
                dispatch(getMyListingsSuccess(response.data));
                setError(null);
                setIsLoading(false);
            } else {
                // If the response status is not in the success range, handle the error
                throw new Error(response.data?.error || 'Failed to fetch your listings');
            }
        } catch (error) {
            // If there's an error, set the error state to display 
            setError(error.response?.data?.error || 'Failed to fetch your listings'); 
            setIsLoading(false);
            dispatch(
                getMyListingsError(error.response?.data?.message || "Failed to fetch your listings")
            );   
        }
    };

    return { fetchMyListings, isLoading, error };
};




// CREATE NEW LISTING CUSTOM HOOK
export const useCreateNewListing = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);


    const createNewListing = async (dispatch, data) => {
        dispatch(createNewListingLoading());
        setIsLoading(true);
        setError(null)

        try {
            const response = await createNewListingApi(data);
            if(response.status >= 200 && response.status < 300) {
                dispatch(createNewListingSuccess(response.data));
                setSuccess(true);
                setError(null);
                setIsLoading(false);
            } else {
                // If the response status is not in the success range, handle the error
                throw new Error(response.data?.error || 'Listing publish failed...');
            }
        } catch (error) {
            // If there's an error, set the error state to display 
            setError(error.response?.data?.error || 'Listing publish failed!'); 
            setIsLoading(false);
            dispatch(createNewListingFailure(error.response?.data?.message || "Listing publish failed!"));
        }
    };

    return { createNewListing, success, setSuccess, isLoading, error };
};



// DEACTIVATE MY-LISTING
export const useDeactivateMyListing = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    
    const deactivateMyListing = async (apartmentId) => {
        dispatch(deactivateMyListingLoading())
        setIsLoading(true);
        setError(null)

        try {
            const response = await deactivateMyListingApi(apartmentId);
            if(response.status >= 200 && response.status < 300) {
                dispatch(deactivateMyListingSuccess(apartmentId));
                setSuccess(true);
                setError(null);
                setIsLoading(false);
            } else {
                // If the response status is not in the success range, handle the error
                throw new Error(response.data?.error || 'Failed to deactivate listing');
            }  
        } catch (error) {
            // If there's an error, set the error state to display 
            setError(error.response?.data?.error || 'Failed to deactivate listing'); 
            setIsLoading(false);
            dispatch(
                deactivateMyListingError(error.response?.data?.message || "Failed to deactivate listing")
            );
        }
    }

    return { deactivateMyListing, success, setSuccess, isLoading, error };
};


