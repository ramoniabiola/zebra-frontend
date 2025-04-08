import { BellIcon, HeartIcon, HomeIcon, UserIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

const Footerbar = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  const tabs = [
    { id: "home", label: "Home", icon: <HomeIcon className="w-8 h-8" /> },
    { id: "whishlists", label: "Wishlists", icon: <HeartIcon className="w-8 h-8" /> },
    { id: "notifications", label: "Notifications", icon: <BellIcon className="w-8 h-8" /> },
    { id: "profile", label: "Profile", icon: <UserIcon className="w-8 h-8" /> },
  ];

  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      setIsScrolled(scrollY > vh);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className={`fixed bottom-0 w-full h-20 bg-white shadow-[0_-3px_10px_-4px_rgba(0,0,0,0.15)] z-50 flex items-center justify-around transition-opacity duration-700 ${
        isScrolled ? "opacity-50" : "opacity-100"
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
          {tab.icon}
          <h2 className="text-xs font-medium mt-1">{tab.label}</h2>
        </div>
      ))}
    </div>
  );
};

export default Footerbar;
