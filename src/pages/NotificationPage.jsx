import { CheckIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Footerbar from "../components/Footerbar";
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";
import useNotifications from "../hooks/notifications";
import NotificationCard from "../components/NotificationCard";
import NotificationPlaceholder from "../utils/placeholders/NotificationPlaceholder";
import { useSelector } from "react-redux";
import NotificationSkeleton from "../utils/loading-display/NotificationSkeleton";
import { ArrowLeft, MoreVertical, Trash2 } from "lucide-react";


const NotificationPage = () => {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const user = useSelector((state) => state.auth.user);
    const { loading, error, unreadCount, markAsRead, markAllAsRead } = useNotifications(user);
    const notifications = useSelector((state) => state.notifications.notifications.notifications);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const handleMarkAllAsRead = () => {
        if (unreadCount > 0) { 
            markAllAsRead(); 
        }
    };


    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    // const handleClearAllNotifications = () => {
    //     // Add your clear wishlists logic here
    //     console.log("Clearing all wishlists...");
    //     setIsDropdownOpen(false);
    // };


    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    

    

    // Error Display
    const ErrorDisplay = () => (
        <div className="h-full w-full flex flex-col items-center justify-center text-center py-8 mt-48 mb-48">
            <ExclamationTriangleIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
                Something went wrong
            </h3>
            <p className="text-gray-600 mb-4">
                {error}
            </p>
        </div>
    );

    return (
        <div className="w-full h-full flex flex-col items-start justify-start bg-white">
            <div className="w-full h-full flex flex-col items-start justify-center gap-4"> 
                {/* Header */}
                <div className="w-full h-16 flex items-center justify-between px-2 pt-4 bg-white">
                    {/* Left Side - Back button, Title, and Unread count */}
                    <div className="flex items-center gap-2">
                        <div
                            className="w-12 h-12 flex items-center text-gray-900 justify-center rounded-full hover:bg-neutral-100 transition-colors duration-200 cursor-pointer"
                            onClick={() => navigate(-1)}
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </div>

                        <div className="flex flex-col items-center">
                            <h1 className="font-bold text-gray-900 text-3xl">Notifications</h1>
                            {unreadCount > 0 && (
                                <span className="text-sm text-start text-cyan-600 font-medium">
                                    {unreadCount > 99 ? '99+' : unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                                </span>
                            )}
                        </div>
                    </div>

            
                    {notifications.length > 0 && !loading && (
                        <div className="relative" ref={dropdownRef}>
                            <div 
                                className={`w-12 h-12 flex items-center text-gray-900 justify-center rounded-full hover:bg-neutral-100 transition-all duration-200 cursor-pointer ${
                                    isDropdownOpen ? 'bg-neutral-100 rotate-90' : ''
                                }`}
                                onClick={toggleDropdown}
                            >
                                <MoreVertical className="w-6 h-6" />
                            </div>
                            
                            {/* Dropdown Menu */}
                            <div className={`absolute right-0 top-14 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 ease-out transform origin-top-right z-50 ${
                                isDropdownOpen 
                                    ? 'opacity-100 scale-100 translate-y-0' 
                                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                            }`}>
                                <div className="py-2 px-2">
                                    {/* Mark all as read option - only show if there are unread notifications */}
                                    {unreadCount > 0 && (
                                        <>
                                            <button
                                                disabled={loading || error}
                                                onClick={handleMarkAllAsRead}
                                                className="w-full px-2 py-3 text-left text-gray-500 hover:bg-neutral-50 rounded-xl  transition-colors duration-200 flex items-center gap-3 group cussor-pointer cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-cyan-100 group-hover:bg-cyan-200 transition-colors duration-200">
                                                    <CheckIcon strokeWidth={2} className="w-4 h-4 text-cyan-600" />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-base">Mark all as read</div>
                                                </div>
                                            </button>

                                            {/* Separator */}
                                            <div className="h-px bg-gray-100 mx-4 my-1"></div>
                                        </>
                                    )}

                                    <button
                                        //onClick={handleClearAllNotifications}
                                        disabled={loading || error}
                                        className="w-full px-2 py-3 text-left text-gray-500 hover:bg-neutral-50 rounded-xl  transition-colors duration-200 flex items-center gap-3 group cussor-pointer cursor-pointer"
                                    >
                                        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-100 group-hover:bg-red-200 transition-colors duration-200">
                                            <Trash2 className="w-4 h-4 text-red-600" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-base">Clear all notification</div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Notification Content */}
                <div className="flex-1 w-full">
                    {error ? (
                        <ErrorDisplay />
                    ) : loading ? (
                        <NotificationSkeleton cards={4} />
                    ) : notifications.length === 0 ? (
                        <NotificationPlaceholder />
                    ) : (
                        <div className="w-full px-4 flex flex-col items-start justify-center gap-2 mt-8 mb-8">
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
            </div>

            <Footerbar />
            <Footer />
        </div>
    );
};

export default NotificationPage;