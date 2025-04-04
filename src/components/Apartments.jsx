import { HomeIcon, MapIcon, SparklesIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const Apartments = () => {
  const [activeTab, setActiveTab] = useState("new"); // default active
  const [hovered, setHovered] = useState(null);

  const tabs = [
    { id: "new", label: "New", icon: <SparklesIcon className="w-6 h-6" /> },
    { id: "apartments", label: "Apartments", icon: <HomeIcon className="w-6 h-6" /> },
    { id: "top-locations", label: "Top Locations", icon: <MapIcon className="w-6 h-6" /> },
  ];

  return (
    <div className="h-full w-full flex flex-col items-start justify-center">
      {/* LISTING OPTIONS */}
        <div className="sticky top-[8rem] h-20 w-full flex items-center justify-around bg-white shadow-md z-10 py-2">
            {tabs.map((tab) => (
                <div
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    onMouseEnter={() => setHovered(tab.id)}
                    onMouseLeave={() => setHovered(null)}
                    className={`flex flex-col items-center justify-center cursor-pointer transition-all duration-200
                      ${activeTab === tab.id ? "text-gray-900" : "text-gray-500 hover:text-gray-900"

                    }`}
                >
                {tab.icon}
                <h2 className="text-md font-semibold relative mt-1" >
                    {tab.label}
                    {activeTab === tab.id && (    
                        <span className="absolute -bottom-[12px] left-0 w-full h-[2px]  bg-gray-900 rounded-md"></span>
                    )}
                    {hovered === tab.id && (    
                        <span className="absolute -bottom-[12px] left-0 w-full h-[2px] bg-gray-200 transition-all duration-200 rounded-md"></span>
                    )}
                </h2>
              </div>
            ))}
        </div>

      {/* APARTMENT LISTINGS */}
      <div className="mt-[12rem] w-full px-4 overflow-y-auto">
        {/* Render different listing data based on activeTab if needed */}
      </div>
    </div>
  );
};

export default Apartments;
