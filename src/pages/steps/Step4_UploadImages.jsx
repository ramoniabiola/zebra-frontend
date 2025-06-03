import React from 'react'
import { Plus, X }  from 'lucide-react';



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
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <div className="flex flex-col items-center">
          <Plus className="w-12 h-12 text-gray-400 mb-4" />
          <label className="cursor-pointer">
            <span className="text-cyan-400 hover:text-cyan-500 hover:underline font-medium">Upload images</span>
            <span className="text-gray-500"> or drag and drop</span>
            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              required
            />
          </label>
          <p className="text-sm text-gray-400 mt-2">PNG, JPG up to 10MB</p>
        </div>
      </div>

      {/* Apartment Images Preview */}
      {formData.images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {formData.images.map((file, idx) => {
            const isFile = file instanceof File;
           
            return (
              <div key={idx} className="relative group">
                {isFile ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`preview-${idx}`}
                    className="w-full h-32 object-cover rounded-lg border border-gray-200"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-500 border rounded">
                    Not a valid image file
                  </div>
                )}
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
    </div>
  );
};

export default Step4_UploadImages;
