import { useState } from "react";
import { ArrowLeftIcon, ChevronRightIcon, ChevronLeftIcon, BookmarkIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { CheckBadgeIcon }from "@heroicons/react/24/solid";
import { apartmentInfoData } from "../utils/Data";
import Footer from "../components/Footer";



const ApartmentInfo = () => {
  const apartment = apartmentInfoData[0]; // Static for now
  const [currentImg, setCurrentImg] = useState(0);
  const totalImages = apartment?.images?.length || 0;
  const [isHovered, setIsHovered] = useState(false);

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
    <div className="h-full w-full flex flex-col items-start justify-items-start">
      {/* NAVBAR */}
      <nav className="w-full h-20 flex items-center justify-between bg-white pl-4 pr-4">
        <div className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors duration-200 cursor-pointer">
          <ArrowLeftIcon className="w-6 h-6" />
        </div>
        <div className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors duration-200 cursor-pointer">
          <BookmarkIcon className="w-6 h-6" />
        </div>
      </nav> 

      {/* IMAGES DISPLAY */}
      <div 
        className="relative w-full h-[280px] overflow-hidden mb-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image slider */}
        <div
          className="w-full h-full flex transition-transform duration-500 ease-in-out"
          style={{
              transform: `translateX(${currentImg * - 100}%)`,
          }}
        >
          {apartment.images.map((image, index) => (
            <img
              key={index}
              src={image.img}
              alt={`apartment-${index}`}
              className="w-full h-full object-cover"
            />
          ))}
        </div> 
        {isHovered && currentImg > 0 && (
          <button onClick={handlePrev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white opacity-90 p-2 rounded-full shadow cursor-pointer">
            <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
          </button>
        )}
        {isHovered && currentImg < totalImages - 1 && (
          <button onClick={handleNext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white opacity-90 p-2 rounded-full shadow cursor-pointer">
            <ChevronRightIcon className="w-6 h-6 text-gray-600" />
          </button>
        )}
        {/* Image Count */}
        <div className="absolute bottom-4 right-4 bg-black/50 text-white text-sm font-bold px-3 py-[4px] rounded">
          {currentImg + 1} / {totalImages}
        </div>
      </div>

      {/* APARTMENT INFORMATION */}
      <div className="bg-white w-full h-full flex flex-col items-start justify-center ml-4 gap-4 mb-8">
        {/* Verified Badge(if premium is subscribed)*/}
        {apartment.verified_listing && (
          <div className="flex items-center justify-center px-2 py-1 bg-cyan-500 gap-1 rounded-lg">
            <CheckBadgeIcon className="w-5 h-5 text-white" />
              <h3 className="text-sm font-mono text-white">Verified</h3>
          </div>
        )} 
        {/* Title & Price */}
        <div className="mb-1">
          <h1 className="text-2xl font-semibold">{apartment.title}</h1>
          <p className="text-gray-600">{apartment.apartment_type} • {apartment.location}</p>
        </div>
        <div className="text-xl font-bold text-gray-700 mb-4">
          ₦{apartment.price.toLocaleString()} / {apartment.payment_frequency}
        </div>
        {/* Address */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-600">Address:</h2>
          <p className="text-lg text-gray-700 font-normal">{apartment.apartment_address}</p>
          {apartment.nearest_landmark && (
              <p className="text-lg text-gray-500">Near {apartment.nearest_landmark}</p>
          )}
        </div>
        {/* Features */}
        <div className="grid grid-cols-2 text-gray-700 gap-4 text-lg font-medium mb-4">
          <div><strong>Bedrooms:</strong> {apartment.bedrooms}</div>
          <div><strong>Bathrooms:</strong> {apartment.bathrooms}</div>
          <div><strong>Size:</strong> {apartment.apartmen_size}</div>
          <div><strong>Furnished:</strong> {apartment.furnished ? "Yes" : "No"}</div>
          <div><strong>Service Charge:</strong> ₦{apartment.service_charge.toLocaleString()}</div>
          <div><strong>Duration:</strong> {apartment.duration}</div>
        </div>
        
        {/* Amenities */}
        {apartment.apartment_amenities && (
          <div className="mb-6">
            <h2 className="text-xl font-medium text-gray-600 mb-1">Amenities:</h2>
            <p className="text-lg text-gray-700">{apartment.apartment_amenities}</p>
          </div>
        )}
        {/* Contact Info */}
        <div className="">
          <h2 className="text-xl text-gray-700 font-semibold mb-1">Contact Landlord/Agent:</h2>
          <p className="text-xl font-semibold text-gray-800 tracking-widest">{apartment.contact_phone}</p>
        </div>
        {/* Action Buttons */}
        <div className="w-full m-auto flex items-center justify-start mt-8 mb-2">
          <button className="flex items-center justify-center bg-gray-200 text-gray-800 px-24 py-3 gap-2 text-xl font-semibold rounded-lg cursor-pointer hover:bg-gray-300">
            <ExclamationTriangleIcon className="w-6 h-6" />
            Report Listing
          </button>
        </div>
      </div> 
      <Footer />
    </div>  
  )
};

export default ApartmentInfo;