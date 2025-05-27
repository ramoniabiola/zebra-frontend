import { fetchMyDeactivatedListingsApi, reactivateMyListingApi } from "../api/myDeactivatedListings";
import {
    getMyDeactivatedListingsSuccess,
    getMyDeactivatedListingsLoading,
    getMyDeactivatedListingsError,
    reactivateMyListingSuccess,
    reactivateMyListingLoading,
    reactivateMyListingError
} from "../redux/myDeactivatedListingsSlice";
import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


// FETCH USER POSTED DEACTIVATED LISTINGS CUSTOM HOOK
export const useGetMyDeactivatedListings = (query) => {
    const dispatch = useDispatch();
    const { deactivatedListings, loading, error } = useSelector((state) => state.myDeactivatedListings);

    
    useEffect(() => {
        const fetchMyDeactivatedListings = async () => {
            dispatch(getMyDeactivatedListingsLoading());

            try {
                const response = await fetchMyDeactivatedListingsApi(query);
                dispatch(getMyDeactivatedListingsSuccess(response.data));
            } catch (err) {
                dispatch(
                    getMyDeactivatedListingsError(err.response?.data?.message || "Failed to fetch your deactivated listings")
                );
            }
        };

        fetchMyDeactivatedListings();
    }, [dispatch]);

    return { deactivatedListings, loading, error };
};



// REACTIVATE MY-LISTING
export const useReactivateMyListing = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.myDeactivatedListings);
    const [success, setSuccess] = useState(false);

    
    const reactivateMyListing = useCallback(async (id) => {
        dispatch(reactivateMyListingLoading())

        try {
            await reactivateMyListingApi(id);
            dispatch(reactivateMyListingSuccess(id));
            setSuccess(true);
            setTimeout(() => setSuccess(false), 4000);
        } catch (err) {
            dispatch(
                reactivateMyListingError(err.response?.data?.message || "Failed to reactivate your listings")
            );
        }
    }, [dispatch]);

    return { reactivateMyListing, success, loading, error };
};


