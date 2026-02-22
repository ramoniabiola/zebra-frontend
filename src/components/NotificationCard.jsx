import { formatCustomTimeAgo } from "../utils/time-format/TimeFormat";
import { useNavigate } from "react-router-dom";

const NotificationCard = ({ notification, onMarkAsRead }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (!notification.isRead) {
            onMarkAsRead(notification._id);
        }
    };

    const getNotificationStyle = () => {
        if (notification.isRead) {
            return "bg-stone-50 border-stone-100";
        }
        return "bg-gradient-to-l from-cyan-50 to-cyan-100/80 border-cyan-200/70";
    };

    const getTitleStyle = () => {
        if (notification.isRead) {
            return "text-gray-700";
        }
        return "text-cyan-600 font-semibold";
    };
    
    const getMetaTextStyle = () => {
        if (notification.isRead) {
            return "text-gray-500 hover:text-gray-600";
        }
        return "text-cyan-600";
    };

    return (
        <div
            className={`w-full px-3 lg:px-4 py-1.5 lg:py-2 rounded-xl border cursor-pointer transition-all duration-200 hover:shadow-md ${getNotificationStyle()}`}
            onClick={handleClick}
        >
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <h2 className={`text-base lg:text-lg ${getTitleStyle()}`}>
                        {!notification.isRead ? 'New Notification!' : ''}
                    </h2>
                    <p className="text-sm lg:text-base text-gray-600 mt-1 leading-relaxed">
                        {notification.message  || 'You have a new notification.'}
                    </p>
                    {notification.meta && (
                        <div className="mt-1 space-y-0.5">
                            {notification.meta.title && (
                                <p 
                                    onClick={() => navigate(`/listing/${notification.meta.apartmentId}`)}
                                    className={`text-sm lg:text-base font-medium hover:underline ${getMetaTextStyle()}`}
                                >
                                    {notification.meta.title}
                                </p>
                            )}
                            {notification.meta.location && (
                                <p className={`text-sm lg:text-base ${getMetaTextStyle()}`}>
                                    📍 {notification.meta.location}
                                </p>
                            )}
                        </div>
                    )}
                    <span className="text-xs lg:text-sm text-gray-400 mt-2 block"> 
                        {formatCustomTimeAgo(notification.createdAt) }
                    </span>
                </div>
                {!notification.isRead && (
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></div>
                )}
            </div>
        </div>
    );
};

export default NotificationCard;