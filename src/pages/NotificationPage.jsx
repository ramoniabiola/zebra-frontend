import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Footerbar from "../components/Footerbar";
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";


const NotificationPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
    

    
    return (
        <div className="w-full h-full flex flex-col items-start justify-start bg-white">
            {/* Header */}
            <div className="w-full h-16 flex items-center justify-start gap-4 pl-2 pt-4 bg-white">
                <div 
                    className="w-12 h-12  mt-1 flex items-center text-gray-900 justify-center rounded-full hover:bg-neutral-100 transition-colors duration-200 cursor-pointer"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeftIcon className="w-6 h-6" />
                </div>
                <h1 className="font-bold text-gray-900 text-3xl">Notifications</h1>
            </div>


            {/* Notification List */}
            <div className="w-11/12 px-2 flex flex-col items-start justify-center gap-6 mx-auto mt-12 mb-8 cursor-pointer">
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