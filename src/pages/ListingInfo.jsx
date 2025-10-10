import { useEffect, useState } from 'react'
import Footerbar from '../components/Footerbar';
import Footer from '../components/Footer';
import { ArrowLeft, ChevronRight, ChevronLeft, Trash2, MapPin, Phone, Home, Calendar, DollarSign, Users, Bath, Square, User, CheckCircle, Loader2, AlertTriangle, X, RotateCcw } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { fetchMyListingsByIdApi } from '../api/myListings';
import MyListingSkeleton from '../utils/loading-display/MyListingSkeleton';
import { useDeactivateMyListing } from '../hooks/myListings';


const ListingInfo = () => {
  const { id: apartmentId } = useParams();
  const [currentImg, setCurrentImg] = useState(0);
  const [apartment, setApartment]  = useState({}) 
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const user = useSelector((state) => state.auth?.user);
  const userId = user?._id
  const totalImages = apartment?.uploadedImages?.length || 0;
  const [isHovered, setIsHovered] = useState(false);
  const { deactivateMyListing, success, setSuccess, isLoading: deactivateLoading, error: deactivateError } = useDeactivateMyListing();
  const navigate = useNavigate();


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [apartmentId]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price);
  };



  const getListing = async () => {
    setIsLoading(true);
    setError(null)

    try{
      const response = await fetchMyListingsByIdApi(userId, apartmentId);
      if(response.status >= 200 && response.status < 300) {
        setApartment(response.data);
        setError(null);
        setIsLoading(false);
      } else {
        // If the response status is not in the success range, handle the error
        throw new Error(response.data.error);
      }
    }catch(error){
      setIsLoading(false)
      console.log(error.response?.data?.error)
      setError(error.response?.data?.error || "Failed to fetch listings")
    }
  }

  useEffect(() => { 
    getListing();
  }, [apartmentId]);

  
  const handleRetry = () => {
    getListing();
  };


  const handleDeactivateListing = async () => {
    setShowConfirmModal(false); 
  
    setShowSubmitModal(true)
    
    await deactivateMyListing(apartment._id);
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
            <div className="w-14 h-14 bg-gradient-to-r from-rose-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Confirm Deactivation</h3>
            <p className="text-gray-600 text-sm">
              Are you sure you want to deactivate this listing? Once deactivated, it will no longer be visible to potential tenants.
            </p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200 focus:invisible cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleDeactivateListing}
              className="flex-1 px-3 py-2 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold rounded-xl transition-all duration-200 focus:invisible cursor-pointer"
            >
              Deactivate
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
          {!deactivateLoading && (
            <button
              onClick={() => setShowSubmitModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
  
          <div className="text-center">
            {deactivateLoading && (
              <>
                <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Loader2 className="w-8 h-8 text-sky-600 animate-spin" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Deactivating Your Listing...
                </h3>
                <p className="text-gray-600 text-sm">
                 Please wait while we take your listing offline...
                </p>
              </>
            )}
  
            {success && (
              <>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                 Listing Successfully Deactivated!
                </h3>
                <p className="text-gray-600 text-sm">
                  Your listing has been taken offline and is no longer visible to potential tenants.
                </p>
              </>
            )}
  
            {deactivateError && (
              <>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Oops! Something Went Wrong
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  We couldn't deactivate your listing. Please try again.
                  <br />
                  <span className="text-sm text-gray-500 mt-2 block">
                    Error:  <b className="text-gray-700">{error}</b>
                  </span>
                </p>
                <button
                  onClick={handleDeactivateListing}
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
  




  
  // Error Display
  const ErrorDisplay = () => (
    <div className="h-screen w-full flex flex-col items-center justify-center text-center py-8">
      <ExclamationTriangleIcon className="w-10 h-10s text-red-500 mx-auto mb-4" />
      <h3 className="text-base font-semibold text-gray-800 mb-1">
        Something went wrong
      </h3>
      <p className="text-gray-600 text-sm mb-4">
        {error || "Failed to fetch listing"}
      </p>
      <button
        onClick={handleRetry}
        className="px-3 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm tracking-widest font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-1.5  focus:invisible cursor-pointer"
      >
        <RotateCcw className="w-4 h-4" />
        Retry
      </button>
    </div>
  );

 

  // INFO CARD
  const InfoCard = ({ icon: Icon, label, value }) => (
    <div className="bg-white rounded-lg p-4 border border-gray-100">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-11 h-11 bg-gradient-to-br from-cyan-500 to-blue-400 rounded-xl flex items-center justify-center">
            <Icon className="w-5.5 h-5.5 text-white" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">{label}</label>
          <p className="mt-2 text-base font-semibold text-gray-900 break-words">{value}</p>
        </div>
      </div>
    </div>
  );
  
  // AMENITIES CARD
  const AmenitiesCard = ({ icon: Icon, label, apartment_amenities }) => {
    return (
      <div className="bg-white rounded-lg p-4 border border-gray-100">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-11 h-11 bg-gradient-to-br from-cyan-500 to-blue-400 rounded-xl flex items-center justify-center">
              <Icon className="w-5.5 h-5.5 text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">{label}</label>
            <div className="mt-4 flex flex-wrap gap-2">
              {apartment_amenities.map((amenity, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 text-cyan-800 text-sm font-medium rounded-lg border border-cyan-200"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="bg-white w-full h-full flex flex-col items-start justify-center min-h-screen">
        {error ? (
          <ErrorDisplay />
        ) : isLoading ? 
        (
          <MyListingSkeleton />
        ) : ( 
          <>
            {/* Section: Header */}
            <div className="w-full h-18 flex items-center justify-start px-2 gap-2 bg-white shadow">
              <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full focus:invisible">
                <ArrowLeft className="w-5 h-5 text-gray-700 cursor-pointer" />
              </button>
              <div className=''>
                <h1 className="text-xl font-bold text-gray-900">Apartment Details</h1>
                <p className="text-sm text-gray-500">View your active apartment listing</p>
              </div>
            </div>
            {/* Section: Apartment Details */}
            <div className='w-full h-full flex flex-col items-start justify-center mb-8'>
              {/* Images */}
              <div className="w-full flex flex-col items-start justify-center">
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
                  {isHovered && currentImg > 0 && (
                    <button onClick={handlePrev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white opacity-90 p-2 rounded-full shadow cursor-pointer">
                      <ChevronLeft strokeWidth={3} className="w-6 h-6 text-gray-400" />
                    </button>
                  )}
                  {isHovered && currentImg < totalImages - 1 && (
                    <button onClick={handleNext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white opacity-90 p-2 rounded-full shadow cursor-pointer">
                      <ChevronRight strokeWidth={3} className="w-6 h-6 text-gray-400" />
                    </button>
                  )}
                  {/* Image Count */}
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white text-sm font-bold px-3 py-[4px] rounded">
                    {currentImg + 1} / {totalImages}
                  </div>
                </div>
              </div>
                
              {/* Action Buttons */}
              <div className="flex items-center gap-3 mb-4 justify-start px-2">
                <button 
                  onClick={() => setShowConfirmModal(true)}
                  disabled={success}
                  className="flex items-center font-semibold gap-1 px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm rounded-lg hover:from-red-600 hover:to-rose-700 transition-all duration-200 shadow-sm cursor-pointer focus:invisible"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Deactivate Listing
                </button>
              </div>
                
              {/* Property Details */}
              <div className='min-w-full grid grid-cols-1 lg:grid-cols-2 gap-8'>

                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white px-3 py-8">
                    <h2 className="text-xl text-center font-bold text-gray-800 mb-8">Apartment Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <InfoCard 
                          icon={Home} 
                          label="Property Title" 
                          value={apartment.title} 
                        />
                      </div>
                      <InfoCard 
                        icon={Home} 
                        label="Type" 
                        value={apartment.apartment_type} 
                      />
                      <InfoCard 
                        icon={MapPin} 
                        label="Location" 
                        value={apartment.location} 
                      />
                      <div className="md:col-span-2">
                        <InfoCard 
                          icon={MapPin} 
                          label="Full Address" 
                          value={apartment.apartment_address} 
                        />
                      </div>
                      <InfoCard 
                        icon={MapPin} 
                        label="Nearest Landmark" 
                        value={apartment?.nearest_landmark || "Not Provided"} 
                      />
                      <InfoCard 
                        icon={Square} 
                        label="Size" 
                        value={apartment?.apartment_size || "Not Provided"} 
                      />
                      <InfoCard 
                        icon={Users} 
                        label="Bedrooms" 
                        value={apartment.bedrooms} 
                      />
                      <InfoCard 
                        icon={Bath} 
                        label="Bathrooms" 
                        value={apartment.bathrooms} 
                      />
                    </div>
                  </div>
                
                  {/* Amenities */}
                  <div className="bg-white px-3 py-8">
                    <h2 className="text-xl text-center font-bold text-gray-800 mb-8">Amenities & Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InfoCard 
                        icon={Home} 
                        label="Furnished Status" 
                        value={apartment.furnished ? 'Fully Furnished' : 'Unfurnished'} 
                      />
                      <AmenitiesCard 
                        icon={Home} 
                        label="Available Amenities" 
                        apartment_amenities={apartment.apartment_amenities} 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-2 space-y-6">
                  {/* Pricing */}
                  <div className="bg-white px-3 py-8">
                    <h2 className="text-xl text-center font-bold text-gray-800 mb-8">Pricing</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InfoCard 
                        icon={DollarSign} 
                        label="Rent Price" 
                        value={formatPrice(apartment.price)}
                      />
                      <InfoCard 
                        icon={Calendar} 
                        label="Payment Frequency" 
                        value={apartment.payment_frequency} 
                      />
                      <InfoCard 
                        icon={Calendar} 
                        label="Rent Duration" 
                        value={apartment.duration} 
                      />
                      <InfoCard 
                        icon={DollarSign} 
                        label="Service Charge" 
                        value={formatPrice(apartment.service_charge) || "Not Provided"} 
                      />
                    </div>
                  </div>
                
                  {/* Contact */}
                  <div className="bg-white px-3 py-8">
                    <h2 className="text-xl text-center font-bold text-gray-800 mb-8">Contact</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <InfoCard 
                        icon={User} 
                        label="Contact Name" 
                        value={apartment.contact_name} 
                      />
                      <InfoCard 
                        icon={Phone} 
                        label="Phone Number" 
                        value={apartment.contact_phone} 
                      />
                    </div>
                  </div>
                </div>
              </div>  
            </div>
          </>
        )}   
        <Footerbar />
        <Footer />
      </div>
      
      {/* Confirmation Modal */}
      <ConfirmModal />
      {/* Submit Modal */}
      <SubmitModal />
    </>
  );
}

export default ListingInfo;