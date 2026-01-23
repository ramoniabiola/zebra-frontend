

const Step1_ApartmentInfo = ({ formData, handleChange, errors }) => {


  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-800">Apartment Information</h2>
        <p className="text-gray-500 text-sm lg:text-base">Tell us about the apartment</p>
      </div>
      
      <div className="space-y-6 lg:space-y-8">
        <div>
          <label className="block text-base lg:text-lg font-semibold text-gray-700 mb-2">
            Listing Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Beautiful 2BR Apartment in VI"
            className={`w-full px-4 py-3 border text-sm lg:text-base rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 ${
              errors?.title ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
            }`}
          />
          {errors?.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-base lg:text-lg font-semibold text-gray-700 mb-2">
            Apartment Type *
          </label>
          <select
            name="apartment_type"
            value={formData.apartment_type}
            onChange={handleChange}
            className={`w-full px-4 py-3 border text-sm lg:text-base rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 ${
              errors?.apartment_type ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <option value="">Select Apartment Type</option>
            <option value="self-contained">Self-contained</option>
            <option value="1-bedroom">1 Bedroom</option>
            <option value="2-bedroom">2 Bedroom</option>
            <option value="3-bedroom">3 Bedroom</option>
            <option value="4-bedroom">4 Bedroom</option>
            <option value="5-bedroom">5 Bedroom</option>
            <option value="semi-detached-duplex">Semi-detached Duplex</option>
            <option value="duplex">Duplex</option>
            <option value="studio">Studio</option>
            <option value="mini-flat">Mini-Flat</option>
            <option value="shared-apartment">Shared Apartment</option>
          </select>
          {errors?.apartment_type && <p className="mt-1 text-sm text-red-600">{errors.apartment_type}</p>}
        </div>

        <div>
          <label className="block text-base lg:text-lg font-semibold text-gray-700 mb-2">
            Location (City/Area) *
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., Victoria Island, Lagos"
            className={`w-full px-4 py-3 border text-sm lg:text-base rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 ${
              errors?.location ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
            }`}
          />
          {errors?.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
        </div>

        <div>
          <label className="block text-base lg:text-lg font-semibold text-gray-700 mb-2">
            Full Apartment Address *
          </label>
          <input
            type="text"
            name="apartment_address"
            value={formData.apartment_address}
            onChange={handleChange}
            placeholder="e.g., 123 Ahmadu Bello Way, VI"
            className={`w-full px-4 py-3 border text-sm lg:text-base rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 ${
              errors?.apartment_address ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
            }`}
          />
          {errors?.apartment_address && <p className="mt-1 text-sm text-red-600">{errors.apartment_address}</p>}
        </div>

        <div>
          <label className="block text-base lg:text-lg font-semibold text-gray-700 mb-2">
            Nearest Landmark <span className="text-gray-400">(Optional)</span>
          </label>
          <input
            type="text"
            name="nearest_landmark"
            value={formData.nearest_landmark}
            onChange={handleChange}
            placeholder="e.g., Near Shoprite"
            className="w-full px-4 py-3 border text-sm lg:text-base border-gray-300 rounded-xl  focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent hover:border-gray-400 transition-all duration-200"
          />
        </div>
      </div>
    </div>
  );
};

export default Step1_ApartmentInfo;