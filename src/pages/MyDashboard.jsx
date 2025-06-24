import Footerbar from "../components/Footerbar";
import Footer from "../components/Footer";
import {
  UserCircleIcon
} from "@heroicons/react/24/solid";
import { useState, useRef, useEffect } from "react";
import MyListings from "../components/MyListings";
import DeactivatedListings from "../components/DeactivatedListings";
import { useNavigate } from "react-router-dom";
import { FileText, Home, Plus, UserRound } from "lucide-react";


// Example user data
const user = {
  username: "LandlordMike",
  role: "Landlord",
  avatar: "",
  totalListings: 12,
  activeListings: 5,
};

const MyDashboard = () => { 
  const [activeTab, setActiveTab] = useState("My Listings"); 
  const navigate =  useNavigate();
  
  const tabRefs = {
    "My Listings": useRef(null),
    "Deactivated Listings": useRef(null),
  };
  const underlineRef = useRef(null);

  
  useEffect(() => {
    const activeElement = tabRefs[activeTab]?.current;
    const underline = underlineRef.current;

    if (activeElement && underline) {
      const padding = 6;
      underline.style.width = `${activeElement.offsetWidth - padding * 2}px`;
      underline.style.left = `${activeElement.offsetLeft + padding}px`;
    }
  }, [activeTab]);


  return (
    <div className="w-full min-h-screen flex flex-col items-start justify-start bg-white">
      {/* Welcome section with avatar */}
      <div className="w-full flex items-center justify-between px-4 py-8 pt-10 shadow-sm">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-cyan-900 tracking-widest">Welcome back!</h2>
          <h1 className="text-3xl font-bold text-cyan-950 tracking-wider">{user.username}</h1>
        </div>
        <div className="ring-2 ring-cyan-600 rounded-full">
          {user.avatar ? (
            <img src={user.avatar} alt="avatar" className="w-12 h-12 rounded-full object-cover cursor-pointer" />
          ) : (
            <UserCircleIcon className="w-14 h-14 text-cyan-500 cursor-pointer" />
          )}
        </div>
      </div>

      {/* STATS CARD - 2 per row (2x2) */}
      <div className="w-full p-2 bg-slate-50">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 mb-6">
          {/* Active Listings */}
          <div className="flex flex-col items-center justify-center bg-white rounded-lg py-2 px-4 border border-gray-100 shadow-xl shadow-violet-50 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-xl bg-violet-50 border border-violet-100">
                <Home 
                  className="w-7 h-7 text-violet-700" 
                />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-base text-center font-medium text-gray-600 tracking-wider">Active Listings</p>
              <h2 className="text-2xl font-extrabold font-mono text-center text-gray-800">{user.activeListings}</h2>
            </div>
          </div>

          {/* Total Listings */}
          <div className="flex flex-col items-center justify-center bg-white rounded-lg py-2 px-4 shadow-xl border border-gray-100 shadow-amber-50 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-xl bg-amber-50 border border-amber-100">
                <FileText 
                  className="w-7 h-7 text-amber-600" 
                />
              </div>    
            </div>
            <div className="space-y-1">
              <p className="text-base text-center font-medium text-gray-600 tracking-wider">Total Listings</p>
              <h2 className="text-2xl font-extrabold font-mono text-center text-gray-800">{user.totalListings}</h2>
            </div>
          </div>

          {/* User Role */}
          <div className="flex flex-col items-center justify-center bg-white rounded-lg py-2 px-4 shadow-xl border border-gray-100 shadow-emerald-50 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-100">
                <UserRound className="w-7 h-7 text-emerald-600" />
              </div>  
            </div>
            <div className="space-y-1">
              <p className="text-base text-center font-medium  text-gray-600 tracking-wider">User Role</p>
              <h2 className="text-xl font-bold text-center text-gray-800 tracking-wide">{user.role}</h2>  
            </div>
          </div>
        </div>

        {/* Create New Listing Button */}
        <div className="mb-1">
          <button 
            onClick={() => navigate("/create-listing")} 
            className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-3 group focus:invisible cursor-pointer" 
          >
           <div className="p-1 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
              <Plus size={20} strokeWidth={2} className="text-white" />
            </div>
            <span className="text-lg">Create New Listing</span>
          </button>
          </div>
      </div>

      {/*APARTMENT LISTING DISPLAY*/}
      <div className="w-full h-full flex flex-col items-start justify-center mt-6">
        {/* Tab Navigation */}
        <div className="w-full">
          <div className="border-b border-gray-200">
            <div className="relative flex items-center justify-center gap-8 px-6">
              {["My Listings", "Deactivated Listings"].map((tab) => (
                <button
                  key={tab}
                  ref={tabRefs[tab]}
                  onClick={() => setActiveTab(tab)}
                  className={`relative py-4 text-lg transition-all duration-300 cursor-pointer focus:invisible ${
                    activeTab === tab 
                      ? "text-cyan-600 font-semibold" 
                      : "text-gray-400 font-normal hover:text-gray-600"
                  }`}
                >
                  {tab}
                </button>
              ))}

              {/* Animated Underline */}
              <span
                ref={underlineRef}
                className="absolute bottom-0 h-1 bg-cyan-600 rounded-full transition-all duration-300 ease-out"
                style={{ left: 0, width: 0 }}
              />
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
