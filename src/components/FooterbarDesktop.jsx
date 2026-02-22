import {
  BellIcon as BellOutline,
  HeartIcon as HeartOutline,
  HomeIcon as HomeOutline,
  UserIcon as UserOutline,
  MagnifyingGlassIcon as SearchOutline,
  Squares2X2Icon as DashboardOutline,
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
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import useNotifications from "../hooks/notifications";

const FooterbarDesktop = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const user = useSelector((state) => state.auth.user);
  const { unreadCount } = useNotifications(user);
  const { totalBookmarks } = useSelector((state) => state.bookmarks.items);

  const tabRoutes = {
    home: "/home",
    search: "/search",
    login: "/login",
    whishlists: "/bookmarks",
    notifications: "/notifications",
    profile: "/profile",
    dashboard: "/dashboard",
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
      icon: (active) => active ? <DashboardSolid className="w-6 h-6" /> : <DashboardOutline className="w-6 h-6" />,
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
    <div className="bg-gray-50 border-r h-screen border-gray-200 px-4">
      <div className="flex flex-col gap-2 pt-8">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => navigate(tabRoutes[tab.id])}
            className={`relative flex items-center gap-8 px-4 py-2 cursor-pointer transition
              ${activeTab === tab.id
                ? "bg-cyan-100 text-cyan-600 rounded-md before:absolute before:left-0 before:top-1 before:bottom-1 before:w-[5px] before:bg-cyan-600 before:rounded-r-md"
                : "text-gray-700 hover:bg-gray-100 rounded-md"}
              `}
            >     

            <div className="relative">
              {tab.icon(activeTab === tab.id)}

              {(tab.id === "notifications" && unreadCount > 0) && (
                <span className="absolute -top-1 -right-3 bg-rose-500 text-white text-[10px]  px-1.5 rounded-full">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}

              {(tab.id === "whishlists" && totalBookmarks > 0) && (
                <span className="absolute -top-1 -right-3 bg-rose-500 text-white text-[10px] px-1.5 rounded-full">
                  {totalBookmarks > 99 ? "99+" : totalBookmarks}
                </span>
              )}
            </div>

            <span className="text-lg font-semibold">{tab.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FooterbarDesktop;