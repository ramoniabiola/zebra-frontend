import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { AlertCircle, Calendar, MapPin, X } from 'lucide-react';
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from 'date-fns';
import { useToggleBookmark } from "../hooks/bookmarks";
import { useSelector } from "react-redux";


const ApartmentDetails   = ({ apartment }) => {
    const [currentImg, setCurrentImg] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [showAuthDialog, setShowAuthDialog] = useState(false);
    const totalImages = apartment.uploadedImages?.length || 0;
    const navigate = useNavigate()
    const userId = useSelector((state) => state.auth.user?._id);
    const { toggleBookmark, error, setError } = useToggleBookmark();
    const bookmarked = useSelector((state) => state.isBookmarked?.apartments || []);
    const isBookmarked = bookmarked.some(
        (b) => b?.apartmentId === apartment._id
    );


    // Price Formatting
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0
        }).format(price);
    };  

    //Time Formatting
    const timeAgo = apartment.createdAt
    ? formatDistanceToNow(new Date(apartment.createdAt), { addSuffix: true })
    : "some time ago";


   
    const handleNext = () => {
        if (currentImg < totalImages - 1) {
          setCurrentImg((prev) => prev + 1);
        }
    };
  
    const handlePrev = () => {
        if (currentImg > 0) {
          setCurrentImg((prev) => prev - 1);
        }
    };
    

    const handleToggleBookmark = async () => {
        
        // Check if user is authenticated
        if (!userId) {
            setShowAuthDialog(true);
            return;
        }

       await toggleBookmark(apartment._id, isBookmarked);
    }
   
    const handleDialogClose = () => {
        setShowAuthDialog(false);
    }

    const handleLoginNavigation = () => {
        setShowAuthDialog(false);
        navigate('/login');
    }

    const handleRegisterNavigation = () => {
        setShowAuthDialog(false);
        navigate('/register');
    }
    
    // Authentication Dialog Component
    const AuthDialog = () => (
        <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-11/12 mx-4 relative">
                {/* Close button */}
                <button
                    onClick={handleDialogClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Dialog content */}
                <div className="text-center">
                    <div className="mb-4">
                        <HeartSolid className="w-14 h-14 text-rose-500 mx-auto mb-3" />
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                            Save Your Favorite Apartments
                        </h2>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Log in to add this apartment to your wishlist and keep track of your favorite potential homes.
                        </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col gap-3 mt-6">
                        <button
                            onClick={handleLoginNavigation}
                            className="w-full shadow-lg bg-cyan-600 text-white py-2 px-2 rounded-lg font-medium hover:bg-cyan-700 transition-colors cursor-pointer"
                        >
                            Log In
                        </button>
                        <button
                            onClick={handleRegisterNavigation}
                            className="w-full border shadow-lg border-gray-300 text-gray-700 py-1.5 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                            Create Account
                        </button>
                    </div>

                    <p className="text-xs text-gray-500 mt-4">
                        Don't have an account? Create one to start building your wishlist.
                    </p>
                </div>
            </div>
        </div>
    );


    // Error Alert Component
    const ErrorAlert = ({ onClose }) => (
        <div className="p-2 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 animate-in slide-in-from-top-2 duration-300">
            <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
                <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
            {onClose && (
                <button onClick={onClose} className="text-red-400 hover:text-red-600">
                    <X className="w-4 h-4" />
                </button>
            )}
        </ div>
    );
    


    return (
        <>
            <div className='w-11/12 h-auto flex flex-col items-center justify-start bg-white mb-12 relative mt-12 cursor-pointer'>  
                <div 
                    className="w-full h-[310px] relative overflow-hidden rounded-xl"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Image Slider */}
                    <div 
                        className="h-full w-[322px] flex transition-transform duration-600 ease-[cubic-bezier(0.4, 0, 0.2, 1)]"
                        style={{
                            transform: `translateX(${currentImg * - 322}px)`,
                        }}
                    >
                        {apartment.uploadedImages.map((image, index) => {
                            const optimizedUrl = image.includes("/upload/") 
                            ? image.replace("/upload/", "/upload/f_auto,q_auto/")
                            : image;

                            return (
                                <img 
                                key={index}
                                src={optimizedUrl}
                                alt={`apartment-${index}`}
                                className="w-full h-full object-cover rounded-lg"
                                />
                            )
                        })}
                    </div>

                    {/* Left and right image slider navigatiom */}
                    {isHovered && currentImg > 0 && (
                    <button
                    onClick={handlePrev}
                    className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-white p-2 rounded-full opacity-80 shadow hover:bg-gray-100 transition cursor-pointer"
                    >
                        <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
                    </button>
                    )}
                    {isHovered && currentImg < totalImages - 1 && (
                        <button
                        onClick={handleNext}
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-white p-2 rounded-full opacity-80 shadow hover:bg-gray-100 transition cursor-pointer"
                        >
                            <ChevronRightIcon className="w-6 h-6 text-gray-700" />
                        </button>
                    )}

                    {/* Dots Navigation */}
                    {totalImages > 1 && (
                        <div className="absolute bottom-3.5 left-1/2 transform -translate-x-1/2 flex gap-1.5">
                            {apartment.uploadedImages.map((_, index) => (
                                <div
                                    key={index}
                                    className={`w-2 h-2 rounded-full transition-all ${
                                      index === currentImg ? "bg-white scale-110" : "bg-white opacity-50"
                                    }`}
                                >
                                </div>
                            ))}
                        </div>
                    )}


                    {/* Heart Icon */}
                    <div 
                        onClick={handleToggleBookmark}
                    >
                        {
                            isBookmarked ? (  
                                <>   
                                    <HeartSolid className="w-12 h-12 text-rose-500 absolute top-4 right-3  hover:scale-110 transition-all duration-200 z-10 cursor-pointer" /> 
                                    <HeartOutline className="w-12 h-12 text-gray-50 absolute top-4 right-3  hover:scale-110 transition-all duration-200 z-10 cursor-pointer" />
                                </> 
                            ) : (
                                <>   
                                    <HeartSolid className="w-12 h-12 text-black/35 absolute top-4 right-3  hover:scale-110 transition-all duration-200 z-10 cursor-pointer" /> 
                                    <HeartOutline className="w-12 h-12 text-gray-50 absolute top-4 right-3  hover:scale-110 transition-all duration-200 z-10 cursor-pointer" />
                                </>
                            )
                        }   
                    </div>
                </div> 

                {/* Apartment Info */}
                <div onClick={() => navigate(`/apartment/${apartment._id}`)} className="w-full mt-4 flex flex-col gap-2.5 text-left">
                    <div className="flex items-start justify-between gap-3">
                        <h1 className="text-xl   font-semibold text-slate-900 leading-tight group-hover:text-slate-900 transition-colors">
                            {apartment.title}
                        </h1>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-600">
                        <MapPin className="w-4 h-4 text-gray-700" />
                        <h4 className="text-sm font-medium">{apartment.location}</h4>
                    </div>

                    <p className="text-sm text-slate-500 leading-relaxed">{apartment.apartment_type}</p>
                    {error && (
                        <ErrorAlert 
                            onClose={() => setError(null)} 
                        />
                    )}
                    <div className="flex items-center justify-between mt-2 pt-4 px-1.5 border-t border-gray-100">
                       <h3 className="text-xl font-bold text-slate-900">
                            {formatPrice(apartment.price)}
                           <span className="text-sm font-normal text-slate-500 ml-1">yearly</span>
                       </h3>

                       <div className="flex items-center gap-1.5 text-gray-400">
                           <Calendar className="w-3.5 h-3.5" />
                           <span className="text-xs font-medium">{timeAgo}</span>
                       </div>
                    </div>
                </div>
            </div>

            {/* Authentication Dialog */}
            {showAuthDialog && <AuthDialog />}
        </>
    )
}

export default ApartmentDetails;