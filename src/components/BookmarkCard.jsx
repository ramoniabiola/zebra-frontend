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
    const [errorAlert, setErrorAlert] = useState(false);
    const totalImages = bookmark?.uploadedImages?.length || 0;
    const bookmarked = useSelector((state) => state.bookmarks?.items?.bookmarks || []);
    const isBookmarked = bookmarked.some((b) => b?.apartmentId?._id === bookmark?._id);
    const navigate = useNavigate();

    // Time Formatting
    const { createdAt, updatedAt, isAvailable } = bookmark;
    const reactivationTime = (isAvailable && updatedAt !== createdAt)
        ? formatCustomTimeAgo(updatedAt)
        : formatCustomTimeAgo(createdAt);

    // Price Formatting
    const formatPrice = (price) =>
        new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
        }).format(price);

    const handleToggleBookmark = async () => {
        await toggleBookmark(bookmark._id, isBookmarked);
    };

    const handleNavigation = () => {
        if (!bookmark.isAvailable) {
            setErrorAlert(true);
            setTimeout(() => setErrorAlert(false), 5000);
        } else {
            navigate(`/apartment/${bookmark._id}`);
            setErrorAlert(false);
        }
    };

    const handleNext = () => { if (currentImg < totalImages - 1) setCurrentImg((p) => p + 1); };
    const handlePrev = () => { if (currentImg > 0) setCurrentImg((p) => p - 1); };


    // ── TOGGLE ERROR ALERT ──
    const ToggleErrorAlert = ({ onClose }) => (
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

    // ── UNAVAILABLE ERROR ALERT ──
    const AvailableErrorMessage = ({ onClose }) => (
        <div className="px-3 py-2.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-red-700 font-medium flex-1">
                {`"${bookmark.title}" is no longer vacant. Kindly remove from wishlist.`}
            </p>
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
            <div className="w-full md:w-11/12 lg:w-11/12 flex flex-col bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer mb-16 group">

                {/* ── IMAGE BLOCK ── */}
                <div className="p-2 pb-0">
                    <div
                        className="relative w-full h-[260px] overflow-hidden rounded-2xl mt-1"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {/* Image Slider */}
                        {bookmark.uploadedImages.length === 0 ? (
                            <ApartmentImagesPlaceholder />
                        ) : (
                            <div
                                className="h-full w-full flex transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
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
                                            className="min-w-full flex-shrink-0 h-full object-cover"
                                        />
                                    );
                                })}
                            </div>
                        )}

                        {/* Gradient overlay */}
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
                                apartment={bookmark}
                                totalImages={totalImages}
                                currentImg={currentImg}
                                setCurrentImg={setCurrentImg}
                            />
                        )}

                        {/* Apartment type badge — bottom left */}
                        <div className="absolute bottom-4 left-3 z-10">
                            <span className="text-xs font-bold text-white bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full tracking-widest capitalize">
                                {bookmark.apartment_type}
                            </span>
                        </div>

                        {/* Unavailable badge — bottom left (overrides type badge) */}
                        {!bookmark.isAvailable && (
                            <div className="absolute bottom-4 left-3 z-20">
                                <span className="flex items-center gap-1.5 text-xs font-bold text-white bg-rose-500/80 backdrop-blur-sm px-3 py-2 rounded-full tracking-widest">
                                    <Ban className="w-3 h-3" />
                                    No longer available
                                </span>
                            </div>
                        )}

                        {/* Premium badge — top left */}
                        {bookmark.furnished && (
                            <div className="absolute top-3 left-3 z-10">
                                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-xs font-bold rounded-full shadow-md border border-stone-300">
                                    <span>🏷️</span>
                                    <span className="text-stone-700 tracking-widest">Premium</span>
                                </span>
                            </div>
                        )}

                        {/* Heart — top right */}
                        <div onClick={handleToggleBookmark}>
                            {isBookmarked ? (
                                <>
                                    <HeartSolid className="w-12 h-12 lg:w-13 lg:h-13 text-rose-600 absolute top-1.5 right-3 hover:scale-110 transition-all duration-200 z-10 cursor-pointer" />
                                    <HeartOutline className="w-12 h-12 lg:w-13 lg:h-13 text-gray-50 absolute top-1.5 right-3 hover:scale-110 transition-all duration-200 z-10 cursor-pointer" />
                                </>
                            ) : (
                                <>
                                    <HeartSolid className="w-12 h-12 lg:w-13 lg:h-13 text-gray-950/40 absolute top-1.5 right-3 hover:scale-110 transition-all duration-200 z-10 cursor-pointer" />
                                    <HeartOutline className="w-12 h-12 lg:w-13 lg:h-13 text-gray-50 absolute top-1.5 right-3 hover:scale-110 transition-all duration-200 z-10 cursor-pointer" />
                                </>
                            )}
                        </div>
                    </div>
                </div>


                {/* ── INFO BLOCK ── */}
                <div onClick={handleNavigation} className="flex flex-col gap-2 p-4">

                    {/* Title + location */}
                    <div className="flex flex-col gap-2">
                        <h1 className="text-lg lg:text-xl font-bold text-gray-900 leading-snug line-clamp-1">
                            {bookmark.title}
                        </h1>
                        <div className="flex items-center gap-1.5 text-gray-400">
                            <MapPin className="w-4 h-4 lg:w-5 lg:h-5 text-gray-500" />
                            <h4 className="text-sm lg:text-base font-medium">{bookmark.location}</h4>
                        </div>
                    </div>

                    {/* Alerts */}
                    {error && isBookmarked && <ToggleErrorAlert onClose={() => setError(null)} />}
                    {errorAlert && <AvailableErrorMessage onClose={() => setErrorAlert(false)} />}

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
                                {formatPrice(bookmark.price)}
                            </span>
                            <span className="text-xs lg:text-sm text-gray-400 font-medium ml-1">
                                / {bookmark.payment_frequency}
                            </span>
                        </div>

                        {/* View pill */}
                        <button
                            onClick={(e) => { e.stopPropagation(); handleNavigation(); }}
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
        </>
    );
};

export default BookmarkCard;