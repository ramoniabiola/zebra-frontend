import React, { useState } from 'react';
import Step1_ApartmentInfo from './steps/Step1_ApartmentInfo';
import Step2_PricingDuration from './steps/Step2_PricingDuration';
import Step3_ContactAmenities from './steps/Step3_ContactAmenities';
import Step4_UploadImages from './steps/Step4_UploadImages';
import StepIndicator from './steps/StepIndicator';
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Footer from '../components/Footer';
import Footerbar from '../components/Footerbar';
import { useNavigate } from 'react-router-dom';




const CreateNewListing = () => {
  const [step, setStep] = useState(1);
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
  });
  const navigate = useNavigate();



  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const updatedImages = [...formData.images, ...files];

    setFormData((prev) => ({
      ...prev,
      images: updatedImages,
    }));
  };
 
  // const handleUploadImages = async () => {
    // const formData = new FormData();
    // selectedImages.forEach((image) => {
      // formData.append("images", image);
    // });
  // 
    // const res = await axios.post("/api/apartments/upload", formData, {
      // headers: { "Content-Type": "multipart/form-data" },
    // });
  // 
    // Store returned URLs
    // setFormData({ ...formData, images: res.data.uploadedImages });
  // };


  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Form Data:', formData);
    // Call API or show success toast here
  };


  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1_ApartmentInfo formData={formData} handleChange={handleChange} />;
      case 2:
        return <Step2_PricingDuration formData={formData} handleChange={handleChange} />;
      case 3:
        return <Step3_ContactAmenities formData={formData} setFormData={setFormData} handleChange={handleChange} />;
      case 4:
        return <Step4_UploadImages formData={formData} setFormData={setFormData} handleFileChange={handleFileChange}  />;
      default:
      return null;
    }
  };
 

  return (
    <div className="w-full h-full flex flex-col items-start justify-center min-h-screen">
      {/* Header */}
      <div className="w-full h-20 flex items-center gap-2 px-4 bg-white mb-8 mt-2">
        <button  onClick={() => navigate(-1)}  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full focus:invisible">
          <ArrowLeftIcon className="w-6 h-6 text-gray-700 cursor-pointer" />
        </button>
        <h1 className="text-[26px] font-bold text-gray-800">Create New Listing</h1>
      </div>

      {/* Step Indicator */}
      <div className='w-full max-w-2xl mx-auto px-4'> 
        <StepIndicator currentStep={step} />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto p-6 mt-6 space-y-6 mb-8">
        {renderStep()}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-2 bg-gray-200 text-gray-700  hover:bg-gray-300 rounded font-semibold cursor-pointer focus:invisible"
            >
              Back
            </button>
          )}
          {step < 5 ? (
            <button
              type="button"
              onClick={nextStep}
              className="ml-auto px-6 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold rounded hover:bg-cyan-700 cursor-pointer focus:invisible"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="ml-auto px-6 py-2 bg-gradient-to-r from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-white rounded  font-semibold hover:bg-emerald-600 cursor-pointer focus:invisible"
            >
              Submit Listing
            </button>
          )}
        </div>
      </form>
      <Footerbar /> 
      <Footer />
    </div>
  )
};

export default CreateNewListing;
