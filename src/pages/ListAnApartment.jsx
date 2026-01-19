import { useNavigate } from "react-router-dom";
import { HomeIcon, UserPlusIcon, PlusCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { HousePlus, X, UserX } from "lucide-react";



const ListAnApartment = () => {
    const [showAuthDialog, setShowAuthDialog] = useState(false);
    const [showUnauthorizedDialog, setShowUnauthorizedDialog] = useState(false);
    const user = useSelector((state) => state.auth.user);
    const userId = user?._id;
    const userRole = user?.role;
    const navigate = useNavigate();

    
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
    
    
    

    const handleNavigation = () => {
        if(!userId) {
           setShowAuthDialog(true)
        } else if(userRole === "tenant") {
            setShowUnauthorizedDialog(true)
        } else if(userRole === "landlord" || userRole === "agent") {
            navigate("/dashboard")
        } else {
            // Handle other roles or unexpected cases
            setShowUnauthorizedDialog(true)
        }
    }


    const handleDialogClose = () => {
        setShowAuthDialog(false);
    }

    const handleUnauthorizedDialogClose = () => {
        setShowUnauthorizedDialog(false);
    }


    const handleLoginNavigation = () => {
        setShowAuthDialog(false);
        navigate('/login');
    }

    const handleRegisterNavigation = () => {
        setShowAuthDialog(false);
        navigate('/register');
    }

    const handleCreateLandlordAccount = () => {
        setShowUnauthorizedDialog(false);
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
                        <div className="w-14 h-14 bg-gradient-to-b from-rose-500 to-red-600  rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <HousePlus  className="w-7 h-7 text-white"  />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">
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
                            className="w-full shadow-lg bg-cyan-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-cyan-700 transition-colors cursor-pointer"
                        >
                            Log In
                        </button>
                        <button
                            onClick={handleRegisterNavigation}
                            className="w-full border shadow-lg border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer"
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

    // Unauthorized Dialog Component for Tenants
    const UnauthorizedDialog = () => (
        <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-11/12 mx-4 relative">
                {/* Close button */}
                <button
                    onClick={handleUnauthorizedDialogClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                    <X className="w-5 h-5" />
                </button>
                
                {/* Dialog content */}
                <div className="text-center">
                    <div className="mb-4">
                        <div className="w-14 h-14 bg-gradient-to-b from-amber-500 to-orange-600  rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <UserX  className="w-7 h-7 text-white"  />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">
                            Access Not Authorized
                        </h2>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Your current account is registered as a <span className="font-bold text-gray-700">Tenant</span>. Only landlords and agencies can list properties on this platform.
                        </p>
                    </div>
                    
                    {/* Info section */}
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 mb-6">
                        <div className="flex items-start">
                            <ExclamationTriangleIcon className="w-5 h-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                            <div className="text-left">
                                <p className="text-sm text-amber-800 font-medium mb-1">
                                    Tenant Account Limitation
                                </p>
                                <p className="text-xs text-amber-700">
                                    Tenant accounts are designed for browsing and applying for properties, not for listing them.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col gap-3 mt-6">
                        <button
                            onClick={handleCreateLandlordAccount}
                            className="w-full shadow-lg bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors cursor-pointer"
                        >
                            Create Landlord/Agent Account
                        </button>
                        <button
                            onClick={handleUnauthorizedDialogClose}
                            className="w-full border shadow-lg border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                            Continue as Tenant
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-4">
                        Need to list properties? Create a landlord or agent account instead.
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
                        <div className="w-18 h-18 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center shadow-lg">
                            <HomeIcon className="w-9 h-9 text-green-600" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-7 h-7 bg-gradient-to-br from-emerald-200 to-emerald-300 rounded-full flex items-center justify-center shadow-md">
                            <PlusCircleIcon className="w-3.5 h-3.5 text-emerald-800" />
                        </div>
                    </div>

                    <h2 className="text-xl font-bold text-gray-800 mb-3">
                        Ready to List Your Vacant Apartment?
                    </h2>

                    <p className="text-gray-600 text-sm mb-8 max-w-md leading-relaxed">
                        Reach thousands of potential tenants across Nigeria by listing your vacant properties on our platform.
                    </p>

                    <div className="space-y-6 max-w-lg">
                        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow">
                            <h3 className="text-base font-semibold text-gray-800 mb-2">Already Registered?</h3>
                            <p className="text-gray-600 mb-4 text-sm">
                                Navigate to your dashboard to list your vacant properties
                            </p>
                            <button 
                                onClick={handleNavigation} 
                                className="w-3/4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm py-2 px-4 rounded-lg font-medium hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 shadow-lg"
                            >
                                Go to myDashboard
                            </button>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow">
                            <div className="flex items-center justify-center mb-2">
                                <UserPlusIcon className="w-4.5 h-4.5 text-gray-500 mr-2" />
                                <h3 className="text-base font-semibold text-gray-800">New User?</h3>
                            </div>
                            <p className="text-gray-600 mb-4 text-sm">
                                Register as an Agency or Landlord to start publishing your vacant listings
                            </p>
                            <button 
                                onClick={() => navigate("/register")} 
                                className="w-3/4 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm py-2 px-4 rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg"
                            >
                                Register Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Authentication Dialog */}
            {showAuthDialog && <AuthDialog />}
            
            {/* Unauthorized Dialog for Tenants */}
            {showUnauthorizedDialog && <UnauthorizedDialog />}
        </>
    )
}

export default ListAnApartment;