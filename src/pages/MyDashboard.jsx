import Footerbar from "../components/Footerbar";
import Footer from "../components/Footer";
import {
  UserCircleIcon
} from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import MyListings from "../components/MyListings";
import DeactivatedListings from "../components/DeactivatedListings";
import { useNavigate } from "react-router-dom";
import { Component, FileText, Home, Landmark, LayoutDashboard, PauseCircle, Plus, RotateCcw, UserRound, UserRoundCheck } from "lucide-react";
import { useSelector } from "react-redux";
import { fetchUserStatsApi } from "../api/myListings";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import DashboardSkeleton from "../utils/loading-display/dashboardSkeleton";
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
      <ExclamationTriangleIcon className="w-9 h-9 text-red-500 mx-auto mb-3" />
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
      <div className="w-full flex items-center justify-between px-6 py-8 pt-10">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-cyan-900 tracking-widest">Welcome back!</h2>
          <h1 className="text-2xl font-bold text-cyan-950 tracking-widest">{user?.username}</h1>
        </div>
        <div className="ring-4 p-[3px] ring-cyan-500 rounded-full">
          {user.profile_picture ? (
            <img src={user.profile_picture} alt="avatar" className="w-14 h-14 rounded-full object-cover cursor-pointer" />
          ) : (
            <UserCircleIcon className="w-15 h-15 text-cyan-500 cursor-pointer" />
          )}
        </div>
      </div>

      {/* STATS CARD - 2 per row (2x2) */}
      <div className="w-full px-1 py-2 bg-gray-50">
        {error ? (
          <ErrorDisplay />
        ) : isLoading ?
        (
          <DashboardSkeleton /> 
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4 mb-12 px-2">
            {/* Active Listings */}
            <div className="flex items-center justify-between py-3 px-3 rounded-lg bg-gradient-to-r from-cyan-600 to-cyan-400 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold font-sans text-white">{compactNumber(userStats.activeListings)}</h2>
                <p className="text-xs font-medium text-white/80 tracking-widest">Active Listings</p>
              </div>
              <div className="items-center mb-4">
                <Landmark 
                  className="w-7 h-7 text-white/95" 
                />
              </div>
            </div>
 
            {/* Total Listings */}
            <div className="flex items-center justify-between py-3  px-3 rounded-lg bg-gradient-to-r from-cyan-700 to-cyan-400 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold font-sans text-white">{compactNumber(userStats.totalListings)}</h2>
                <p className="text-xs font-medium text-white/80 tracking-widest">Total Listings</p>
              </div>
              <div className="items-center mb-4">
                <Component
                  className="w-7 h-7 text-white/95" 
                />
              </div>
            </div>
        

            {/* User Role */}
            <div className="flex items-center justify-between py-3 px-3 rounded-lg bg-gradient-to-r from-cyan-700 to-cyan-400 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold font-sans text-white">{user.role}</h2>
                <p className="text-xs font-medium text-white/80 tracking-widest">User Role</p>
              </div>
              <div className="items-center mb-4">
                <UserRoundCheck
                  className="w-7 h-7 text-white/95" 
                />
              </div>
            </div>
            

            {/*Deactivated Listings */}
            <div className="flex items-center justify-between py-3 px-3 rounded-lg bg-gradient-to-r from-cyan-600 to-cyan-400 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold font-sans text-white">{compactNumber(userStats.deactivatedListings)}</h2>
                <p className="text-xs font-medium text-white/80 tracking-widest">Rented Listings</p>
              </div>
              <div className="items-center mb-4">
                <PauseCircle
                  className="w-7 h-7 text-white/95" 
                />
              </div>
            </div>
          </div>
        )}

        {/* Create New Listing Button */}
        <div className="px-2 bg-gray-50">
          <button 
            onClick={() => navigate("/create-listing")} 
            className="w-full bg-gradient-to-r from-cyan-700 to-cyan-500 hover:from-cyan-800 hover:to-cyan-600 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-3 group focus:invisible cursor-pointer" 
          >
           <div className="p-1 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
              <Plus size={20} strokeWidth={2} className="text-white" />
            </div>
            <span className="text-lg">Create New Listing</span>
          </button>
        </div>
      </div>

      {/*APARTMENT LISTING DISPLAY*/}
      <div className="w-full h-full flex flex-col items-start justify-center">
        {/* Tab Navigation */}
        <div className="w-full bg-gray-50">
          <div className="border-b border-gray-200">
            <div className="relative flex items-center justify-center gap-8 px-6">
              {["My Listings", "Deactivated Listings"].map((tab) => (
                <h2
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative py-4 text-lg transition-all font-medium duration-300 cursor-pointer focus:invisible ${
                    activeTab === tab 
                      ? "text-cyan-600" 
                      : "text-gray-400  hover:text-gray-600"
                  }`}
                >
                  {tab}

                  {/* Animated Underline */}
                  {activeTab === tab && (
                    <span
                      className="absolute bottom-0 w-full left-0 h-1.5 bg-cyan-600 rounded-full transition-all duration-300 ease-out"   
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
      <Footerbar />
      <Footer />
    </div>
  );
}; 

export default MyDashboard;
