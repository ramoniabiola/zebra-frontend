import React from 'react';

const Step1_ApartmentInfo = ({ formData, handleChange }) => {

    return (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Apartment Information</h2>

            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Listing Title"
                className="input-field"
                required
            />

            <select
                name="apartment_type"
                value={formData.apartment_type}
                onChange={handleChange}
                className="input-field"
                required
            >
                <option value="">Select Apartment Type</option>
                <option value="self-contained">Self-contained</option>
                <option value="1-bedroom">1 Bedroom</option>
                <option value="2-bedroom">2 Bedroom</option>
                <option value="3-bedroom">3 Bedroom</option>
                <option value="semi-detached-duplex">Semi-detached Duplex</option>
                <option value="detached-duplex">Detached Duplex</option>
                <option value="studio">Studio</option>
                <option value="shared-apartment">Shared Apartment</option>
            </select>

            <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location (City/Area)"
                className="input-field"
                required
            />

            <input
                type="text"
                name="apartment_address"
                value={formData.apartment_address}
                onChange={handleChange}
                placeholder="Full Apartment Address"
                className="input-field"
                required
            />

            <input
                type="text"
                name="nearest_landmark"
                value={formData.nearest_landmark}
                onChange={handleChange}
                placeholder="Nearest Landmark (Optional)"
                className="input-field"
            />
        </div>
    );
};

export default Step1_ApartmentInfo;
