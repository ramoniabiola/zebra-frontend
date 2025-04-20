import {
  BellIcon as BellOutline,
  HeartIcon as HeartOutline,
  HomeIcon as HomeOutline,
  UserIcon as UserOutline,
  MagnifyingGlassIcon as SearchOutline
} from "@heroicons/react/24/outline";

import {
  BellIcon as BellSolid,
  HeartIcon as HeartSolid,
  HomeIcon as HomeSolid,
  UserIcon as UserSolid,
  MagnifyingGlassIcon as SearchSolid
} from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";


const Footerbar = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isBeyondScreen, setIsBeyondScreen] = useState(false);

  
  useEffect(() => {
    const handleScroll = () => {
      setIsBeyondScreen(window.scrollY > window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  
  const tabs = [
    {
      id: "home",
      label: "Home",
      icon: (active) => active ? <HomeSolid className="w-7.5 h-7.5" /> : <HomeOutline className="w-7.5 h-7.5" />,
    },
    {
      id: "search",
      label: "Search",
      icon: (active) => active ? <SearchSolid className="w-7.5 h-7.5" /> : <SearchOutline className="w-7.5 h-7.5" />,
    },
    {
      id: "whishlists",
      label: "Wishlists",
      icon: (active) => active ? <HeartSolid className="w-7.5 h-7.5" /> : <HeartOutline className="w-7.5 h-7.5" />,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: (active) => active ? <BellSolid className="w-7.5 h-7.5" /> : <BellOutline className="w-7.5 h-7.5" />,
    },
    {
      id: "profile",
      label: "Profile",
      icon: (active) => active ? <UserSolid className="w-7.5 h-7.5" /> : <UserOutline className="w-7.5 h-7.5" />,
    },
  ];
  
  // Fake Notification value
  const notificationCount = 3;



  return (
    <div
      className={`fixed bottom-0 w-full h-20 bg-white shadow-[0_-3px_10px_-4px_rgba(0,0,0,0.15)] z-50 flex items-center justify-around transition-opacity duration-300 ${
        isBeyondScreen ? "opacity-50" : "opacity-100"
      }`}
    >
      {tabs.map((tab) => (
        <div
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex flex-col items-center justify-center cursor-pointer transition-all duration-200
            ${activeTab === tab.id ? "text-sky-500" : "text-gray-500 hover:text-gray-600"}
          `}
        >
          <div className="relative">
            {tab.icon(activeTab === tab.id)}
            {(tab.id === "notifications" && notificationCount > 0) && (
              <span className="absolute -top-1.5 -right-3.5 bg-red-500 text-white text-xs rounded-full px-2">
                {notificationCount}
              </span>
            )}
          </div>
          <h2 className="text-xs font-medium mt-1">{tab.label}</h2>
        </div>
      ))}
    </div>
  );
};

export default Footerbar;
