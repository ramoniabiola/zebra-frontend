import React, { useState } from "react";


const Step3_ContactAmenities = ({ formData, setFormData, handleChange }) => {
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
    setFormData({ ...formData, apartment_amenities: updated });
  };



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

    
      {/* Contact Name */}
      <input
        type="text"
        name="contact_name"
        value={formData.contact_name}
        onChange={handleChange}
        placeholder="Contact Name"
        className="input-field"
        required
      />

       {/* Amenities Tag Input */}
      <div>
        <div className="flex gap-2">
          <input
            type="text"
            value={amenityInput}
            onChange={(e) => setAmenityInput(e.target.value)}
            placeholder="Add an amenity"
            className="input-field flex-1"
          />
          <button
            type="button"
            onClick={handleAmenityAdd}
            className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded cursor-pointer focus:invisible"
          >
            Add
          </button>
        </div>

        {/* Show list of tags */}
        <div className="flex flex-wrap mt-3 gap-2">
          {formData.apartment_amenities.map((item, index) => (
            <div
              key={index}
              className="bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md flex items-center gap-2"
            >
              <span>{item}</span>
              <button
                type="button"
                onClick={() => handleAmenityDelete(index)}
                className="text-red-500 hover:text-red-600 cursor-pointer"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>

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
          className="w-5 h-5 text-indigo-600 foucs:invisible"
        />
        Furnished
      </label>
    </div>
  );
};

export default Step3_ContactAmenities;
