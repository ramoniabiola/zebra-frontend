import React from 'react';



const Step4_UploadImages = ({ formData, setFormData, handleFileChange }) => {

  const handleRemoveImage = (indexToRemove) => {
    const updatedImages = formData.images.filter((_, idx) => idx !== indexToRemove);

    setFormData((prev) => ({
      ...prev,
      images: updatedImages,
    }));
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Upload Apartment Images</h2>
      <input
        type="file"
        name="images"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-700 border border-gray-300 p-4 rounded-md cursor-pointer bg-gray-100 focus:outline-none"
        required
      />

      {/* Apartment Images Preview */}
      {formData.images.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mt-8">
          {formData.images.map((file, idx) => {
            const isFile = file instanceof File;
          
            return (
              <div key={idx} className="relative w-full h-28">
                {isFile ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`preview-${idx}`}
                    className="w-full h-full object-cover rounded  border border-gray-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-500 border rounded">
                    Not a valid image file
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-1 right-1 bg-black opacity-70 shadow text-white rounded-full w-5 h-5 flex items-center justify-center text-xs cursor-pointer"
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>
      )} 
    </div>
  );
};

export default Step4_UploadImages;
