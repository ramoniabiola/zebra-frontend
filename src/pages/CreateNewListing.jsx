import { useEffect, useState } from 'react';
import Step1_ApartmentInfo from './steps/Step1_ApartmentInfo';
import Step2_PricingDuration from './steps/Step2_PricingDuration';
import Step3_ContactAmenities from './steps/Step3_ContactAmenities';
import Step4_UploadImages from './steps/Step4_UploadImages';
import StepIndicator from './steps/StepIndicator';
import Footer from '../components/Footer';
import Footerbar from '../components/Footerbar';
import { AlertCircle, ArrowLeft, CheckCircle, Eye, Loader2, Upload, X } from 'lucide-react';
import { uploadApartmentImagesApi } from '../api/apartments';
import PreviewListing from './PreviewListing';




const CreateNewListing = () => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [showError, setShowError] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('idle'); // 'idle', 'uploading', 'success', 'error'
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [imagesUploaded, setImagesUploaded] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    apartment_type: '',
    price: '',
    payment_frequency: '',
    duration: '',
    location: '',
    apartment_address: '',
    nearest_landmark: '',
    contact_phone: '',
    contact_name: '',
    apartment_amenities: [],
    bedrooms: '',
    bathrooms: '',
    apartment_size: '',
    furnished: false,
    service_charge: '',
    images: [],
    uploadedImages: [], // Store uploaded image URLs
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  

  // Apartment data error validation handler
  const validateStep = (stepNumber) => {
    const newErrors = {};
    
    switch (stepNumber) {
      case 1:
        if (!formData.title.trim()) newErrors.title = 'Listing title is required';
        if (!formData.apartment_type) newErrors.apartment_type = 'Apartment type is required';
        if (!formData.location.trim()) newErrors.location = 'Location is required';
        if (!formData.apartment_address.trim()) newErrors.apartment_address = 'Address is required';
        break;
      case 2:
        if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
        if (!formData.payment_frequency) newErrors.payment_frequency = 'Payment frequency is required';
        if (!formData.duration.trim()) newErrors.duration = 'Duration is required';
        break;
      case 3:
        if (!formData.contact_name.trim()) newErrors.contact_name = 'Contact name is required';
        if (!formData.contact_phone.trim()) newErrors.contact_phone = 'Phone number is required';
        if (!formData.bedrooms || formData.bedrooms < 0) newErrors.bedrooms = 'Number of bedrooms is required';
        if (!formData.bathrooms || formData.bathrooms < 0) newErrors.bathrooms = 'Number of bathrooms is required';
        break;
      case 4:
        // Only validate images if upload button is clicked, not on initial render
        break;
    }
    
    return newErrors;
  };



  // Steps Handler
  const nextStep = () => {
    const stepErrors = validateStep(step);
    
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      setShowError(true);
      // Auto-hide error after 5 seconds
      setTimeout(() => setShowError(false), 5000);
      return;
    }
    
    setErrors({});
    setShowError(false);
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setErrors({});
    setShowError(false);
    setStep((prev) => Math.max(prev - 1, 1));
  };


  // Navigate to specific step (for preview page back functionality)
  const goToStep = (targetStep) => {
    setErrors({});
    setShowError(false);
    setStep(targetStep);
  };



  // FormData change handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  
  // Apartment Images handler
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const updatedImages = [...formData.images, ...files];
    setFormData((prev) => ({
      ...prev,
      images: updatedImages,
    }));
    
    // Clear any existing image errors
    if (errors.images) {
      setErrors(prev => ({ ...prev, images: undefined }));
    }
  };


  // Handle drag and drop for images
  const handleImageDrop = (files) => {
    const updatedImages = [...formData.images, ...files];
    setFormData((prev) => ({
      ...prev,
      images: updatedImages,
    }));
    
    if (errors.images) {
      setErrors(prev => ({ ...prev, images: undefined }));
    }
  };

  // Remove image handler
  const handleRemoveImage = (indexToRemove) => {
    const updatedImages = formData.images.filter((_, idx) => idx !== indexToRemove);
    setFormData((prev) => ({
      ...prev,
      images: updatedImages,
    }));
  };

  // Handle image swapping/reordering
  const handleImageReorder = (fromIndex, toIndex) => {
    setFormData(prev => {
      const newImages = [...prev.images];

      const temp = newImages[fromIndex];
      newImages[fromIndex] = newImages[toIndex];
      newImages[toIndex] = temp;

      return {
        ...prev,
        images: newImages
      };
    });
  };



  // Apartment Images upload to cloud handler
  const handleUploadImages = async () => {

    // Validate images before upload
    if (formData.images.length > 15) {
      setErrors({ images: 'Exceeded maximum requirement of 15 images' });
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      return;
    }

    if (formData.images.length < 5) {
      setErrors({ images: 'At least 5 images are required' });
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      return;
    }

  
    setUploadStatus('uploading');
    setShowUploadModal(true);
    setUploadError('');

    try {
      const uploadFormData = new FormData();
      formData.images.forEach((image) => {
        uploadFormData.append("images", image);
      });

      // Simulate apartment upload API call
      const response = await uploadApartmentImagesApi(uploadFormData);
      if (response.status >= 200 && response.status < 300) {
        const result = response.data;

        // Update form data with uploaded image URLs
        setFormData(prev => ({
          ...prev,
          uploadedImages: result.uploadedImages || []
        }));

        setUploadStatus('success');
        setImagesUploaded(true);

        // Auto close modal after 3 seconds on success
        setTimeout(() => {
          setShowUploadModal(false);
        }, 3000);  
      } else { 
        // If the response status is not in the success range, handle the error
        throw new Error(response.data?.error || 'Upload failed');
      }   
    } catch (error) {
      console.error('Upload error:', error.response?.data?.error);
      setUploadStatus('error');
      setUploadError(error.response?.data?.error || 'Failed to upload images. Please try again.');
    }
  };


  // Navigate to preview page
  const handlePreviewInfo = () => {
    setShowPreview(true);
  };

  // Handle back from preview
  const handleBackFromPreview = (targetStep) => {
    setShowPreview(false);
    goToStep(targetStep);
  };


  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1_ApartmentInfo formData={formData} handleChange={handleChange} errors={errors} />;
      case 2:
        return <Step2_PricingDuration formData={formData} handleChange={handleChange} errors={errors} />;
      case 3:
        return <Step3_ContactAmenities formData={formData} setFormData={setFormData} handleChange={handleChange} errors={errors} />;
      case 4:
        return (
          <Step4_UploadImages 
            formData={formData} 
            handleFileChange={handleFileChange}
            handleRemoveImage={handleRemoveImage}
            handleImageDrop={handleImageDrop}
            handleImageReorder={handleImageReorder}
            errors={errors} 
            showError={showError}
            imagesUploaded={imagesUploaded}
          />
        )
      default:
        return null;
    }
  };


  // Navigate to the preview listing page
  if (showPreview) {
    return (
      <PreviewListing 
        formData={formData}
        onBackToStep={handleBackFromPreview}
      />
    );
  }


  const getErrorMessage = () => {
    const errorCount = Object.keys(errors).length;
    if (errorCount === 0) return '';
    
    if (errorCount === 1) {
      return 'Please fix the error below to continue.';
    }
    return `Please fix the ${errorCount} errors below to continue.`;
  };

  // Error Alert Component
  const ErrorAlert = ({ message, onClose }) => (
    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 animate-in slide-in-from-top-2 duration-300">
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


  // Upload Modal
  const UploadModal = () => {
    if (!showUploadModal) return null;

    return (
      <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative">
          {uploadStatus !== 'uploading' && (
            <button
              onClick={() => setShowUploadModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="text-center">
            {uploadStatus === 'uploading' && (
              <>
                <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Loader2 className="w-8 h-8 text-sky-600 animate-spin" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Uploading Images</h3>
                <p className="text-gray-600 text-base">Please wait while we upload your images...</p>
              </>
            )}

            {uploadStatus === 'success' && (
              <>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Upload Successful!</h3>
                <p className="text-gray-600 text-base">All images have been uploaded successfully.</p>
              </>
            )}

            {uploadStatus === 'error' && (
              <>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Upload Failed</h3>
                <p className="text-gray-600 text-base mb-4">{uploadError}</p>
                <button
                  onClick={handleUploadImages}
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
    <div className="w-full h-full min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 fixed top-0 left-0 right-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => window.history.back()}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors duration-200 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-gray-800">Create New Listing</h1>
              <p className="text-sm text-gray-500">Step {step} of 4</p>
            </div>
          </div>
        </div>
      </div>
  
      <div className="max-w-4xl mx-4 py-8 mt-20">
        {/* Step Indicator */}
        <StepIndicator currentStep={step} />
  
        {/* Error Alert */}
        {showError && Object.keys(errors).length > 0 && (
          <ErrorAlert 
            message={getErrorMessage()} 
            onClose={() => setShowError(false)} 
          />
        )}

        {/* Form */}
        <div className="bg-white mx-auto rounded-2xl  border border-gray-100 overflow-hidden">
          <form  className="max-w-2xl px-4 py-8">
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-6 pt-8 border-t border-gray-100">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer focus:invisible"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back
                </button>
              ) : (
                <div></div>
              )}
              
              {step < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-3 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer focus:invisible"
                >
                  Continue
                  <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                </button>
              ) : step === 4 && !imagesUploaded ? (
                <button
                  type="button"
                  onClick={handleUploadImages}
                  disabled={uploadStatus === 'uploading'}
                  className="px-4 py-2.5 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 disabled:from-sky-400 disabled:to-sky-400 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer focus:invisible disabled:cursor-not-allowed"
                >
                  {uploadStatus === 'uploading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      Upload
                    </>
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePreviewInfo}
                  className="px-4 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer focus:invisible"
                >
                  <Eye className="w-4 h-4" />
                  Preview Info
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Upload Modal */}
      <UploadModal />

      <Footerbar /> 
      <Footer />
    </div>
  );
};

export default CreateNewListing;
