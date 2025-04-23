import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { data } from "../utils/Data"
import MyListingDetails from "./MyListingDetails";

const MyListings = () => {
  
  return (
    <div className="w-full h-full flex flex-col items-start justify-center">
      {/* ACTIVE LISTINGS SEARCH INPUT FIELD */}
      <div className="w-full h-20 flex items-center justify-center bg-white">
        <div className="relative bg-white w-11/12 h-8/12 border-2 border-stone-200 rounded-xl">  
          <input
            type="text"
            placeholder="Search your Listings"
            className="w-full h-full  pl-4 rounded-md outline-none text-lg font-semibold text-gray-900 placeholder-stone-400" 
          />
          <MagnifyingGlassIcon className="absolute right-4 h-6 w-6 top-1/2 transform -translate-y-1/2 font-extrabold text-stone-500 cursor-pointer" />
        </div>
      </div>

      {/* USER ACTIVE (lanlord / agent) LISTINGS */}
      <div className="w-full h-full flex flex-col items-center justify-center px-4 overflow-y-auto scroll-smooth mb-12"> 
        {data.map((item) => (
          <MyListingDetails item={item} key={item.id} />
        ))}
        <div className="w-full h-full mt-12 flex flex-col items-center justify-center gap-12">
        <hr className="w-11/12 text-stone-200" />
        <button className="px-8 py-4 text-white text-xl font-bold bg-cyan-600 rounded-lg hover:bg-cyan-700 cursor-pointer">Show more</button>
        </div>
      </div> 
    </div>
  )
}

export default MyListings;