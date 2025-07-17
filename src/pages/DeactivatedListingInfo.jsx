import { useState } from 'react'
import Footerbar from '../components/Footerbar';
import Footer from '../components/Footer';
import { apartmentInfoData } from "../utils/Data";
import { ArrowLeft, ChevronRight, ChevronLeft,  X, Plus, MapPin, Phone, Home, Calendar, DollarSign, Users, Bath, Square, User, RotateCcw, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const DeactivatedListingInfo = () => {
  const apartment = apartmentInfoData[0]; // Static for now
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({ ...apartment });
  const [currentImg, setCurrentImg] = useState(0);
  const totalImages = apartment?.images?.length || 0;
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prev => ({ 
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
  
    setEditedData(prev => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const handleRemoveImage = (index) => {
    const updatedImages = editedData.images.filter((_, i) => i !== index);
    setEditedData(prev => ({ ...prev, images: updatedImages }));
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

  const handleAmenityAdd = (newAmenity) => {
    if (newAmenity.trim() && !editedData.apartment_amenities.includes(newAmenity.trim())) {
      setEditedData(prev => ({
        ...prev,
        apartment_amenities: [...prev.apartment_amenities, newAmenity.trim()]
      }));
    }
  }; 
  

  const handleAmenityRemove = (amenityToRemove) => {
    setEditedData(prev => ({
      ...prev,
      apartment_amenities: prev.apartment_amenities.filter(amenity => amenity !== amenityToRemove)
    }));
  };



  // INFO CARD
  const InfoCard = ({ icon: Icon, label, value, name, editable = true }) => (
    <div className="bg-white rounded-lg p-4  border border-gray-100">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-400 rounded-xl flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">{label}</label>
          {editMode && editable ? (
            name === 'furnished' ? (
              <select
                name={name}
                value={editedData[name] ? 'yes' : 'no'}
                onChange={(e) => handleChange({
                  target: { name, value: e.target.value === 'yes' }
                })}
                className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            ) : (
              <input
                type="text"
                name={name}
                value={editedData[name]}
                onChange={handleChange}
                className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            )
          ) : (
            <p className="mt-2 text-lg font-semibold text-gray-900 break-words">{value}</p>
          )}
        </div>
      </div>
    </div>
  );
  

  // AMENITIES CARD
  const AmenitiesCard = ({ icon: Icon, label, apartment_amenities, editable = true }) => {
    const [newAmenity, setNewAmenity] = useState('');

    const handleAddAmenity = (e) => {
      e.preventDefault();
      if (newAmenity.trim()) {
        handleAmenityAdd(newAmenity);
        setNewAmenity('');
      }
    };

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
            
            {editMode && editable ? (
              <div className="mt-4 space-y-4">
                {/* Existing amenities as individual input fields */}
                <div className="space-y-3">
                  {apartment_amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-cyan-50 to-cyan-100 border border-cyan-200 text-cyan-800 px-3 py-2 rounded-lg flex items-center justify-between"
                    >
                      <span>{amenity}</span>
                      <button
                        type="button"
                        onClick={() => handleAmenityRemove(amenity)}
                        className="text-cyan-600 hover:text-red-500 transition-colors duration-200 cursor-pointer"
                      >
                       &times;
                      </button>
                    </div>
                  ))}
                </div>
                
                {/* Add new amenity */}
                <form onSubmit={handleAddAmenity} className="flex flex-col gap-2 pt-2">
                  <input
                    type="text"
                    value={newAmenity}
                    onChange={(e) => setNewAmenity(e.target.value)}
                    placeholder="Add new amenity..."
                    className="mt-1 w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                 />
                  <button
                    type="submit"
                    className="px-6 py-3  bg-teal-500 hover:bg-teal-600 text-white rounded-md transition-all duration-200 flex items-center justify-center gap-1 focus:invisible cursor-pointer"
                  >
                    <Plus strokeWidth={3} className="w-4.5 h-4.5" />
                    Add
                  </button>
                </form>
              </div>
            ) : (
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
            )}
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
        <div className='space-y-0.5'>
          <h1 className="text-xl font-bold text-gray-900">Apartment Details</h1>
          <p className="text-sm text-gray-500">Manage your inactive apartment listing</p>
        </div>
      </div>

      {/* Section: Apartment Details */}
      <div className='w-full h-full flex flex-col items-start justify-center mb-8'>
        {/* Images */}
         <div className="w-full flex flex-col items-start justify-center">
          {editMode ? (
            <div className="p-8">
              <h3 className="text-lg text-center font-semibold text-gray-900 mb-6">Apartment Images</h3>
              
              {editedData.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                  {editedData.images.map((file, idx) => {
                    const isFile = file instanceof File;
                    const imageUrl = isFile ? URL.createObjectURL(file) : file.img;
 
                    return (
                      <div key={idx} className="relative group">
                        <img
                          src={imageUrl}
                          alt={`preview-${idx}`}
                          className="w-full h-32 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-cyan-400 transition-colors duration-200">
                <div className="flex flex-col items-center">
                  <Plus className="w-12 h-12 text-gray-400 mb-4" />
                  <label className="cursor-pointer">
                    <span className="text-cyan-400 hover:text-cyan-500 hover:underline font-medium">Upload updated images</span>
                    <span className="text-gray-500"> or drag and drop</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  <p className="text-sm text-gray-400 mt-2">PNG, JPG up to 10MB</p>
                </div>
              </div>
            </div>
          ) : (
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
          )}
        </div>


        {/* Action Buttons */}
        <div className={`flex items-center gap-3 mb-4 ${!editMode ? "justify-start ml-2" : "ml-9"}`}>
          {editMode ? (
            <>
              <button className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-sm  cursor-pointer focus:invisible">
                <CheckCircle className="w-4 h-4" />
                Re-publish Listing
              </button>
              <button 
                onClick={() => {
                  setEditMode(false); 
                  setEditedData(apartment);
                }}
                className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200  cursor-pointer  focus:invisible"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3 justify-start ml-2">
              <button 
                onClick={() => setEditMode(true)}
                className="flex items-center font-semibold gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-sm cursor-pointer focus:invisible"
              >
                <RotateCcw strokeWidth={2} className="w-4 h-4" />
                Reactivate Listing
              </button>
            </div>
          )}
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
                    value={editedData.title} 
                    name="title" 
                  />
                </div>
                <InfoCard 
                  icon={Home} 
                  label="Type" 
                  value={editedData.apartment_type} 
                  name="apartment_type" 
                />
                <InfoCard 
                  icon={MapPin} 
                  label="Location" 
                  value={editedData.location} 
                  name="location" 
                />
                <div className="md:col-span-2">
                  <InfoCard 
                    icon={MapPin} 
                    label="Full Address" 
                    value={editedData.apartment_address} 
                    name="apartment_address" 
                  />
                </div>
                <InfoCard 
                  icon={MapPin} 
                  label="Nearest Landmark" 
                  value={editedData.nearest_landmark} 
                  name="nearest_landmark" 
                />
                <InfoCard 
                  icon={Square} 
                  label="Size" 
                  value={editedData.apartment_size} 
                  name="apartment_size" 
                />
                <InfoCard 
                  icon={Users} 
                  label="Bedrooms" 
                  value={editedData.bedrooms} 
                  name="bedrooms" 
                />
                <InfoCard 
                  icon={Bath} 
                  label="Bathrooms" 
                  value={editedData.bathrooms} 
                  name="bathrooms" 
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
                  value={editedData.furnished ? 'Fully Furnished' : 'Unfurnished'} 
                  name="furnished" 
                />
                <AmenitiesCard 
                  icon={Home} 
                  label="Available Amenities" 
                  apartment_amenities={editedData.apartment_amenities} 
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
                  value={editedData.price} 
                  name="price" 
                />
                <InfoCard 
                  icon={Calendar} 
                  label="Payment Frequency" 
                  value={editedData.payment_frequency} 
                  name="payment_frequency" 
                />
                <InfoCard 
                  icon={Calendar} 
                  label="Rent Duration" 
                  value={editedData.duration} 
                  name="duration" 
                />
                <InfoCard 
                  icon={DollarSign} 
                  label="Service Charge" 
                  value={editedData.service_charge} 
                  name="service_charge" 
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
                  value={editedData.contact_name} 
                  name="contact_name" 

                />

                <InfoCard 
                  icon={Phone} 
                  label="Phone Number" 
                  value={editedData.contact_phone} 
                  name="contact_phone" 
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