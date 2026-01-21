import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, ChevronLeft, ChevronRight, MoreVertical, RotateCcw } from "lucide-react";
import { CheckIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import useNotifications from "../hooks/notifications";
import NotificationCard from "../components/NotificationCard";
import NotificationPlaceholder from "../utils/placeholders/NotificationPlaceholder";
import NotificationSkeleton from "../utils/loading-display/NotificationSkeleton";

import {
  getNotificationsLoading,
  getNotificationsSuccess,
  getNotificationsError,
} from "../redux/notificationSlice";
import API from "../api";

const NotificationPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const user = useSelector((state) => state.auth.user);
    const { loading, error, unreadCount, markAsRead, markAllAsRead } = useNotifications(user);

    const items = useSelector((state) => state.notifications.items); 
    const { notifications, page, totalPages  } = items;



    // === Fetch Notifications (Paginated) ===
    const fetchNotifications = async (pageNum = 1) => {
        try {
            dispatch(getNotificationsLoading());
            const { data } = await API.get("/notifications", {
                params: { page: pageNum, limit: 10 }, // fixed limit = 10
            });
          dispatch(getNotificationsSuccess(data));
        } catch (err) {
            dispatch(
                getNotificationsError(
                    err.response?.data?.error || "Failed to fetch notifications"
                )
            );
        }
    };

    // Initial fetch
    useEffect(() => {
        if (user?._id) fetchNotifications(1);
    }, [user?._id]);


    
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [fetchNotifications]);
    



    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);


    const handleMarkAllAsRead = () => {
        if (unreadCount > 0) markAllAsRead();
        setIsDropdownOpen(false);
    };


    const handleRetry = () => {
        fetchNotifications(page)
    };


    // Error Component
    const ErrorDisplay = () => (
        <div className="h-full w-full flex flex-col items-center justify-center text-center py-8 mt-48 mb-48">
            <ExclamationTriangleIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
            < h3 className="text-base font-semibold text-gray-800 mb-1">
                Something went wrong
            </h3>
            <p className="text-gray-600 text-sm mb-4">{error}</p>
            <button
                onClick={handleRetry}
                className="px-3 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-base tracking-widest font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-1.5  focus:invisible cursor-pointer"
            >
                <RotateCcw className="w-4 h-4" />
                Retry
            </button>
        </div>
    );


  

    return (
        <div className="w-full h-full flex flex-col items-start justify-start bg-white lg:mt-20">
            <div className="w-full h-full flex flex-col items-start justify-center gap-4">
                {/* Header */}
                <div className="w-full h-16 flex items-center justify-between px-2 bg-white">
                    {/* Left Side */}
                    <div className="flex items-center gap-2">
                        <div
                          className="w-12 h-12 flex items-center text-gray-900 justify-center rounded-full hover:bg-neutral-100 transition-colors duration-200 cursor-pointer"
                          onClick={() => navigate(-1)}
                        >
                          <ArrowLeft className="w-5 h-5" />
                        </div>

                        <div className="flex flex-col items-center">
                            <h1 className="font-bold text-gray-900 text-2xl lg:text-3xl">
                                Notifications
                            </h1>
                            {unreadCount > 0 && (
                                <span className="text-sm text-start text-cyan-600 font-medium">
                                    {unreadCount > 99 ? "99+" : unreadCount} unread
                                    notification{unreadCount !== 1 ? "s" : ""}
                                </span>
                            )}
                        </div>
                    </div>
                    
                    {/* Dropdown Actions */}
                    {notifications?.length > 0 && unreadCount > 0 && !loading && !error && (
                        <div className="relative" ref={dropdownRef}>
                            <div
                              className={`w-10 h-10 flex items-center text-gray-900 justify-center rounded-full hover:bg-neutral-100 transition-all duration-200 cursor-pointer ${
                                isDropdownOpen ? "bg-neutral-100 rotate-90" : ""
                              }`}
                              onClick={toggleDropdown}
                            >
                                <MoreVertical className="w-5 h-5" />
                            </div>
                        
                            <div
                                className={`absolute right-0 top-12 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 ease-out transform origin-top-right z-50 ${
                                  isDropdownOpen
                                    ? "opacity-100 scale-100 translate-y-0"
                                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                                }`}
                            >
                                <div className="py-2 px-2">
                                  <button
                                    disabled={loading || error}
                                    onClick={handleMarkAllAsRead}
                                    className="w-full px-2 py-2 text-left text-gray-500 hover:bg-neutral-50 rounded-xl  transition-colors duration-200 flex items-center gap-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-cyan-100 group-hover:bg-cyan-200 transition-colors duration-200">
                                      <CheckIcon
                                        strokeWidth={2}
                                        className="w-3 h-3 text-cyan-600"
                                      />
                                    </div>
                                    <div>
                                      <div className="font-medium text-sm">
                                        Mark all as read
                                      </div>
                                    </div>
                                  </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Notifications */}
                <div className="flex-1 w-full md:px-2 lg:px-4">
                    {error ? (
                        <ErrorDisplay />
                    ) : loading ? (
                        <NotificationSkeleton cards={4} />
                    ) : notifications?.length === 0 ? (
                        <NotificationPlaceholder />
                    ) : (
                        <div className="w-full px-4 flex flex-col items-start justify-center gap-2 mt-1 mb-8">
                            {notifications.map((notification) => (
                                <NotificationCard
                                    key={notification._id}
                                    notification={notification}
                                    onMarkAsRead={markAsRead}
                                />
                            ))}
                        </div>
                    )}
                </div>
              
                {/* Pagination */}
                {!loading && !error && totalPages > 1 && (
                    <div className="w-full flex items-center justify-center gap-8 py-6 mb-12">
                        <button
                            disabled={page === 1}
                            onClick={() => fetchNotifications(page - 1)}
                            className="px-4 py-3 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        <span className="text-sm text-gray-600 font-medium">
                            {page} / {totalPages}
                        </span>

                        <button
                            disabled={page === totalPages}
                            onClick={() => fetchNotifications(page + 1)}
                            className="px-4 py-3 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                           <ChevronRight className="w-4 h-4"/>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationPage;
