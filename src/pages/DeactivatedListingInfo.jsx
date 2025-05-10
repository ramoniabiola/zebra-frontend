import React, { useState } from 'react'
import Footerbar from '../components/Footerbar';
import Footer from '../components/Footer';
import { apartmentInfoData } from "../utils/Data";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

const DeactivatedListingInfo = () => {
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
    <div className="w-full h-full flex flex-col items-start justify-center min-h-screen">
      {/* Section: Header */}
      <div className="w-full h-20 flex items-center justify-start pl-2 gap-2 bg-white">
        <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full focus:invisible">
          <ArrowLeftIcon className="w-6 h-6 text-gray-700 cursor-pointer" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Apartment Details</h1>
      </div>

      {/* Section: Apartment Details */}
      <div className='w-full h-full flex flex-col items-start justify-center mb-8'>
        {/* Images */}
        <div className='w-full flex flex-col items-start justify-center'>
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
        </div>
        

        {/* Other Details */}
        <div className='w-full mx-auto p-4 bg-white'>
          {/* === Apartment info === */}
          <div className="mt-2">
            <h2 className="text-xl text-center font-bold text-gray-800 mb-4">Apartment Info</h2>
            <div className="space-y-8">
              {['title', 'apartment_type', 'location', 'apartment_address', 'nearest_landmark', 'bedrooms', 'bathrooms', 'apartment_size'].map((name) => (
                <div key={name}>
                  <label className="block font-semibold text-lg capitalize text-slate-400">{name}:</label>
                    <p className="mt-1 w-full bg-slate-100 text-slate-700 text-lg font-medium p-3 rounded-md">
                      {apartment[name]}
                    </p>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing & Duration */}
          <div className="mt-12">
            <h2 className="text-xl text-center font-bold text-gray-800 mb-4">Pricing & Duration</h2>
            <div className="space-y-8 ">
              {['price', 'payment_frequency', 'duration', 'service_charge'].map((name) => (
                <div key={name}>
                  <label className="block font-semibold text-lg capitalize text-slate-400">{name}:</label>
                    <p className="mt-1 w-full bg-gray-100 text-slate-700 text-lg font-medium p-3 rounded-md">
                      {apartment[name]}
                    </p>
                </div>
              ))}
            </div>
          </div>   


          {/* Contact & Amenities */}
          <div className='mt-12'>
            <h2 className="text-xl text-center font-bold text-gray-800 mb-4">Contact & Amenities</h2>
            <div className="space-y-8">
                <div>
                    <label className="block font-semibold text-lg capitalize text-slate-400">Contact Phone:</label>
                    <p className="mt-1 w-full bg-gray-100 text-slate-700 text-lg font-medium p-3 rounded-md">{apartment.contact_phone}</p>
                </div>
                <div>
                    <label className="block font-semibold text-lg capitalize text-slate-400">Furnished:</label>
                    <p className="mt-1 w-full bg-gray-100 text-slate-700 text-lg font-medium p-3 rounded-md">{apartment.furnished ? 'Yes' : 'No'}</p>
                </div>
                <div className="md:col-span-2">
                    <label className="block font-semibold text-lg capitalize text-slate-400">Amenities:</label>
                    <p className="mt-1 w-full bg-gray-100 text-slate-700 text-lg font-medium p-3 rounded-md">{apartment.apartment_amenities}</p>
                </div>
            </div>
          </div>
        </div>


        {/* Action */}
        <div className="w-full h-full flex justify-center items-center mt-8">
            <div className="w-11/12 flex items-center justify-between cursor-pointer">
                <button
                    className="px-4 py-2 bg-linear-55 from-cyan-700 to-cyan-400 text-white text-[19px] font-semibold rounded-xl border-4 border-double tracking-wider cursor-pointer focus:invisible"
                >
                    Reactivate
                </button> 
                <button
                    // onClick={onDeactivate}
                    className="text-rose-800 bg-rose-100 border-rose-500 px-4 py-1.5 text-[18px] rounded-xl border-4 border-double font-semibold tracking-wider focus:invisible"
                    disabled
                >
                    Deactivated
                </button>
            </div>
        </div>  
      </div>
      <Footerbar />
      <Footer />
    </div>
  );
}

export default DeactivatedListingInfo;