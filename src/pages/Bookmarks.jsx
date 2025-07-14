import Footer from "../components/Footer";
import Footerbar from "../components/Footerbar";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import BookmarkCard from "../components/BookmarkCard";
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchIcon, X } from "lucide-react";
import { useGetUserBookmarks } from "../hooks/bookmarks";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ApartmentDetailsSkeleton from "../utils/loading-display/ApartmentDetailsSkeleton";
import WishlistPlaceholder from "../utils/placeholders/WishlistPlaceholder";
import { fetchUserBookmarksBySearchApi } from "../api/bookmarks";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const Bookmarks = () => {
    const query = useQuery().get('keyword');
    const navigate = useNavigate();
    const { getUserBookmarks, isLoading: hookLoading, error: hookError } = useGetUserBookmarks();
    const reduxBookmarks = useSelector((state) => state.bookmarks?.items?.bookmarks);
    
    // Unified state for both operations
    const [displayedBookmarks, setDisplayedBookmarks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');



    // Unified function to fetch bookmarks (either all or filtered)
    const fetchBookmarks = async (searchTerm = null) => {
        setIsLoading(true);
        setError(null);

        try {
            if (searchTerm) {
                // Fetch search results
                const response = await fetchUserBookmarksBySearchApi(searchTerm);
                if (response.status >= 200 && response.status < 300) {
                    setDisplayedBookmarks(response.data.listings);
                } else {
                    throw new Error(response.data.error);
                }
            } else {
                // Fetch all bookmarks using the hook
                await getUserBookmarks();
                // The hook will update Redux state, which we'll use in useEffect
            }
        } catch (error) {
            if (error.response?.status === 404) {
                setError(`Wishlist Apartment "${searchTerm}" not found...`);
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
            fetchBookmarks(query);
        } else {
            fetchBookmarks(); // Fetch all bookmarks
        }
    }, [query]);


    // Effect to update displayed bookmarks when Redux state changes (for non-search scenarios)
    useEffect(() => {
        if (!query && reduxBookmarks) {
            setDisplayedBookmarks(reduxBookmarks);
            setIsLoading(hookLoading);
            setError(hookError);
        }
    }, [reduxBookmarks, hookLoading, hookError, query]);


    // Search handlers
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };


    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/bookmarks?keyword=${searchQuery}`);
        } else {
            // Clear search - go back to all bookmarks
            navigate('/bookmarks');
        }
    };


    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };


    // Unified retry handler
    const handleRetry = () => {
        fetchBookmarks(query);
    };


    // Clear search handler
    const handleClearSearch = () => {
        setSearchQuery('');
        navigate('/bookmarks');
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
        <div className="w-full h-full flex flex-col items-start justify-center">
            <div className="w-full h-full flex flex-col items-start justify-center gap-4">
                {/* HEADING AND BACK ICON */}
                <div className="w-full h-16 flex items-center justify-start gap-4 pl-2 pt-4 bg-white">
                    <div 
                        className="w-12 h-12 mt-1 flex items-center text-gray-900 justify-center rounded-full hover:bg-neutral-100 transition-colors duration-200 cursor-pointer"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeftIcon className="w-6 h-6" />
                    </div>
                    <h1 className="font-bold text-gray-900 text-3xl">WishLists</h1>
                </div>

                {/* BOOKMARKS SEARCH INPUT FIELD */}
                <div className="w-full h-20 flex items-center justify-center bg-white">
                    <div className="relative bg-stone-100 w-11/12 h-8/12 border border-stone-200 rounded-xl">  
                        <input
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onKeyDown={handleKeyPress}
                            type="text"
                            placeholder="Search your wishlists"
                            className="w-full h-full pl-4 pr-12 rounded-md outline-none text-lg font-semibold text-gray-900 placeholder-stone-400" 
                        />
                        <SearchIcon 
                            onClick={handleSearch}
                            size={24} 
                            strokeWidth={3} 
                            className="absolute right-4 h-6 w-6 top-1/2 transform -translate-y-1/2 font-extrabold text-stone-400 cursor-pointer" 
                        />
                        {/* Clear search button when there's a query */}
                        {query && (
                            <button
                                onClick={handleClearSearch}
                                className="absolute right-12 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
                            >
                                <X  className="w-5 h-5"/>
                            </button>
                        )}
                    </div>
                </div>

                {/* Search indicator */}
                {query && (
                    <div className="w-full text-center px-4">
                        <p className="text-lg text-gray-600 font-semibold">
                            Search results for <b className="text-gray-800">"{query}"</b>
                        </p>
                    </div>
                )}

                {/* USER BOOKMARKS - UNIFIED DISPLAY */}        
                <div className="w-full h-full flex flex-col items-center justify-center px-4 overflow-y-auto scroll-smooth mb-12">
                    {error ? (
                        <ErrorDisplay />
                    ) : isLoading ? (
                        <ApartmentDetailsSkeleton cards={3} />
                    ) : displayedBookmarks?.length > 0 ? (
                        displayedBookmarks.map((apartment) => (
                            <BookmarkCard apartment={apartment} key={apartment._id} />
                        ))
                    ) : (
                        <WishlistPlaceholder />
                    )}
                    
                    {/* Show more button - only for non-search results */}
                    {!error && !isLoading && displayedBookmarks?.length > 0 && !query && (
                        <div className="w-full h-full mt-12 flex flex-col items-center justify-center gap-24">
                            <button className="px-4 py-2 text-white text-lg font-bold border-8 border-double bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 rounded-full cursor-pointer focus:invisible">
                                Show more
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <Footerbar />
            <Footer />
        </div>
    );
};

export default Bookmarks;