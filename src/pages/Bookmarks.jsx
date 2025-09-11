import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import BookmarkCard from "../components/BookmarkCard";
import WishlistPlaceholder from "../utils/placeholders/WishlistPlaceholder";
import Footer from "../components/Footer";
import Footerbar from "../components/Footerbar";
import { useGetUserBookmarks } from "../hooks/bookmarks";
import { selectPaginatedBookmarks, setCurrentPage } from "../redux/bookmarkSlice";
import BookmarkCardSkeleton from "../utils/loading-display/BookmarkCardSkeleton";
import { ArrowLeft, ChevronLeft, ChevronRight, MoreVertical, RotateCcw, Trash2 } from "lucide-react";


const Bookmarks = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { getUserBookmarks, isLoading, error } = useGetUserBookmarks();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const paginatedBookmarks = useSelector(selectPaginatedBookmarks);
    const { currentPage, totalPages, totalBookmarks } = useSelector((state) => state.bookmarks.items);

    
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        getUserBookmarks(); // load ALL bookmarks once
    }, [getUserBookmarks]);




    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // const handleClearAllWishlists = () => {
    //     // Add your clear wishlists logic here
    //     console.log("Clearing all wishlists...");
    //     setIsDropdownOpen(false);
    // };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };


    

    const ErrorDisplay = () => (
        <div className="h-full w-full flex flex-col items-center justify-center text-center py-8 mt-40 mb-40">
            <ExclamationTriangleIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Something went wrong</h3>
            <p className="text-gray-600 font-semibold mb-4">{error}</p>
            <button
                onClick={getUserBookmarks}
                className="px-3 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-1.5  focus:invisible cursor-pointer"
            >
                <RotateCcw className="w-4 h-4" />
                Try Again
            </button>
        </div>
    );


    return (
        <div className="w-full h-full flex flex-col items-start justify-center">
            <div className="w-full h-full flex flex-col items-start justify-center gap-4">
                {/* Header */}
                <div className="w-full h-16 flex items-center justify-between px-2 pt-4 bg-white">
                    <div className="flex items-center gap-2">
                        <div
                            className="w-12 h-12 mt-1 flex items-center text-gray-900 justify-center rounded-full hover:bg-neutral-100 transition-colors duration-200 cursor-pointer"
                            onClick={() => navigate(-1)}
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </div>
                        <h1 className="font-bold text-gray-900 text-3xl">WishLists</h1>
                    </div>

                    {totalBookmarks > 0 && (
                        <div className="relative" ref={dropdownRef}>
                            <div 
                                className={`w-12 h-12 mt-1 flex items-center text-gray-900 justify-center rounded-full hover:bg-neutral-100 transition-all duration-200 cursor-pointer ${isDropdownOpen ? 'bg-neutral-100 rotate-90' : ''}`}
                                onClick={toggleDropdown}
                            >
                                <MoreVertical className="w-6 h-6" />
                            </div>

                            {/* Dropdown Menu */}
                            <div className={`absolute right-0 top-14 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 ease-out transform origin-top-right z-50 ${
                                isDropdownOpen 
                                    ? 'opacity-100 scale-100 translate-y-0' 
                                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                            }`}>
                                <div className="py-2 px-2">
                                    <button
                                        //onClick={handleClearAllWishlists}
                                        disabled={isLoading || error}
                                        className="w-full px-2 py-3 text-left text-gray-500 hover:bg-neutral-50 rounded-xl  transition-colors duration-200 flex items-center gap-3 group cursor-pointer"
                                    >
                                        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-100 group-hover:bg-red-200  transition-colors duration-200">
                                            <Trash2 className="w-4 h-4 text-red-600" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-base">Clear all wishlists</div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="w-full h-full flex flex-col items-center justify-center px-4 overflow-y-auto scroll-smooth mt-12 mb-12">
                    {error ? (
                        <ErrorDisplay />
                    ) : isLoading ? (
                        <BookmarkCardSkeleton cards={2} />
                    ) : totalBookmarks > 0 ? (
                        <>
                            {paginatedBookmarks.map((apartment) => (
                                <BookmarkCard apartment={apartment} key={apartment._id} />
                            ))}

                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="w-full flex items-center justify-center gap-4">   
                                    <button
                                        disabled={currentPage === 1}
                                        onClick={() => dispatch(setCurrentPage(currentPage - 1))}
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
                                                {currentPage}
                                            </div>
                                            <span className="text-sm text-gray-400">of</span>
                                            <span className="text-sm text-gray-600 font-medium">{totalPages}</span>
                                        </div>
                                    </div>

                                    <button
                                        disabled={currentPage === totalPages}
                                        onClick={() => dispatch(setCurrentPage(currentPage + 1))}
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
                        <WishlistPlaceholder />
                    )}
                </div>
            </div>
            <Footerbar />
            <Footer />
        </div>
    );
};

export default Bookmarks;
