import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { CheckIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Footerbar from "../components/Footerbar";
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import useNotifications from "../hooks/notifications";
import NotificationCard from "../components/NotificationCard";
import NotificationPlaceholder from "../utils/placeholders/NotificationPlaceholder";
import { useSelector } from "react-redux";
import NotificationSkeleton from "../utils/loading-display/NotificationSkeleton";


const NotificationPage = () => {
    const navigate = useNavigate();
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
            {/* Header */}
            <div className="w-full h-20  flex items-center justify-between px-4 py-2">
                <div className="flex items-center justify-items-start gap-4">
                    <div
                        className="pt-1 flex goitems-center text-gray-900 justify-center rounded-full hover:bg-neutral-100 transition-colors duration-200 cursor-pointer"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeftIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="font-bold text-gray-900 text-3xl">Notifications</h1>
                        {unreadCount > 0 && (
                            <span className="text-sm text-cyan-600 font-medium">
                                {unreadCount > 99 ? '99+' : unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                            </span>
                        )}
                       
                    </div>
                </div>

                {/* Mark all as read button */}
                {unreadCount > 0 && (
                    <button
                        disabled={loading}
                        onClick={handleMarkAllAsRead}
                        className="flex items-center gap-1 px-3 py-2 mt-1 text-xs font-medium text-cyan-600 bg-cyan-50 rounded-lg hover:bg-cyan-100 transition-colors duration-200 cursor-pointer"
                    >
                        <CheckIcon className="w-3 h-3" />
                        Mark all
                    </button>
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

            <Footerbar />
            <Footer />
        </div>
    );
};

export default NotificationPage;