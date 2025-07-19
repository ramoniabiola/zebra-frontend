import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useGetMyDeactivatedListings } from "../hooks/myDeactivatedListings";
import DeactivatedListingDetails from "./DeactivatedListingDetails";
import { SearchIcon, X } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ApartmentDetailsSkeleton from "../utils/loading-display/ApartmentDetailsSkeleton";
import MyDeactivatedListingsPlaceholder from "../utils/placeholders/MyDeactivatedListingsPlaceholder";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchMyDeactivatedListingsBySearchApi } from "../api/myDeactivatedListings";


const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};


const DeactivatedListings = () => {
  const query = useQuery().get('keyword');
  const navigate = useNavigate();
  const { fetchMyDeactivatedListings, isLoading: hookLoading, error: hookError } = useGetMyDeactivatedListings();
  const userId = useSelector((state) => state.auth?.user._id);
  const reduxDeactivatedListings = useSelector((state) => state.myDeactivatedListings.deactivatedListings);
    
  // Unified state for both operations
  const [displayedDeactivatedListings, setDisplayedDeactivatedListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  
  // Unified function to fetch inactive listings (either all or filtered)
  const fetchDeactivatedListings = async (searchTerm = null) => {
    setIsLoading(true);
    setError(null);

    try {
      if (searchTerm) {
        // Fetch search results
        const response = await fetchMyDeactivatedListingsBySearchApi(searchTerm);
        if (response.status >= 200 && response.status < 300) {
          setDisplayedDeactivatedListings(response.data.listings);
        } else {
          throw new Error(response.data.error);
        }
      } else {
        // Fetch all listings using the hook
        await fetchMyDeactivatedListings(userId);
    
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setError(`Deactivated listing "${searchTerm}" not found...`);
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
      fetchDeactivatedListings(query);
    } else {
      fetchDeactivatedListings(); // Fetch all inactive listings
    }
  }, [query, userId]);



  // Effect to update displayed inactive listings when Redux state changes (for non-search scenarios)
  useEffect(() => {
    if (!query && reduxDeactivatedListings) {
      setIsLoading(hookLoading);
      setDisplayedDeactivatedListings(reduxDeactivatedListings.apartments || []);
      setError(hookError);
    }
  }, [reduxDeactivatedListings, hookLoading, hookError, query]);



  // Search handlers
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/dashboard?keyword=${searchQuery}`);
    } else {
      // Clear search - go back to all inactive listings
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
    fetchDeactivatedListings(query);
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
      {/* DEACTIVADED LISTINGS SEARCH INPUT FIELD */}
      <div className="w-full h-20 flex items-center justify-center bg-white">
          <div className="relative bg-stone-50 w-11/12 h-8/12 border-2 border-stone-200 rounded-xl">  
              <input
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleKeyPress}
                type="text"
                placeholder="Deactivated Listings Search"
                className="w-full h-full  pl-4 rounded-md outline-none text-lg font-semibold text-gray-900 placeholder-stone-400" 
              />
              <SearchIcon 
                onClick={handleSearch}
                size={24} 
                strokeWidth={2} 
                className="absolute right-3 h-6 w-6 top-1/2 transform -translate-y-1/2 font-extrabold text-stone-400 cursor-pointer" 
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

      {/* USER (landlord / agent) LISTINGS */} 
      <div className="w-full h-full flex flex-col items-center justify-center px-4 overflow-y-auto scroll-smooth mb-12">
        {error ? (
          <ErrorDisplay />
        ) : isLoading ? (
          <ApartmentDetailsSkeleton cards={4} />
        ) : displayedDeactivatedListings?.length > 0 ? (
          displayedDeactivatedListings.map((apartment) => (
            <DeactivatedListingDetails apartment={apartment} key={apartment._id} />
          ))
        ) : (
          <MyDeactivatedListingsPlaceholder />
        )}
        
        {/* Show more button - only for non-search results */}
        {!error && !isLoading && displayedDeactivatedListings?.length > 0 && !query && (
          <div className="w-full h-full mt-12 flex flex-col items-center justify-center gap-24">
            <button className="px-4 py-2 text-white text-lg font-bold border-8 border-double bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 rounded-full cursor-pointer focus:invisible">
              Show more
            </button>
          </div>
        )}
      </div> 
    </div>
  )
}

export default DeactivatedListings;