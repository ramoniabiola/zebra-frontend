import MaterialIcon from "../components/MaterialIcon";
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
      icon: (active) => (
        <MaterialIcon name="home" active={active} className="text-2xl" />
      ),
    },
    {
      id: "search",
      label: "Search",
      icon: (active) => (
        <MaterialIcon name="search" active={active} className="text-2xl" />
      ),
    },
  ];  
  
  let userSpecificTab = null;
  let extraTabs = [];
  
  if (user === null) {
    userSpecificTab = {
      id: "login",
      label: "Login",
      icon: (active) => (
        <MaterialIcon name="account_circle" active={active} className="text-2xl" />
      ),
    };
  } else if (user.role === "tenant") {
    userSpecificTab = {
      id: "whishlists",
      label: "Wishlists",
      icon: (active) => (
        <MaterialIcon name="favorite" active={active} className="text-2xl" />
      ),
    };

    extraTabs = [
      {
        id: "notifications",
        label: "Notifications",
        icon: (active) => (
          <MaterialIcon name="notifications" active={active} className="text-2xl" />
        ),
      },
      {
        id: "profile",
        label: "Profile",
        icon: (active) => (
          <MaterialIcon name="person" active={active} className="text-2xl" />
        ),
      },
    ];
  } else {
    userSpecificTab = {
      id: "dashboard",
      label: "Dashboard",
      icon: (active) => (
        <MaterialIcon name="dashboard" active={active} className="text-2xl" />
      ),
    };

    extraTabs = [
      {
        id: "notifications",
        label: "Notifications",
        icon: (active) => (
          <MaterialIcon name="notifications" active={active} className="text-2xl" />
        ),
      },
      {
        id: "profile",
        label: "Profile",
        icon: (active) => (
          <MaterialIcon name="person" active={active} className="text-2xl" />
        ),
      },
    ];
  }
  
  const tabs = [...baseTabs, userSpecificTab, ...extraTabs];
  
  

  


  return (
    <div
      className={`fixed bottom-0 w-full h-14 bg-white shadow-[0_-3px_10px_-4px_rgba(0,0,0,0.15)] z-50 flex items-center justify-between px-4 md:px-5 transition-opacity duration-300 ${
        isBeyondScreen ? "opacity-70" : "opacity-100"
      }`}
    >
      {tabs.map((tab) => (
        <div
          onClick={() => navigate(tabRoutes[tab.id])}
          key={tab.id}
          className={`flex flex-col items-center justify-center cursor-pointer transition-all -space-y-1 duration-200 mt-1
            ${activeTab === tab.id ? "text-cyan-600" : "text-gray-600 hover:text-gray-700"}
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
          <h2 className="text-xs font-normal font-sans tracking-wide">{tab.label}</h2>
        </div>
      ))}
    </div>
  );
};

export default Footerbar;
