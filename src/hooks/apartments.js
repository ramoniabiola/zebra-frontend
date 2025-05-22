import { fetchApartmentsApi, fetchApartmentByIdApi } from "../api/apartments";
import {
    getApartments,
    getApartmentDetails,
    getApartmentsLoading,
    getApartmentsError,
} from "../redux/apartmentSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


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



// FETCH APARTMENT BY ID CUSTOM HOOK
export const useApartmentDetails = (id) => {
    const dispatch = useDispatch();
    const { selected, loading, error } = useSelector((state) => state.apartments);

    useEffect(() => {
        if (!id) return;
        const getApartment = async () => {
            dispatch(getApartmentsLoading());
            try {
                const response = await fetchApartmentByIdApi(id);
                dispatch(getApartmentDetails(response.data));
            } catch (err) {
                dispatch(
                    getApartmentsError(
                        err.response?.data?.message || "Failed to fetch apartment details"
                    )
                );
            } 
        };
      
        getApartment();
    }, [id, dispatch]);

    return { apartment: selected, loading, error };
};