import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Footerbar from "../components/Footerbar";
import { HomeIcon, UserPlusIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { HousePlus, X } from "lucide-react";



const ListAnApartment = () => {
    const [showAuthDialog, setShowAuthDialog] = useState(false);
    const user = useSelector((state) => state.auth.user);
    const userId = user?._id
    const navigate = useNavigate();

    
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
    
    
    

    const handleNavigation = () => {
        if(!userId) {
           setShowAuthDialog(true)
        } else {
            setShowAuthDialog(false)
            navigate("/dashboard")
        }
    }


    const handleDialogClose = () => {
        setShowAuthDialog(false);
    }


    const handleLoginNavigation = () => {
        setShowAuthDialog(false);
        navigate('/login');
    }

    const handleRegisterNavigation = () => {
        setShowAuthDialog(false);
        navigate('/register');
    }
  

    
    // Authentication Dialog Component
    const AuthDialog = () => (
        <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-11/12 mx-4 relative">
                {/* Close button */}
                <button
                    onClick={handleDialogClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                    <X className="w-5 h-5" />
                </button>
                
                {/* Dialog content */}
                <div className="text-center">
                    <div className="mb-4">
                        <div className="w-16 h-16 bg-gradient-to-b from-rose-500 to-red-600  rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <HousePlus  className="w-8 h-8 text-white"  />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                            List Your Vacant Apartment
                        </h2>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Log in to access your dashboard and start listing your vacant properties to reach thousands of potential tenants.
                        </p>
                    </div>
                    {/* Action buttons */}
                    <div className="flex flex-col gap-3 mt-6">
                        <button
                            onClick={handleLoginNavigation}
                            className="w-full shadow-lg bg-cyan-600 text-white py-2 px-2 rounded-lg font-medium hover:bg-cyan-700 transition-colors cursor-pointer"
                        >
                            Log In
                        </button>
                        <button
                            onClick={handleRegisterNavigation}
                            className="w-full border shadow-lg border-gray-300 text-gray-700 py-1.5 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                            Create Account
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-4">
                        Don't have an account? Create one to start listing your properties.
                    </p>
                </div>
            </div>
        </div>
    );

  

    
    return (
        <>
            <div className="max-w-4xl h-full flex flex-col items-start justify-start mx-auto">
                <div className="h-full w-full flex flex-col items-center justify-center text-center py-16 px-4">
                    <div className="relative mb-8">
                        <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center shadow-lg">
                            <HomeIcon className="w-10 h-10 text-green-600" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-8 h-8 bg-gradient-to-br from-emerald-200 to-emerald-300 rounded-full flex items-center justify-center shadow-md">
                            <PlusCircleIcon className="w-4 h-4 text-emerald-800" />
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-3">
                        Ready to List Your Vacant Apartment?
                    </h2>

                    <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
                        Reach thousands of potential tenants across Nigeria by listing your vacant properties on our platform.
                    </p>

                    <div className="space-y-6 max-w-lg">
                        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Already Registered?</h3>
                            <p className="text-gray-600 mb-4 text-sm">
                                Navigate to your dashboard to list your vacant properties
                            </p>
                            <button onClick={handleNavigation} className="w-3/4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 shadow-lg">
                                Go to myDashboard
                            </button>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow">
                            <div className="flex items-center justify-center mb-2">
                                <UserPlusIcon className="w-5 h-5 text-gray-500 mr-2" />
                                <h3 className="text-lg font-semibold text-gray-800">New User?</h3>
                            </div>
                            <p className="text-gray-600 mb-4 text-sm">
                                Register as an Agency or Landlord to start publishing your vacant listings
                            </p>
                            <button onClick={() => navigate("/register")} className="w-3/4 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-4 rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg">
                                Register Now
                            </button>
                        </div>
                    </div>
                </div>
                <Footerbar />
                <Footer />
            </div>

            {/* Authentication Dialog */}
            {showAuthDialog && <AuthDialog />}
        </>
    )
}

export default ListAnApartment;