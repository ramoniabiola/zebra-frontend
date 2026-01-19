import {
  UserCircleIcon
} from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import MyListings from "../components/MyListings";
import DeactivatedListings from "../components/DeactivatedListings";
import { useNavigate } from "react-router-dom";
import { Component, Landmark, PauseCircle, Plus, RotateCcw, UserRoundCheck } from "lucide-react";
import { useSelector } from "react-redux";
import { fetchUserStatsApi } from "../api/myListings";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import DashboardSkeleton from "../utils/loading-display/DashboardSkeleton";
import { compactNumber } from "../utils/numbers-format/FormatNumber"



const MyDashboard = () => { 
  const [activeTab, setActiveTab] = useState("My Listings"); 
  const navigate =  useNavigate();
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [userStats, setUserStats] = useState({})
  const user = useSelector((state) => state.auth?.user);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);


  //GET USER LISTINGS STATS
  const getUserStats = async () => {
    setIsLoading(true);
    setError(null)

    try{
      const response = await fetchUserStatsApi();
      if(response.status >= 200 && response.status < 300) {
        setUserStats(response.data);
        setError(null);
        setIsLoading(false);
      } else {
        // If the response status is not in the success range, handle the error
        throw new Error(response.data.error || 'failed to fetch user listings stats');
      }
    }catch(error){
      setIsLoading(false)
      setError(error.response?.data?.error || "Failed to fetch user listings stats")
    }
  }


  useEffect(() => {
    
    getUserStats();
  }, [])

  
  const handleRetry = () => {
    getUserStats();
  };



  // Error Display
  const ErrorDisplay = () => (
    <div className="h-full w-full flex flex-col items-center justify-center text-center py-8 mb-15">
      <ExclamationTriangleIcon className="w-8 h-8 text-red-500 mx-auto mb-3" />
      <h3 className="text-base font-semibold text-gray-800 mb-2">
        Something went wrong
      </h3>
      <p className="text-gray-600 text-sm mb-4">
        {error || "Failed to fetch user listings stats"}
      </p>
      <button
        onClick={handleRetry}
        className="px-3 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm tracking-widest font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-1.5  focus:invisible cursor-pointer"
      >
        <RotateCcw className="w-4 h-4" />
        Retry
      </button>
    </div>
  );
  


  return (
    <div className="w-full min-h-screen flex flex-col items-start justify-start bg-white">
      {/* Welcome section with avatar */}
      <div className="w-full flex items-center justify-between px-6 py-6 pt-8">
        <div className="flex flex-col gap-1">
          <h2 className="text-base font-semibold text-cyan-700 tracking-widest">Welcome back!</h2>
          <h1 className="text-xl font-bold text-cyan-800 tracking-widest">{user?.username}</h1>
        </div>
        <div className="ring-3 p-[3px] ring-cyan-500 rounded-full">
          {user.profile_picture ? (
            <img src={user.profile_picture} alt="avatar" className="w-13 h-13 rounded-full object-cover cursor-pointer" />
          ) : (
            <UserCircleIcon className="w-14 h-14 text-cyan-500 cursor-pointer" />
          )}
        </div>
      </div>

      {/* STATS CARD - 2 per row (2x2) */}
      <div className="w-full px-1 py-2">
        {error ? (
          <ErrorDisplay />
        ) : isLoading ?
        (
          <DashboardSkeleton /> 
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-2 mb-8 px-2">
            {/* Active Listings */}
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-gradient-to-r from-cyan-200 to-cyan-300 border border-cyan-300">
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-bold font-sans text-cyan-800">{compactNumber(userStats.activeListings)}</h2>
                <p className="text-xs font-medium text-cyan-800/80 tracking-widest">Active Listings</p>
              </div>
              <div className="items-center mb-4">
                <Landmark 
                  className="w-6 h-6 text-cyan-800/95" 
                />
              </div>
            </div>
 
            {/* Total Listings */}
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-gradient-to-r from-cyan-200 to-cyan-300 border border-cyan-300">
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-bold font-sans text-cyan-800">{compactNumber(userStats.totalListings)}</h2>
                <p className="text-xs font-medium text-cyan-800/80 tracking-widest">Total Listings</p>
              </div>
              <div className="items-center mb-4">
                <Component
                  className="w-6 h-6 text-cyan-800/95" 
                />
              </div>
            </div>
        

            {/* User Role */}
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-gradient-to-r from-cyan-200 to-cyan-300 border border-cyan-300">
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-bold font-sans text-cyan-800 first-letter:uppercase">{user.role}</h2>
                <p className="text-xs font-medium text-cyan-800/80 tracking-widest">User Role</p>
              </div>
              <div className="items-center mb-4">
                <UserRoundCheck
                  className="w-6 h-6 text-cyan-800/95" 
                />
              </div>
            </div>
            

            {/*Deactivated Listings */}
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-gradient-to-r from-cyan-200 to-cyan-300 border border-cyan-300">
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-bold font-sans text-cyan-800">{compactNumber(userStats.deactivatedListings)}</h2>
                <p className="text-xs font-medium text-cyan-800/80 tracking-widest">Rented Listings</p>
              </div>
              <div className="items-center mb-4">
                <PauseCircle
                  className="w-6 h-6 text-cyan-800/95" 
                />
              </div>
            </div>
          </div>
        )}

        {/* Create New Listing Button */}
        <div className="px-2">
          <button 
            onClick={() => navigate("/create-listing")} 
            className="w-full bg-gradient-to-r from-cyan-200 to-cyan-400 hover:from-cyan-800 hover:to-cyan-600 text-white font-semibold py-2 rounded-lg transition-all duration-200 flex items-center justify-center mx-auto gap-3 group focus:invisible cursor-pointer" 
          >
           <div className="p-1 bg-cyan-600/20 rounded-md group-hover:bg-cyan-600/30 transition-colors">
              <Plus size={16} strokeWidth={2} className="text-cyan-800/90" />
            </div>
            <span className="text-base text-cyan-800">Create New Listing</span>
          </button>
        </div>
      </div>

      {/*APARTMENT LISTING DISPLAY*/}
      <div className="w-full h-full flex flex-col items-start justify-center mt-2">
        {/* Tab Navigation */}
        <div className="w-full bg-gray-50 ">
          <div className="border-b border-t border-gray-100">
            <div className="relative flex items-center justify-center gap-8 px-6">
              {["My Listings", "Deactivated Listings"].map((tab) => (
                <h2
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative py-4 text-base transition-all font-medium duration-300 cursor-pointer focus:invisible ${
                    activeTab === tab 
                      ? "text-cyan-600" 
                      : "text-gray-400  hover:text-gray-600"
                  }`}
                >
                  {tab}

                  {/* Animated Underline */}
                  {activeTab === tab && (
                    <span
                      className="absolute bottom-0 w-full left-0 h-1 bg-cyan-600 rounded-full transition-all duration-300 ease-out"   
                    />
                  )}
                </h2>
              ))} 
            </div>
          </div>
        </div>
        
        {/* CONDITIONAL LISTINGS RENDER */}
        <div className="w-full">
          {activeTab === "My Listings" ? <MyListings /> : <DeactivatedListings />}
        </div>
      </div>
    </div>
  );
}; 

export default MyDashboard;