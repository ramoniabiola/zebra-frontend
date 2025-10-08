import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useGetMyListings } from "../hooks/myListings";
import MyListingDetails from "./MyListingDetails";
import { ChevronLeft, ChevronRight, RotateCcw, SearchIcon, X } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ApartmentDetailsSkeleton from "../utils/loading-display/ApartmentDetailsSkeleton";
import MyListingsPlaceholder from "../utils/placeholders/MyListingsPlaceholder";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchMyListingsBySearchApi } from "../api/myListings";

// Query hook
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const MyListings = () => {
  const query = useQuery().get("keyword");
  const navigate = useNavigate();
  const { fetchMyListings, isLoading: hookLoading, error: hookError } = useGetMyListings();
  const userId = useSelector((state) => state.auth?.user._id);
  const reduxListings = useSelector((state) => state.myListings.listings);

  // Unified state
  const [displayedListings, setDisplayedListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Local pagination state for search
  const [searchPage, setSearchPage] = useState(1);
  const [searchTotalPages, setSearchTotalPages] = useState(0);

  

  // Fetch listings (dual mode)
  const fetchListings = async (searchTerm = null, page = 1, limit = 2) => {
    setIsLoading(true);
    setError(null);

    try {

      if (searchTerm) {
        // Search listings (local pagination)
        const response = await fetchMyListingsBySearchApi(searchTerm, page, limit);
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
        await fetchMyListings(userId, page, limit);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setError(`Listing "${searchTerm}" not found`);
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
      fetchListings(query, searchPage);
    } else {
      fetchListings(null, reduxListings.currentPage || 1);
    }
  }, [query, userId, searchPage, reduxListings.currentPage]);


  // Sync Redux listings into displayed state (only when not searching)
  useEffect(() => {
    if (!query && reduxListings) {
      setIsLoading(hookLoading);
      setDisplayedListings(reduxListings.apartments || []);
      setError(hookError);
    }
  }, [reduxListings, hookLoading, hookError, query]);


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
    fetchListings(query, query ? searchPage : reduxListings.currentPage);
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
      fetchListings(null, reduxListings.currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (query) {
      setSearchPage((prev) => Math.min(searchTotalPages, prev + 1));
    } else {
      fetchListings(null, reduxListings.currentPage + 1);
    }
  };

  // Error display
  const ErrorDisplay = () => (
    <div className="h-full w-full flex flex-col items-center justify-center text-center py-8 mt-40 mb-40">
      <ExclamationTriangleIcon className="w-10 h-10 text-red-500 mx-auto mb-4" />
      <h3 className="text-base font-semibold text-gray-800 mb-1">Something went wrong</h3>
      <p className="text-gray-600 font-semibold mb-4">{error}</p>
      <button
        onClick={handleRetry}
        className="px-3 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-base tracking-wider font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-1.5"
      >
        <RotateCcw className="w-4 h-4" />
        Retry
      </button>
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col items-start justify-center mt-1">
      {/* Search input */}
      <div className="w-full h-18 flex items-center justify-center bg-white">
        <div className="flex gap-1 w-full mx-4">
          <div className="relative flex-1 rounded-xl py-3 bg-stone-50 border border-stone-200">
            <input
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyPress}
              type="text"
              placeholder="Search your listings"
              className="w-full h-full px-4 rounded-md outline-none text-base font-semibold text-gray-900 placeholder-stone-400"
            />

            {query && (
              <button
                onClick={handleClearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            )}
          </div>

          <div className="bg-stone-50 rounded-xl py-3 px-4 flex items-center justify-center cursor-pointer  border border-stone-200">
            <SearchIcon
              onClick={handleSearch}
              size={20}
              strokeWidth={3}
              className="text-stone-400 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Search indicator */}
      {query && (
        <div className="w-full text-center px-4 mt-4">
          <p className="text-lg text-gray-600 font-semibold">
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
              <MyListingDetails apartment={apartment} key={apartment._id} />
            ))}
    
            {/* Pagination Controls */}
            {!error && !isLoading &&  (
              (query ? searchTotalPages > 1 : reduxListings.totalPages > 1) && (
                <div className="w-full flex items-center justify-center gap-12 py-6">
                  <button
                    onClick={handlePrevPage}
                    disabled={query ? searchPage <= 1 : reduxListings.currentPage <= 1}
                    className="px-4 py-3 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
              
                  <span className="text-sm text-gray-600 font-medium">
                    {query ? searchPage : reduxListings.currentPage}  / {query ? searchTotalPages : reduxListings.totalPages}
                  </span>
              
                  <button
                    onClick={handleNextPage}
                    disabled={query ? searchPage >= searchTotalPages : reduxListings.currentPage >= reduxListings.totalPages}
                    className="px-4 py-3 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )
            )}
          </>
        ) : (
          <MyListingsPlaceholder />
        )}       
      </div>
    </div>
  );
};

export default MyListings;
