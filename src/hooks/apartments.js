import { fetchApartmentsApi } from "../api/apartments";
import {
    getApartmentsLoading,
    getApartmentsError,
    getApartmentsSuccess,
} from "../redux/apartmentSlice";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";


// FETCH  ALL APARTMENTS CUSTOM HOOK (with optional query)
export const useGetApartments = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const fetchApartments = useCallback(
        async ({ sortBy = "recent", page = 1, limit = 20 } = {}) => {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout


            dispatch(getApartmentsLoading());
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetchApartmentsApi({ sortBy, page, limit });
                if (response.status >= 200 && response.status < 300) {
                    dispatch(
                        getApartmentsSuccess({
                            listings: response.data.listings,
                            total: response.data.total,
                            hasMore: response.data.hasMore,
                            page,
                        })
                    );
                    setError(null);
                } else {
                    throw new Error(response.data?.error || "Failed to fetch apartments");
                }
            } catch (error) {
                if (error.name === "AbortError") {
                    setError("Request timed out. Please check your connection.");
                } else {
                    setError(error.response?.data?.error || "Failed to fetch apartments");
                }
                dispatch(
                    getApartmentsError(error.response?.data?.error)
                );
            } finally {
                clearTimeout(timeout);
                setIsLoading(false);
            }
        },
        [dispatch]
    );

    return { fetchApartments, isLoading, error };
};



