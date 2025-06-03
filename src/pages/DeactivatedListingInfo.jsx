import { useState } from 'react'
import Footerbar from '../components/Footerbar';
import Footer from '../components/Footer';
import { apartmentInfoData } from "../utils/Data";
import { ArrowLeft, ChevronRight, ChevronLeft, RotateCcw, MapPin, Phone, Home, Calendar, DollarSign, Users, Bath, Square, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const DeactivatedListingInfo = () => {
  const apartment = apartmentInfoData[0]; // Static for now
  const [currentImg, setCurrentImg] = useState(0);
  const totalImages = apartment?.images?.length || 0;
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

  // INFO CARD
  const InfoCard = ({ icon: Icon, label, value }) => (
    <div className="bg-white rounded-lg p-4  border border-gray-100">
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
              {apartment.apartment_amenities.map((amenity, index) => (
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
    <div className=" bg-white w-full h-full flex flex-col items-start justify-center min-h-screen">
      {/* Section: Header */}
      <div className="w-full h-20 flex items-center justify-start pl-2 gap-2 bg-white shadow">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full focus:invisible">
          <ArrowLeft className="w-6 h-6 text-gray-700 cursor-pointer" />
        </button>
        <div className=''>
          <h1 className="text-xl font-bold text-gray-900">Apartment Details</h1>
          <p className="text-sm text-gray-500">Manage your apartment listing</p>
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

        {/* Action Button */}
        <div className="flex items-center gap-3  justify-start ml-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-sm cursor-pointer focus:invisible">
            <RotateCcw strokeWidth={2} className="w-4 h-4" />
            Reactivate
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
                  value={apartment.nearest_landmark} 
                />
                <InfoCard 
                  icon={Square} 
                  label="Size" 
                  value={apartment.apartment_size} 
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
                  value={apartment.price} 
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
                  value={apartment.service_charge} 
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
      <Footerbar />
      <Footer />
    </div>
  );
}

export default DeactivatedListingInfo;