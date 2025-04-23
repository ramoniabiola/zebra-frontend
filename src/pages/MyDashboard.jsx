import Footerbar from "../components/Footerbar";
import Footer from "../components/Footer";
import {
  UserCircleIcon,
  ClipboardDocumentListIcon,
  PlusIcon,
  HomeModernIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import MyListings from "../components/MyListings";
import DeactivatedListings from "../components/DeactivatedListings";


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


  return (
    <div className="w-full min-h-screen flex flex-col items-start justify-start bg-white">
      {/* Welcome section with avatar */}
      <div className="w-full flex items-center justify-between px-4 py-8 pt-10 mb-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-cyan-900 tracking-widest">Welcome back!</h2>
          <h1 className="text-3xl font-bold text-cyan-950 tracking-wider">{user.username}</h1>
        </div>
        <div className="ring-2 ring-cyan-700 rounded-full">
          {user.avatar ? (
            <img src={user.avatar} alt="avatar" className="w-12 h-12 rounded-full object-cover cursor-pointer" />
          ) : (
            <UserCircleIcon className="w-14 h-14 text-gray-400 cursor-pointer" />
          )}
        </div>
      </div>

      {/* Stats Cards - 2 per row (2x2) */}
      <div className="w-full px-4 grid grid-cols-2 gap-4 mb-12">
        {/* Active Listings */}
        <div className="border-[2px] border-gray-200 rounded-md px-6 flex items-center justify-start pl-2 pr-1 pt-1 pb-1 gap-1.5 inset-shadow-sm">
          <HomeModernIcon className="w-8 h-8 text-cyan-600" />
          <div className="gap-2">
            <p className="text-gray-600 text-sm font-semibold">Active Listings</p>
            <h2 className="text-base text-center font-extrabold text-gray-600">{user.activeListings}</h2>
          </div>
        </div>

        {/* Total Listings */}
        <div className="border-[2px] border-gray-200 rounded-md px-6 py-3 flex items-center justify-start pl-2 pr-1 pt-1 pb-1 gap-1.5 inset-shadow-sm">
          <ClipboardDocumentListIcon className="w-8 h-8 text-cyan-600" />
          <div className="gap-2">
            <p className="text-gray-600 text-sm font-semibold">Total Listings</p>
            <h2 className="text-base text-center font-extrabold text-gray-600">{user.totalListings}</h2>
          </div>
        </div>

        {/* User Role */}
        <div className="border-[2px] border-gray-200 rounded-md px-6 py-3 flex items-center justify-start pl-2 pr-1 pt-1 pb-1 gap-1.5 inset-shadow-sm">
          <UserCircleIcon className="w-8 h-8 text-cyan-600" />
          <div>
            <p className="text-gray-600 text-sm font-semibold">User Role</p>
            <h2 className="text-base text-center font-extrabold  text-gray-700">{user.role}</h2>  
          </div>
        </div>

        {/* Create New Listing Button*/}
        <button className="bg-linear-65 from-cyan-600 to-cyan-300 text-white font-bold text-sm  rounded-md flex items-center justify-center gap-1 cursor-pointer" >
          <PlusIcon className="w-5 h-5 text-white" />
            Add Apartment
        </button>
      </div>

      {/*APARTMENT LISTING DISPLAY*/}
      <div className="w-full h-full flex flex-col items-start justify-center">
        {/* Listing Tab */}
        <div className="w-full h-16 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center gap-12">
            {["My Listings", "Deactivated Listings"].map(tab => (
              <span
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative cursor-pointer rounded-md text-lg transition-all font-bold 
                  ${activeTab === tab ? "text-gray-600" : "text-gray-400"
                }`}
              >
                {tab}
                {activeTab === tab && (    
                  <span className="absolute -bottom-[18px] left-0 w-full h-[5px] bg-cyan-500 rounded-t-full"></span>
                )}  
              </span>
            ))}
          </div>
          <hr className="w-full text-gray-300 mt-4.5 sticky" />
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
