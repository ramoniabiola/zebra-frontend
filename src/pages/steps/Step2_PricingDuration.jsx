const Step2_PricingDuration = ({ formData, handleChange, errors }) => {

  return (
    <div className="space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-0.5">Pricing & Duration</h2>
          <p className="text-gray-600 text-sm">Set your rental terms</p>
        </div>

        <div className="space-y-6">
            <div>
                <label className="block text-base font-semibold text-gray-700 mb-2">
                    Rent Price *
                </label>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">₦</span>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="0"
                        className={`w-full pl-8 pr-4 py-3 border text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 ${
                          errors?.price ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                        }`}
                    />
                </div>
                {errors?.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
            </div>
                
            <div>
                <label className="block text-base font-semibold text-gray-700 mb-2">
                    Payment Frequency *
                </label>
                <select
                    name="payment_frequency"
                    value={formData.payment_frequency}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 ${
                      errors?.payment_frequency ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                >
                    <option value="">Select Payment Frequency</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                </select>
                {errors?.payment_frequency && <p className="mt-1 text-sm text-red-600">{errors.payment_frequency}</p>}
            </div>
              
            <div>
                <label className="block text-base font-semibold text-gray-700 mb-2">
                    Minimum Duration *
                </label>
                <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="e.g., 1 Year, 6 Months"
                    className={`w-full px-4 py-3 border text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 ${
                      errors?.duration ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                />
                {errors?.duration && <p className="mt-1 text-sm text-red-600">{errors.duration}</p>}
            </div>
              
            <div>
                <label className="block text-base font-semibold text-gray-700 mb-2">
                    Service Charge <span className="text-gray-400">(Optional)</span>
                </label>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">₦</span>
                    <input
                        type="number"
                        name="service_charge"
                        value={formData.service_charge}
                        onChange={handleChange}
                        placeholder="0"
                        className="w-full pl-8 pr-4 py-3 border text-sm border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent hover:border-gray-400 transition-all duration-200"
                    />
                </div>
            </div>
        </div>
    </div>
  );
};


export default Step2_PricingDuration;
