import { AlertCircle, Calendar, ChevronLeft, ChevronRight, MapPin, X, Bed, Bath } from 'lucide-react';
import { HeartIcon as HeartSolid, TagIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatCustomTimeAgo } from "../utils/time-format/TimeFormat";
import ApartmentImagesPlaceholder from "../utils/placeholders/ApartmentImagesPlaceholder";
import DotNavigation from "../utils/pop-display/DotNavigation";


const ApartmentDetails = ({ apartment, toggleBookmark, error, setError }) => {
    const [currentImg, setCurrentImg] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const totalImages = apartment.uploadedImages?.length || 0;
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const userId = user?._id;
    const userRole = user?.role;
    const bookmarked = useSelector((state) => state.bookmarks.items?.bookmarks || []);
    const isBookmarked = bookmarked.some((b) => b?.apartmentId?._id === apartment._id);
    const [showAuthDialog, setShowAuthDialog] = useState(false);

    const { createdAt, updatedAt, isAvailable } = apartment;
    const reactivationTime = (isAvailable && updatedAt !== createdAt)
        ? formatCustomTimeAgo(updatedAt)
        : formatCustomTimeAgo(createdAt);

    const formatPrice = (price) =>
        new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
        }).format(price);

    const handleNext = () => { if (currentImg < totalImages - 1) setCurrentImg((p) => p + 1); };
    const handlePrev = () => { if (currentImg > 0) setCurrentImg((p) => p - 1); };

    const handleToggleBookmark = async () => {
        if (!userId) { setShowAuthDialog(true); return; }
        await toggleBookmark(apartment._id, isBookmarked);
    };

    const handleDialogClose = () => setShowAuthDialog(false);
    const handleLoginNavigation = () => { setShowAuthDialog(false); navigate('/login'); };
    const handleRegisterNavigation = () => { setShowAuthDialog(false); navigate('/register'); };


    
    // Authentication Dialog Component
    const AuthDialog = () => (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative shadow-2xl">
                {/* Close button */}
                <button
                    onClick={handleDialogClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Dialog content */}
                <div className="text-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
                        <HeartSolid className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 mb-2">
                        Save Your Favorite Apartments
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6">
                        Log in to add this apartment to your wishlist and keep track of your favorite potential homes.
                    </p>

                    {/* Action buttons */}
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={handleLoginNavigation}
                            className="w-full bg-cyan-700 hover:bg-cyan-800 text-white py-2.5 px-4 rounded-xl font-semibold transition-colors duration-200 cursor-pointer shadow-md"
                        >
                            Log In
                        </button>
                        <button
                            onClick={handleRegisterNavigation}
                            className="w-full border border-gray-200 text-gray-700 py-2.5 px-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                        >
                            Create Account
                        </button>
                    </div>

                    <p className="text-xs text-gray-400 mt-4">
                        Don't have an account? Create one to start building your wishlist.
                    </p>
                </div>
            </div>
        </div>
    );




    // ── ERROR ALERT ──
    const ErrorAlert = ({ onClose }) => (
        <div className="px-3 py-2.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-red-700 font-medium flex-1">{error}</p>
            {onClose && (
                <button onClick={onClose} className="text-red-400 hover:text-red-600 flex-shrink-0">
                    <X className="w-3.5 h-3.5" />
                </button>
            )}
        </div>
    );


    return (
        <>
            {/* ── CARD ── */}
            <div
                className="w-full md:w-11/12 lg:w-11/12 flex flex-col bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer mb-4 mt-11 group"
            >
                {/* ── IMAGE BLOCK ── */}
                <div className="p-2 pb-0">
                <div
                    className="relative w-full h-[260px] overflow-hidden rounded-2xl mt-1"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {apartment.uploadedImages.length === 0 ? (
                        <ApartmentImagesPlaceholder />
                    ) : (
                        <div
                            className="h-full w-full flex transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                            style={{ transform: `translateX(-${currentImg * 100}%)` }}
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
                                        className="min-w-full flex-shrink-0 h-full object-cover"
                                    />
                                );
                            })}
                        </div>
                    )}

                    {/* Gradient overlay at bottom of image */}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                    {/* Prev / Next */}
                    {isHovered && currentImg > 0 && (
                        <button onClick={handlePrev}
                            className="absolute top-1/2 left-3 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition cursor-pointer z-10">
                            <ChevronLeft strokeWidth={3} className="w-4 h-4 text-gray-600" />
                        </button>
                    )}
                    {isHovered && currentImg < totalImages - 1 && (
                        <button onClick={handleNext}
                            className="absolute top-1/2 right-3 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition cursor-pointer z-10">
                            <ChevronRight strokeWidth={3} className="w-4 h-4 text-gray-600" />
                        </button>
                    )}

                    {/* Dots */}
                    {totalImages > 1 && (
                        <DotNavigation
                            apartment={apartment}
                            totalImages={totalImages}
                            currentImg={currentImg}
                            setCurrentImg={setCurrentImg}
                        />
                    )}

                    {/* Apartment type badge — bottom left overlay (like reference card) */}
                    <div className="absolute bottom-4 left-3 z-10">
                        <span className="text-xs font-bold text-white bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full tracking-widest capitalize">
                            {apartment.apartment_type}
                        </span>
                    </div>

                    {/* Premium badge — top left */}
                    {apartment.furnished && (
                        <div className="absolute top-3 left-3 z-10">
                            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-xs md:text-sm lg:text-sm font-bold rounded-full shadow-md border border-stone-300">
                                <span>🏷️</span>
                                <span className="text-stone-700 tracking-widest">Premium</span>
                            </span>
                        </div>
                    )}

                    {/* Heart — top right */}
                    {(!userRole || userRole === "tenant") && (
                       <div 
                            onClick={handleToggleBookmark}
                        >
                            {
                                isBookmarked ? (  
                                    <>   
                                        <HeartSolid className="w-12 h-12 lg:w-13 lg:h-13 text-rose-600 absolute top-1.5 right-3  hover:scale-110 transition-all duration-200 z-10 cursor-pointer" /> 
                                        <HeartOutline className="w-12 h-12 lg:w-13 lg:h-13 text-gray-50 absolute top-1.5 right-3  hover:scale-110 transition-all duration-200 z-10 cursor-pointer" />
                                    </> 
                                ) : (
                                    <>   
                                        <HeartSolid className="w-12 h-12 lg:w-13 lg:h-13 text-gray-950/40 absolute top-1.5 right-3  hover:scale-110 transition-all duration-200 z-10 cursor-pointer" /> 
                                        <HeartOutline className="w-12 h-12 lg:w-13 lg:h-13 text-gray-50 absolute top-1.5 right-3  hover:scale-110 transition-all duration-200 z-10 cursor-pointer" />
                                    </>
                                )
                            }   
                        </div>
                    )}
                </div>
                </div>


                {/* ── INFO BLOCK ── */}
                <div
                    onClick={() => navigate(`/apartment/${apartment._id}`)}
                    className="flex flex-col gap-3 p-4"
                >
                    {/* Title + location */}
                    <div className="flex flex-col gap-2">
                        <h1 className="text-lg lg:text-xl font-bold text-gray-900 leading-snug line-clamp-1">
                            {apartment.title}
                        </h1>
                        <div className="flex items-center gap-1.5 text-gray-400">
                            <MapPin className="w-4 h-4 lg:w-5 lg:h-5 text-gray-500" />
                            <h4 className="text-sm lg:text-base font-medium">{apartment.location}</h4>
                        </div>
                    </div>

                    {error && <ErrorAlert onClose={() => setError(null)} />}

                    {/* Time */}
                    <div className="flex items-center justify-end-safe gap-1.5 text-gray-400">
                        <Calendar className="w-3 h-3" />
                        <span className="text-xs font-medium">{reactivationTime}</span>
                    </div>

                    {/* Price + View row */}
                    <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                        {/* Price */}
                        <div>
                            <span className="text-xl lg:text-2xl font-bold text-slate-900 font-mono">
                                {formatPrice(apartment.price)}
                            </span>
                            <span className="text-xs lg:text-sm text-gray-400 font-medium ml-1">
                                / {apartment.payment_frequency}
                            </span>
                        </div>

                        {/* View pill */}
                        <button
                            onClick={(e) => { e.stopPropagation(); navigate(`/apartment/${apartment._id}`); }}
                            className="flex items-center gap-3 bg-gradient-to-br from-cyan-800 to-cyan-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                        >
                            View
                            <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                                <ChevronRight className="w-3 h-3" strokeWidth={3} />
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {showAuthDialog && <AuthDialog />}
        </>
    );
};

export default ApartmentDetails;