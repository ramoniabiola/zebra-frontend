import { useState } from "react";
import { AlertCircle, Ban, Calendar, ChevronLeft, ChevronRight, MapPin, X } from 'lucide-react';
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatCustomTimeAgo } from "../utils/time-format/TimeFormat";
import ApartmentImagesPlaceholder from "../utils/placeholders/ApartmentImagesPlaceholder";
import DotNavigation from "../utils/pop-display/DotNavigation";



const BookmarkCard = ({ apartment, toggleBookmark, error, setError }) => {
    const bookmark = apartment?.apartmentId;
    const [currentImg, setCurrentImg] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const totalImages = bookmark?.uploadedImages?.length || 0;
    const [errorAlert, setErrorAlert] = useState(false)
    const bookmarked = useSelector((state) => state.bookmarks?.items?.bookmarks || []);
    const isBookmarked = bookmarked.some(
        (b) => b?.apartmentId?._id === bookmark?._id
    );
    const navigate = useNavigate();



    // Time Formatting
    const { createdAt, updatedAt, isAvailable } = bookmark; 
    let reactivationTime = null;

    if (isAvailable && updatedAt !== createdAt) {
        reactivationTime = formatCustomTimeAgo(updatedAt); 
    } else {
        reactivationTime = formatCustomTimeAgo(createdAt); 
    }


    // Price Formatting
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0
        }).format(price);
    };  
    
    


    
    const handleToggleBookmark = async () => { 

       await toggleBookmark(bookmark._id, isBookmarked);
    }


    const handleNavigation = () => {
        if(!bookmark.isAvailable) {
            setErrorAlert(true)
            // Auto-hide after 5 seconds
            setTimeout(() => setErrorAlert(false), 5000);
        } else {
            navigate(`/apartment/${bookmark._id}`)
            setErrorAlert(false)
        }
    }
  
    
    
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


    // Error alert for toggle effect Component
    const ToggleErrorAlert = ({ onClose }) => (
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



    // Error alert for a bookmarked dactivated listing.
    const AvailableErrorMessage = ({ onClose }) => (
        <div className="p-2 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 mt-2">
            <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
                <p className="text-sm text-red-700 font-medium">{`This listing "${bookmark.title}" is no more vacant, kindly remove from wishlist.`}</p>
            </div>
            {onClose && (
                <button onClick={onClose} className="text-red-400 hover:text-red-600">
                    <X className="w-4 h-4" />
                </button>
            )}
        </div>
    );
        


    return (
        <div className='w-11/12 h-auto flex flex-col items-center justify-start bg-white relative mb-24 cursor-pointer'>  
            <div 
                className="w-full h-[300px] relative overflow-hidden rounded-2xl"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Image Slider */}
                {bookmark.uploadedImages.length === 0 ? (
                    <ApartmentImagesPlaceholder />
                ) : (
                    <div 
                        className="h-full w-full flex transition-transform duration-600 ease-[cubic-bezier(0.4, 0, 0.2, 1)]"
                        style={{ transform: `translateX(-${currentImg * 100}%)` }}
                    >
                        {bookmark.uploadedImages.map((image, index) => {
                            const optimizedUrl = image.includes("/upload/") 
                            ? image.replace("/upload/", "/upload/f_auto,q_auto/")
                            : image;
                        
                            return (
                                <img 
                                    key={index}
                                    src={optimizedUrl}
                                    alt={`apartment-${index}`}
                                    className="min-w-full flex-shrink-0 h-full object-cover rounded-md"
                                />
                            );
                        })}
                    </div>
                )}
                
                {/* Left and right image slider navigatiom */}
                {isHovered && currentImg > 0 && (
                    <button
                        onClick={handlePrev}
                        className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-white p-2 rounded-full opacity-90 shadow hover:bg-gray-100 transition cursor-pointer"
                    >
                        <ChevronLeft strokeWidth={3} className="w-6 h-6 text-gray-400" />
                    </button>
                )}
                {isHovered && currentImg < totalImages - 1 && (
                    <button
                        onClick={handleNext}
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-white p-2 rounded-full opacity-90 shadow hover:bg-gray-100 transition cursor-pointer"
                    >
                        <ChevronRight strokeWidth={3} className="w-6 h-6 text-gray-400" />
                    </button>
                )}

                {/* Dots Navigation */}
                {totalImages > 1 && (
                    <DotNavigation 
                        apartment={bookmark}
                        totalImages={totalImages}
                        currentImg={currentImg}
                        setCurrentImg={setCurrentImg}
                    />
                )}


                {/* Heart Icon */}
                <div 
                    onClick={handleToggleBookmark}
                >
                    {
                        isBookmarked ? (  
                            <>   
                                <HeartSolid className="w-12 h-12 lg:w-13 lg:h-13 text-rose-500 absolute top-2 right-3  hover:scale-110 transition-all duration-200 z-10 cursor-pointer" /> 
                                <HeartOutline className="w-12 h-12 lg:w-13 lg:h-13 text-gray-50 absolute top-2 right-3  hover:scale-110 transition-all duration-200 z-10 cursor-pointer" />
                            </> 
                        ) : (
                            <>   
                                <HeartSolid className="w-12 h-12 lg:w-13 lg:h-13 text-black/35 absolute top-2 right-3  hover:scale-110 transition-all duration-200 z-10 cursor-pointer" /> 
                                <HeartOutline className="w-12 h-12 lg:w-13 lg:h-13 text-gray-50 absolute top-2 right-3  hover:scale-110 transition-all duration-200 z-10 cursor-pointer" />
                            </>
                        )
                    }   
                </div>
            </div>

            {/* Apartment Info */}
            <div onClick={handleNavigation} className="w-full mt-4 flex flex-col gap-2 text-left">
                  <div className="flex items-start justify-between gap-3">
                    <h1 className="text-lg lg:text-xl font-semibold text-slate-900 leading-tight group-hover:text-slate-900 transition-colors">
                        {bookmark.title}
                    </h1>
                </div>
                
                <div className="flex items-center gap-1.5 text-slate-600">
                    <MapPin className="w-4 h-4 lg:w-5 lg:h-5 text-slate-700" />
                    <h4 className="text-sm lg:text-base font-medium">{bookmark.location}</h4>
                </div>
                
                <p className="text-sm lg:text-base text-slate-500 leading-relaxed tracking-widest">{bookmark.apartment_type}</p>

                {!bookmark.isAvailable && (
                    <span 
                        className="w-3/5 flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-orange-100 to-rose-200 text-rose-900 text-xs font-semibold rounded [clip-path:polygon(0_0,100%_0,85%_100%,0%_100%)] tracking-wider"
                    >
                        <Ban className="w-4 h-4" />
                        No longer available! 
                    </span>
                )}

                {error && (
                    <ToggleErrorAlert 
                        onClose={() => setError(null)} 
                    />
                )}

                {errorAlert && (
                    <AvailableErrorMessage 
                        onClose={() => setErrorAlert(false)} 
                    />
                )}
                <div className="flex items-center justify-between mt-2 pt-4 px-1.5 border-t border-gray-100">
                   <h3 className="text-xl lg:text-2xl font-bold text-slate-900 font-mono">
                       {formatPrice(bookmark.price)}
                       <span className="text-sm lg:text-sm font-normal text-slate-500 ml-1">{apartment.payment_frequency}</span>
                   </h3>
                   
                   <div className="flex items-center gap-1.5 text-gray-400">
                       <Calendar className="w-3.5 h-3.5" />
                       <span className="text-xs lg:text-sm font-medium">{reactivationTime}</span>
                   </div>
                </div>
            </div>
        </div>
    );      
};

export default BookmarkCard;