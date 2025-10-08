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
    <div className='w-11/12 h-auto flex flex-col items-center justify-start bg-white relative mt-8 mb-16 cursor-pointer'>  
      <div 
        className="w-full h-[300px] relative overflow-hidden rounded-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Slider */}
        {apartment?.uploadedImages.length === 0 ? (
          <ApartmentImagesPlaceholder />
        ) : (
          <div 
            className="h-full w-full flex transition-transform duration-600 ease-[cubic-bezier(0.4, 0, 0.2, 1)]"
            style={{ transform: `translateX(-${currentImg * 100}%)` }}
          >
            {apartment?.uploadedImages.map((image, index) => {
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
            apartment={apartment}
            totalImages={totalImages}
            currentImg={currentImg}
            setCurrentImg={setCurrentImg}
          />
        )}
      </div>

      {/* Apartment Info */}
      <div onClick={() => navigate(`/deactivated-listing/${apartment._id}`)} className="w-full mt-4 flex flex-col gap-2 text-left">
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-lg font-semibold text-slate-900 leading-tight group-hover:text-slate-900 transition-colors">
            {apartment.title}
          </h1>
        </div>
                
        <div className="flex items-center gap-1.5 text-slate-600">
          <MapPin className="w-4 h-4 text-slate-700" />
          <h4 className="text-sm font-medium">{apartment.location}</h4>
        </div>
                
        <p className="text-sm text-slate-500 leading-relaxed tracking-widest">{apartment.apartment_type}</p>
        <div className="flex items-center justify-between mt-2 pt-4 px-1.5 border-t border-gray-100">
          <h3 className="text-xl font-bold text-slate-900">
            {formatPrice(apartment.price)}
            <span className="text-sm font-normal text-slate-500 ml-1">{apartment.payment_frequency}</span>
          </h3>
                   
          <div className="flex items-center gap-1.5 text-gray-400">
            <Calendar className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">{timeAgo}</span>
          </div>
        </div>
      </div>
    </div>
  ) 
}

export default DeactivatedListingDetails;