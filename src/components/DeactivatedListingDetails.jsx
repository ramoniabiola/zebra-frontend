import { Calendar, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatCustomTimeAgo } from "../utils/time-format/TimeFormat";
import ApartmentImagesPlaceholder from "../utils/placeholders/ApartmentImagesPlaceholder";
import DotNavigation from "../utils/pop-display/DotNavigation";


const DeactivatedListingDetails = ({ apartment }) => {
  const [currentImg, setCurrentImg] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const totalImages = apartment?.uploadedImages?.length || 0;
  const navigate = useNavigate();
  
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
  ? formatCustomTimeAgo(new Date(apartment.createdAt), { addSuffix: true })
  : "some time ago";



  const handleNext = () => {
    setCurrentImg((prev) => prev + 1);
      if (currentImg < totalImages - 1) {
    }
  };

  const handlePrev = () => {
    if (currentImg > 0) {
      setCurrentImg((prev) => prev - 1);
    }
  };

  return (
    <>
      {/* ── CARD ── */}
      <div
        className="w-full md:w-11/12 lg:w-11/12 flex flex-col bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer mb-4 mt-11 group"
      >
        {/* ── IMAGE BLOCK ── */}
        <div className="p-2 pt-1 pb-0">
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
              <button
                onClick={handlePrev}
                className="absolute top-1/2 left-3 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition cursor-pointer z-10"
              >
                <ChevronLeft strokeWidth={3} className="w-4 h-4 text-gray-600" />
              </button>
            )}
            {isHovered && currentImg < totalImages - 1 && (
              <button
                onClick={handleNext}
                className="absolute top-1/2 right-3 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition cursor-pointer z-10"
              >
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

            {/* Apartment type badge — bottom left overlay */}
            <div className="absolute bottom-4 left-3 z-10">
              <span className="text-xs font-bold text-white bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full tracking-widest capitalize">
                {apartment.apartment_type}
              </span>
            </div>
          </div>
        </div>

        {/* ── INFO BLOCK ── */}
        <div
          onClick={() => navigate(`/deactivated-listing/${apartment._id}`)}
          className="flex flex-col gap-2 p-4"
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

          {/* Time */}
          <div className="flex items-center justify-end gap-1.5 text-gray-400">
            <Calendar className="w-3 h-3" />
            <span className="text-xs font-medium">{timeAgo}</span>
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
              onClick={(e) => { e.stopPropagation(); navigate(`/deactivated-listing/${apartment._id}`); }}
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
  ) 
}

export default DeactivatedListingDetails;