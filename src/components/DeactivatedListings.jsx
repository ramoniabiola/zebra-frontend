import { data } from "../utils/Data"
import DeactivatedListingDetails from "./DeactivatedListingDetails";
import { SearchIcon } from "lucide-react";

const DeactivatedListings = () => {


  return (
    <div className="w-full h-full flex flex-col items-start justify-center mt-2">
      {/* DEACTIVADED LISTINGS SEARCH INPUT FIELD */}
      <div className="w-full h-20 flex items-center justify-center bg-white">
          <div className="relative bg-white w-11/12 h-8/12 border-2 border-stone-200 rounded-xl">  
              <input
                type="text"
                placeholder="Deactivated Listings Search"
                className="w-full h-full  pl-4 rounded-md outline-none text-lg font-semibold text-gray-900 placeholder-stone-400" 
              />
              <SearchIcon size={24} strokeWidth={2} className="absolute right-3 h-6 w-6 top-1/2 transform -translate-y-1/2 font-extrabold text-stone-400 cursor-pointer" />
          </div>
      </div>

      {/* USER (landlord / agent) LISTINGS */} 
      <div className="w-full h-full flex flex-col items-center justify-center px-4 overflow-y-auto scroll-smooth mb-12">
        {data.map((item) => (
          <DeactivatedListingDetails item={item} key={item.id} />
        ))}
        <div className="w-full h-full mt-12 flex flex-col items-center justify-center gap-12">
          <button className="px-4 py-2 text-white text-lg font-bold border-8 border-double bg-cyan-600 rounded-full hover:bg-cyan-700 cursor-pointer focus:invisible">Show more</button>
        </div>
      </div> 
    </div>
  )
}

export default DeactivatedListings;