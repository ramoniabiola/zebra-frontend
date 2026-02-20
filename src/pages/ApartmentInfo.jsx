import { useEffect, useRef, useState } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { Bed, Bath, Wifi, Car, Square, AlertTriangle, Phone, ArrowLeft, MapPin, Zap, Shield, Waves, Coffee, Home, User, AlertCircle, X, Copy, Check, RotateCcw, ChevronLeft, ChevronRight, MoreVertical } from "lucide-react";
import { useNavigate, useParams } from 'react-router-dom';
import { fetchApartmentByIdApi } from "../api/apartments";
import ApartmentInfoSkeleton from "../utils/loading-display/ApartmentInfoSkeleton";
import { useSelector } from "react-redux";
import { useToggleBookmark } from "../hooks/bookmarks";
import ToggleSuccess from "../utils/pop-display/ToggleSuccess";
import DotNavigation from "../utils/pop-display/DotNavigation";
import { formatPhoneNumber } from "../utils/contact-format/PhoneNumberFormat";



const ApartmentInfo = () => {
  const { id: apartmentId } = useParams();
  const [currentImg, setCurrentImg] = useState(0);
  const [apartment, setApartment]  = useState({}) 
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, SetCopyError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const totalImages = apartment?.uploadedImages?.length || 0;
  const [isHovered, setIsHovered] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id
  const userRole = user?.role
  const { toggleBookmark, error, setError, success, animateOut } = useToggleBookmark();
  const bookmarked = useSelector((state) => state.bookmarks?.items?.bookmarks || []);

  const navigate = useNavigate();

  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [apartmentId]);


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
  


  const getApartment = async () => {
    setIsLoading(true);
    setErrorMessage(null)
    try{
      const response = await fetchApartmentByIdApi(apartmentId);
      if(response.status >= 200 && response.status < 300) {
        setApartment(response.data);
        setErrorMessage(null);
        setIsLoading(false);
      } else {
        // If the response status is not in the success range, handle the error
        throw new Error(response.data.error);
      }
    }catch(error){
      setIsLoading(false)
      console.log(error.response?.data?.error)
      setErrorMessage(error.response?.data?.error || "Failed to fetch apartment")
    }
  }


  useEffect(() => { 
    getApartment();
  }, [apartmentId]);

 
  const handleRetry = () => {
    getApartment();
  };


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  const isBookmarked = bookmarked.some(
    (b) => b?.apartmentId?._id === apartment._id
  );

  const handleToggleBookmark = async () => {
        
    // Check if user is authenticated
    if (!userId) {
      setShowAuthDialog(true);
      return;
    }

    await toggleBookmark(apartment._id, isBookmarked);
  }
   

  const handleDialogClose = () => {
    setShowAuthDialog(false);
  }


  const handleLoginNavigation = () => {
    setShowAuthDialog(false);
    navigate('/login');
  }

  const handleRegisterNavigation = () => {
    setShowAuthDialog(false);
    navigate('/register');
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


  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      SetCopyError(null); // Clear any previous errors

      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy contact number: ', err);
      SetCopyError('Failed to copy contact number!');

      // Auto-clear error after 4 seconds
      setTimeout(() => {
        SetCopyError(null);
      }, 4000);
    }
  };
   
  // Authentication Dialog Component
  const AuthDialog = () => (
    <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-11/12 mx-4 relative">
        {/* Close button */}
        <button
          onClick={handleDialogClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
        {/* Dialog content */}
        <div className="text-center">
          <div className="mb-4">
            <HeartSolid className="w-14 h-14 text-rose-500 mx-auto mb-3" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Save Your Favorite Apartments
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Log in to add this apartment to your wishlist and keep track of your favorite potential homes.
            </p>
          </div>
          {/* Action buttons */}
          <div className="flex flex-col gap-3 mt-6">
            <button
              onClick={handleLoginNavigation}
              className="w-full shadow-lg bg-cyan-600 text-white py-2 px-2 rounded-lg font-medium hover:bg-cyan-700 transition-colors cursor-pointer"
            >
              Log In
            </button>
            <button
              onClick={handleRegisterNavigation}
              className="w-full border shadow-lg border-gray-300 text-gray-700 py-1.5 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Create Account
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Don't have an account? Create one to start building your wishlist.
          </p>
        </div>
      </div>
    </div>
  );
  
  
  

  // Error Display
  const ErrorDisplay = () => (
    <div className="h-screen w-full flex flex-col items-center justify-center text-center py-8">
      <ExclamationTriangleIcon className="w-10 h-10 text-red-500 mx-auto mb-4" />
      <h3 className="text-base font-semibold text-gray-800 mb-1">
        Something went wrong
      </h3>
      <p className="text-gray-600 text-sm mb-4">
        {errorMessage || "Failed to fetch apartment"}
      </p>
      <button
        onClick={handleRetry}
        className="px-3 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-base tracking-wider font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-1.5  focus:invisible cursor-pointer"
      >
        <RotateCcw className="w-4 h-4" />
        Retry
      </button>
    </div>
  );

  // Bookmark Error Alert Component
  const ErrorAlert = ({ onClose }) => (
    <div className="p-2 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 animate-in slide-in-from-top-2 duration-300">
      <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-sm text-red-700 font-medium">{error}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="text-red-400 hover:text-red-600">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );

  // Contact Number copy Error Alert
  const CopyErrorAlert = ({ error, onClose }) => (
    <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 animate-in slide-in-from-top-2 duration-300">
      <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-sm text-red-700 font-medium">Copy Failed</p>
        <p className="text-sm text-red-600">{error}</p>
      </div>
      {onClose && (
        <button 
          onClick={onClose} 
          className="text-red-400 hover:text-red-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
      


  return (
    <>
      <div className="h-full w-full overflow-hidden flex flex-col items-start justify-items-center lg:mt-20">
        {errorMessage ? 
        (
          <ErrorDisplay />
        ) : isLoading ? 
        (
          <ApartmentInfoSkeleton />
        ) : (
          <>
            {/* NAVBAR */}
            <div className="w-full h-18 flex items-center justify-between px-1 md:px-2 lg:px-4 bg-white shadow">
              <div className="flex items-center gap-1 md:gap-3 lg:gap-3">
                <button 
                  onClick={() => window.history.back()} 
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full focus:outline-none"
                  >
                  <ArrowLeft className="w-5 h-5 text-gray-700 cursor-pointer" />
                </button>
                <div className='flex flex-col items-start'>
                  <h1 className="text-xl lg:text-[21px] font-bold text-gray-900">Apartment Details</h1>
                  <p className="text-sm text-gray-500">Informations about the apartment</p>
                </div>
              </div>

              {/* REPORT BUTTON */}
              <div className="relative" ref={dropdownRef}>
                <div 
                  className={`w-10 h-10 flex items-center text-gray-900 justify-center rounded-full hover:bg-neutral-100 transition-all duration-200 cursor-pointer ${isDropdownOpen ? 'bg-neutral-100 rotate-90' : ''}`}
                  onClick={toggleDropdown}
                >
                  <MoreVertical className="w-5 h-5" />
                </div>

                {/* Dropdown Menu */}
                <div className={`absolute right-0 top-12 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 ease-out transform origin-top-right z-50 ${
                  isDropdownOpen 
                  ? 'opacity-100 scale-100 translate-y-0' 
                  : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                }`}>
                  <div className="py-2 px-2">
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        navigate("/report");
                      }}
                      className="w-full px-2 py-2 text-left text-gray-700 hover:bg-neutral-50 rounded-xl transition-colors duration-200 flex items-center gap-3 group cursor-pointer"
                    >
                      <div className="w-6 h-6 flex items-center justify-center rounded-md bg-red-100 group-hover:bg-red-200  transition-colors duration-200">
                        <AlertTriangle className="w-3 h-3 text-red-600" />
                      </div>
                      <div>
                        <div className="font-medium text-sm  lg:text-base">Report Listing</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* IMAGES DISPLAY */}
            <div 
              className="relative w-full h-[280px] md:h-[320px] lg:h-[360px] overflow-hidden"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Image slider */}
              <div
                className="flex h-full transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(${currentImg * - 100}%)`,
                }}
              >
                {apartment?.uploadedImages?.map((image, index) => {
                  const optimizedUrl = image.includes("/upload/") 
                  ? image.replace("/upload/", "/upload/f_auto,q_auto/")
                  : image;
                  return(
                    <img
                    key={index}
                    src={optimizedUrl}
                    alt={`apartment-${index}`}
                    className="min-w-full flex-shrink-0 h-full object-cover"
                    />
                  )
                })}
              </div>

              {/* Navigation Arrows */}
              {isHovered && currentImg > 0 && (
                <button onClick={handlePrev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white opacity-70 p-2 rounded-full shadow cursor-pointer">
                   <ChevronLeft strokeWidth={3} className="w-6 h-6 text-gray-400" />
                </button>
              )}
              {isHovered && currentImg < totalImages - 1 && (
                <button onClick={handleNext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white opacity-70 p-2 rounded-full shadow cursor-pointer">
                  <ChevronRight strokeWidth={3} className="w-6 h-6 text-gray-400" />
                </button>
              )}

              {/* Image Indicators */}
              {totalImages > 1 && (
                <DotNavigation
                  apartment={apartment}
                  totalImages={totalImages}
                  currentImg={currentImg}
                  setCurrentImg={setCurrentImg}
                />
              )}

                               
              {/* Heart Icon */}
              {
                !userRole || userRole === "tenant"  ? (
                  <div 
                   onClick={handleToggleBookmark}
                  >
                    {
                      isBookmarked ? (  
                        <>   
                          <HeartSolid className="w-12 h-12 lg:w-13 lg:h-13 text-rose-500 absolute top-4 right-3  hover:scale-110 transition-all duration-200 z-10 cursor-pointer" /> 
                          <HeartOutline className="w-12 h-12 lg:w-13 lg:h-13 text-gray-50 absolute top-4 right-3  hover:scale-110 transition-all duration-200 z-10 cursor-pointer" />
                        </> 
                      ) : (
                        <>   
                          <HeartSolid className="w-12 h-12 lg:w-13 lg:h-13 text-black/50 absolute top-4 right-3  hover:scale-110 transition-all duration-200 z-10 cursor-pointer" /> 
                          <HeartOutline className="w-12 h-12 lg:w-13 lg:h-13 text-gray-50 absolute top-4 right-3  hover:scale-110 transition-all duration-200 z-10 cursor-pointer" />
                        </>
                      )
                    }   
                  </div>
                ) : (
                  <></>
                )
              }
            </div>


            {/* APARTMENT INFORMATION */}
            <div className="bg-gradient-to-br from-gray-50 to-white w-full px-2 md:px-24 lg:px-32 pt-2 md:pt-3 lg:pt-4">

              {/* Add to bookmark error notification  */}
              {error && (
                <ErrorAlert 
                  onClose={() => setError(null)} 
                />
              )}

              {/* Title and Location Card */}
              <div className="bg-white px-4 py-5 lg:px-6 lg:py-6 rounded-2xl border border-stone-200 shadow-md">
                <div className="flex flex-wrap items-center gap-2 mb-3 md:mb-4 lg:mb-5">
                  <span className="bg-sky-800 text-white px-4 py-1.5 rounded-full tracking-wide text-xs md:text-sm lg:text-sm font-semibold uppercase shadow-md">
                    {apartment.apartment_type}
                  </span>
                  {apartment.furnished && (
                    <span className="bg-teal-500 text-white px-4 py-1.5 rounded-full tracking-wide text-xs md:text-sm lg:text-sm font-semibold uppercase shadow-md">
                      Furnished
                    </span>
                  )}
                </div>
                
                <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-tight mb-4">
                  {apartment.title}
                </h1>

                <div className="space-y-2 md:space-y-4 lg:space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-sky-800 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-gray-900 text-base md:text-lg lg:text-lg tracking-wide">{apartment.location}</span>
                  </div>
                  <p className="text-slate-500 text-sm md:text-base lg:text-base pl-9 tracking-wide">{apartment.apartment_address}</p>
                  {apartment.nearest_landmark && (
                    <div className="flex items-center gap-2 pl-9">
                      <span className="text-yellow-400 text-sm md:text-base lg:text-base">●</span>
                      <p className="text-sm md:text-base lg:text-base text-slate-500">Near <span className="text-sm md:text-base lg:text-base text-gray-900 font-semibold tracking-wide">{apartment.nearest_landmark}</span></p>
                    </div>
                  )}
                </div>
              </div>


              {/* Property Stats */}
              <div className="min-w-full grid grid-cols-3 gap-3 md:gap-4 lg:gap-4 mt-4 md:mt-5 lg:mt-6 px-2 md:px-4 lg:px-6">
                <div className="bg-white rounded-2xl border border-stone-200 shadow-md p-4 md:p-5 flex flex-col items-center text-center group hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 md:w-12 md:h-12 lg:w-12 lg:h-12 bg-sky-800 rounded-xl flex items-center justify-center mb-2 md:mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Bed className="w-5 h-5 md:w-6 md:h-6 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-1 md:mb-2 lg:mb-3">{apartment.bedrooms}</div>
                  <div className="text-sm lg:text-base text-gray-600">Bedroom{apartment.bedrooms > 1 ? 's' : ''}</div>
                </div>
               
                <div className="bg-white rounded-2xl border border-stone-200 shadow-md p-4 md:p-5 flex flex-col items-center text-center group hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 md:w-12 md:h-12 lg:w-12 lg:h-12 bg-teal-500 rounded-xl flex items-center justify-center mb-2 md:mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Bath className="w-5 h-5 md:w-6 md:h-6 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-1 md:mb-2 lg:mb-3">{apartment.bathrooms}</div>
                  <div className="text-sm lg:text-base text-gray-600">Bathroom{apartment.bathrooms > 1 ? 's' : ''}</div>
                </div>

                {apartment.apartment_size && (
                  <div className="bg-white rounded-2xl border border-stone-200 shadow-md p-4 md:p-5 flex flex-col items-center text-center group hover:shadow-md transition-all duration-300">
                    <div className="w-10 h-10 md:w-12 md:h-12 lg:w-12 lg:h-12 bg-amber-500/70 rounded-xl flex items-center justify-center mb-2 md:mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Square className="w-5 h-5 md:w-6 md:h-6 lg:w-6 lg:h-6 text-white" />
                      </div>
                    <div className="text-2xl font-bold text-gray-800 mb-1 md:mb-2 lg:mb-3">{apartment.apartment_size}</div>
                    <div className="text-sm lg:text-base text-gray-600">sq ft</div>
                  </div>
                )}
              </div> 

              {/* Rental Price */}
              <div className="bg-white rounded-2xl border mt-4 md:mt-5 lg:mt-6 border-stone-200 shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-sky-800 to-sky-800/80 py-3 md:py-4 lg:py-4 px-5 md:px-6 lg:px-6 flex items-center justify-between">
                  <span className="text-white/80 text-sm md:text-base lg:text-base font-medium uppercase tracking-wider">Rental Price</span>
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5 lg:w-5 lg:h-5 text-white/60" />
                </div>

                <div className="px-5 py-4 md:px-6 md:py-5 lg:px-6 lg:py-8">
                  <div className="flex items-baseline gap-2 mb-2 md:mb-3 lg:mb-3">
                    <span className="text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900">
                      {formatPrice(apartment.price)}
                    </span>
                    <span className="text-slate-500 font-medium text-sm md:text-base lg:text-base">/ {apartment.payment_frequency}</span>
                  </div>
                  <p className="text-sm md:text-base lg:text-base text-slate-500 mb-4">{apartment.duration}</p>

                  {apartment.service_charge && (
                    <div className="flex items-center justify-between bg-orange-50 border border-orange-200 px-4 py-3 rounded-xl">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-orange-400" />
                        <span className="text-sm md:text-base lg:text-base font-medium text-slate-700">Service Charge</span>
                      </div>
                      <span className="font-bold text-base md:text-lg lg:text-lg text-slate-900">{formatPrice(apartment.service_charge)}</span>
                    </div>
                  )}
                </div>
              </div>


              {/* Amenities Grid */} 
              {apartment.apartment_amenities.length > 0 && (
                <div className="bg-white rounded-2xl border mt-4 md:mt-5 lg:mt-6 border-stone-200 shadow-md overflow-hidden">
                  <div className="px-5 py-4 md:py-5 lg:py-5 md:px-6 lg:px-6 border-b border-[#e4e4d4] flex items-center justify-between">
                    <h3 className="font-semibold text-gray-950 text-lg md:text-xl lg:text-xl">Amenities & Features</h3>
                    <span className="text-xs md:text-sm lg:text-sm bg-[#ecece1] text-slate-600/70 px-2.5 py-1 rounded-full font-medium">
                      {apartment.apartment_amenities.length} total
                    </span>
                  </div>

                  <div className="p-4 md:p-5 grid grid-cols-2 md:grid-cols-3 gap-2.5">
                    {apartment.apartment_amenities.map((amenity, idx) => {
                      const Icon = amenityIcons[amenity] || Home;
                      return (
                        <div
                          key={idx}
                          className="flex items-center gap-2.5 p-4 rounded-xl bg-[#ecece1]/40 border border-[#e4e4d4] hover:border-stone-300/30 hover:bg-[#ecece1]/60 transition-all duration-200 group"
                        >
                          <div className="w-10 h-10 bg-sky-800 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                            <Icon className="w-5 h-5 text-white/90"/>
                          </div>
                          <span className="text-sm md:text-base lg:text-base text-slate-800 font-semibold leading-tight">{amenity}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}



              {/* Contact Information */}
              <div className="bg-white rounded-2xl border mt-4 md:mt-5 lg:mt-6 mb-8 border-stone-200 shadow-md overflow-hidden">
                <div className="px-5 py-4 md:py-5 lg:py-5 md:px-6 lg:px-6 border-b border-[#e4e4d4] flex items-center justify-between">
                  <h3 className="font-semibold text-gray-950 text-lg md:text-xl lg:text-xl">Contact Information</h3>
                </div>

                <div className="p-4 md:p-5 lg:p-5 space-y-4">
                  {/* Agent card */}
                  <div className="flex items-center gap-4 p-4 bg-[#ecece1]/40 rounded-xl border border-[#e4e4d4]">
                    <div className="w-12 h-12 bg-sky-800/90 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-base md:text-lg lg:text-lg text-slate-900 font-semibold">{apartment.contact_name}</p>
                      <p className="text-sm md:text-base lg:text-base text-slate-400">Property Agent</p>
                    </div>
                  </div>

                  {/* Phone card */}
                  <div className="flex items-center gap-3 p-4 bg-[#ecece1]/40 rounded-xl border border-[#e4e4d4]">
                    <div className="w-12 h-12 bg-teal-500/80 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 text-base md:text-lg lg:text-lg">{formatPhoneNumber(apartment.contact_phone)}</p>
                      <p className="text-sm md:text-base lg:text-base text-slate-400">Phone Number</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(formatPhoneNumber(apartment.contact_phone))}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex-shrink-0 ${
                        copied
                          ? "bg-green-100 text-green-700 text-sm border border-green-200"
                          : "bg-[#ecece1] text-sm text-slate-800 border border-[#e4e4d4] hover:border-[#e4e4d4]/40 hover:bg-[#ecece1]/50 active:scale-95"
                      }`}
                    >
                      {copied ? (
                        <><Check className="w-4 h-4" /> Copied</>
                      ) : (
                        <><Copy className="w-4 h-4" /> Copy</>
                      )}
                    </button>
                  </div>

                  {/* Show copy error if it exists */}
                  {copyError && (
                    <CopyErrorAlert 
                      error={copyError}
                      onClose={() => SetCopyError(null)} 
                    />
                  )}
                </div>
              </div>

              
              <ToggleSuccess
                message={success} 
                animateOut={animateOut} 
              />  
            </div> 
          </>
        )}
      </div>  

      {/* Authentication Dialog */}
      {showAuthDialog && <AuthDialog />}
    </>
  )
};


export default ApartmentInfo;