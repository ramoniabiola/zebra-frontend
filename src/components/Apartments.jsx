import { ExclamationTriangleIcon, HomeIcon, MapIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import ApartmentDetails from "./ApartmentDetails";
import { useGetApartments } from "../hooks/apartments";
import { useSelector } from "react-redux";
import ApartmentDetailsSkeleton from "../utils/loading-display/ApartmentDetailsSkeleton";


const Apartments = () => {
  const [activeTab, setActiveTab] = useState("new"); // default active
  const [hovered, setHovered] = useState(null);
  const { fetchApartments, isLoading, error } = useGetApartments()
  const apartments = useSelector((state) => state.apartments.list);
 
  
  useEffect(() => {
    const sortMap = {
      new: "recent",
      apartments: "random",
      "top-locations": "popular", 
    };

    fetchApartments({ sortBy: sortMap[activeTab] });
  }, [fetchApartments, activeTab]);

  
  
  const handleRetry = () => {
    fetchApartments();
  };

 

  const tabs = [
    { id: "new", label: "New", icon: <SparklesIcon className="w-6 h-6" /> },
    { id: "apartments", label: "Apartments", icon: <HomeIcon className="w-6 h-6" /> },
    { id: "top-locations", label: "Top Locations", icon: <MapIcon className="w-6 h-6" /> },
  ];

  // Error Display
  const ErrorDisplay = () => (
    <div className="h-full w-full flex flex-col items-center justify-center text-center py-8 mt-48 mb-48">
      <ExclamationTriangleIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-800 mb-1">
        Something went wrong
      </h3>
      <p className="text-gray-600 mb-4">
        {error?.message || "Failed to load apartments"}
      </p>
      <button
        onClick={handleRetry}
        className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-md transition-colors cursor-pointer"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <div className="h-full min-w-full flex flex-col items-start justify-center">
      {/* APARTMENT LISTING OPTIONS */}
      <div className="fixed top-32 z-30 h-20 w-full flex items-center justify-around bg-white shadow-md py-2">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            onMouseEnter={() => setHovered(tab.id)}
            onMouseLeave={() => setHovered(null)}
            className={`flex flex-col items-center justify-center cursor-pointer transition-all duration-200
              ${activeTab === tab.id ? "text-slate-800" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab.icon}
            <h2 className="text-md font-semibold relative mt-1" >
              {tab.label}
              {activeTab === tab.id && (    
                <span className="absolute -bottom-[12px] left-0 w-full h-[2.5px]  bg-slate-800 rounded-t-full"></span>
              )}
              {hovered === tab.id && (    
                <span className={`absolute -bottom-[12px] left-0 w-full h-[2.5px] ${activeTab !== tab.id ? "bg-slate-200" : "bg-slate-700"} transition-all duration-200 rounded-t-full`}></span>
              )}
            </h2>
          </div>
        ))}
      </div> 

      {/* APARTMENT LISTINGS */}
      <div className="mt-[12rem] min-w-full h-full flex flex-col items-center justify-center px-4 overflow-y-auto scroll-smooth mb-12">
        {error ? 
          (
            <ErrorDisplay />
          ) : isLoading ? 
          (
            <ApartmentDetailsSkeleton cards={4} />
          ) : apartments?.length > 0 ? 
          (
            apartments?.map((apartment) => 
              <ApartmentDetails  apartment={apartment}  key={apartment._id} /> 
            )
          ) : (
          <p className="text-gray-500 text-sm">No apartments found.</p>
        )}

        {!error && !isLoading && apartments?.length > 0 && (
          <div className="w-full h-full mt-12 flex flex-col items-center justify-center gap-24">
            <button className="px-4 py-2 text-white text-lg font-bold border-8 border-double bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 rounded-full cursor-pointer focus:invisible">
              Show more
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Apartments;
