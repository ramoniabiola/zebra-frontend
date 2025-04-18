import { useState } from "react";
import Footer from "../components/Footer";
import Footerbar from "../components/Footerbar";
import { dummyTenant } from "../utils/Data";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";


const UserProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState(dummyTenant);


  const handleChange = (e) => { 
    setUser({ ...user, [e.target.name]: e.target.value });
  };
        

  return (
    <div className="w-full h-full flex flex-col items-start justify-start">
      <div className="w-full h-full flex flex-col items-start justify-center gap-4 mb-12">
        {/* HEADING AND BACK ICON */}
        <div className="w-full h-16 flex items-center justify-start gap-4 pl-2 pt-4 bg-white">
          <div className="w-12 h-12  mt-1 flex items-center text-gray-900 justify-center rounded-full hover:bg-neutral-100 transition-colors duration-200 cursor-pointer">
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
              className="px-6 py-2 bg-cyan-500 text-white text-lg font-semibold rounded-md hover:bg-cyan-600 cursor-pointer"
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
                    <p className="mt-1 w-full bg-gray-100 text-gray-500 text-lg font-medium p-3 rounded-md">
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
                    <p className="mt-1 w-full bg-gray-100 text-gray-500 text-lg font-medium p-3 rounded-md">
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
                    <p className="mt-1 w-full bg-gray-100 text-gray-500 text-lg font-medium p-3 rounded-md">
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
            {editMode ? (
              <div className="w-full flex flex-col items-start justify-start gap-8">
                <button 
                  // onClick={() => navigate("/change-password")} 
                  className="text-white bg-rose-500 px-4 py-2 rounded-md font-semibold hover:bg-rose-600 transition cursor-pointer"
                >
                  Change Password
                </button>
                <button className="text-red-700 bg-red-50  border-2 border-red-200 px-4 py-2 rounded-md font-semibold hover:bg-red-100 transition cursor-pointer">
                  Deactivate Account
                </button> 
              </div> 
            ) : (
              <div className="w-full flex flex-col items-start justify-start gap-8">
                <button 
                  className="text-gray-800 bg-gray-300 px-4 py-2 rounded-md font-semibold transition"
                  disabled
                >
                  Change Password
                </button> 
                <button 
                  className="text-stone-800 bg-stone-100 border-2 border-stone-300 px-4 py-2 rounded-md font-semibold  transition"
                  disabled
                >
                  Deactivate Account
                </button> 
              </div> 
            )}
          </div>

          {/* === User Role === */}
          <div className="mt-16">
            <h2 className="text-xl text-center font-bold text-gray-800 mb-8">Account Role</h2>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-lg text-gray-700">Role:</span>
              <span className={`px-4 py-1 rounded-sm text-lg font-bold
                ${user.role === 'Tenant' ? 'bg-rose-100 text-rose-800' :
                  user.role === 'Landlord' ? 'bg-sky-100 text-sky-800' :
                  'bg-amber-100 text-amber-800'}
              `}>
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
                className="w-full py-2.5 bg-teal-600 text-white text-lg font-semibold rounded-md hover:bg-teal-700 cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          )}

          {/* Logout button */}
          <div className="mt-8">
            <button
              className="w-full py-2 bg-gray-100 text-gray-700 border-2 border-gray-300 text-lg font-semibold rounded-md hover:bg-gray-200 cursor-pointer"
            >
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