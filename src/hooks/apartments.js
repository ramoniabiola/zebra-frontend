import { fetchApartmentsApi } from "../api/apartments";
import {
    getApartmentsLoading,
    getApartmentsError,
    getApartmentsSuccess,
} from "../redux/apartmentSlice";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";


//  FETCH  ALL APARTMENTS CUSTOM HOOK (with optional query)
export const useGetApartments = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    

    const fetchApartments = useCallback(async () => {
        dispatch(getApartmentsLoading());
        setIsLoading(true);
        setError(null)

        try {
            const response = await fetchApartmentsApi();
            if(response.status >= 200 && response.status < 300) {
                dispatch(getApartmentsSuccess(response.data));
                setError(null);
            } else {
                // If the response status is not in the success range, handle the error
                throw new Error(response.data?.error || 'Failed to fetch apartments');
            }
        } catch (error) {
             // If there's an error, set the error state to display 
            setError('Failed to fetch apartments'); 
            dispatch(
                getApartmentsError(
                    error.response?.data?.message || "Failed to fetch apartments"
                )
            );
        } finally {
            setIsLoading(false);
        }
    }, [dispatch])  

    return { fetchApartments, isLoading, error };
};


