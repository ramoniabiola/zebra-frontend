import { Plus, X, User, Phone, Bed, Bath, Maximize2, Sofa, Sparkles } from "lucide-react";
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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAmenityAdd();
    }
  };

  const handleAmenityDelete = (index) => {
    const updated = formData.apartment_amenities.filter((_, i) => i !== index);
    setFormData({ ...formData, apartment_amenities: updated });
  };


  return (
    <div className="flex flex-col gap-5">

      {/* ── SECTION HEADER ── */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-700 via-cyan-800 to-cyan-900 px-5 py-7 md:px-7 shadow-lg">
        <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-white/5" />
        <div className="absolute -bottom-10 -left-6 w-40 h-40 rounded-full bg-white/5" />
        <div className="absolute top-4 right-20 w-8 h-8 rounded-full bg-cyan-500/40" />

        <div className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 flex-shrink-0 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 shadow-md">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-cyan-300 mb-1.5 bg-white/10 px-2.5 py-0.5 rounded-full">
              Step 3 of 4
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-white leading-snug">Contact & Property Details</h2>
            <p className="text-cyan-100/70 text-xs md:text-sm mt-0.5">Add contact info, room counts and amenities</p>
          </div>
        </div>
      </div>


      {/* ── CONTACT INFO ── */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 md:px-6 border-b border-stone-200 flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-cyan-100/80 flex items-center justify-center flex-shrink-0">
            <User className="w-3.5 h-3.5 text-cyan-600" />
          </div>
          <h3 className="font-semibold text-gray-950 text-base md:text-lg">Contact Information</h3>
        </div>
        <div className="p-5 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Contact Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-600 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-gray-400" />
              Contact Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="contact_name"
              value={formData.contact_name}
              onChange={handleChange}
              placeholder="Your full name"
              className={`w-full border rounded-xl px-4 py-3 text-sm md:text-base font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 ${
                errors?.contact_name
                  ? "border-red-300 bg-red-50 text-red-700"
                  : "border-stone-200 bg-stone-50 text-gray-700 hover:border-stone-300"
              }`}
            />
            {errors?.contact_name && (
              <p className="text-xs text-red-600 font-medium">{errors.contact_name}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-600 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-gray-400" />
              Phone Number <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="contact_phone"
              value={formData.contact_phone}
              onChange={handleChange}
              placeholder="+234 XXX XXX XXXX"
              className={`w-full border rounded-xl px-4 py-3 text-sm md:text-base font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 ${
                errors?.contact_phone
                  ? "border-red-300 bg-red-50 text-red-700"
                  : "border-stone-200 bg-stone-50 text-gray-700 hover:border-stone-300"
              }`}
            />
            {errors?.contact_phone && (
              <p className="text-xs text-red-600 font-medium">{errors.contact_phone}</p>
            )}
          </div>
        </div>
      </div>


      {/* ── ROOM DETAILS ── */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 md:px-6 border-b border-stone-200 flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-100/80 flex items-center justify-center flex-shrink-0">
            <Bed className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <h3 className="font-semibold text-gray-950 text-base md:text-lg">Room Details</h3>
        </div>
        <div className="p-5 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Bedrooms */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-600 flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-gray-400" />
              Bedrooms <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              placeholder="0"
              min="0"
              className={`w-full border rounded-xl px-4 py-3 text-sm md:text-base font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 ${
                errors?.bedrooms
                  ? "border-red-300 bg-red-50 text-red-700"
                  : "border-stone-200 bg-stone-50 text-gray-700 hover:border-stone-300"
              }`}
            />
            {errors?.bedrooms && (
              <p className="text-xs text-red-600 font-medium">{errors.bedrooms}</p>
            )}
          </div>

          {/* Bathrooms */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-600 flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5 text-gray-400" />
              Bathrooms <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              placeholder="0"
              min="0"
              className={`w-full border rounded-xl px-4 py-3 text-sm md:text-base font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 ${
                errors?.bathrooms
                  ? "border-red-300 bg-red-50 text-red-700"
                  : "border-stone-200 bg-stone-50 text-gray-700 hover:border-stone-300"
              }`}
            />
            {errors?.bathrooms && (
              <p className="text-xs text-red-600 font-medium">{errors.bathrooms}</p>
            )}
          </div>

          {/* Apartment Size */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-600 flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-gray-400" />
              Size
              <span className="text-[10px] bg-stone-100 text-slate-500 border border-stone-200 px-1.5 py-0.5 rounded-full font-medium ml-1">
                Optional
              </span>
            </label>
            <input
              type="text"
              name="apartment_size"
              value={formData.apartment_size}
              onChange={handleChange}
              placeholder="e.g., 120 sqm"
              className="w-full border border-stone-200 bg-stone-50 rounded-xl px-4 py-3 text-sm md:text-base font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent hover:border-stone-300 transition-all duration-200 placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>


      {/* ── FURNISHED TOGGLE ── */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 md:px-6 border-b border-stone-200 flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-violet-100/80 flex items-center justify-center flex-shrink-0">
            <Sofa className="w-3.5 h-3.5 text-violet-600" />
          </div>
          <h3 className="font-semibold text-gray-950 text-base md:text-lg">Furnished Property</h3>
        </div>
        <div className="p-5 md:p-6">
          <label className="flex items-center gap-4 cursor-pointer group">
            <div className="relative flex-shrink-0">
              <input
                type="checkbox"
                name="furnished"
                checked={formData.furnished}
                onChange={handleChange}
                className="sr-only"
              />
              <div className={`w-12 h-6 rounded-full transition-all duration-300 ${
                formData.furnished ? "bg-cyan-700 shadow-md" : "bg-stone-200"
              }`}>
                <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 mt-0.5 ${
                  formData.furnished ? "translate-x-6" : "translate-x-0.5"
                }`} />
              </div>
            </div>
            <div>
              <p className="text-sm md:text-base font-semibold text-gray-800">
                {formData.furnished ? "This property comes furnished" : "This property is unfurnished"}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">Toggle on if the apartment includes furniture</p>
            </div>
          </label>
        </div>
      </div>


      {/* ── AMENITIES ── */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 md:px-6 border-b border-stone-200 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-100/80 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <h3 className="font-semibold text-gray-950 text-base md:text-lg">Amenities & Features</h3>
          </div>
          {formData.apartment_amenities.length > 0 && (
            <span className="text-xs bg-stone-200 text-slate-600/70 px-2.5 py-1 rounded-full font-medium flex-shrink-0">
              {formData.apartment_amenities.length} added
            </span>
          )}
        </div>
        <div className="p-5 md:p-6 flex flex-col gap-4">

          {/* Input row */}
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              value={amenityInput}
              onChange={(e) => setAmenityInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g., WiFi, Parking, Generator..."
              className="flex-1 border border-stone-200 bg-stone-50 rounded-xl px-4 py-3 text-sm md:text-base font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent hover:border-stone-300 transition-all duration-200 placeholder:text-gray-400"
            />
            <button
              type="button"
              onClick={handleAmenityAdd}
              className="flex-shrink-0 flex items-center gap-1.5 px-4 py-3 bg-cyan-700 hover:bg-cyan-800 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>

          {/* Tags */}
          {formData.apartment_amenities.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {formData.apartment_amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 bg-stone-100/60 border border-stone-200 hover:bg-stone-100 rounded-xl transition-all duration-200"
                >
                  <span className="text-sm font-semibold text-slate-700">{amenity}</span>
                  <button
                    type="button"
                    onClick={() => handleAmenityDelete(index)}
                    className="text-slate-400 hover:text-red-500 transition-colors duration-200 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400 text-center py-2">
              No amenities added yet — type one above and press Add or hit Enter
            </p>
          )}

        </div>
      </div>

    </div>
  );
};

export default Step3_ContactAmenities;