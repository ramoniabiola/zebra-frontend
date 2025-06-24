  import { useState } from "react";
  import { ChevronRightIcon, ChevronLeftIcon, HeartIcon, ShareIcon } from "@heroicons/react/24/outline";
  import { Bed, Bath, Wifi, Car, Square, AlertTriangle, Phone, ArrowLeft, MapPin, Zap, Shield, Waves, Coffee, Home, User } from "lucide-react";
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

    // Amenity icons mapping
    const amenityIcons = {
      'WiFi': Wifi,
      'Parking': Car,
      'Power': Zap,
      'Security': Shield,
      'Swimming Pool': Waves,
      'Kitchen': Coffee,
      'Air Conditioning': Zap,
      'Gym': Home,
      'Elevator': Home,
      'Garden': Home,
      'Balcony': Home,
      'Furnished': Home
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

    const formatPrice = (price) => {
      return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0
      }).format(price);
    };




    return (
      <div className="h-full w-full overflow-hidden flex flex-col items-start justify-items-start">
        {/* NAVBAR */}
        <div className="w-full h-20 flex items-center justify-start pl-2 gap-2 bg-white shadow">
          <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full focus:invisible">
            <ArrowLeft className="w-6 h-6 text-gray-700 cursor-pointer" />
          </button>
          <div className=''>
            <h1 className="text-xl font-bold text-gray-900 mb-0.5">Apartment Details</h1>
            <p className="text-sm text-gray-500">Information about the apartment</p>
          </div>
        </div>

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
              className={`p-2 rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-700 hover:scale-110 transition-all duration-200 cursor-pointer`}
            >
              <HeartIcon className="w-6 h-6 transition-all duration-200 text-gray-600 hover:text-rose-500"  />
            </button>
            <button className="p-2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full text-gray-700 hover:scale-110 transition-all duration-200 cursor-pointer">
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

          <div className="flex justify-start items-start mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg">
                  {apartmentData.apartment_type}
                </span>
                {apartmentData.furnished && (
                  <span className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg">
                    Furnished
                  </span>
                )}
              </div>
              <h1 className="text-[28px] font-semibold text-gray-900 mb-4 leading-tight">{apartmentData.title}</h1>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <MapPin className="w-5 h-5 text-cyan-500" />
                <span className="font-medium">{apartmentData.location}</span>
              </div>
              <p className="text-gray-600 mb-2">{apartmentData.apartment_address}</p>
              {apartmentData.nearest_landmark && (
                <p className="text-sm text-gray-500">📍 Near {apartmentData.nearest_landmark}</p>
              )}
            </div>
          </div>
          
          {/* Property Stats */}
          <div className="grid grid-cols-3 gap-1.5 mb-4 mr-7">
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-4 rounded-2xl text-center border border-cyan-100">
              <Bed className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800 mb-1">{apartmentData.bedrooms}</div>
              <div className="text-sm text-gray-600">Bedroom{apartmentData.bedrooms > 1 ? 's' : ''}</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-4 rounded-2xl text-center border border-emerald-100">
              <Bath className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800 mb-1">{apartmentData.bathrooms}</div>
              <div className="text-sm text-gray-600">Bathroom{apartmentData.bathrooms > 1 ? 's' : ''}</div>
            </div>
            {apartmentData.apartment_size && (
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-2xl text-center border border-purple-100">
                <Square className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-xl font-bold text-gray-800 mb-1">{apartmentData.apartment_size}</div>
                <div className="text-sm text-gray-600">sq ft</div>
              </div>
            )}
          </div> 

          <div className="flex justify-start items-start mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Rental Price</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  {formatPrice(apartmentData.price)}
                </span>
                <span className="text-gray-600 font-medium">/ {apartmentData.payment_frequency}</span>
              </div>
              <p className="text-gray-600 mt-4">{apartmentData.duration}</p>
              {apartmentData.service_charge && (
                <div className='flex items-center justify-start bg-gradient-to-r from-yellow-50 to-amber-50 p-3 mt-4 gap-2 rounded-xl border border-yellow-100'>
                  <p className='text-base text-yellow-800'>Service Charge:</p>
                  <p className="text-xl text-yellow-900 font-bold tracking-wide">
                    {formatPrice(apartmentData.service_charge)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Amenities Grid */}
          {apartmentData.apartment_amenities && apartmentData.apartment_amenities.length > 0 && (
            <div>
              <h3 className="text-xl   font-bold text-center text-gray-800 mb-6 mr-8">Amenities & Features</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mr-7">
                {apartmentData.apartment_amenities.map((amenity, idx) => {
                  const IconComponent = amenityIcons[amenity] || Home;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-3 py-4 px-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200 hover:shadow-md transition-all duration-200"
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                  
                      {/* Amenity name: Wrap or truncate if too long */}
                      <span className="text-gray-700 text-sm font-medium break-words line-clamp-2">
                        {amenity}
                      </span>
                    </div>
                  );
                })}
              </div>  
            </div>
          )}

          {/* Contact Information */}
          <div className="border-b pb-8 border-gray-100 mt-8">
              <h3 className="text-xl font-bold text-gray-800 text-center mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 py-4 pl-4 pr-24 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl border border-cyan-100">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{apartmentData.contact_name}</p>
                  <p className="text-sm text-gray-600">Property Contact</p>
                </div>
              </div>
              <div className="flex items-center gap-4 py-4 pl-4 pr-24 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl border border-emerald-100">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{apartmentData.contact_phone}</p>
                  <p className="text-sm text-gray-600">Phone Number</p>
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