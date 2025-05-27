import { fetchApartmentsApi } from "../api/apartments";
import {
    getApartments,
    getApartmentsLoading,
    getApartmentsError,
} from "../redux/apartmentSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


//  FETCH  ALL APARTMENTS CUSTOM HOOK (with optional query)
export const useGetApartments = (query = "") => {
    const dispatch = useDispatch();
    const { list, loading, error } = useSelector((state) => state.apartments);

    useEffect(() => {
        const fetchApartments = async () => {
            dispatch(getApartmentsLoading());
            try {
                const response = await fetchApartmentsApi(query);
                dispatch(getApartments(response.data));
            } catch (err) {
                dispatch(
                    getApartmentsError(
                        err.response?.data?.message || "Failed to fetch apartments"
                    )
                );
            }
        };

        fetchApartments();
    }, [query, dispatch]);

    return { apartments: list, loading, error };
};


