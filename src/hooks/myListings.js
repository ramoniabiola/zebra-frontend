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
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.myListings);
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);


    const createNewListing = async (data) => {
        dispatch(createNewListingLoading());
        try {
            const response = await createNewListingApi(data);
            dispatch(createNewListingSuccess(response.data));
            setSuccess(true);
            setTimeout(() => setSuccess(false), 4000);
            navigate('/dashboard');
        } catch (err) {
            dispatch(createNewListingFailure(err.response?.data?.message || "Listing creation failed"));
        }
    };

    return { createNewListing, success, loading, error };
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


