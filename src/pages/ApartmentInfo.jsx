import { useState } from "react";
import { ArrowLeftIcon, ChevronRightIcon, ChevronLeftIcon, HeartIcon, ShareIcon } from "@heroicons/react/24/outline";
import { Bed, Bath, Square, Sofa, Clock, DollarSign, AlertTriangle, Phone, Calendar } from "lucide-react";
import { CheckBadgeIcon }from "@heroicons/react/24/solid";
import { apartmentInfoData } from "../utils/Data";
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom';
import Footerbar from "../components/Footerbar";



const ApartmentInfo = () => {
  const apartmentData = apartmentInfoData[0]; // Static for now
  const [currentImg, setCurrentImg] = useState(0);
  const totalImages = apartmentData?.images?.length || 0;
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  

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
    <div className="h-full w-full overflow-hidden flex flex-col items-start justify-items-start">
      {/* NAVBAR */}
      <nav className="w-full h-18 flex items-center justify-between bg-white pl-4 pr-4">
        <div 
          className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors duration-200 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftIcon className="w-6 h-6" />
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
          {apartmentData.images.map((image, index) => (
            <img
              key={index}
              src={image.img}
              alt={`apartment-${index}`}
              className="w-full h-full object-cover"
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        {isHovered && currentImg > 0 && (
          <button onClick={handlePrev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white opacity-70 p-2 rounded-full shadow cursor-pointer">
            <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
          </button>
        )}
        {isHovered && currentImg < totalImages - 1 && (
          <button onClick={handleNext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white opacity-70 p-2 rounded-full shadow cursor-pointer">
            <ChevronRightIcon className="w-6 h-6 text-gray-600" />
          </button>
        )}

        {/* Image Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5">
            {apartmentData.images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImg 
                    ? 'bg-white scale-110' 
                    : 'bg-white opacity-50'
                }`}
              />
            ))}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-2 flex space-x-3">
          <button 
            className={`p-2 rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-700 cursor-pointer`}
          >
            <HeartIcon className="w-6 h-6 text-gray-600"  />
          </button>
          <button className="p-2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full text-gray-700 cursor-pointer">
            <ShareIcon className="w-6 h-6 text-gray-600"  />
          </button>
        </div>
      </div>

      {/* APARTMENT INFORMATION */}
      <div className="bg-white w-full h-full flex flex-col items-start justify-center ml-4 gap-4 mb-8">
        {/* Verified Badge(if premium is subscribed)*/}
        {/* {apartment.verified_listing && (
          <div className="flex items-center justify-center px-2 py-1 bg-teal-500 gap-1 rounded-lg">
            <CheckBadgeIcon className="w-5 h-5 text-white" />
              <h3 className="text-sm font-mono text-white">Verified</h3>
          </div>
        )}  */}
        
        {/* Title & Price */}
        <div className="mb-1">
          <h1 className="text-2xl font-semibold text-gray-900">{apartmentData.title}</h1>
          <p className="text-gray-600">{apartmentData.apartment_type} • {apartmentData.location}</p>
        </div>
        <div className="text-xl font-extrabold text-cyan-600 mb-4">
          ₦{apartmentData.price.toLocaleString()} / {apartmentData.payment_frequency}
        </div>

        {/* Address */}
        <div className="mb-8 space-y-1">
          <h2 className="text-xl font-semibold text-slate-500">Address:</h2>
          <p className="text-base text-gray-700 font-normal">{apartmentData.apartment_address}</p>
          {apartmentData.nearest_landmark && (
            <p className="text-base text-gray-600">Near {apartmentData.nearest_landmark}</p>
          )}
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-3 gap-8 py-6 px-2 bg-gray-50 rounded-xl mb-8 mr-6">
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Bed size={24} strokeWidth={2} className="text-cyan-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{apartmentData.bedrooms}</div>
            <div className="text-gray-600">Bedrooms</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Bath size={24} strokeWidth={2} className="text-cyan-600" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{apartmentData.bathrooms}</div>
            <div className="text-gray-600">Bathrooms</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Square size={24} strokeWidth={2} className="text-cyan-600" />
            </div>
            <div className="text-xl font-bold text-gray-800">{apartmentData.apartment_size}</div>
            <div className="text-gray-600">Size</div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="grid grid-cols-1 gap-4 py-6 pl-2 pr-12 bg-blue-50 rounded-xl mb-8 mr-6">
          <div className="flex items-center gap-4">
            <span className="text-gray-600 text-base flex items-center gap-2">
              <Sofa size={18} className="text-cyan-600" />
              Furnished:
            </span>
            <span className="font-bold text-gray-800 text-lg">{apartmentData.furnished ? "Yes" : "No"}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-600 text-base flex items-center gap-2">
              <Clock size={18} className="text-cyan-600" />
              Duration:
            </span>
            <span className="font-bold text-gray-800 text-lg">{apartmentData.duration}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-600 text-base flex items-center gap-2">
              <DollarSign size={18} className="text-cyan-600" />
              Service Charge:
            </span>
            <span className="font-bold text-gray-800 text-lg">₦{apartmentData.service_charge.toLocaleString()}</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-8">
          <h2 className="text-2xl text-center font-bold text-gray-800 mb-4">Amenities</h2>
          <div className="grid grid-cols-1 gap-4 mr-2">
            {apartmentData.apartment_amenities.map((amenity, index) => (
              <div key={index} className="flex items-center py-3 pl-4 pr-16 bg-gradient-to-r from-gray-50 to-cyan-50 border border-cyan-200 rounded-lg">
                <span className="text-cyan-800 text-base font-bold">{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Landlord Info */}
        <div className="pt-4 mb-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Contact Information</h2>
          <div className="pr-28 pl-4 py-6 bg-gradient-to-r from-cyan-50  to-blue-50 rounded-xl">
            <div className="flex flex-col items-start justify-start space-y-8 ">
              <div className="">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{apartmentData.contact_name}</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-700">
                    <Phone size={18} className="mr-4 text-cyan-800" />
                    <span className="font-semibold text-xl tracking-widest">{apartmentData.contact_phone}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-4 ">
                <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg transition-colors cursor-pointer">
                  <Phone size={16} className="inline mr-2" />
                  Call Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Report Button */}
        <div className="pt-6">
          <button className="w-full flex items-center justify-center gap-3 bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-3 px-18 rounded-lg transition-all duration-300 border border-red-200 hover:border-red-300 cursor-pointer">
            <AlertTriangle className="w-5 h-5" />
            Report This Listing
          </button>
        </div>
      </div> 
      <Footerbar /> 
      <Footer />
    </div>  
  )
};

export default ApartmentInfo;