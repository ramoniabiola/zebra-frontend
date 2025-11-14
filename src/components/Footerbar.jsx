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
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom';
import useNotifications from "../hooks/notifications";


const Footerbar = () => {
  const [isBeyondScreen, setIsBeyondScreen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate()
  const currentPath = location.pathname;
  const user = useSelector((state) => state.auth.user)
  const { unreadCount } = useNotifications(user);
  const { totalBookmarks } = useSelector((state) => state.bookmarks.items);
  
  

  
  useEffect(() => {
    const handleScroll = () => {
      setIsBeyondScreen(window.scrollY > window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const tabRoutes = {
    home: '/home',
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
      icon: (active) => active ? <HomeSolid className="w-6 h-6" /> : <HomeOutline className="w-6 h-6" />,
    },
    {
      id: "search",
      label: "Search",
      icon: (active) => active ? <SearchSolid className="w-6 h-6" /> : <SearchOutline className="w-6 h-6" />,
    },
  ];
  
  let userSpecificTab = null;
  let extraTabs = [];
  
  if (user === null) {
    userSpecificTab = {
      id: "login",
      label: "Login",
      icon: (active) => active ? <UserCircleSolid className="w-6 h-6" /> : <UserCircleOutline className="w-6 h-6" />,
    };
  } else if (user.role === "tenant") {
    userSpecificTab = {
      id: "whishlists",
      label: "Wishlists",
      icon: (active) => active ? <HeartSolid className="w-6 h-6" /> : <HeartOutline className="w-6 h-6" />,
    };
    extraTabs = [
      {
        id: "notifications",
        label: "Notifications",
        icon: (active) => active ? <BellSolid className="w-6 h-6" /> : <BellOutline className="w-6 h-6" />,
      },
      {
        id: "profile",
        label: "Profile",
        icon: (active) => active ? <UserSolid className="w-6 h-6" /> : <UserOutline className="w-6 h-6" />,
      },
    ];
  } else {
    userSpecificTab = {
      id: "dashboard",
      label: "Dashboard",
      icon: (active) => active ? <DashboardSolid className="w-6 h-6" /> : <DashboardOuline className="w-6 h-6" />,
    };
    extraTabs = [
      {
        id: "notifications",
        label: "Notifications",
        icon: (active) => active ? <BellSolid className="w-6 h-6" /> : <BellOutline className="w-6 h-6" />,
      },
      {
        id: "profile",
        label: "Profile",
        icon: (active) => active ? <UserSolid className="w-6 h-6" /> : <UserOutline className="w-6 h-6" />,
      },
    ];
  }
  
  const tabs = [...baseTabs, userSpecificTab, ...extraTabs];
  
  

  


  return (
    <div
      className={`fixed bottom-0 w-full h-15 bg-white shadow-[0_-3px_10px_-4px_rgba(0,0,0,0.15)] z-50 flex items-center justify-around transition-opacity duration-300 ${
        isBeyondScreen ? "opacity-70" : "opacity-100"
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
            {(tab.id === "notifications" && unreadCount > 0) && (
              <div className="absolute -top-1.5 -right-3 flex items-center justify-center w-4.5 h-3.5 bg-rose-500 rounded-full">
                <span className="text-white text-[10px] font-medium">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              </div>
            )}

            {(tab.id === "whishlists" && totalBookmarks > 0) && (
              <div className="absolute -top-1.5 -right-3 flex items-center justify-center w-4.5 h-3.5 bg-rose-500 rounded-full">
                <span className="text-white text-[10px] font-medium">
                  {totalBookmarks > 99 ? '99+' : totalBookmarks}
                </span>
              </div>
            )}
          </div>
          <h2 className="text-xs font-normal font-sans mt-1">{tab.label}</h2>
        </div>
      ))}
    </div>
  );
};

export default Footerbar;
