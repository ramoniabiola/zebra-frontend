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

    const fetchApartments = useCallback(
        async ({ sortBy = "recent", page = 1, limit = 10 } = {}) => {
            dispatch(getApartmentsLoading());
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetchApartmentsApi({ sortBy, page, limit });

                if (response.status >= 200 && response.status < 300) {
                    dispatch(getApartmentsSuccess(response.data));
                    setError(null);
                } else {
                    throw new Error(response.data?.error || "Failed to fetch apartments");
                }
            } catch (error) {
                setError( error.response?.data?.error || "Failed to fetch apartments");
                dispatch(
                    getApartmentsError(
                        error.response?.data?.error || "Failed to fetch apartments"
                    )
                );
            } finally {
                setIsLoading(false);
            }
        },
        [dispatch]
    );

    return { fetchApartments, isLoading, error };
};



