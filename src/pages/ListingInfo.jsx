import React, { useState } from 'react'
import Footerbar from '../components/Footerbar';
import Footer from '../components/Footer';
import { apartmentInfoData } from "../utils/Data";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

const ListingInfo = () => {
  const apartment = apartmentInfoData[0]; // Static for now
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({ ...apartment });
  const [currentImg, setCurrentImg] = useState(0);
  const totalImages = apartment?.images?.length || 0;
  const [isHovered, setIsHovered] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
  
    setEditedData(prev => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const handleRemoveImage = (index) => {
    const updatedImages = editedData.images.filter((_, i) => i !== index);
    setEditedData(prev => ({ ...prev, images: updatedImages }));
  };


  const handleNext = () => {
    if (currentImg < totalImages - 1) {
      setCurrentImg((prev) => prev + 1);
    }
  };
   
  const handlePrev = () => {
    if (currentImg > 0) {
      setCurrentImg((prev) => prev - 1);
    }
  };
  

  return (
    <div className="w-full h-full flex flex-col items-start justify-center min-h-screen">
      {/* Section: Header */}
      <div className="w-full h-20 flex items-center justify-start pl-2 gap-2 bg-white">
        <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full focus:invisible">
          <ArrowLeftIcon className="w-6 h-6 text-gray-700 cursor-pointer" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Apartment Details</h1>
      </div>

      {/* Section: Apartment Details */}
      <div className='w-full h-full flex flex-col items-start justify-center mb-8'>
        {/* Images */}
        <div className='w-full flex flex-col items-start justify-center'>
          {editMode ? (
            <div className='w-full max-w-2xl mx-auto p-4 space-y-8 mb-4'>
              {/* Apartment Images Preview */}
              {editedData.images.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-8">
                  {editedData.images.map((file, idx) => {
                    const isFile = file instanceof File;
                    const imageUrl = isFile ? URL.createObjectURL(file) : file.img;
 
                    return (
                      <div key={idx} className="relative w-full h-28">
                        <img
                          src={imageUrl}
                          alt={`preview-${idx}`}
                          className="w-full h-full object-cover rounded border border-gray-300"
                          />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute top-1 right-1 bg-black opacity-50 shadow text-white rounded-full w-5 h-5 flex items-center justify-center text-xs cursor-pointer"
                          >
                          ✕
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              <input
                type="file"
                name="images"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-700 border border-gray-300 p-4 rounded-md cursor-pointer bg-gray-100 focus:outline-none"
              />
            </div>
          ) : (
            <div 
              className="relative w-full h-[280px] overflow-hidden mb-4"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >   
              {/* Image slider */}
              <div
                className="w-full h-full flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(${currentImg * - 100}%)`,
                }}
              >
                {apartment.images.map((image, index) => (
                  <img
                    key={index}
                    src={image.img}
                    alt={`apartment-${index}`}
                    className="w-full h-full object-cover"
                  />
                ))}
              </div> 
              {isHovered && currentImg > 0 && (
                <button onClick={handlePrev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white opacity-90 p-2 rounded-full shadow cursor-pointer">
                  <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
                </button>
              )}
              {isHovered && currentImg < totalImages - 1 && (
                <button onClick={handleNext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white opacity-90 p-2 rounded-full shadow cursor-pointer">
                  <ChevronRightIcon className="w-6 h-6 text-gray-600" />
                </button>
              )}
              {/* Image Count */}
              <div className="absolute bottom-4 right-4 bg-black/50 text-white text-sm font-bold px-3 py-[4px] rounded">
                {currentImg + 1} / {totalImages}
              </div>
            </div>
          )}
        </div>
        

        {/* Other Details */}
        <div className='w-full mx-auto p-4 bg-white'>
          {/* === Apartment info === */}
          <div className="mt-2">
            <h2 className="text-xl text-center font-bold text-gray-800 mb-4">Apartment Info</h2>
            <div className="space-y-8">
              {['title', 'apartment_type', 'location', 'apartment_address', 'nearest_landmark', 'bedrooms', 'bathrooms', 'apartment_size'].map((name) => (
                <div key={name}>
                  <label className={`block font-semibold text-lg capitalize ${editMode ? "text-gray-500" : "text-slate-400"}`}>{name}:</label>
                  {editMode ? (
                    <input
                      type="text"
                      name={name}
                      value={editedData[name]}
                      onChange={handleChange}
                      className="mt-1 block w-full border text-lg text-gray-800 font-medium border-gray-200 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  ) : (
                    <p className="mt-1 w-full bg-slate-100 text-slate-700 text-lg font-medium p-3 rounded-md">
                      {editedData[name]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Pricing & Duration */}
          <div className="mt-12">
            <h2 className="text-xl text-center font-bold text-gray-800 mb-4">Pricing & Duration</h2>
            <div className="space-y-8 ">
              {['price', 'payment_frequency', 'duration', 'service_charge'].map((name) => (
                <div key={name}>
                  <label className={`block font-semibold text-lg capitalize ${editMode ? "text-gray-500" : "text-slate-400"}`}>{name}:</label>
                  {editMode ? (
                    <input
                      type="text"
                      name={name}
                      value={editedData[name]}
                      onChange={handleChange}
                      className="mt-1 block w-full border text-lg text-gray-800 font-medium border-gray-200 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  ) : (
                    <p className="mt-1 w-full bg-gray-100 text-slate-700 text-lg font-medium p-3 rounded-md">
                      {editedData[name]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div> 


          {/* Contact & Amenities */}
          <div className='mt-12'>
            <h2 className="text-xl text-center font-bold text-gray-800 mb-4">Contact & Amenities</h2>
            <div className="space-y-8">
              <div>
                <label className={`block font-semibold text-lg capitalize ${editMode ? "text-gray-500" : "text-slate-400"}`}>Contact Phone:</label>
                {editMode ? (
                  <input
                    type="text"
                    name="contact_phone"
                    value={editedData.contact_phone}
                    onChange={handleChange}
                    className="mt-1 block w-full border text-lg text-gray-800 font-medium border-gray-200 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                ) : (
                  <p className="mt-1 w-full bg-gray-100 text-slate-700 text-lg font-medium p-3 rounded-md">{apartment.contact_phone}</p>
                )}
              </div>
              <div>
                <label className={`block font-semibold text-lg capitalize ${editMode ? "text-gray-500" : "text-slate-400"}`}>Furnished:</label>
                {editMode ? (
                  <select
                    name="furnished"
                    value={editedData.furnished}
                    onChange={handleChange}
                    className="mt-1 block w-full border text-lg text-gray-800 font-medium border-gray-200 rounded-md p-3 cursor-pointer"
                    required
                  >
                    <option value="">Select Furnished Option</option>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                ) : (
                  <p className="mt-1 w-full bg-gray-100 text-slate-700 text-lg font-medium p-3 rounded-md">{apartment.furnished ? 'Yes' : 'No'}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className={`block font-semibold text-lg capitalize ${editMode ? "text-gray-500" : "text-slate-400"}`}>Amenities:</label>
                {editMode ? (
                  <textarea
                    name="apartment_amenities"
                     value={editedData.apartment_amenities}
                    onChange={handleChange}
                    className="mt-1 block w-full border text-lg text-gray-800 font-medium border-gray-200 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                ) : (
                  <p className="mt-1 w-full bg-gray-100 text-slate-700 text-lg font-medium p-3 rounded-md">{apartment.apartment_amenities}</p>
                )}
              </div>
            </div>
          </div>
        </div>


        {/* Action */}
        <div className="w-full h-full flex justify-center items-center mt-8">
          {editMode ? (
            <div className="w-11/12 flex items-center justify-between">
              <button
                // onClick={handleSave}
                className="px-4 py-2 bg-linear-55 from-teal-700 to-teal-400 text-white text-[18px] font-semibold rounded-xl border-4 border-double  cursor-pointer focus:invisible"
              >
                Save Update
              </button>
              <button
                onClick={() => {
                  setEditMode(false); 
                  setEditedData(apartment);
                }}
                className="px-4 py-1.5 bg-gray-200 text-gray-700 text-[19px] font-semibold rounded-xl border-4 border-double border-gray-400 hover:bg-gray-300 cursor-pointer focus:invisible"
              >
              
                Cancel
              </button>
            </div>
          ) : (
            <div className="w-11/12 flex items-center justify-between cursor-pointer">
              <button
                onClick={() => setEditMode(true)}
                className="px-4 py-2.5 bg-linear-55 from-cyan-700 to-cyan-400 text-white text-[18px] font-semibold rounded-xl border-4 border-double cursor-pointer focus:invisible"
              >
                
                Update Listing
              </button> 
              <button
                // onClick={onDeactivate}
                className="text-white bg-rose-600 border-white px-4 py-2 text-[19px] rounded-xl border-4 border-double font-semibold tracking-wider hover:bg-rose-700 transition cursor-pointer focus:invisible"
                >
                Deactivate
              </button>
            </div>
          )}
        </div>  
      </div>
      <Footerbar />
      <Footer />
    </div>
  );
}

export default ListingInfo;