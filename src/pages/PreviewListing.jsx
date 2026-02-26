import { useEffect, useState } from 'react';
import { ArrowLeft, Edit, MapPin, Phone, User, Home, CheckCircle, Bed, Bath, Square, Wifi, Car, Zap, Shield, Waves, Coffee, ChevronLeft, ChevronRight, Loader2, X, AlertCircle } from 'lucide-react';
import { useDispatch } from 'react-redux';
import {  useCreateNewListing } from "../hooks/myListings";
import { useNavigate } from 'react-router-dom';
import { formatPhoneNumber } from "../utils/contact-format/PhoneNumberFormat";

const PreviewListing = ({ formData, onBackToStep }) => {
  const [currentImg, setCurrentImg] = useState(0);
  const totalImages = formData?.uploadedImages?.length || 0;
  const [isHovered, setIsHovered] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const { createNewListing, success, setSuccess, isLoading, error } = useCreateNewListing()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  


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
  };

  
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


  const handleFinalSubmit = async () => {
    setShowConfirmModal(false); 
  
    setShowSubmitModal(true)
    
    await createNewListing(dispatch, formData)
  };



  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price);
  };


  useEffect(() => {
    if (success) {
      // After 4 seconds, close modal 
      const timer = setTimeout(() => {
        setShowSubmitModal(false);
        setSuccess(false);
        navigate('/dashboard');
      }, 4000);
    
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);
      



  const ConfirmModal = () => {
    if (!showConfirmModal) return null;
    return (
      <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Confirm Submission</h3>
            <p className="text-gray-600 text-sm">
              Are you sure you want to submit this listing? Once submitted, it will be reviewed before going live.
            </p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200 focus:invisible cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleFinalSubmit}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 focus:invisible cursor-pointer"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  };


  //  Submit Modal
  const SubmitModal = () => {
    if (!showSubmitModal) return null;
  
    return (
      <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative">
          {!isLoading && (
            <button
              onClick={() => setShowSubmitModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
  
          <div className="text-center">
            {isLoading && (
              <>
                <div className="w-14 h-14 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Loader2 className="w-7 h-7 text-sky-600 animate-spin" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  🚀 Making Your Vacant Home Shine Online!
                </h3>
                <p className="text-gray-600 text-base">
                  Please wait while we publish your vacant listing...
                </p>
              </>
            )}
  
            {success && (
              <>
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  🎉 Your Home is Now Live!
                </h3>
                <p className="text-gray-600 text-base">
                  Congratulations! Your listing is now visible to potential tenants. Get ready for inquiries!
                </p>
              </>
            )}
  
            {error && (
              <>
                <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-7 h-7 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Oops! Something Went Wrong
                </h3>
                <p className="text-gray-600 text-base mb-4">
                  Don't worry - these things happen! Let's give it another shot.
                  <br />
                  <span className="text-sm text-gray-500 mt-2 block">
                    Error:  <b className="text-gray-700">{error}</b>
                  </span>
                </p>
                <button
                  onClick={handleFinalSubmit}
                  className="px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg transition-colors duration-200 cursor-pointer"
                >
                  Try Again
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };
  

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-white pb-4">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 lg:top-18 left-0 z-40">
        <div className="w-full px-2 md:px-4 lg:px-4 py-4">
          <div className="flex items-center gap-1 md:gap-3 lg:gap-3">
            <button 
              onClick={() => onBackToStep(4)}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors duration-200 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl lg:text-[21px] font-bold text-gray-800">Preview Listing</h1>
              <p className="text-sm text-gray-500">Review your information before submitting</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-2 md:px-6 lg:px-8 py-4 lg:mt-20">
        {/* Main Preview Card */}
        <div className="w-full bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">

          {/* Images Section */}
          <div className="relative">
            <div 
              className="relative w-full h-[280px] md:h-[320px] lg:h-[360px] overflow-hidden"
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
                  {formData.uploadedImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`apartment-${index}`}
                      className="min-w-full flex-shrink-0 h-full object-cover"
                    />
                  ))}
                </div> 
              {isHovered && currentImg > 0 && (
                <button onClick={handlePrev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white opacity-70 p-2 rounded-full shadow cursor-pointer">
                  <ChevronLeft className="w-6 h-6 text-gray-600" />
                </button>
              )}
              {isHovered && currentImg < totalImages - 1 && (
                <button onClick={handleNext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white opacity-70 p-2 rounded-full shadow cursor-pointer">
                  <ChevronRight className="w-6 h-6 text-gray-600" />
                </button>
              )}
              {/* Image Count */}
              <div className="absolute bottom-4 right-4 bg-black/50 text-white text-sm font-bold px-3 py-[4px] rounded">
                {currentImg + 1} / {totalImages}
              </div>
            </div>
          </div>

          <div className="w-full px-2 md:px-4 lg:px-5 mb-8">
            <div className="w-full py-8 md:px-4 lg:px-5">
              {/* Title & Location Card */}
              <div className="bg-white px-4 py-5 lg:px-6 lg:py-6 rounded-2xl border border-stone-200 shadow-md mb-6">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-cyan-800 text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase shadow-md">
                      {formData.apartment_type}
                    </span>
                    {formData.furnished && (
                      <span className="bg-teal-500 text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase shadow-md">
                        Furnished
                      </span>
                    )}
                  </div>
                  
                  <button
                    onClick={() => onBackToStep?.(1)}
                    className="bg-stone-100 hover:bg-stone-200 px-3 py-1 rounded-xl flex items-center gap-1 text-sm font-medium text-gray-700 transition-all duration-200"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                </div>
                  
                <h1 className="text-2xl flex-wrap font-semibold text-gray-900 leading-tight mb-4 break-words">
                  {formData.title}
                </h1>
                  
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-cyan-800 rounded-xl flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-gray-900 text-base">
                      {formData.location}
                    </span>
                  </div>
                  
                  <p className="text-slate-500 text-sm pl-9">
                    {formData.apartment_address}
                  </p>
                  
                  {formData.nearest_landmark && (
                    <div className="flex items-center gap-2 pl-9">
                      <span className="text-yellow-400 text-sm">●</span>
                      <p className="text-sm text-slate-500">
                        Near <span className="text-gray-900 font-semibold">{formData.nearest_landmark}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
                
                
              {/* Property Stats */}
              <div className="grid grid-cols-3 gap-3 px-2 mb-6">
                <div className="bg-white rounded-2xl border border-stone-200 shadow-md p-4 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-cyan-800 rounded-xl flex items-center justify-center mb-3">
                    <Bed className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800">
                    {formData.bedrooms}
                  </div>
                  <div className="text-sm text-gray-500">
                    Bedroom{formData.bedrooms > 1 ? "s" : ""}
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl border border-stone-200 shadow-md p-4 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center mb-3">
                    <Bath className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800">
                    {formData.bathrooms}
                  </div>
                  <div className="text-sm text-gray-500">
                    Bathroom{formData.bathrooms > 1 ? "s" : ""}
                  </div>
                </div>
                
                {formData.apartment_size && (
                  <div className="bg-white rounded-2xl border border-stone-200 shadow-md p-4 flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-amber-500/70 rounded-xl flex items-center justify-center mb-3">
                      <Square className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-800">
                      {formData.apartment_size}
                    </div>
                    <div className="text-sm text-gray-500">sq ft</div>
                  </div>
                )}
              </div>
              
              
              {/* Rental Price Card */}
              <div className="bg-white rounded-2xl border border-stone-200 shadow-md overflow-hidden mb-6">
                <div className="bg-gradient-to-r from-cyan-800 to-cyan-700 py-3 md:py-4 px-5 flex items-center justify-between">
                  <span className="text-white/80 text-sm font-medium uppercase tracking-wider">
                    Rental Price
                  </span>
                  <Edit
                    onClick={() => onBackToStep?.(2)}
                    className="w-4 h-4 md:w-5 md:h-5 lg:w-5 lg:h-5 text-white/70 cursor-pointer"
                  />
                </div>
              
                <div className="px-5 py-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-gray-900">
                      {formatPrice(formData.price)}
                    </span>
                    <span className="text-slate-500 font-medium text-sm">
                      / {formData.payment_frequency}
                    </span>
                  </div>
              
                  <p className="text-sm text-slate-500 mb-4">
                    {formData.duration}
                  </p>
              
                  {formData.service_charge && (
                    <div className="flex items-center justify-between bg-orange-50 border border-orange-200 px-4 py-3 rounded-xl">
                      <span className="text-sm font-medium text-slate-700">
                        Service Charge
                      </span>
                      <span className="font-bold text-slate-900">
                        {formatPrice(formData.service_charge)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
                
                
              {/* Amenities */}
              {formData.apartment_amenities?.length > 0 && (
                <div className="bg-white rounded-2xl border border-stone-200 shadow-md overflow-hidden mb-6">
                  <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-950 text-lg">
                      Amenities & Features
                    </h3>
                    <span className="text-xs bg-stone-200 text-slate-600 px-2.5 py-1 rounded-full font-medium">
                      {formData.apartment_amenities.length} total
                    </span>
                  </div>
              
                  <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                    {formData.apartment_amenities.map((amenity, idx) => {
                      const Icon = amenityIcons[amenity] || Home;
                      return (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-4 rounded-xl bg-stone-100/60 border border-stone-200"
                        >
                          <div className="w-10 h-10 bg-gradient-to-br from-cyan-800 to-cyan-700 rounded-xl flex items-center justify-center">
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-sm text-slate-800 font-semibold">
                            {amenity}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            
              {/* Contact Info */}
              <div className="bg-white rounded-2xl border border-stone-200 shadow-md overflow-hidden">
                <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-950 text-lg">
                    Contact Information
                  </h3>
                  <Edit
                    onClick={() => onBackToStep?.(3)}
                    className="w-4 h-4 md:w-5 md:h-5 lg:w-5 lg:h-5 text-gray-500 cursor-pointer"
                  />
                </div>
            
                <div className="p-4 space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-stone-100/60 rounded-xl border border-stone-200">
                    <div className="w-12 h-12 bg-cyan-800 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-base text-slate-900 font-semibold">
                        {formData.contact_name}
                      </p>
                      <p className="text-sm text-slate-400">Property Contact</p>
                    </div>
                  </div>
            
                  <div className="flex items-center gap-4 p-4 bg-stone-100/60 rounded-xl border border-stone-200">
                    <div className="w-12 h-12 bg-teal-500/80 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-base text-slate-900 font-semibold">
                        {formatPhoneNumber(formData.contact_phone)}
                      </p>
                      <p className="text-sm text-slate-400">Phone Number</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Action Buttons */}
              <div className="border-t border-gray-100 pt-8 mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                <button
                  onClick={() => onBackToStep?.(4)}
                  className="w-full px-6 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-2xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2 focus:invisible cursor-pointer"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Edit
                </button>
                <button
                  onClick={() => setShowConfirmModal(true)}
                  className="w-full px-6 py-4 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-2xl shadow-lg transition-all duration-200 focus:invisible flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle className="w-5 h-5" />
                  Publish Listing
                </button>
              </div>
            </div> 
          </div>
        </div>
      </div>


      {/* Confirmation Modal */}
      <ConfirmModal />
      {/* Submit Modal */}
      <SubmitModal />
    </div>
  );
};

export default PreviewListing;