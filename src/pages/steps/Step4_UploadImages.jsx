import { Camera, X } from 'lucide-react';

const Step4_UploadImages = ({ 
  formData, 
  handleFileChange, 
  handleRemoveImage,
  handleImageDrop,
  errors, 
  showError,
  imagesUploaded
}) => {
  
  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length > 0) {
      handleImageDrop(imageFiles);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Only show error if showError is true (when upload button is clicked)
  const shouldShowError = showError && errors?.images;

  return (
    <div className="space-y-6">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-1.5">Upload Property Images</h2>
        <p className="text-gray-600">Add photos to showcase your property (minimum 5 images required)</p>
      </div>
      
      <div 
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
          shouldShowError
            ? 'border-red-300 bg-red-50' 
            : 'border-gray-300 hover:border-cyan-400 hover:bg-cyan-50/30'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="flex flex-col items-center">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${
            shouldShowError 
              ? 'bg-gradient-to-r from-red-400 to-red-500'
              : 'bg-gradient-to-r from-cyan-400 to-cyan-500'
          }`}>
            <Camera className="w-8 h-8 text-white" />
          </div>
          <label className="cursor-pointer group">
            <span className={`font-semibold text-lg group-hover:underline ${
              shouldShowError 
                ? 'text-red-600 hover:text-red-700'
                : 'text-cyan-600 hover:text-cyan-700'
            }`}>
              Choose images
            </span>
            <span className="text-gray-500 text-lg"> or drag and drop</span>
            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          <p className="text-sm text-gray-400 mt-2">PNG, JPG up to 10MB each</p>
          {shouldShowError && (
            <div className="mt-3 p-3 bg-red-100 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700 font-medium">{errors.images}</p>
            </div>
          )}
        </div>
      </div>

      {/* Image Counter */}
      <div className="flex flex-col gap-3 items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          Selected Images ({formData.images.length}/5 minimum)
        </h3>
        <div className={`px-3 py-2 rounded-full text-sm font-medium ${
          imagesUploaded 
            ? 'bg-green-100 text-green-700'
            :  formData.images.length >= 5 
            ? 'bg-sky-100 text-sky-700'
            : 'bg-orange-100 text-orange-700'
        }`}>
          { 
            imagesUploaded 
            ? 'Images Uploaded' 
            : formData.images.length >= 5 
            ? 'Ready to upload' 
            : `${5 - formData.images.length} more needed`
          }
        </div>
      </div>

      {formData.images.length > 0 && (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
            {formData.images.map((file, idx) => {
              const isFile = file instanceof File;
              return (
                <div key={idx} className="relative group">
                  {isFile ? (
                    <div className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`preview-${idx}`}
                        className="w-full h-32 object-cover rounded-xl border border-gray-200 shadow-sm group-hover:shadow-md transition-all duration-200"
                      />
                      <div className="absolute inset-0 bg-black/10 bg-opacity-0 group-hover:bg-opacity-10 rounded-xl transition-all duration-200" />
                    </div>
                  ) : (
                    <div className="w-full h-32 flex items-center justify-center text-xs text-gray-500 border border-gray-200 rounded-xl bg-gray-50">
                      Invalid image file
                    </div>
                  )}
                  <button
                    onClick={() => handleRemoveImage(idx)}
                    type="button"
                    className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110 cursor-pointer"
                    title="Remove image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  
                  {/* Image index indicator */}
                  <div className="absolute top-2 left-2 w-6 h-6 bg-black/50 bg-opacity-50 text-white text-xs rounded-full flex items-center justify-center">
                    {idx + 1}
                  </div>
                </div>
              );
            })}
          </div>
          
          {formData.images.length > 0 && (
            <div className="mt-8 p-4 bg-sky-50 border border-sky-200 rounded-xl">
              <p className="text-sm text-sky-700 leading-6">
                <span className="font-medium">Tip:</span> The first image will be used as the main listing photo. 
                You can re-order images by removing and re-adding them in your preferred order.also ensure the right 
                collection of images are picked before clicking the <b>"Upload"</b> button.
              </p>
            </div>
          )}
        </div>
      )}

      {formData.images.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Camera className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500">No images selected yet</p>
          <p className="text-sm text-gray-400 mt-1">Choose at least 5 images to continue</p>
        </div>
      )}
    </div>
  );
};

export default Step4_UploadImages;