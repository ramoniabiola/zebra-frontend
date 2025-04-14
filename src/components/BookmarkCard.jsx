import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";

const BookmarkCard = ({ item }) => {
    const [currentImg, setCurrentImg] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const totalImages = item.images?.length || 0;

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


    return (
        <div className='w-11/12 h-auto flex flex-col items-center justify-start bg-white relative mb-16 cursor-pointer'>  
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
                          index === currentImg ? "bg-sky-500 scale-110" : "bg-gray-300"
                        }`}
                      ></div>
                    ))}
                  </div>
                )}
            </div>

            {/* Apartment Info */}
            <div className="w-full mt-4 flex flex-col gap-0.5 text-left">
                <h1 className="text-xl font-semibold text-slate-800">{item.title}</h1>
                <h3 className="text-lg text-slate-500 font-medium">₦{item.price.toLocaleString()} yearly</h3>
                <p className="text-md text-slate-400">{item.type}</p>
                <h4 className="text-md text-slate-600 font-medium">{item.location}</h4>
            </div>

            {/* Bookmark Icon  */}
            <div className="absolute bottom-0.5 right-4">
                <HeartIcon className="w-8 h-8 text-rose-500 cursor-pointer" />
            </div>
        </div>
    );      
};

export default BookmarkCard;