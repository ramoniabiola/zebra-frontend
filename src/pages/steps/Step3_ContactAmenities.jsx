import { Plus, X } from "lucide-react";
import { useState } from "react";

const Step3_ContactAmenities = ({ formData, setFormData, handleChange, errors }) => {
  const [amenityInput, setAmenityInput] = useState("");

  const handleAmenityAdd = () => {
    const trimmed = amenityInput.trim();
    if (trimmed && !formData.apartment_amenities.includes(trimmed)) {
      setFormData({
        ...formData,
        apartment_amenities: [...formData.apartment_amenities, trimmed],
      });
      setAmenityInput("");
    }
  };

  const handleAmenityDelete = (index) => {
    const updated = formData.apartment_amenities.filter((_, i) => i !== index);
      setFormData({ ...formData,  apartment_amenities: updated });
    };

    

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-1">Contact & Property Details</h2>
        <p className="text-gray-600 text-sm">Add contact information and amenities</p>
      </div>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Contact Name *
            </label>
            <input
              type="text"
              name="contact_name"
              value={formData.contact_name}
              onChange={handleChange}
              placeholder="Your full name"
              className={`w-full px-4 py-3 border text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 ${
                errors?.contact_name ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
              }`}
            />
            {errors?.contact_name && <p className="mt-1 text-sm text-red-600">{errors.contact_name}</p>}
          </div>

          <div>
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="text"
              name="contact_phone"
              value={formData.contact_phone}
              onChange={handleChange}
              placeholder="+234 XXX XXX XXXX"
              className={`w-full px-4 py-3 border text-sm  rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 ${
                errors?.contact_phone ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
              }`}
            />
            {errors?.contact_phone && <p className="mt-1 text-sm text-red-600">{errors.contact_phone}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Bedrooms *
            </label>
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              placeholder="0"
              min="0"
              className={`w-full px-4 py-3 border text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 ${
                errors?.bedrooms ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
              }`}
            />
            {errors?.bedrooms && <p className="mt-1 text-sm text-red-600">{errors.bedrooms}</p>}
          </div>

          <div>
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Bathrooms *
            </label>
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              placeholder="0"
              min="0"
              className={`w-full px-4 py-3 border text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 ${
                errors?.bathrooms ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
              }`}
            />
            {errors?.bathrooms && <p className="mt-1 text-sm text-red-600">{errors.bathrooms}</p>}
          </div>

          <div>
            <label className="block text-base font-semibold text-gray-700 mb-2">
              Size <span className="text-gray-400">(Optional)</span>
            </label>
            <input
              type="text"
              name="apartment_size"
              value={formData.apartment_size}
              onChange={handleChange}
              placeholder="e.g., 120 sqm"
              className="w-full px-4 py-3 border text-sm  border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent hover:border-gray-400 transition-all duration-200"
            />
          </div>
        </div>

        {/* Furnished Toggle */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
          <label className="flex items-center cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                name="furnished"
                checked={formData.furnished}
                onChange={handleChange}
                className="sr-only"
              />
              <div className={`w-12 h-6 rounded-full transition-all duration-300 ${
                formData.furnished 
                  ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 shadow-lg shadow-cyan-500/30' 
                  : 'bg-gray-300'
              }`}>
                <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                  formData.furnished ? 'translate-x-6' : 'translate-x-0.5'
                } mt-0.5`} />
              </div>
            </div>
            <div className="ml-4">
              <span className="text-base font-semibold text-gray-700">Furnished Property</span>
              <p className="text-xs text-gray-500 mt-0.5">
                {formData.furnished ? 'This property comes furnished' : 'This property is unfurnished'}
              </p>
            </div>
          </label>
        </div>

        {/* Amenities */}
        <div className="w-full space-y-3">
          <label className="block text-base font-semibold text-gray-700">
            Amenities
          </label>
          <div className="w-full flex gap-2">
            <input
              type="text"
              value={amenityInput}
              onChange={(e) => setAmenityInput(e.target.value)}
              placeholder="Add an amenity..."
              className="flex-grow px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent hover:border-gray-400 transition-all duration-200 text-sm"
            />
            <button
              type="button"
              onClick={handleAmenityAdd}
              className="flex-shrink-0 px-3 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white text-sm rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-1"
            >
              <Plus strokeWidth={2} className="w-4 h-4" />
              Add
            </button>
          </div>

          

          {formData.apartment_amenities.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {formData.apartment_amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-cyan-50 to-cyan-100 border border-cyan-200 text-cyan-800 px-3 py-2 rounded-lg flex items-center gap-2 group hover:from-cyan-100 hover:to-cyan-200 transition-all duration-200"
                >
                  <span className="text-sm font-medium">{amenity}</span>
                  <button
                    type="button"
                    onClick={() => handleAmenityDelete(index)}
                    className="text-cyan-600 hover:text-red-500 transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default Step3_ContactAmenities;
