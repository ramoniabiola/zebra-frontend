import Footer from "../components/Footer";
import Footerbar from "../components/Footerbar";
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
        <div className="h-full w-full flex flex-col items-center justify-center text-center py-8 mt-24 mb-24">
            <ExclamationTriangleIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Something went wrong
            </h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
                onClick={handleRetry}
                className="px-3 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white text-base font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-1.5  focus:invisible cursor-pointer"
            >
                <RotateCcw className="w-4 h-4" />
                Retry
            </button>
        </div>
    );



    return (
        <div className="w-full h-full flex flex-col items-start justify-center">
            <Search2 />

            <div className="w-full px-2 h-full flex flex-col items-center justify-start mt-28">
                <h1
                    className={`${
                        query ? "text-2xl text-center text-gray-600 font-semibold" : "hidden"
                    }`}
                >
                    Search results for "<b className="text-gray-800">{query}</b>"
                </h1>

                <div className="w-full h-full flex flex-col items-center justify-center px-4 mb-12">
                    {error && page >= 1  ? (
                        <ErrorDisplay />
                    ) : isLoading && page >= 1  ? (
                        <ApartmentDetailsSkeleton cards={2} />
                    ) : apartments?.length > 0 ? (
                    <>
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

                         {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="w-full mt-12 flex items-center justify-center gap-4">   
                                <button
                                    onClick={() => getApartments(page - 1)}
                                    disabled={page === 1}
                                    className="group relative overflow-hidden px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:hover:transform-none disabled:hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-out cursor-pointer"
                                >
                                    <div className="flex items-center gap-2">
                                        <ChevronLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300" />
                                        <span>Prev</span>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                                </button>

                                <div className="flex items-center gap-3 px-4 py-4 bg-white rounded-xl shadow-lg border border-gray-200">
                                    <div className="flex items-center gap-2">
                                        <div className="px-3 py-1 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white text-sm font-bold rounded-lg shadow-md">
                                            {page}
                                        </div>
                                        <span className="text-sm text-gray-400">of</span>
                                        <span className="text-sm text-gray-600 font-medium">{totalPages}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => getApartments(page + 1)}
                                    disabled={page === totalPages}
                                    className="group relative overflow-hidden px-4 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:hover:transform-none disabled:hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-out cursor-pointer"
                                >
                                    <div className="flex items-center gap-2">
                                        <span>Next</span>
                                        <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                                </button>
                            </div>
                        )}
                    </>
                    ) : (
                        <SearchPlaceholder />
                    )}
                </div>

                <ToggleSuccess
                    message={success} 
                    animateOut={animateOut} 
                />  
            </div>

            <Footerbar />
            <Footer />
        </div>
    );
};

export default SearchResults;
