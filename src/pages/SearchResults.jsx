import ApartmentDetails from "../components/ApartmentDetails";
import Search2 from "../components/Search2";
import ApartmentDetailsSkeleton from "../utils/loading-display/ApartmentDetailsSkeleton";
import { useEffect, useState } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";
import { fetchApartmentBySearchApi } from "../api/apartments";
import SearchPlaceholder from "../utils/placeholders/SearchPlaceholder";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { useToggleBookmark } from "../hooks/bookmarks";
import ToggleSuccess from "../utils/pop-display/ToggleSuccess";



const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};


const SearchResults = () => {
    const query = useQuery().get("q");

    // States
    const [apartments, setApartments] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [lastAttemptedPage, setLastAttemptedPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { toggleBookmark, success, error: toggleError, setError: setToggleError, animateOut } = useToggleBookmark();
    

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page, isLoading, error]);
    

    // Fetch apartments by query + page
    const getApartments = async (pageNum = 1) => {
        setIsLoading(true);
        setError(null);
        setLastAttemptedPage(pageNum); 

        try {
            const response = await fetchApartmentBySearchApi(query, pageNum, 2); 
            if (response.status >= 200 && response.status < 300) {
                const data = response.data;

                setApartments(data.results || []);
                setPage(pageNum);
                setTotalPages(data.totalPages);
            } else {
                throw new Error(response.data.error);
            }
        } catch (error) {
            if (error.response?.status === 404) {
                setError(`No apartments found for "${query}"`);
            } else {
                setError(error.response?.data?.error || "Internal server error");
            }
        } finally {
            setIsLoading(false);
        }
    };


    // Reset on query change
    useEffect(() => {
        if (query) {
           setApartments([]);
            setPage(1);
            getApartments(1);
        }
    }, [query]);



    const handleRetry = () => {
        getApartments(lastAttemptedPage);
    };

    


    const ErrorDisplay = () => (
        <div className="h-full w-full flex flex-col items-center justify-center text-center pr-6 pl-0 lg:pr-10 lg:pl-0 py-8 mt-24 mb-24">
            <ExclamationTriangleIcon className="w-10 h-10 text-red-500 mx-auto mb-4" />
            <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-2">
                Something went wrong
            </h3>
            <p className="text-gray-600 text-sm lg:text-base mb-4">{error}</p>
            <button
                onClick={handleRetry}
                className="px-3 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-base font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-1.5  focus:invisible cursor-pointer"
            >
                <RotateCcw className="w-4 h-4" />
                Retry
            </button>
        </div>
    );



    return (
        <div className="w-full h-full flex flex-col items-start justify-center">
            <Search2 />

            <div className="w-full px-2 h-full flex flex-col items-center justify-start mt-8 lg:mt-24">
                <h1
                    className={`${
                        query ? "text-xl text-center text-gray-600 font-semibold" : "hidden"
                    }`}
                >
                    Search results for "<b className="text-gray-800">{query}</b>"
                </h1>

                <div className="w-full h-full pl-6 pr-0 lg:pl-10 lg:pr-0 overflow-y-auto scroll-smooth mb-12">
                    {error && page >= 1  ? (
                        <ErrorDisplay />
                    ) : isLoading && page >= 1  ? (
                        <ApartmentDetailsSkeleton cards={2} />
                    ) : apartments?.length > 0 ? (
                    <>
                        {/* Grid Container for Apartments */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-2">
                            {apartments.map((apartment, idx) => (
                                <ApartmentDetails 
                                    key={`${apartment._id}-${idx}`} 
                                    apartment={apartment} 
                                    toggleBookmark={toggleBookmark}
                                    error={toggleError}
                                    setError={setToggleError}
                                    offset="bottom-24"
                                />
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="w-full mt-4 flex items-center justify-center gap-12 py-6 pl-0 pr-6 lg:pl-0 lg:pr-10">
                                <button
                                    onClick={() => getApartments(page - 1)}
                                    disabled={page === 1}
                                    className="px-4 py-3 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                            
                                <span className="text-sm text-gray-600 font-medium">
                                    {page} / {totalPages}
                                </span>
                            
                                <button
                                    onClick={() => getApartments(page + 1)}
                                    disabled={page === totalPages}
                                    className="px-4 py-3 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </>
                    ) : (
                        <div className="pl-0 pr-6 lg:pl-0 lg:pr-10">
                            <SearchPlaceholder />
                        </div>
                    )}
                </div>

                <ToggleSuccess
                    message={success} 
                    animateOut={animateOut} 
                />  
            </div>
        </div>
    );
};

export default SearchResults;
