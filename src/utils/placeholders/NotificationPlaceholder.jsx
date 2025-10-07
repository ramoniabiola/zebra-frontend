import { BellIcon, CheckIcon } from '@heroicons/react/24/outline';

const NotificationPlaceholder = () => {
    return (
        <div className="h-[60vh] w-full flex flex-col items-center justify-center text-center py-16 px-4">
            <div className="relative mb-8">
                <div className="w-18 h-18 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center shadow-lg">
                    <BellIcon className="w-8 h-8 text-purple-600" />
                </div>
                <div className="absolute -top-1 -right-1 w-7 h-7 bg-gradient-to-br from-indigo-100 to-indigo-300 rounded-full flex items-center justify-center shadow-md">
                    <CheckIcon className="w-3.5 h-3.5 text-indigo-600" />
                </div>
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-3">
                No Notifications Yet
            </h2>

            <p className="text-gray-600 text-sm mb-8 max-w-md leading-relaxed">
                You're all caught up! When you receive new notifications about apartment updates, 
                messages, or other important updates, they'll appear here.
            </p>
        </div>
    );
};

export default NotificationPlaceholder;