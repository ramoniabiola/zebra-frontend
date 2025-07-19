import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useGetMyListings } from "../hooks/myListings";
import MyListingDetails from "./MyListingDetails";
import { SearchIcon, X } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ApartmentDetailsSkeleton from "../utils/loading-display/ApartmentDetailsSkeleton";
import MyListingsPlaceholder from "../utils/placeholders/MyListingsPlaceholder";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchMyListingsBySearchApi } from "../api/myListings";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const MyListings = () => {
  const query = useQuery().get('keyword');
  const navigate = useNavigate();
  const { fetchMyListings, isLoading: hookLoading, error: hookError } = useGetMyListings();
  const userId = useSelector((state) => state.auth?.user._id);
  const reduxListings = useSelector((state) => state.myListings.listings);
    
  // Unified state for both operations
  const [displayedListings, setDisplayedListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');


  // Unified function to fetch listings (either all or filtered)
  const fetchListings = async (searchTerm = null) => {
    setIsLoading(true);
    setError(null);

    try {
      if (searchTerm) {
        // Fetch search results
        const response = await fetchMyListingsBySearchApi(searchTerm);
        if (response.status >= 200 && response.status < 300) {
          setDisplayedListings(response.data.listings);
        } else {
          throw new Error(response.data.error);
        }
      } else {
        // Fetch all listings using the hook
        await fetchMyListings(userId);
    
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setError(`Listing "${searchTerm}" not found...`);
      } else {
        setError(error.response?.data?.message || 'Internal server error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Effect to handle query changes
  useEffect(() => {
    if (query) {
      fetchListings(query);
    } else {
      fetchListings(); // Fetch all listings
    }
  }, [query, userId]);


  // Effect to update displayed listings when Redux state changes (for non-search scenarios)
  useEffect(() => {
    if (!query && reduxListings) {
      setIsLoading(hookLoading);
      setDisplayedListings(reduxListings.apartments || []);
      setError(hookError);
    }
  }, [reduxListings, hookLoading, hookError, query]);


  // Search handlers
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/dashboard?keyword=${searchQuery}`);
    } else {
      // Clear search - go back to all listings
      navigate('/dashboard');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Unified retry handler
  const handleRetry = () => {
    fetchListings(query);
  };

  // Clear search handler
  const handleClearSearch = () => {
    setSearchQuery('');
    navigate('/dashboard');
  };

  // Error Display Component
  const ErrorDisplay = () => (
    <div className="h-full w-full flex flex-col items-center justify-center text-center py-8 mt-40 mb-40">
      <ExclamationTriangleIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-800 mb-1">
        Something went wrong
      </h3>
      <p className="text-gray-600 font-semibold mb-4">
        {error}
      </p>
      <button
        onClick={handleRetry}
        className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-md transition-colors cursor-pointer"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col items-start justify-center mt-2">
      {/* ACTIVE LISTINGS SEARCH INPUT FIELD */}
      <div className="w-full h-20 flex items-center justify-center bg-white">
        <div className="relative bg-stone-50 w-11/12 h-8/12 border-2 border-stone-200 rounded-xl">
          <input
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyPress}
            type="text"
            placeholder="Search your Listings"
            className="w-full h-full pl-4 pr-12 rounded-md outline-none text-lg font-semibold text-gray-900 placeholder-stone-400"
          />
          <SearchIcon 
            onClick={handleSearch}
            size={24} 
            strokeWidth={2} 
            className="absolute right-4 h-6 w-6 top-1/2 transform -translate-y-1/2 font-extrabold text-stone-400 cursor-pointer" 
          />
          {/* Clear search button when there's a query */}
          {query && (
            <button
              onClick={handleClearSearch}
              className="absolute right-12 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
            >
              <X className="w-5 h-5"/>
            </button>
          )}
        </div>
      </div>

      {/* Search indicator */}
      {query && (
        <div className="w-full text-center px-4 mt-2">
          <p className="text-lg text-gray-600 font-semibold">
            Search results for <b className="text-gray-800">"{query}"</b>
          </p>
        </div>
      )}
      
      {/* USER ACTIVE (landlord / agent) LISTINGS - UNIFIED DISPLAY */}
      <div className="w-full h-full flex flex-col items-center justify-center px-4 overflow-y-auto scroll-smooth mb-12">
        {error ? (
          <ErrorDisplay />
        ) : isLoading ? (
          <ApartmentDetailsSkeleton cards={4} />
        ) : displayedListings?.length > 0 ? (
          displayedListings.map((apartment) => (
            <MyListingDetails apartment={apartment} key={apartment._id} />
          ))
        ) : (
          <MyListingsPlaceholder />
        )}

        {/* Show more button - only for non-search results */}
        {!error && !isLoading && displayedListings?.length > 0 && !query && (
          <div className="w-full h-full mt-12 flex flex-col items-center justify-center gap-24">
            <button className="px-4 py-2 text-white text-lg font-bold border-8 border-double bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 rounded-full cursor-pointer focus:invisible">
              Show more
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListings;