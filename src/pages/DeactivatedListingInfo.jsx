import { useEffect, useState } from 'react'
import Footerbar from '../components/Footerbar';
import Footer from '../components/Footer';
import { ArrowLeft, MapPin, Phone, Home, Calendar, DollarSign, Users, Bath, Square, User, Plus } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyDeactivatedListingByIdApi, reactivateMyListingApi } from '../api/myDeactivatedListings';
import MyListingSkeleton from '../utils/loading-display/MyListingSkeleton';
import { uploadApartmentImagesApi } from '../api/apartments';
import { reactivateMyListingLoading, reactivateMyListingSuccess, reactivateMyListingError } from '../redux/myDeactivatedListingsSlice';

// Import extracted components
import ImageGallery from '../components/ImageGallery';
import ReactivationModal from '../utils/modal/ReactivationModal';
import ErrorAlert from '../utils/error-display/ErrorAlert';
import ErrorDisplay from '../utils/error-display/ErrorDisplay';
import ActionButtons from '../utils/buttons/ActionButtons';


// InfoCard component (kept here as it's specific to this page)
const InfoCard = ({ icon: Icon, label, value, name, editable = true, editMode, editedData, handleChange }) => (
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
              value={editedData[name] || ''}
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

const ApartmentTypeCard = ({ 
  icon: Icon, 
  label, 
  value, 
  name, 
  editable = true, 
  editMode, 
  editedData, 
  handleChange,
}) => {
  const apartmentTypeOptions = [
    { value: "", label: "Select Apartment Type" },
    { value: "self-contained", label: "Self-contained" },
    { value: "1-bedroom", label: "1 Bedroom" },
    { value: "2-bedroom", label: "2 Bedroom" },
    { value: "3-bedroom", label: "3 Bedroom" },
    { value: "4-bedroom", label: "4 Bedroom" },
    { value: "5-bedroom", label: "5 Bedroom" },
    { value: "semi-detached-duplex", label: "Semi-detached Duplex" },
    { value: "duplex", label: "Duplex" },
    { value: "studio", label: "Studio" },
    { value: "mini-flat", label: "Mini-Flat" },
    { value: "shared-apartment", label: "Shared Apartment" }
  ];

  const getDisplayValue = (val) => {
    const option = apartmentTypeOptions.find(opt => opt.value === val);
    return option ? option.label : val;
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
          <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            {label}
          </label>
          {editMode && editable ? (
            <div>
              <select
                name={name}
                value={editedData[name] || ''}
                onChange={handleChange}
                className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                {apartmentTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <p className="mt-2 text-lg font-semibold text-gray-900 break-words">
              {getDisplayValue(value) || 'Not specified'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const AmenitiesCard = ({ icon: Icon, label, apartment_amenities, editable = true, editMode, handleAmenityAdd, handleAmenityRemove, apartment }) => {
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
                  className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-md transition-all duration-200 flex items-center justify-center gap-1 focus:invisible cursor-pointer"
                >
                  <Plus strokeWidth={3} className="w-4.5 h-4.5" />
                  Add
                </button>
              </form>
            </div>
          ) : (
            <div className="mt-4 flex flex-wrap gap-2">
              {apartment.apartment_amenities?.map((amenity, index) => (
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


const DeactivatedListingInfo = () => {
  const { id: apartmentId } = useParams()
  const user = useSelector(state => state.auth?.user)
  const userId = user?._id
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // fetch states
  const [apartment, setApartment] = useState({})
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  // edit/reactivation states
  const [editMode, setEditMode] = useState(false)
  const [isReactivating, setIsReactivating] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)
  const [showReactivationModal, setShowReactivationModal] = useState(false)

  // form states
  const [editedData, setEditedData] = useState({})
  const [imageList, setImageList] = useState([]) // single source of truth
  const [validationError, setValidationError] = useState(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [apartmentId])

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price)

  const getDeactivatedListing = async () => {
    setLoading(true)
    setErrorMessage(null)
    try {
      const response = await fetchMyDeactivatedListingByIdApi(userId, apartmentId)
      if (response.status >= 200 && response.status < 300) {
        setApartment(response.data)
        setLoading(false)
      } else {
        throw new Error(response.data.error || 'Failed to fetch deactivated listing')
      }
    } catch (error) {
      setLoading(false)
      setErrorMessage(error.response?.data?.error || 'Failed to fetch deactivated listing')
    }
  }

  useEffect(() => {
    getDeactivatedListing()
  }, [apartmentId])


  const handleRetry = () => getDeactivatedListing()

  useEffect(() => {
    if (apartment && Object.keys(apartment).length > 0) {
      setEditedData({
        title: apartment.title || '',
        apartment_type: apartment.apartment_type || '',
        price: apartment.price || '',
        payment_frequency: apartment.payment_frequency || '',
        duration: apartment.duration || '',
        location: apartment.location || '',
        apartment_address: apartment.apartment_address || '',
        nearest_landmark: apartment.nearest_landmark || '',
        contact_phone: apartment.contact_phone || '',
        contact_name: apartment.contact_name || '',
        apartment_amenities: apartment.apartment_amenities || [],
        bedrooms: apartment.bedrooms || '',
        bathrooms: apartment.bathrooms || '',
        furnished: apartment.furnished || false,
        service_charge: apartment.service_charge || ''
      })
      setImageList(apartment.uploadedImages || []) // load initial images into unified list
    }
  }, [apartment])

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedData(prev => ({ ...prev, [name]: value }))
  }



  // ---------- Image handling ----------
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    if (!files.length) return
    setImageList(prev => [...prev, ...files]) // add new files directly
  }

  const handleImageReorder = (fromIndex, toIndex) => {
    setImageList(prev => {
      const updated = [...prev]
      const [moved] = updated.splice(fromIndex, 1)
      updated.splice(toIndex, 0, moved)
      return updated
    })
  }

  const handleRemoveImage = (index) => {
    setImageList(prev => prev.filter((_, i) => i !== index))
  }

  const getAllImages = () => imageList
  

  // ---------- Amenities ----------
  const handleAmenityAdd = (newAmenity) => {
    if (newAmenity.trim() && !editedData.apartment_amenities.includes(newAmenity.trim())) {
      setEditedData(prev => ({
        ...prev,
        apartment_amenities: [...prev.apartment_amenities, newAmenity.trim()]
      }))
    }
  }

  const handleAmenityRemove = (amenityToRemove) => {
    setEditedData(prev => ({
      ...prev,
      apartment_amenities: prev.apartment_amenities.filter(a => a !== amenityToRemove)
    }))
  }

  // ---------- Reactivation ----------
  const handleReactivation = async () => {
    try {
      setValidationError(null)
      setError(null)

      const allImages = getAllImages()
      if (allImages.length > 15) {
        setValidationError(`Max 15 images allowed. You currently have ${allImages.length}.`)
        return
      }
      if (allImages.length < 5) {
        setValidationError(`Please add at least 5 images. You currently have ${allImages.length}.`)
        return
      }

      const requiredFields = ['title', 'apartment_type', 'price', 'location', 'apartment_address', 'contact_phone', 'contact_name']
      const missing = requiredFields.filter(field => !editedData[field]?.toString().trim())
      if (missing.length > 0) {
        setValidationError(`Please fill in all required fields: ${missing.join(', ')}`)
        return
      }

      setIsReactivating(true)
      setUploadProgress(0)
      setShowReactivationModal(true)
      dispatch(reactivateMyListingLoading())

      // Split URLs vs Files
      const existingImages = imageList.filter(img => typeof img === 'string')
      const newImages = imageList.filter(img => img instanceof File)

      let finalImageUrls = [...existingImages]

      if (newImages.length > 0) {
        setUploadProgress(20)
        const formData = new FormData()
        newImages.forEach(file => formData.append('images', file))

        const uploadResponse = await uploadApartmentImagesApi(formData, (progress) => {
          setUploadProgress(20 + (progress * 0.6))
        })

        if (uploadResponse.status === 200 && uploadResponse.data.uploadedImages) {
          finalImageUrls = [...finalImageUrls, ...uploadResponse.data.uploadedImages]
        } else {
          throw new Error(uploadResponse.data?.error || 'Failed to upload images')
        }
      }

      setUploadProgress(80)
      const reactivationData = { ...editedData, uploadedImages: finalImageUrls }
      const response = await reactivateMyListingApi(apartmentId, reactivationData)
      setUploadProgress(100)

      if (response.status >= 200 && response.status < 300) {
        dispatch(reactivateMyListingSuccess(apartmentId))
        setSuccess(true)
        setImageList([]) // reset after success if you want
      } else {
        throw new Error(response.data?.error || response.data?.message || 'Failed to reactivate listing')
      }
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to reactivate listing. Please try again.'
      setError(msg)
      setSuccess(false)
      dispatch(reactivateMyListingError(msg))
    } finally {
      setIsReactivating(false)
      setUploadProgress(0)
    }
  }

  const handleCancel = () => {
    setEditMode(false)
    setEditedData({ ...apartment })
    setImageList(apartment.uploadedImages || [])
  }

  const handleRetryReactivation = () => {
    setError(null)
    handleReactivation()
  }

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setShowReactivationModal(false)
        setSuccess(false)
        navigate('/dashboard')
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [success, navigate])


  return (
    <>
      <div className="bg-white w-full h-full flex flex-col items-start justify-center min-h-screen">
        {errorMessage ? (
          <ErrorDisplay message={errorMessage} onRetry={handleRetry} />
        ) : loading ? 
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
                <p className="text-sm text-gray-500">Manage your inactive apartment listing</p>
              </div>
            </div>

            {/* Section: Apartment Details */}
            <div className='w-full h-full flex flex-col items-start justify-center mb-8'>
              {/* Images */}
              <div className="w-full flex flex-col items-start justify-center">
                {/* Error Alert */}
                {validationError && (
                  <div className="w-full px-8 pt-8">
                    <ErrorAlert 
                      message={validationError} 
                      onClose={() => setValidationError(false)} 
                    />
                  </div>
                )}

                <ImageGallery
                  imageList={imageList}                // unified array of all images (existing + new)
                  editMode={editMode}                  // toggle between view and edit modes
                  onImageChange={handleImageChange}    // add new images
                  onRemoveImage={handleRemoveImage}    // remove by index
                  onImageReorder={handleImageReorder}  // drag-and-swap reorder
                  uploadProgress={uploadProgress}      // progress during upload
                  isReactivating={isReactivating}      // disable controls when reactivating
                />

              </div>

              
              {/* Action Buttons */}
              <div className={`flex items-center gap-3 mb-4 ${!editMode ? "justify-start" : ""}`}>
                <ActionButtons
                  editMode={editMode}
                  onEdit={() => setEditMode(true)}
                  onSave={handleReactivation}
                  onCancel={handleCancel}
                  isLoading={isReactivating}
                  //disabled={getAllImages().length < 5}
                  saveLabel="Reactivate Listing"
                />
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
                          editMode={editMode}
                          editedData={editedData}
                          handleChange={handleChange}
                        />
                      </div>
                      <ApartmentTypeCard
                        icon={Home} 
                        label="Type" 
                        value={editedData.apartment_type} 
                        name="apartment_type" 
                        editMode={editMode}
                        editedData={editedData}
                        handleChange={handleChange}
                      />
                      <InfoCard 
                        icon={MapPin} 
                        label="Location" 
                        value={editedData.location} 
                        name="location" 
                        editMode={editMode}
                        editedData={editedData}
                        handleChange={handleChange}
                      />
                      <div className="md:col-span-2">
                        <InfoCard 
                          icon={MapPin} 
                          label="Full Address" 
                          value={editedData.apartment_address} 
                          name="apartment_address" 
                          editMode={editMode}
                          editedData={editedData}
                          handleChange={handleChange}
                        />
                      </div>
                      <InfoCard 
                        icon={MapPin} 
                        label="Nearest Landmark" 
                        value={editedData.nearest_landmark || "Not Provided"} 
                        name="nearest_landmark" 
                        editMode={editMode}
                        editedData={editedData}
                        handleChange={handleChange}
                      />
                      <InfoCard 
                        icon={Square} 
                        label="Size" 
                        value={editedData.apartment_size || "Not Provided"} 
                        name="apartment_size" 
                        editMode={editMode}
                        editedData={editedData}
                        handleChange={handleChange}
                      />
                      <InfoCard 
                        icon={Users} 
                        label="Bedrooms" 
                        value={editedData.bedrooms} 
                        name="bedrooms" 
                        editMode={editMode}
                        editedData={editedData}
                        handleChange={handleChange}
                      />
                      <InfoCard 
                        icon={Bath} 
                        label="Bathrooms" 
                        value={editedData.bathrooms} 
                        name="bathrooms" 
                        editMode={editMode}
                        editedData={editedData}
                        handleChange={handleChange}
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
                        editMode={editMode}
                        editedData={editedData}
                        handleChange={handleChange}
                      />
                      <AmenitiesCard 
                        icon={Home} 
                        label="Available Amenities" 
                        apartment_amenities={editedData.apartment_amenities} 
                        editMode={editMode}
                        handleAmenityAdd={handleAmenityAdd}
                        handleAmenityRemove={handleAmenityRemove}
                        apartment={apartment}
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
                        value={formatPrice(editedData.price)} 
                        name="price" 
                        editMode={editMode}
                        editedData={editedData}
                        handleChange={handleChange}
                      />
                      <InfoCard 
                        icon={Calendar} 
                        label="Payment Frequency" 
                        value={editedData.payment_frequency} 
                        name="payment_frequency" 
                        editMode={editMode}
                        editedData={editedData}
                        handleChange={handleChange}
                      />
                      <InfoCard 
                        icon={Calendar} 
                        label="Rent Duration" 
                        value={editedData.duration} 
                        name="duration" 
                        editMode={editMode}
                        editedData={editedData}
                        handleChange={handleChange}
                      />
                      <InfoCard 
                        icon={DollarSign} 
                        label="Service Charge" 
                        value={formatPrice(editedData.service_charge) || "Not Provided"} 
                        name="service_charge" 
                        editMode={editMode}
                        editedData={editedData}
                        handleChange={handleChange}
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
                        editMode={editMode}
                        editedData={editedData}
                        handleChange={handleChange}
                      />

                      <InfoCard 
                        icon={Phone} 
                        label="Phone Number" 
                        value={editedData.contact_phone} 
                        name="contact_phone" 
                        editMode={editMode}
                        editedData={editedData}
                        handleChange={handleChange}
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

      {/* Reactivation Modal */}
      <ReactivationModal
        show={showReactivationModal}
        onClose={() => setShowReactivationModal(false)}
        isLoading={isReactivating}
        success={success}
        error={error}
        onRetry={handleRetryReactivation}
      />
    </>
  );
}

export default DeactivatedListingInfo;