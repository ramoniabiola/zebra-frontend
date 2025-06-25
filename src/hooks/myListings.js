import { fetchMyListingsApi, createNewListingApi, updateMyListingApi, deactivateMyListingApi } from "../api/myListings";
import {
    getMyListingsSuccess,
    getMyListingsLoading,
    getMyListingsError,
    updateMyListingSuccess,
    updateMyListingLoading,
    updateMyListingError,
    createNewListingSuccess,
    createNewListingLoading,
    createNewListingFailure,
    deactivateMyListingSuccess,
    deactivateMyListingLoading,
    deactivateMyListingError
} from "../redux/myListingSlice";
import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';



// FETCH USER POSTED ACTIVE LISTINGS CUSTOM HOOK
export const useGetMyListings = () => {
    const dispatch = useDispatch();
    const { listings, loading, error } = useSelector((state) => state.myListings);

    useEffect(() => {
        const fetchMyListings = async () => {
            dispatch(getMyListingsLoading());
            try {
                const response = await fetchMyListingsApi();
                dispatch(getMyListingsSuccess(response.data));
            } catch (err) {
                dispatch(
                    getMyListingsError(err.response?.data?.message || "Failed to fetch your listings")
                );
            }
        };

        fetchMyListings();
    }, [dispatch]);

    return { listings, loading, error };
};



// UPDATE AN EXISTING LISTING CUSTOM HOOK
export const useUpdateMyListing = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.myListings);
    const [success, setSuccess] = useState(false);


    const updateMyListing = useCallback(async (id, data) => {
        dispatch(updateMyListingLoading())

        try {
            const response = await updateMyListingApi(id, data);
            dispatch(updateMyListingSuccess(response.data));
            setSuccess(true);
            setTimeout(() => setSuccess(false), 4000);
        } catch (err) {
            dispatch(
                updateMyListingError(err.response?.data?.message || "Failed to update your listings")
            );
        }
    }, [dispatch]);

    return { updateMyListing, success, loading, error };
};



// CREATE NEW LISTING CUSTOM HOOK
export const useCreateNewListing = () => {
    const navigate = useNavigate();
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
                setTimeout(() => setSuccess(false), 10000);
                setError(null);
                setIsLoading(false);
                navigate('/dashboard');
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

    return { createNewListing, success, isLoading, error };
};




// DEACTIVATE MY-LISTING
export const useDeactivateMyListing = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.myListings);
    const [success, setSuccess] = useState(false);

    
    const deactivateMyListing = useCallback(async (id) => {
        dispatch(deactivateMyListingLoading())

        try {
            await deactivateMyListingApi(id);
            dispatch(deactivateMyListingSuccess(id));
            setSuccess(true);
            setTimeout(() => setSuccess(false), 4000);
        } catch (err) {
            dispatch(
                deactivateMyListingError(err.response?.data?.message || "Failed to deactivate your listings")
            );
        }
    }, [dispatch]);

    return { deactivateMyListing, success, loading, error };
};


