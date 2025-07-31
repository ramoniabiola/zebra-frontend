import { useEffect, useState } from 'react'
import Footerbar from '../components/Footerbar';
import Footer from '../components/Footer';
import { ArrowLeft, ChevronRight, ChevronLeft, X, Plus, MapPin, Phone, Home, Calendar, DollarSign, Users, Bath, Square, User, RotateCcw, CheckCircle, Upload, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyDeactivatedListingByIdApi, reactivateMyListingApi } from '../api/myDeactivatedListings';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import MyListingSkeleton from '../utils/loading-display/MyListingSkeleton';
import { uploadApartmentImagesApi } from '../api/apartments';
import { reactivateMyListingLoading, reactivateMyListingSuccess, reactivateMyListingError } from '../redux/myDeactivatedListingsSlice';



// Move InfoCard component OUTSIDE of the main component
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

  // Get display label for the current value
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


// Move AmenitiesCard component OUTSIDE of the main component
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
  const { id: apartmentId } = useParams();

  // get deactivated listing states
  const [apartment, setApartment] = useState({}) 
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  // listing reactivation states
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const [editMode, setEditMode] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);
  const [isReactivating, setIsReactivating] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const user = useSelector((state) => state.auth?.user);
  const userId = user?._id
  const [isHovered, setIsHovered] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [newImages, setNewImages] = useState([]); // Track new file uploads separately
  const [imagesToRemove, setImagesToRemove] = useState([]); // Track images to remove
  const [showReactivationModal, setShowReactivationModal] = useState(false);

  // reactivation data validation error alert
  const [validationError, setValidationError] = useState(null);
  const dispatch = useDispatch();
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


  const getDeactivatedListing = async () => {
    setLoading(true);
    setErrorMessage(null)

    try{
      const response = await fetchMyDeactivatedListingByIdApi(userId, apartmentId);
      if(response.status >= 200 && response.status < 300) {
        setApartment(response.data);
        setErrorMessage(null);
        setLoading(false);
      } else {
        throw new Error(response.data.error || "Failed to fetch deactivated listing");
      }
    }catch(error){
      setLoading(false)
      setErrorMessage(error.response?.data?.message || "Failed to fetch deactivated listing")
    }
  }

  useEffect(() => { 
    getDeactivatedListing();
  }, [apartmentId]);

  const handleRetry = () => {
    getDeactivatedListing();
  };

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
        service_charge: apartment.service_charge || '',
        uploadedImages: apartment.uploadedImages || [],
      });
      // Reset tracking arrays when apartment data loads
      setNewImages([]);
      setImagesToRemove([]);
    }
  }, [apartment]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prev => ({ 
      ...prev,
      [name]: value,
    }));
  };



  // Enhanced image handling
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
  
    // Add new files to tracking array
    setNewImages(prev => [...prev, ...files]);
  };

  

  const handleRemoveImage = (index) => {
    const imageToRemove = editedData.uploadedImages[index];
    
    // Check if it's an existing URL or a new File
    if (typeof imageToRemove === 'string') {
      // It's an existing URL - add to removal list
      setImagesToRemove(prev => [...prev, imageToRemove]);
    } else {

      // It's a new File - remove from newImages array
      const fileIndex = newImages.findIndex(file => file === imageToRemove);
      if (fileIndex > -1) {
        setNewImages(prev => prev.filter((_, i) => i !== fileIndex));
      }
    }
    
    // Remove from editedData
    setEditedData(prev => ({
      ...prev,
      uploadedImages: prev.uploadedImages.filter((_, i) => i !== index)
    }));
  };

  // Get total images including existing and new ones
  const getAllImages = () => {
    const existingImages = editedData.uploadedImages.filter(img => 
      typeof img === 'string' && !imagesToRemove.includes(img)
    );
    return [...existingImages, ...newImages];
  };

  const totalImages = editMode ? getAllImages().length : (apartment?.uploadedImages?.length || 0);


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



  // Enhanced reactivation with validation and image upload
  const handleReactivation = async () => {

    try {
      // Reset states at the beginning
      setValidationError(null);
      setError(null);

      // Validation - Images
      const allImages = getAllImages();
      if (allImages.length < 5) {
        setValidationError(`Please add at least 5 images. You currently have ${allImages.length} images.`);
        return;
      }

      // Validate required fields
      const requiredFields = ['title', 'apartment_type', 'price', 'location', 'apartment_address', 'contact_phone', 'contact_name'];
      const missingFields = requiredFields.filter(field => !editedData[field]?.toString().trim());

      if (missingFields.length > 0) {
        setValidationError(`Please fill in all required fields: ${missingFields.join(', ')}`);
        return;
      }

      // Initialize loading states
      setIsReactivating(true);
      setUploadProgress(0);
      setIsLoading(true);
      setShowReactivationModal(true);
      dispatch(reactivateMyListingLoading());

      let finalImageUrls = [];

      // Keep existing images that weren't removed
      const existingImages = editedData.uploadedImages.filter(img => 
        typeof img === 'string' && !imagesToRemove.includes(img)
      );

      finalImageUrls = [...existingImages];

      // Upload new images if any
      if (newImages.length > 0) {
        setUploadProgress(20);

        try {
          // Create FormData for new images
          const formData = new FormData();
          newImages.forEach(file => {
            formData.append('images', file);
          });

          // Upload to Cloudinary
          const uploadResponse = await uploadApartmentImagesApi(formData, (progress) => {
            setUploadProgress(20 + (progress * 0.6)); // 20% to 80%
          });
          
          if (uploadResponse.status === 200 && uploadResponse.data.uploadedImages) {
            finalImageUrls = [...finalImageUrls, ...uploadResponse.data.uploadedImages];
          } else {
            throw new Error(uploadResponse.data?.message || 'Failed to upload new images');
          }
        } catch (uploadError) {
          throw new Error(`Image upload failed: ${uploadError.message}`);
        }
      }

      setUploadProgress(80);

      // Prepare data for reactivation
      const reactivationData = {
        ...editedData,
        uploadedImages: finalImageUrls,
      };

      // Call reactivation API
      const response = await reactivateMyListingApi(apartmentId, reactivationData);
      setUploadProgress(100);

      if (response.status >= 200 && response.status < 300) {
        // Success handling
        dispatch(reactivateMyListingSuccess(apartmentId));
        setSuccess(true);
        setIsLoading(false);

        // Optional: Clear temporary states
        setNewImages([]);
        setImagesToRemove([]);

      } else {
        throw new Error(response.data?.error || response.data?.message || 'Failed to reactivate listing');
      }

    } catch (error) {
      console.error('Reactivation error:', error);

      // Set user-friendly error message
      const errorMessage = error.message || 'Failed to reactivate listing. Please try again.';
      setError(errorMessage);
      setIsLoading(false);
      setSuccess(false);

      // Dispatch error to Redux
      dispatch(reactivateMyListingError(errorMessage));

    } finally {
      // Always reset these states
      setIsReactivating(false);
      setUploadProgress(0);
    }
  };


  const handleCancel = () => {
    setEditMode(false);
    // Reset to original apartment data
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
      service_charge: apartment.service_charge || '',
      uploadedImages: apartment.uploadedImages || [],
    });
    
    // Clear tracking arrays
    setNewImages([]);
    setImagesToRemove([]);
  };


  // Error Display
  const ErrorDisplay = () => (
    <div className="h-screen w-full flex flex-col items-center justify-center text-center py-8">
      <ExclamationTriangleIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-800 mb-1">
        Something went wrong
      </h3>
      <p className="text-gray-600 mb-4">
        {errorMessage?.message || "Failed to fetch listing"}
      </p>
      <button
        onClick={handleRetry}
        className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded transition-colors cursor-pointer"
      >
        Try Again
      </button>
    </div>
  );


  // Apartment Reactivation Modal
  const ReactivationModal = () => {
    if (!showReactivationModal) return null;
  
    return (
      <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
          {!isLoading && (
            <button
              onClick={() => setShowReactivationModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X />
            </button>
          )}

          <div className="text-center">
            {isLoading && (
              <>
                <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Loader2
                   className="w-8 h-8 text-sky-600 animate-spin" />
                </div>
            
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Reactivating Your Apartment Listing
                </h3>
            
                <p className="text-gray-600 mb-4">
                  Please wait while we restore your listing and make it available to potential tenants...
                </p>
            
                <div className="text-sm text-gray-500">
                  Updating availability status and refreshing listing details...
                </div>
              </>
            )}

            {success && (
              <>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
            
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  🎉 Apartment Successfully Reactivated!
                </h3>
            
                <p className="text-gray-600 mb-4">
                  Great news! Your apartment listing is now active and visible to potential tenants. You should start receiving inquiries soon!
                </p>
            
                <div className="bg-green-50 p-3 rounded-lg text-sm text-green-700 mb-4">
                  Your listing will appear in search results and tenant recommendations immediately.
                </div>
              </>
            )}

            {error && (
              <>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
            
                <h3 className="text-xl font-semibold text-red-800 mb-2">
                  Reactivation Failed
                </h3>
            
                <p className="text-gray-600 mb-4">
                  We couldn't reactivate your apartment listing right now. This might be due to a temporary issue.
                </p>
            
                {error && (
                  <div className="bg-red-50 p-3 rounded-lg text-sm text-red-700 mb-4">
                    <strong>Error Details:</strong> {error}
                  </div>
                )}

                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => {
                      setError(null);
                      handleReactivation(); // Retry function
                    }}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
                  >
                    Try Again
                  </button>
                  
                  <button
                    onClick={() => setShowReactivationModal(false)}
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };


  useEffect(() => {
    if (success) {
      // After 4 seconds, close modal 
      const timer = setTimeout(() => {
        setShowReactivationModal(false);
        setSuccess(false);
        navigate('/dashboard');
      }, 4000);
    
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);


  // Error Alert Component
  const ErrorAlert = ({ message, onClose }) => (
    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
      <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-sm text-red-700 font-medium">{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="text-red-400 hover:text-red-600">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );




  return (
    <>
      <div className="bg-white w-full h-full flex flex-col items-start justify-center min-h-screen">
        {errorMessage ? (
          <ErrorDisplay />
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
                {editMode ? (
                  <div className="p-8 w-full">
                    {/* Error Alert */}
                    {validationError && (
                      <ErrorAlert 
                        message={validationError} 
                        onClose={() => setValidationError(false)} 
                      />
                    )}


                    <h3 className="text-lg text-center font-semibold text-gray-900 mb-6">
                      Apartment Images ({getAllImages().length}/5 minimum)
                    </h3>
                
                    {/* Current Images Display */}
                    {getAllImages().length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                        {/* Existing URLs */}
                        {editedData.uploadedImages
                          .filter(img => typeof img === 'string' && !imagesToRemove.includes(img))
                          .map((imageUrl, idx) => (
                          <div key={`existing-${idx}`} className="relative group">
                            <img
                              src={imageUrl}
                              alt={`existing-${idx}`}
                              className="w-full h-32 object-cover rounded-lg border border-gray-200"
                            />
                            <button
                              onClick={() => {
                                const originalIndex = editedData.uploadedImages.findIndex(img => img === imageUrl);
                                handleRemoveImage(originalIndex);
                              }}
                              className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg cursor-pointer"
                            >
                              <X className="w-4 h-4" />
                            </button>
                            <div className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                              Existing
                            </div>
                          </div>
                        ))}
                        
                        {/* New Files */}
                        {newImages.map((file, idx) => {
                          const imageUrl = URL.createObjectURL(file);
                          return (
                            <div key={`new-${idx}`} className="relative group">
                              <img
                                src={imageUrl}
                                alt={`new-${idx}`}
                                className="w-full h-32 object-cover rounded-lg border border-gray-200"
                              />
                              <button
                                onClick={() => {
                                  setNewImages(prev => prev.filter((_, i) => i !== idx));
                                }}
                                className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg cursor-pointer"
                              >
                                <X className="w-4 h-4" />
                              </button>
                              <div className="absolute bottom-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                                New
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Upload Area */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-cyan-400 transition-colors duration-200">
                      <div className="flex flex-col items-center">
                        <Upload className="w-12 h-12 text-gray-400 mb-4" />
                        <label className="cursor-pointer">
                          <span className="text-cyan-400 hover:text-cyan-500 hover:underline font-medium">Upload new images</span>
                          <span className="text-gray-500"> or drag and drop</span>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                        <p className="text-sm text-gray-400 mt-2">PNG, JPG up to 10MB each</p>
                      </div>
                    </div>

                    {/* Progress Bar for Upload */}
                    {isReactivating && uploadProgress > 0 && (
                      <div className="mt-4 w-full">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>Uploading and reactivating...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-cyan-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Info Tips */}
                    <div className="mt-8 space-y-4">
                      <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl">
                        <p className="text-sm text-sky-700 leading-6">
                          <span className="font-medium">Tip:</span> The first image will be used as the main listing photo. 
                          You can re-order images by removing and re-adding them in your preferred order. A minimum of <b>5</b> images is required.
                        </p>
                      </div>
                      
                      {getAllImages().length < 5 && (
                        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                          <p className="text-sm text-amber-700">
                            <span className="font-medium">Warning:</span> You need at least 5 images to reactivate the listing. 
                            Currently you have {getAllImages().length} images.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div 
                    className="relative w-full h-[280px] overflow-hidden mb-4"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >   
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
                        <ChevronLeft className="w-6 h-6 text-gray-600" />
                      </button>
                    )}
                    {isHovered && currentImg < totalImages - 1 && (
                      <button onClick={handleNext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white opacity-90 p-2 rounded-full shadow cursor-pointer">
                        <ChevronRight className="w-6 h-6 text-gray-600" />
                      </button>
                    )}
                    <div className="absolute bottom-4 right-4 bg-black/50 text-white text-sm font-bold px-3 py-[4px] rounded">
                      {currentImg + 1} / {totalImages}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className={`flex items-center gap-3 mb-4 ${!editMode ? "justify-start ml-2" : "ml-12"}`}>
                {editMode ? (
                  <>
                    <button 
                      onClick={handleReactivation}
                      disabled={isReactivating || getAllImages().length < 5}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 shadow-sm focus:invisible cursor-pointer ${
                        isReactivating || getAllImages().length < 5
                          ? 'bg-gray-400 text-white cursor-not-allowed'
                          : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700'
                      }`}
                    >
                      {isReactivating ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Reactivating...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Reactivate Listing
                        </>
                      )}
                    </button>
                    <button 
                      onClick={handleCancel}
                      disabled={isReactivating}
                      className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 cursor-pointer focus:invisible disabled:opacity-50"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </>
                ) : (
                  <div className="flex items-center gap-3 justify-start">
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
      <ReactivationModal />
    </>
  );
}

export default DeactivatedListingInfo;