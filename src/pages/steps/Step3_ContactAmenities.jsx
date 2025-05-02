import React from 'react';

const Step3_ContactAmenities = ({ formData, handleChange }) => {

    return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Contact & Amenities</h2>

      {/* Contact Phone */}
      <input
        type="text"
        name="contact_phone"
        value={formData.contact_phone}
        onChange={handleChange}
        placeholder="Contact Phone Number"
        className="input-field"
        required
      />

      {/* Apartment Amenities */}
      <textarea
        name="apartment_amenities"
        value={formData.apartment_amenities}
        onChange={handleChange}
        placeholder="Apartment Amenities (separate with commas)"
        rows={3}
        className="input-field"
      ></textarea>

      {/* Bedrooms */}
      <input
        type="number"
        name="bedrooms"
        value={formData.bedrooms}
        onChange={handleChange}
        placeholder="Number of Bedrooms"
        className="input-field"
        required
      />

      {/* Bathrooms */}
      <input
        type="number"
        name="bathrooms"
        value={formData.bathrooms}
        onChange={handleChange}
        placeholder="Number of Bathrooms"
        className="input-field"
        required
      />

      {/* Apartment Size */}
      <input
        type="text"
        name="apartment_size"
        value={formData.apartment_size}
        onChange={handleChange}
        placeholder="Apartment Size (e.g. 120 sqm)"
        className="input-field"
      />

      {/* Furnished Checkbox */}
      <label className="flex items-center gap-2 text-gray-700">
        <input
          type="checkbox"
          name="furnished"
          checked={formData.furnished}
          onChange={handleChange}
          className="w-5 h-5 text-indigo-600"
        />
        Furnished
      </label>
    </div>
  );
};

export default Step3_ContactAmenities;
