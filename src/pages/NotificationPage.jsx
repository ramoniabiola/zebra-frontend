import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Footerbar from "../components/Footerbar";
import Footer from "../components/Footer";

const NotificationPage = () => {
    
    return (
        <div className="w-full h-full flex flex-col items-start justify-start bg-white">
            {/* Header */}
            <div className="fixed top-0 z-50 w-full h-16 flex items-center justify-start gap-4 px-4 bg-white shadow-sm">
                <div className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100 cursor-pointer">
                    <ArrowLeftIcon className="w-5 h-5 text-gray-800" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
            </div>

            {/* Notification List */}
            <div className="w-full flex flex-col gap-6 px-4 mt-24 mb-8 cursor-pointer">
                {/* Single Notification Card */}
                {[1, 2, 3].map((_, i) => (
                    <div
                        key={i}
                        className="w-full p-4 rounded-xl bg-cyan-50 border border-cyan-200"
                    >
                    <h2 className="text-lg font-semibold text-cyan-700">
                        New Apartment Update
                    </h2>
                    <p className="text-base text-gray-500 mt-2">
                        New apartments are available in one of your favourite locations.
                    </p>
                    <span className="text-xs text-gray-400 mt-2 block">2 hours ago</span>
                  </div>
                ))}
            </div>
            <Footerbar />
            <Footer />
        </div>

    )
}

export default NotificationPage;