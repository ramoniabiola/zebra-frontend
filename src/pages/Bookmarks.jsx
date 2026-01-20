import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import BookmarkCard from "../components/BookmarkCard";
import WishlistPlaceholder from "../utils/placeholders/WishlistPlaceholder";
import ToggleSuccess from "../utils/pop-display/ToggleSuccess";
import { useClearAllUserBookmarks, useGetUserBookmarks, useToggleBookmark } from "../hooks/bookmarks";
import { selectPaginatedBookmarks, setCurrentPage } from "../redux/bookmarkSlice";
import BookmarkCardSkeleton from "../utils/loading-display/BookmarkCardSkeleton";
import { ArrowLeft, ChevronLeft, ChevronRight, MoreVertical, RotateCcw, Trash2 } from "lucide-react";




const Bookmarks = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const { getUserBookmarks, isLoading, error } = useGetUserBookmarks();
    const { toggleBookmark, success, error: toggleError, setError, animateOut } = useToggleBookmark();
    const { clearAllUserBookmark, error: clearError } = useClearAllUserBookmarks();
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


    const handleClearAllWishlist = async () => {
        setShowConfirmModal(false);  

        await clearAllUserBookmark(); 
    };


    const handleRetry = () => {
        setShowErrorModal(false); 
        handleClearAllWishlist();
    }


    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };




    const ConfirmModal = () => {
        if (!showConfirmModal) return null;

        return (
            <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
                    <div className="text-center mb-6">
                        <div className="w-14 h-14 bg-gradient-to-r from-rose-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Trash2 className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">
                            Clear All Wishlist?
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Are you sure you want to remove all apartment from your wishlist? 
                            This action cannot be undone.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowConfirmModal(false)}
                            className="flex-1 px-2 py-2 bg-gray-100 text-sm hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200 cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleClearAllWishlist}
                            className="flex-1 px-2 py-2 bg-gradient-to-r from-rose-600 to-rose-700 text-sm hover:from-rose-700 hover:to-rose-800 text-white font-semibold rounded-xl transition-all duration-200 cursor-pointer"
                        >
                            Clear All
                        </button>
                    </div>
                </div>
            </div>
        );
    };


    const ErrorModal = () => {
        if (!showErrorModal) return null;
        return (
          <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative">
                <button
                  onClick={() => setShowErrorModal(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
             
                <div className="text-center">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertCircle className="w-8 h-8 text-red-600" />
                    </div>
                    <h3 className="text-base font-semibold text-gray-800 mb-2">
                      Update Failed
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      We couldn't clear all your wishlist. Please try again.
                      <br />
                      <span className="text-sm text-gray-500 mt-2 block">
                        Error: <b>{clearError}</b>
                      </span>
                    </p>
                    <button
                      onClick={handleRetry}
                      className="px-6 py-2 bg-sky-600 text-sm hover:bg-sky-700 text-white font-semibold tracking-widest rounded-lg transition-colors duration-200 cursor-pointer"
                    >
                      Retry
                    </button>
                </div>
            </div>
          </div>
        );
      };


    

    const ErrorDisplay = () => (
        <div className="h-full w-full flex flex-col items-center justify-center text-center py-8 mt-40 mb-40 pl-0 pr-6 lg:pl-0 lg:pr-10">
            <ExclamationTriangleIcon className="w-10 h-10 text-red-500 mx-auto mb-4" />
            <h3 className="text-base font-semibold text-gray-800 mb-1">Something went wrong</h3>
            <p className="text-gray-600 text-sm font-semibold mb-4">{error}</p>
            <button
                onClick={getUserBookmarks}
                className="px-3 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm tracking-widest font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-1.5  focus:invisible cursor-pointer"
            >
                <RotateCcw className="w-4 h-4" />
                Retry
            </button>
        </div>
    );


    return (
        <>
            <div className="w-full h-full flex flex-col items-start justify-center lg:mt-20">
                <div className="w-full h-full flex flex-col items-start justify-center gap-4">
                    {/* Header */}
                    <div className="w-full h-16 flex items-center justify-between px-2 bg-white">
                        <div className="flex items-center gap-2">
                            <div
                                className="w-12 h-12 mt-1 flex items-center text-gray-900 justify-center rounded-full hover:bg-neutral-100 transition-colors duration-200 cursor-pointer"
                                onClick={() => navigate(-1)}
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </div>
                            <h1 className="font-bold text-gray-900 text-2xl lg:text-3xl">WishLists</h1>
                        </div>

                        {totalBookmarks > 0 && !error && !isLoading && (
                            <div className="relative" ref={dropdownRef}>
                                <div 
                                    className={`w-10 h-10 mt-1 flex items-center text-gray-900 justify-center rounded-full hover:bg-neutral-100 transition-all duration-200 cursor-pointer ${isDropdownOpen ? 'bg-neutral-100 rotate-90' : ''}`}
                                    onClick={toggleDropdown}
                                >
                                    <MoreVertical className="w-5 h-5" />
                                </div>

                                {/* Dropdown Menu */}
                                <div className={`absolute right-0 top-12 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 ease-out transform origin-top-right z-50 ${
                                    isDropdownOpen 
                                        ? 'opacity-100 scale-100 translate-y-0' 
                                        : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                                }`}>
                                    <div className="py-2 px-2">
                                        <button
                                            onClick={() => {
                                                setIsDropdownOpen(false);   
                                                setShowConfirmModal(true);  
                                            }}
                                            className="w-full px-2 py-2 text-left text-gray-500 hover:bg-neutral-50 rounded-xl transition-colors duration-200 flex items-center gap-3 group cursor-pointer"
                                        >
                                            <div className="w-6 h-6 flex items-center justify-center rounded-md bg-red-100 group-hover:bg-red-200  transition-colors duration-200">
                                                <Trash2 className="w-3 h-3 text-red-600" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-sm">Clear all wishlist</div>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="w-full h-full mt-4 pl-6 pr-0 lg:pl-10 lg:pr-0 overflow-y-auto scroll-smooth mb-12">
                        {error ? (
                            <ErrorDisplay />
                        ) : isLoading ? (
                            <BookmarkCardSkeleton cards={2} />
                        ) : totalBookmarks > 0 ? (
                            <>
                                {/* Grid Container for Bookmarked Apartments */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-2">
                                    {paginatedBookmarks.map((apartment) => (
                                        <BookmarkCard 
                                            apartment={apartment} 
                                            key={apartment._id} 
                                            toggleBookmark={toggleBookmark}
                                            error={toggleError}
                                            setError={setError}
                                            offset="bottom-24"
                                        />
                                    ))}
                                </div>

                                {/* Pagination Controls */}
                                {totalPages > 1 && (   
                                    <div className="w-full flex items-center justify-center gap-12 py-2 pl-0 pr-6 lg:pl-0 lg:pr-10">
                                        <button
                                           disabled={currentPage === 1}
                                            onClick={() => dispatch(setCurrentPage(currentPage - 1))}
                                            className="px-4 py-3 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                        </button>
                                    
                                        <span className="text-sm text-gray-600 font-medium">
                                           {currentPage} / {totalPages}
                                        </span>
                                    
                                        <button
                                            disabled={currentPage === totalPages}
                                            onClick={() => dispatch(setCurrentPage(currentPage + 1))}
                                            className="px-4 py-3 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="pl-0 pr-6 lg:pl-0 lg:pr-10">
                                <WishlistPlaceholder />
                            </div>
                        )}
                    </div>
                    <ToggleSuccess 
                        message={success} 
                        animateOut={animateOut} 
                    />  
                </div>
            </div>

            {/* Modals */}
            <ConfirmModal />

            {clearError && (
                <ErrorModal />
            )}
        </>
    );
};

export default Bookmarks;
