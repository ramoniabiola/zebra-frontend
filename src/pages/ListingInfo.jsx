import { useEffect, useState } from 'react'
import Footerbar from '../components/Footerbar';
import Footer from '../components/Footer';
import { ArrowLeft, ChevronRight, ChevronLeft, Trash2, MapPin, Phone, Home, Calendar, DollarSign, Users, Bath, Square, User } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { fetchMyListingsByIdApi } from '../api/myListings';
import MyListingSkeleton from '../utils/loading-display/MyListingSkeleton';


const ListingInfo = () => {
  const { id: apartmentId } = useParams();
  const [currentImg, setCurrentImg] = useState(0);
  const [apartment, setApartment]  = useState({}) 
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const user = useSelector((state) => state.auth?.user);
  const userId = user?._id
  const totalImages = apartment?.uploadedImages?.length || 0;
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();



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
      console.log(error.response?.data?.message)
      setError(error.response?.data?.message || "Failed to fetch listings")
    }
  }


  useEffect(() => { 
    getListing();
  }, [apartmentId]);

  
  const handleRetry = () => {
    getListing();
  };


  
  // Error Display
  const ErrorDisplay = () => (
    <div className="h-screen w-full flex flex-col items-center justify-center text-center py-8">
      <ExclamationTriangleIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-800 mb-1">
        Something went wrong
      </h3>
      <p className="text-gray-600 mb-4">
        {error?.message || "Failed to fetch listing"}
      </p>
      <button
        onClick={handleRetry}
        className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded transition-colors cursor-pointer"
      >
        Try Again
      </button>
    </div>
  );

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

  // INFO CARD
  const InfoCard = ({ icon: Icon, label, value }) => (
    <div className="bg-white rounded-lg p-4 border border-gray-100">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-400 rounded-xl flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">{label}</label>
          <p className="mt-2 text-lg font-semibold text-gray-900 break-words">{value}</p>
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
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-400 rounded-xl flex items-center justify-center">
              <Icon className="w-6 h-6 text-white" />
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
    <div className="bg-white w-full h-full flex flex-col items-start justify-center min-h-screen">
      {error ? (
        <ErrorDisplay />
      ) : isLoading ? 
      (
        <MyListingSkeleton />
      ) : ( 
        <>
          {/* Section: Header */}
          <div className="w-full h-20 flex items-center justify-start pl-2 gap-2 bg-white shadow">
            <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full focus:invisible">
              <ArrowLeft className="w-6 h-6 text-gray-700 cursor-pointer" />
            </button>
            <div className='space-y-0.5'>
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
                  className="w-full h-full flex transition-transform duration-500 ease-in-out"
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
                      className="w-full h-full object-cover"
                      />
                    )
                  })}
                </div> 
                {isHovered && currentImg > 0 && (
                  <button onClick={handlePrev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white opacity-90 p-2 rounded-full shadow cursor-pointer">
                    <ChevronLeft className="w-6 h-6 text-gray-600" />
                  </button>
                )}
                {isHovered && currentImg < totalImages - 1 && (
                  <button onClick={handleNext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white opacity-90 p-2 rounded-full shadow cursor-pointer">
                    <ChevronRight className="w-6 h-6 text-gray-600" />
                  </button>
                )}
                {/* Image Count */}
                <div className="absolute bottom-4 right-4 bg-black/50 text-white text-sm font-bold px-3 py-[4px] rounded">
                  {currentImg + 1} / {totalImages}
                </div>
              </div>
            </div>
              
            {/* Action Buttons */}
            <div className="flex items-center gap-3 mb-4 justify-start ml-2">
              <button className="flex items-center font-semibold gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-lg hover:from-red-600 hover:to-rose-700 transition-all duration-200 shadow-sm cursor-pointer focus:invisible">
                <Trash2 className="w-4 h-4" />
                Deactivate Listing
              </button>
            </div>
              
            {/* Property Details */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
              {/* Main Info */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white px-3 py-8">
                  <h2 className="text-2xl text-center font-bold text-gray-800 mb-8">Property Information</h2>
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
                  <h2 className="text-2xl text-center font-bold text-gray-800 mb-8">Amenities & Features</h2>
                  <div className="space-y-6">
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
              
              {/* Sidebar */}
              <div className="space-y-6">
                {/* Pricing */}
                <div className="bg-white px-3 py-8">
                  <h2 className="text-2xl text-center font-bold text-gray-800 mb-8">Pricing</h2>
                  <div className="space-y-6">
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
                  <h2 className="text-2xl text-center font-bold text-gray-800 mb-8">Contact</h2>
                  <div className='space-y-6'>
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
  );
}

export default ListingInfo;