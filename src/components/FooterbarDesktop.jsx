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
      icon: (active) => active ? <HomeSolid className="w-5 h-5" /> : <HomeOutline className="w-5 h-5" />,
    },
    {
      id: "search",
      label: "Search",
      icon: (active) => active ? <SearchSolid className="w-5 h-5" /> : <SearchOutline className="w-5 h-5" />,
    },
  ];

  let userSpecificTab = null;
  let extraTabs = [];

  if (user === null) {
    userSpecificTab = {
      id: "login",
      label: "Login",
      icon: (active) => active ? <UserCircleSolid className="w-5 h-5" /> : <UserCircleOutline className="w-5 h-5" />,
    };
  } else if (user.role === "tenant") {
    userSpecificTab = {
      id: "whishlists",
      label: "Wishlists",
      icon: (active) => active ? <HeartSolid className="w-5 h-5" /> : <HeartOutline className="w-5 h-5" />,
    };
    extraTabs = [
      {
        id: "notifications",
        label: "Notifications",
        icon: (active) => active ? <BellSolid className="w-5 h-5" /> : <BellOutline className="w-5 h-5" />,
      },
      {
        id: "profile",
        label: "Profile",
        icon: (active) => active ? <UserSolid className="w-5 h-5" /> : <UserOutline className="w-5 h-5" />,
      },
    ];
  } else {
    userSpecificTab = {
      id: "dashboard",
      label: "Dashboard",
      icon: (active) => active ? <DashboardSolid className="w-5 h-5" /> : <DashboardOutline className="w-5 h-5" />,
    };
    extraTabs = [
      {
        id: "notifications",
        label: "Notifications",
        icon: (active) => active ? <BellSolid className="w-5 h-5" /> : <BellOutline className="w-5 h-5" />,
      },
      {
        id: "profile",
        label: "Profile",
        icon: (active) => active ? <UserSolid className="w-5 h-5" /> : <UserOutline className="w-5 h-5" />,
      },
    ];
  }

  const tabs = [...baseTabs, userSpecificTab, ...extraTabs];

  return (
    <div className="bg-white border-r border-gray-200 h-screen flex flex-col shadow-sm">
      {/* ── NAV ITEMS ── */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-2 overflow-y-auto mt-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const hasBadge =
          (tab.id === "notifications" && unreadCount > 0) ||
          (tab.id === "whishlists" && totalBookmarks > 0);

          const badgeCount =
          tab.id === "notifications" ? unreadCount : totalBookmarks;

          return (
            <button
              key={tab.id}
              onClick={() => navigate(tabRoutes[tab.id])}
              className={`relative w-full flex items-center gap-4 px-3.5 py-2.5 rounded-xl cursor-pointer transition-all duration-200 group text-left ${
                isActive
                  ? "bg-cyan-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-stone-100 hover:text-gray-900"
              }`}
            >
              {/* Icon container */}
              <div className={`w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0 transition-all duration-200 ${
                isActive
                  ? "bg-white/20"
                  : "bg-stone-100 group-hover:bg-stone-200"
              }`}>
                {tab.icon(isActive)}
              </div>

              {/* Label */}
              <span className={`text-lg font-semibold flex-1 transition-colors duration-200 ${
                isActive ? "text-white" : "text-gray-700 group-hover:text-gray-900"
              }`}>
                {tab.label}
              </span>

              {/* Badge */}
              {hasBadge && (
                <span className={`text-[12px] font-extrabold px-2.5 py-0.5 rounded-full flex-shrink-0 ${
                  isActive
                    ? "bg-white text-rose-600"
                    : "bg-rose-500 text-white"
                  }`}>
                    {badgeCount > 99 ? "99+" : badgeCount}
                  </span>
              )}

              {/* Active left accent bar */}
              {isActive && (
                <span className="absolute -left-3 top-2 bottom-2 w-1 bg-cyan-400 rounded-r-full" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default FooterbarDesktop;