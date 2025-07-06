import Footer from "../components/Footer";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import BookmarkCard from "../components/BookmarkCard";
import Footerbar from "../components/Footerbar";
import { useNavigate } from 'react-router-dom';
import { SearchIcon } from "lucide-react";
import { useGetUserBookmarks } from "../hooks/bookmarks";
import ApartmentDetailsSkeleton from "../utils/loading-display/ApartmentDetailsSkeleton";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import WishlistPlaceholder from "../utils/placeholders/WishlistPlaceholder";





const Bookmarks = () => {
    const navigate = useNavigate();
    const { getUserBookmarks, isLoading, error } = useGetUserBookmarks();
    const bookmarks = useSelector((state) => state.bookmarks?.items?.bookmarks);

    useEffect(() => {
        getUserBookmarks();

    }, [getUserBookmarks]);



    const handleRetry = () => {
        getUserBookmarks();
    };

    // Error Display
     const ErrorDisplay = () => (
        <div className="h-full w-full flex flex-col items-center justify-center text-center py-8 mt-40 mb-40">
            <ExclamationTriangleIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              Something went wrong
            </h3>
            <p className="text-gray-600 mb-4">
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
                        className="w-12 h-12  mt-1 flex items-center text-gray-900 justify-center rounded-full hover:bg-neutral-100 transition-colors duration-200 cursor-pointer"
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
                          type="text"
                          placeholder="Search your wishlists"
                          className="w-full h-full  pl-4 rounded-md outline-none text-lg font-semibold text-gray-900 placeholder-stone-400" 
                        />
                        <SearchIcon size={24} strokeWidth={3} className="absolute right-4 h-6 w-6 top-1/2 transform -translate-y-1/2 font-extrabold text-stone-400 cursor-pointer" />
                    </div>
                </div>

                {/* USER(Tenants) BOOKMARKS */}        
                <div className="w-full h-full flex flex-col items-center justify-center px-4 overflow-y-auto scroll-smooth mb-12">
                    {error ? 
                        (
                            <ErrorDisplay />
                        ) : isLoading ? 
                        (
                            <ApartmentDetailsSkeleton cards={3} />
                        ) : bookmarks?.length > 0 ? 
                        (
                            bookmarks?.map((apartment) => (
                                <BookmarkCard apartment={apartment} key={apartment._id} />
                            ))
                        ) : (
                        <WishlistPlaceholder />
                    )}
                    {!error && !isLoading && bookmarks?.length > 0 && (
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
    )
};

export default Bookmarks;