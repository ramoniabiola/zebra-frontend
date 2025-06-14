import { useState } from "react";
import Footer from "../components/Footer";
import Footerbar from "../components/Footerbar";
import { dummyTenant } from "../utils/Data";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Key, LogOut } from 'lucide-react';


const UserProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState(dummyTenant);
  const navigate = useNavigate();



  const handleChange = (e) => { 
    setUser({ ...user, [e.target.name]: e.target.value });
  };
        

  return (
     <div className="w-full h-full flex flex-col items-start justify-start">
      <div className="w-full h-full flex flex-col items-start justify-center gap-4 mb-12">
        {/* HEADING AND BACK ICON */}
        <div className="w-full h-16 flex items-center justify-start gap-4 pl-2 pt-4 bg-white">
          <div 
            className="w-12 h-12  mt-1 flex items-center text-gray-900 justify-center rounded-full hover:bg-neutral-100 transition-colors duration-200 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </div>
            <h1 className="font-bold text-gray-900 text-3xl">Profile</h1>
        </div>

        {/* USER PROFILE DETAILS */}
        <div className="w-11/12 mx-auto mt-8 p-6 bg-white border-1 border-stone-100 rounded-xl shadow-sm">
          {/* Profile Image */}
          <div className="flex flex-col items-center gap-3 mb-6">
            <div className="relative w-28 h-28">
              <img
                src={user.profile_picture}
                alt="Profile"
                className="w-full h-full rounded-full object-cover outline-3 outline-solid outline-cyan-500"
              />  

              {/* Photo change mode */}
              {editMode && (
                <div className="absolute inset-0  bg-black opacity-60 flex items-center justify-center rounded-full cursor-pointer group">
                  <span className="text-white text-sm text-center font-medium group-hover:underline">Change Avatar</span>
                </div>
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-700">{user.full_name}</h1>
            <p className="text-gray-500 text-lg">{user.email}</p>
            <button
              onClick={() => setEditMode(!editMode)}
              className={`px-7 py-2.5 text-lg font-semibold rounded-lg cursor-pointer transition-all duration-200 transform hover:-translate-y-1 shadow-lg hover:shadow-xl focus:invisible ${
                editMode 
                  ? "bg-gray-600 text-white hover:bg-gray-700" 
                  : "bg-cyan-500 text-white hover:bg-cyan-600"
              }`}
            >
              {editMode ? "Cancel" : "Edit Profile"}
            </button>
          </div>
        
          {/* === Account Info === */}
          <div className="mt-16">
            <h2 className="text-xl text-center font-bold text-gray-800 mb-4">Account Info</h2>
            <div className="space-y-6">
              {["username", "email"].map((name) => (
                <div key={name}>
                  <label className="block font-semibold text-lg text-gray-700 capitalize">{name}:</label>
                  {editMode ? (
                    <input
                      type="text"
                      name={name}
                      value={user[name]}
                      onChange={handleChange}
                      className="mt-1 block w-full border text-lg font-medium border-gray-200 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  ) : (
                    <p className="mt-1 w-full bg-gray-100 text-gray-500 border border-gray-200 text-lg font-medium p-3 rounded-md">
                      {user[name]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          
          {/* === Personal Info === */}
          <div className="mt-16">
            <h2 className="text-xl text-center font-bold text-gray-800 mb-4">Personal Info</h2>
            <div className="space-y-6">
              {["gender", "date_of_birth"].map((name) => (
                <div key={name}>
                  <label className="block font-semibold text-lg text-gray-700 capitalize">{name.replace(/_/g, " ")}:</label>
                  {editMode ? (
                    <input
                      type={name === "date_of_birth" ? "date" : "text"}
                      name={name}
                      value={user[name]}
                      onChange={handleChange}
                      className="mt-1 block w-full border text-lg font-medium border-gray-200 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  ) : (
                    <p className="mt-1 w-full bg-gray-100 text-gray-500 border border-gray-200 text-lg font-medium p-3 rounded-md">
                      {user[name]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* === Contact Info === */}
          <div className="mt-16">
            <h2 className="text-xl text-center font-bold text-gray-800 mb-4">Contact Info</h2>
            <div className="space-y-6">
              {["phone_no", "address"].map((name) => (
                <div key={name}>
                  <label className="block font-semibold text-lg text-gray-700 capitalize">{name.replace(/_/g, " ")}:</label>
                  {editMode ? (
                    <input
                      type="text"
                      name={name}
                      value={user[name]}
                      onChange={handleChange}
                      className="mt-1 block w-full border text-lg font-medium border-gray-200 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  ) : (
                    <p className="mt-1 w-full bg-gray-100 text-gray-500 border border-gray-200 text-lg font-medium p-3 rounded-md">
                      {user[name]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          
          {/* === Security Settings === */}
          <div className="mt-16">
            <h2 className="text-xl text-center font-bold text-gray-800 mb-8">Security Settings</h2>
            {/* Warning Banner */}
            {!editMode && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-amber-600" />
                  <p className="text-amber-800 text-sm font-medium">Enable edit mode to access security settings</p>
                </div>
              </div>
            )}

            {/* Security Settings */}
            <div className="w-full flex flex-col items-start justify-start gap-6">
              <button 
                className={`flex items-center gap-3 px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md ${
                  editMode 
                    ? "text-white bg-rose-500 hover:bg-rose-600 hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer" 
                    : "text-gray-500 bg-gray-200 cursor-not-allowed"
                }`}
                disabled={!editMode}
              >
                <Key className="w-5 h-5" />
                Change Password
              </button>
              
              <button 
                className={`flex items-center gap-3 px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md ${
                  editMode 
                    ? "text-red-700 bg-red-50 border-2 border-red-200 hover:bg-red-100 hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer" 
                    : "text-stone-500 bg-stone-100 border-2 border-stone-300 cursor-not-allowed"
                }`}
                disabled={!editMode}
              >
                <AlertTriangle className="w-5 h-5" />
                Deactivate Account
              </button>
            </div>
          </div>

          {/* === User Role === */}
          <div className="mt-16">
            <h2 className="text-xl text-center font-bold text-gray-800 mb-8">Account Role</h2>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-lg text-gray-700">Role:</span>
              <span className={`px-6 py-2 rounded-full text-lg font-bold shadow-md ${
                user.role === 'Tenant' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                user.role === 'Landlord' ? 'bg-sky-100 text-sky-800 border border-sky-200' :
                'bg-amber-100 text-amber-800 border border-amber-200'
              }`}>
                {user.role}
              </span>
            </div>
          </div>

          {/* === Save Update Button === */}
          {editMode && (
            <div className="mt-16">
              <button
                onClick={() => {
                  setEditMode(false);
                }}
                className="w-full py-3 bg-teal-600 text-white text-lg font-semibold rounded-lg hover:bg-teal-700 cursor-pointer transition-all duration-200 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                Save Changes
              </button>
            </div>
          )}

          {/* Logout button */}
          <div className="mt-8">
            <button className="w-full flex items-center justify-center gap-3 py-3 bg-white text-gray-700 border-2 border-gray-300 text-lg font-semibold rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:invisible">
              <LogOut className="w-5 h-5" />
              Log out
            </button>
          </div>
        </div>
      </div>
      <Footerbar />
      <Footer />
    </div>
  );
};

export default UserProfile;