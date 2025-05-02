import React from 'react';

const Step2_PricingDuration = ({ formData, handleChange }) => {


    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Pricing & Duration</h2>

            <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price (₦)"
                className="input-field"
                required
            />

            <select
                name="payment_frequency"
                value={formData.payment_frequency}
                onChange={handleChange}
                className="input-field"
                required
            >
                <option value="">Select Payment Frequency</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
            </select>

            <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="Minimum Duration (e.g. 1 Year)"
                className="input-field"
                required
            />

            <input
                type="number"
                name="service_charge"
                value={formData.service_charge}
                onChange={handleChange}
                placeholder="Service Charge (₦, Optional)"
                className="input-field"
            />
        </div>
    );
};

export default Step2_PricingDuration;
