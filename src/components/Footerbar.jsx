import {
  BellIcon as BellOutline,
  HeartIcon as HeartOutline,
  HomeIcon as HomeOutline,
  UserIcon as UserOutline,
  MagnifyingGlassIcon as SearchOutline,
  Squares2X2Icon as DashboardOuline,
  UserCircleIcon as UserCircleOutline
} from "@heroicons/react/24/outline";

import {
  BellIcon as BellSolid,
  HeartIcon as HeartSolid,
  HomeIcon as HomeSolid,
  UserIcon as UserSolid,
  MagnifyingGlassIcon as SearchSolid,
  Squares2X2Icon as DashboardSolid,
  UserCircleIcon as UserCircleSolid
} from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';



// Example user data
const user = {
  username: "LandlordMike",
  role: "Landlord",
  avatar: "",
  totalListings: 12,
  activeListings: 5,
};

// const user = null;

const Footerbar = () => {
  const [isBeyondScreen, setIsBeyondScreen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate()
  const currentPath = location.pathname;
  

  
  useEffect(() => {
    const handleScroll = () => {
      setIsBeyondScreen(window.scrollY > window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const tabRoutes = {
    home: '/',
    search: '/search',
    login: '/login',
    whishlists: '/bookmarks',
    notifications: '/notifications',
    profile: '/profile',
    dashboard: '/dashboard',
  };
  

  const getActiveTab = () => {
    const entry = Object.entries(tabRoutes).find(([, path]) => path === currentPath);
    return entry ? entry[0] : "";
  };

  const activeTab = getActiveTab();

  const baseTabs = [
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
  ];
  
  let userSpecificTab = null;
  let extraTabs = [];
  
  if (user === null) {
    userSpecificTab = {
      id: "login",
      label: "Login",
      icon: (active) => active ? <UserCircleSolid className="w-7.5 h-7.5" /> : <UserCircleOutline className="w-7.5 h-7.5" />,
    };
  } else if (user.role === "Tenant") {
    userSpecificTab = {
      id: "whishlists",
      label: "Wishlists",
      icon: (active) => active ? <HeartSolid className="w-7.5 h-7.5" /> : <HeartOutline className="w-7.5 h-7.5" />,
    };
    extraTabs = [
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
  } else {
    userSpecificTab = {
      id: "dashboard",
      label: "Dashboard",
      icon: (active) => active ? <DashboardSolid className="w-7.5 h-7.5" /> : <DashboardOuline className="w-7.5 h-7.5" />,
    };
    extraTabs = [
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
  }
  
  const tabs = [...baseTabs, userSpecificTab, ...extraTabs];
  
  

  
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
          onClick={() => navigate(tabRoutes[tab.id])}
          key={tab.id}
          className={`flex flex-col items-center justify-center cursor-pointer transition-all duration-200
            ${activeTab === tab.id ? "text-cyan-500" : "text-gray-500 hover:text-gray-600"}
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
