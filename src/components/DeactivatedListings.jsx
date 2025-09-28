import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { ChevronLeft, ChevronRight, RotateCcw, SearchIcon, X } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetMyDeactivatedListings } from "../hooks/myDeactivatedListings";
import DeactivatedListingDetails from "./DeactivatedListingDetails";
import ApartmentDetailsSkeleton from "../utils/loading-display/ApartmentDetailsSkeleton";
import DeactivatedListingsPlaceholder from "../utils/placeholders/MyDeactivatedListingsPlaceholder";
import { fetchMyDeactivatedListingsBySearchApi } from "../api/myDeactivatedListings";

// Query hook
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const DeactivatedListings = () => {
  const query = useQuery().get("keyword");
  const navigate = useNavigate();
  const { fetchMyDeactivatedListings, isLoading: hookLoading, error: hookError } = useGetMyDeactivatedListings();
  const userId = useSelector((state) => state.auth?.user._id);
  const reduxDeactivatedListings = useSelector((state) => state.myDeactivatedListings.deactivatedListings);
 

  // Unified state
  const [displayedListings, setDisplayedListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Local pagination state for search
  const [searchPage, setSearchPage] = useState(1);
  const [searchTotalPages, setSearchTotalPages] = useState(0);


  // Fetch listings (dual mode)
  const fetchDeactivatedListings = async (searchTerm = null, page = 1, limit = 2) => {
    setIsLoading(true);
    setError(null);

    try {
      if (searchTerm) {
        // Search listings (local pagination)
        const response = await fetchMyDeactivatedListingsBySearchApi(searchTerm, page, limit);
        if (response.status >= 200 && response.status < 300) {
          const { listings, totalPages, currentPage } = response.data;
          setDisplayedListings(listings);
          setSearchTotalPages(totalPages);
          setSearchPage(currentPage);
        } else {
          throw new Error(response.data.error);
        }
      } else {
        // Normal listings (Redux)
        await fetchMyDeactivatedListings(userId, page, limit);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setError(`Deactivated listing "${searchTerm}" not found`);
      } else {
        setError(error.response?.data?.error || "Internal server error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Effect for query change
  useEffect(() => {
    if (query) {
      fetchDeactivatedListings(query, searchPage);
    } else {
      fetchDeactivatedListings(null, reduxDeactivatedListings.currentPage || 1);
    }
  }, [query, userId, searchPage, reduxDeactivatedListings.currentPage]);


  // Sync Redux listings into displayed state (only when not searching)
  useEffect(() => {
    if (!query && reduxDeactivatedListings) {
      setIsLoading(hookLoading);
      setDisplayedListings(reduxDeactivatedListings.apartments || []);
      setError(hookError);
    }
  }, [reduxDeactivatedListings, hookLoading, hookError, query]);

  // Handlers
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/dashboard?keyword=${searchQuery}`);
      setSearchPage(1); // reset page on new search
    } else {
      navigate("/dashboard");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleRetry = () => {
    fetchDeactivatedListings(query, query ? searchPage : reduxDeactivatedListings.currentPage);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    navigate("/dashboard");
  };

  // Pagination actions
  const handlePrevPage = () => {
    if (query) {
      setSearchPage((prev) => Math.max(1, prev - 1));
    } else {
      fetchListings(null, reduxDeactivatedListings.currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (query) {
      setSearchPage((prev) => Math.min(searchTotalPages, prev + 1));
    } else {
      fetchListings(null, reduxDeactivatedListings.currentPage + 1);
    }
  };

  // Error display
  const ErrorDisplay = () => (
    <div className="h-full w-full flex flex-col items-center justify-center text-center py-8 mt-40 mb-40">
      <ExclamationTriangleIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-800 mb-1">Something went wrong</h3>
      <p className="text-gray-600 font-semibold mb-4">{error}</p>
      <button
        onClick={handleRetry}
        className="px-3 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white text-base tracking-wider font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-1.5"
      >
        <RotateCcw className="w-4 h-4" />
        Retry
      </button>
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col items-start justify-center mt-2">

      {/* Search input */}
      <div className="w-full h-20 flex items-center justify-center bg-white">
        <div className="relative bg-stone-50 w-11/12 h-8/12 border-2 border-stone-200 rounded-xl">
          <input
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyPress}
            type="text"
            placeholder="Search your Deactivated Listings"
            className="w-full h-full pl-4 pr-12 rounded-md outline-none text-lg font-semibold text-gray-900 placeholder-stone-400"
          />
          <SearchIcon
            onClick={handleSearch}
            size={24}
            strokeWidth={2}
            className="absolute right-4 h-6 w-6 top-1/2 transform -translate-y-1/2 text-stone-400 cursor-pointer"
          />
          {query && (
            <button
              onClick={handleClearSearch}
              className="absolute right-12 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Search indicator */}
      {query && (
        <div className="w-full text-center px-4 mt-4">
          <p className="text-xl text-gray-600 font-semibold">
            Search results for <b className="text-gray-800">"{query}"</b>
          </p>
        </div>
      )}

      {/* Listings */}
      <div className="w-full h-full flex flex-col items-center justify-center px-3 overflow-y-auto scroll-smooth mb-12">
        {error ? (
          <ErrorDisplay />
        ) : isLoading ? (
          <ApartmentDetailsSkeleton cards={2} />
        ) : displayedListings?.length > 0 ? (
          <>
            {displayedListings.map((apartment) => (
              <DeactivatedListingDetails apartment={apartment} key={apartment._id} />
            ))}

            
            {/* Pagination Controls */}
            {!error && !isLoading &&  (
              (query ? searchTotalPages > 1 : reduxDeactivatedListings.totalPages > 1) && (
                <div className="w-full flex items-center justify-center gap-4">   
                  <button
                    onClick={handlePrevPage}
                    disabled={query ? searchPage <= 1 : reduxDeactivatedListings.currentPage <= 1}
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
                        {query ? searchPage : reduxDeactivatedListings.currentPage} 
                      </div>
                      <span className="text-sm text-gray-400">of</span>
                      <span className="text-sm text-gray-600 font-medium">{query ? searchTotalPages : reduxDeactivatedListings.totalPages}</span>
                      </div>
                  </div>

                  <button
                    onClick={handleNextPage}
                    disabled={query ? searchPage >= searchTotalPages : reduxDeactivatedListings.currentPage >= reduxDeactivatedListings.totalPages}
                    className="group relative overflow-hidden px-4 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:hover:transform-none disabled:hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-out cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                  </button>
                </div>
              )
            )}
          </>
        ) : (
          <DeactivatedListingsPlaceholder />
        )}
      </div>
    </div>
  );
};

export default DeactivatedListings;
