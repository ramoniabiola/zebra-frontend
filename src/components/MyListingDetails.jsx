import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Calendar, MapPin } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const MyListingDetails = ({ item }) => {
  const [currentImg, setCurrentImg] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const totalImages = item.images?.length || 0;
  const navigate = useNavigate()
  const { ListingId } = useParams();
  

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
    <div className='w-11/12 h-auto flex flex-col items-center justify-start bg-white mt-8 mb-16 relative cursor-pointer'>  
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
          {item.images.map((image, index) =>
            <img 
              key={index}
              src={image.img}
              alt={`apartment-${index}`}
              className="w-full h-full object-cover rounded-lg"
            />
          )}
        </div>
        {/* Left and right image slider navigatiom */}
        {isHovered && currentImg > 0 && (
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-white p-2 rounded-full opacity-90 shadow hover:bg-gray-100 transition cursor-pointer"
        >
          <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
        </button>
        )}
        {isHovered && currentImg < totalImages - 1 && (
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-white p-2 rounded-full opacity-90 shadow hover:bg-gray-100 transition cursor-pointer"
          >
            <ChevronRightIcon className="w-6 h-6 text-gray-700" />
          </button>
        )}

        {/* Dots Navigation */}
        {totalImages > 1 && (
          <div className="absolute bottom-3.5 left-1/2 transform -translate-x-1/2 flex gap-1.5">
            {item.images.map((_, index) => (
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
      </div>

      {/* Apartment Info */}
      <div onClick={() => navigate(`/listing/${ListingId}`)} className="w-full mt-4 flex flex-col gap-1 text-left">
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-xl   font-semibold text-slate-900 leading-tight group-hover:text-slate-900 transition-colors">
              {item.title}
          </h1>
        </div>
                
        <div className="flex items-center gap-1.5 text-slate-600">
          <MapPin className="w-4 h-4 text-slate-700" />
          <h4 className="text-sm font-medium">{item.location}</h4>
        </div>
                
        <p className="text-sm text-slate-500 leading-relaxed">{item.type}</p>
        <div className="flex items-center justify-between mt-2 pt-4 px-1.5 border-t border-gray-100">
          <h3 className="text-xl font-bold text-slate-900">
              ₦{item.price.toLocaleString()}
              <span className="text-sm font-normal text-slate-500 ml-1">yearly</span>
          </h3>
                   
          <div className="flex items-center gap-1.5 text-gray-400">
              <Calendar className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">5mins ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyListingDetails;