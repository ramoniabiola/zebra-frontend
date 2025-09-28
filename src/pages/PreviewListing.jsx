import { useEffect, useState } from 'react';
import { ArrowLeft, Edit, MapPin, Phone, User, Home, CheckCircle, Bed, Bath, Square, Wifi, Car, Zap, Shield, Waves, Coffee, ChevronLeft, ChevronRight, Loader2, X, AlertCircle } from 'lucide-react';
import { useDispatch } from 'react-redux';
import {  useCreateNewListing } from "../hooks/myListings";
import { useNavigate } from 'react-router-dom';

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
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Confirm Submission</h3>
            <p className="text-gray-600">
              Are you sure you want to submit this listing? Once submitted, it will be reviewed before going live.
            </p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200 focus:invisible cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleFinalSubmit}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 focus:invisible cursor-pointer"
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
                <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Loader2 className="w-8 h-8 text-sky-600 animate-spin" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  🚀 Making Your Vacant Home Shine Online!
                </h3>
                <p className="text-gray-600">
                  Please wait while we publish your vacant listing...
                </p>
              </>
            )}
  
            {success && (
              <>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  🎉 Your Home is Now Live!
                </h3>
                <p className="text-gray-600">
                  Congratulations! Your listing is now visible to potential tenants. Get ready for inquiries!
                </p>
              </>
            )}
  
            {error && (
              <>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Oops! Something Went Wrong
                </h3>
                <p className="text-gray-600 mb-4">
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
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 fixed top-0 left-0 right-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-1">
            <button 
              onClick={() => onBackToStep(4)}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors duration-200 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Preview Listing</h1>
              <p className="text-sm text-gray-500">Review your information before submitting</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-1.5 py-4 mt-20">
        {/* Main Preview Card */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
  
          {/* Images Section */}
          <div className="relative">
            <div 
              className="relative w-full h-[280px] overflow-hidden"
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
          <div className="py-8 px-3">

            {/* Title and Basic Info */}
            <div className="mb-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg">
                      {formData.apartment_type}
                    </span>
                    {formData.furnished && (
                      <span className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg">
                        Furnished
                      </span>
                    )}
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">{formData.title}</h1>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <MapPin className="w-5 h-5 text-cyan-500" />
                    <span className="font-medium">{formData.location}</span>
                  </div>
                  <p className="text-gray-600 mb-2">{formData.apartment_address}</p>
                  {formData.nearest_landmark && (
                    <p className="text-sm text-gray-500">📍 Near {formData.nearest_landmark}</p>
                  )}
                </div>
                <button
                  onClick={() => onBackToStep?.(1)}
                  className="bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-xl flex items-center gap-1 text-sm font-medium text-gray-700 transition-all duration-200 cursor-pointer"
                >
                  <Edit className="w-4 h-4" />
                  Edit 
                </button>
              </div>
              {/* Property Stats */}
              <div className="grid grid-cols-3 gap-2 mb-12">
                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-4 rounded-2xl text-center border border-cyan-100">
                  <Bed className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">{formData.bedrooms}</div>
                  <div className="text-sm text-gray-600">Bedroom{formData.bedrooms > 1 ? 's' : ''}</div>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-4 rounded-2xl text-center border border-emerald-100">
                  <Bath className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">{formData.bathrooms}</div>
                  <div className="text-sm text-gray-600">Bathroom{formData.bathrooms > 1 ? 's' : ''}</div>
                </div>
                {formData.apartment_size && (
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-2xl text-center border border-purple-100">
                    <Square className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-800">{formData.apartment_size}</div>
                    <div className="text-sm text-gray-600">sq ft</div>
                  </div>
                )}
              </div>
              
              {/* Amenities Grid */}
              {formData.apartment_amenities && formData.apartment_amenities.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-center text-gray-800 mb-6">Amenities & Features</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {formData.apartment_amenities.map((amenity, idx) => {
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
                          <span className="text-gray-700 font-medium break-words line-clamp-2">
                            {amenity}
                          </span>
                        </div>
                      );
                    })}
                  </div>  
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Rental Price</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                      {formatPrice(formData.price)}
                    </span>
                    <span className="text-gray-600 font-medium">/ {formData.payment_frequency}</span>
                  </div>
                  <p className="text-gray-600 mt-4">{formData.duration}</p>
                  {formData.service_charge && (
                    <div className='flex items-center justify-start bg-gray-50 p-3 mt-4 gap-2 rounded-xl'>
                      <p className='text-sm text-gray-500  rounded-xl'>Service Charge:</p>
                      <p className="text-lg text-gray-600 font-bold  bg-gray-50 rounded-xl tracking-wide">
                        {formatPrice(formData.service_charge)}
                      </p>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => onBackToStep?.(2)}
                  className="bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-xl flex items-center gap-1 text-sm font-medium text-gray-700 transition-all duration-200 cursor-pointer"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
              </div>

              {/* Contact Information */}
              <div className="border-t border-gray-100 pt-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Contact Info</h3>
                  <button
                    onClick={() => onBackToStep?.(3)}
                    className="bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-xl flex items-center gap-1 text-sm font-medium text-gray-700 transition-all duration-200 cursor-pointer"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl border border-cyan-100">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{formData.contact_name}</p>
                      <p className="text-sm text-gray-600">Property Contact</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl border border-emerald-100">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{formData.contact_phone}</p>
                      <p className="text-sm text-gray-600">Phone Number</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Action Buttons */}
              <div className="border-t border-gray-100 pt-6 mt-6 space-y-4">
                <button
                  onClick={() => onBackToStep?.(4)}
                  className="w-full px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 focus:invisible cursor-pointer"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Edit
                </button>
                <button
                  onClick={() => setShowConfirmModal(true)}
                  className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 focus:invisible flex items-center justify-center gap-2 cursor-pointer"
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