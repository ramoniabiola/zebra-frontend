import { useEffect, useState } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { Bed, Bath, Wifi, Car, Square, AlertTriangle, Phone, ArrowLeft, MapPin, Zap, Shield, Waves, Coffee, Home, User, AlertCircle, X, Copy, Check, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import Footer from "../components/Footer";
import { useNavigate, useParams } from 'react-router-dom';
import Footerbar from "../components/Footerbar";
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
      <div className="h-full w-full overflow-hidden flex flex-col items-start justify-items-center">
        {errorMessage ? 
        (
          <ErrorDisplay />
        ) : isLoading ? 
        (
          <ApartmentInfoSkeleton />
        ) : (
          <>
            {/* NAVBAR */}
            <div className="w-full h-18 flex items-center justify-start pl-2 gap-2 bg-white shadow">
              <button 
                onClick={() => window.history.back()} 
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full focus:outline-none"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700 cursor-pointer" />
              </button>
              <div className=''>
                <h1 className="text-xl font-bold text-gray-900">Apartment Details</h1>
                <p className="text-sm text-gray-500">Informations about the apartment</p>
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
                          <HeartSolid className="w-12 h-12 text-rose-500 absolute top-4 right-3  hover:scale-110 transition-all duration-200 z-10 cursor-pointer" /> 
                          <HeartOutline className="w-12 h-12 text-gray-50 absolute top-4 right-3  hover:scale-110 transition-all duration-200 z-10 cursor-pointer" />
                        </> 
                      ) : (
                        <>   
                          <HeartSolid className="w-12 h-12 text-black/50 absolute top-4 right-3  hover:scale-110 transition-all duration-200 z-10 cursor-pointer" /> 
                          <HeartOutline className="w-12 h-12 text-gray-50 absolute top-4 right-3  hover:scale-110 transition-all duration-200 z-10 cursor-pointer" />
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
            <div className="bg-white max-w-6xl mx-auto px-2 sm:px-4">

              {/* Add to bookmark error notification  */}
              {error && (
                <ErrorAlert 
                  onClose={() => setError(null)} 
                />
              )}

              {/* Title and Location Card */}
              <div className="bg-gradient-to-br from-gray-50 to-white p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-2xl shadow-md border border-gray-100">
                <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
                  <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold shadow-md">
                    {apartment.apartment_type}
                  </span>
                  {apartment.furnished && (
                    <span className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold shadow-md">
                      Furnished
                    </span>
                  )}
                </div>
                
                <h1 className="text-[26px] sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-3 sm:mb-4 leading-tight">
                  {apartment.title}
                </h1>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500" />
                    <span className="font-medium text-base sm:text-base">{apartment.location}</span>
                  </div>
                  <p className="text-gray-600 text-base">{apartment.apartment_address}</p>
                  {apartment.nearest_landmark && (
                    <p className="text-sm  text-gray-500">📍 Near {apartment.nearest_landmark}</p>
                  )}
                </div>
              </div>


              {/* Property Stats */}
              <div className="min-w-full grid grid-cols-3 gap-2 mt-6 mb-4">
                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-4 rounded-2xl text-center border border-cyan-100 shadow-md hover:shadow-lg transition-shadow">
                  <Bed className="w-7 h-7 text-cyan-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800 mb-1">{apartment.bedrooms}</div>
                  <div className="text-sm text-gray-600">Bedroom{apartment.bedrooms > 1 ? 's' : ''}</div>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-4 rounded-2xl text-center border border-emerald-100 shadow-md hover:shadow-lg transition-shadow">
                  <Bath className="w-7 h-7 text-emerald-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800 mb-1">{apartment.bathrooms}</div>
                  <div className="text-sm text-gray-600">Bathroom{apartment.bathrooms > 1 ? 's' : ''}</div>
                </div>
                {apartment.apartment_size && (
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-2xl text-center border border-purple-100 shadow-md hover:shadow-lg transition-shadow">
                    <Square className="w-7 h-7 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-800 mb-1">{apartment.apartment_size}</div>
                    <div className="text-sm text-gray-600">sq ft</div>
                  </div>
                )}
              </div> 


              {/* Rental Price */}
              <div className="p-4 mt-6 rounded-xl sm:rounded-2xl shadow-md border border-gray-100">
                <h3 className="text-lg  font-semibold text-gray-800 mb-3">Rental Price</h3>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                    {formatPrice(apartment.price)}
                  </span>
                  <span className="text-gray-600 font-medium">/ {apartment.payment_frequency}</span>
                </div>
                <p className="text-gray-600 mb-3">{apartment.duration}</p>
                {apartment.service_charge && (
                  <div className="flex items-center justify-between bg-orange-50 px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-orange-200">
                    <p className="text-sm  text-orange-800 font-medium">Service Charge:</p>
                    <p className="text-lg  text-orange-900 font-bold">
                      {formatPrice(apartment.service_charge)}
                    </p>
                  </div>
                )}
              </div>


              {/* Amenities Grid */}
              {apartment.apartment_amenities && apartment.apartment_amenities.length > 0 && (
                <div className="p-4 mt-6 rounded-xl sm:rounded-2xl shadow-md border border-gray-100">
                  <h3 className="text-lg text-center font-bold text-gray-800 mb-6">Amenities & Features</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {apartment.apartment_amenities.map((amenity, idx) => {
                      const IconComponent = amenityIcons[amenity] || Home;
                      return (
                        <div
                          key={idx}
                          className="flex items-center bg-gray-50 gap-2 py-3 px-3 rounded-xl border border-gray-100 shadow-sm"
                        >
                          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
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
              <div className="mt-6 mb-6 p-4 rounded-xl sm:rounded-2xl shadow-md border border-gray-100">
                <h3 className="text-lg text-center font-bold text-gray-800 mb-6 ">Contact Info</h3>

                {/* Show copy error if it exists */}
                {copyError && (
                  <CopyErrorAlert 
                    error={copyError}
                    onClose={() => SetCopyError(null)} 
                  />
                )}

                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  <div className="flex items-center gap-3 px-3 py-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border border-cyan-100">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-md">
                      <User className="w-5 h-5  text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-base">{apartment.contact_name}</p>
                      <p className="text-sm text-gray-600">Property Contact</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 px-3 py-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10  bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-md">
                        <Phone className="w-5 h-5  text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 text-base">{formatPhoneNumber(apartment.contact_phone)}</p>
                        <p className="text-sm text-gray-600">Phone Number</p>
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(formatPhoneNumber(apartment.contact_phone))}
                      className={`px-4 py-2 sm:py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98] ${
                        copied
                          ? 'bg-green-100 text-green-700 text-xs sm:text-sm hover:bg-green-200'
                          : 'bg-emerald-100 text-emerald-700 text-xs sm:text-sm hover:bg-emerald-200'
                      }`}
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span className="text-sm">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span className="text-sm">Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Report Button */}
                  <div className="pt-8">
                    <button 
                      onClick={() => navigate("/report")}
                      className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-sm text-red-600 font-semibold p-2.5 rounded-lg transition-all duration-300 border border-red-200 hover:border-red-300 active:scale-[0.98]"
                    >
                      <AlertTriangle className="w-4.5 h-4.5" />
                      Report this listing
                    </button>
                  </div>        
                </div>
              </div>

              
              <ToggleSuccess
                message={success} 
                animateOut={animateOut} 
              />  
            </div> 
          </>
        )}
        <Footerbar /> 
        <Footer />
      </div>  

      {/* Authentication Dialog */}
      {showAuthDialog && <AuthDialog />}
    </>
  )
};


export default ApartmentInfo;