import {
  UserCircleIcon
} from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import MyListings from "../components/MyListings";
import DeactivatedListings from "../components/DeactivatedListings";
import { useNavigate } from "react-router-dom";
import { Component, Landmark, PauseCircle, Plus, RotateCcw, TrendingUp, UserRoundCheck } from "lucide-react";
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


  const stats = [
    {
      label: "Active Listings",
      value: compactNumber(userStats.activeListings),
      icon: Landmark,
      iconBg: "bg-cyan-100/80",
      iconColor: "text-cyan-700",
      valueBg: "bg-cyan-700",
      trend: "+2 this month",
      trendPositive: true,
    },
    {
      label: "Total Listings",
      value: compactNumber(userStats.totalListings),
      icon: Component,
      iconBg: "bg-violet-100/80",
      iconColor: "text-violet-600",
      valueBg: "bg-violet-600",
      trend: "All time",
      trendPositive: true,
    },
    {
      label: "Deactivated",
      value: compactNumber(userStats.deactivatedListings),
      icon: PauseCircle,
      iconBg: "bg-amber-100/80",
      iconColor: "text-amber-600",
      valueBg: "bg-amber-500",
      trend: "Rented out",
      trendPositive: false,
    },
  ];



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
    <div className="w-full min-h-screen flex flex-col items-start justify-start bg-white lg:mt-18">
      {/* ── HERO WELCOME BANNER ── */}
      <div className="w-full px-2 md:px-4 lg:px-4 flex flex-col mt-4 md:mt-8 lg:mt-8">
        <div className="w-full relative overflow-hidden rounded-2xl md:rounded-3xl lg:rounded-3xl bg-gradient-to-br from-cyan-700 via-cyan-800 to-cyan-900 px-5 py-6 md:px-8 md:py-10 lg:px-8 lg:py-10">
          {/* Decorative blobs */}
          <div className="absolute -top-12 -right-12 w-52 h-52 rounded-full bg-white/5" />
          <div className="absolute -bottom-16 -left-10 w-64 h-64 rounded-full bg-white/5" />
          <div className="absolute top-8 right-32 w-12 h-12 rounded-full bg-cyan-500/40" />

          <div className="relative z-10 flex items-center justify-between gap-4">
            <div className="flex flex-col gap-3 md:gap-4 lg:gap-4 ">
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-cyan-300 bg-white/10 px-2.5 py-0.5 rounded-full w-fit">
                Dashboard
              </span> 

              <div className="gap-1.5">
                <h2 className="text-sm text-cyan-200/70 font-medium mt-1">Welcome back,</h2>
                <h1 className="text-2xl md:text-3xl lg:text-3xl font-black text-white tracking-tight leading-none">
                  {user?.username}
                </h1>
              </div> 

              <div className="flex items-center gap-2 mt-2">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full first-letter:uppercase border ${
                  user?.role === "tenant"
                    ? "bg-red-500/20 text-red-200 border-red-400/30"
                    : user?.role === "landlord"
                    ? "bg-yellow-500/20 text-yellow-200 border-yellow-400/30"
                    : "bg-emerald-500/20 text-emerald-200 border-emerald-400/30"
                }`}>
                  {user?.role}
                </span>
                <span className="flex items-center gap-1 text-xs text-cyan-200/60">
                  <TrendingUp className="w-3 h-3" />
                  Active account
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STATS CARD - 2 per row (2x2) */}
      <div className="w-full px-1 md:px-2 lg:px-2 py-2">
        {error ? (
          <ErrorDisplay />
        ) : isLoading ?
        (
          <DashboardSkeleton /> 
        ) : (
          <div className="w-full px-2 md:px-4 lg:px-4 flex flex-col mt-2 md:mt-4 lg:mt-4 mb-4 gap-4">
            {/* Overview label */}
            <div className="flex items-center gap-3">
              <h2 className="text-base md:text-lg font-bold text-gray-900 tracking-tight">Overview</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
              <span className="text-xs bg-stone-200 text-slate-600/70 px-2.5 py-1 rounded-full font-medium">
                {new Date().toLocaleDateString("en-NG", { month: "short", year: "numeric" })}
              </span>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-3">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={i}
                    className="bg-white rounded-xl md:rounded-2xl lg:rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
                  >
                    {/* Colored top bar */}
                    <div className={`h-1 w-full ${stat.valueBg}`} />
                    <div className="px-3 py-2 md:px-5 md:py-4 lg:px-5 lg:py-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-9 h-9 rounded-xl ${stat.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                          <Icon className={`w-4.5 h-4.5 ${stat.iconColor}`} />
                        </div>
                        <span className={`text-[9px] md:text-[12px] lg:text-[12px] font-semibold px-2 py-0.5 rounded-full ${
                          stat.trendPositive
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                            : "bg-amber-50 text-amber-600 border border-amber-100"
                        }`}>
                          {stat.trend}
                        </span>
                      </div>
                      <p className="text-[1.15rem] md:text-2xl lg:text-2xl pl-1 font-black text-gray-900 tracking-tight leading-none mb-1.5 first-letter:uppercase">
                        {stat.value ?? "—"}
                      </p>
                      <p className="text-xs md:text-sm lg:text-sm text-gray-400 font-medium">{stat.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Create New Listing Button */}
        <div className="px-2 md:px-4 lg:px-4 mt-4">
          <button 
            onClick={() => navigate("/create-listing")} 
            className="w-full bg-gradient-to-r from-cyan-700 to-cyan-800 hover:from-cyan-800 hover:to-cyan-900 text-white font-semibold py-2 md:py-2.5 lg:py-2.5  rounded-lg transition-all duration-200 flex items-center justify-center mx-auto gap-3 group focus:invisible cursor-pointer" 
          >
           <div className="p-1 bg-cyan-200/30 rounded-md group-hover:bg-cyan-200/40 transition-colors">
              <Plus size={16} strokeWidth={2} className="text-white/90" />
            </div>
            <span className="text-base md:text-lg lg:text-lg">Create New Listing</span>
          </button>
        </div>
      </div>

      {/*APARTMENT LISTING DISPLAY*/}
      <div className="w-full h-full flex flex-col items-start justify-center mt-2 lg:mt-6">
        {/* Tab Navigation */}
        <div className="w-full bg-gray-50 ">
          <div className="border-b border-t border-gray-100">
            <div className="relative flex items-center justify-center gap-8 px-6">
              {["My Listings", "Deactivated Listings"].map((tab) => (
                <h2
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative py-4 text-base lg:text-lg transition-all font-medium duration-300 cursor-pointer focus:invisible ${
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