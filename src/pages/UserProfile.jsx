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
        <div className="w-11/12 mx-auto mt-8 p-6 bg-white border-2   border-stone-200 rounded-xl shadow-sm">
          {/* Profile Image */}
          <div className="flex flex-col items-center gap-3 mb-6">
            <img
              src={user.profile_picture}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover outline-3 outline-solid outline-cyan-500"
            />
            <h1 className="text-3xl font-bold text-gray-700">{user.full_name}</h1>
            <p className="text-gray-500 text-lg">{user.email}</p>
            <button
              onClick={() => setEditMode(!editMode)}
              className="px-6 py-2 bg-cyan-600 text-white text-lg font-semibold rounded-md hover:bg-cyan-700 cursor-pointer"
            >
              {editMode ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {/* Profile Info */}
          <div className="space-y-6">
            {[
              { label: "Username", name: "username" },
              { label: "Phone Number", name: "phone_no" },
              { label: "Gender", name: "gender" },
              { label: "Date of Birth", name: "date_of_birth" },
              { label: "Address", name: "address" },
            ].map(({ label, name }) => (
              <div key={name}>
                <label className="block font-semibold text-lg text-gray-700">{label}:</label>
                {editMode ? (
                  <input
                    type="text"
                    name={name}
                    value={user[name]}
                    onChange={handleChange}
                    className="mt-1 block w-full border text-lg font-medium border-gray-200 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                ) : (
                  <p className="mt-1 w-full bg-gray-100 text-gray-500 text-lg font-medium p-3 rounded-md">{user[name]}</p>
                )}
              </div>
            ))}
          </div>  

          {/* User Role */}
          <div className="flex items-center gap-2 mt-6">
            <span className="font-semibold text-lg text-gray-700">Role:</span>
            <span className={`px-4 py-1 rounded-sm text-lg font-bold
              ${user.role === 'Tenant' ? 'bg-rose-100 text-rose-800' :
                user.role === 'Landlord' ? 'bg-sky-100 text-sky-800' :
                'bg-amber-100 text-amber-800'}
            `}>
              {user.role}
            </span>
          </div>

          {/* Save Update Button */}
          {editMode && (
            <div className="mt-6">
              <button
                onClick={() => {
                  setEditMode(false);
                }}
                className="w-full py-2.5 bg-emerald-600 text-white text-lg font-semibold rounded-md hover:bg-emerald-700 cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
      <Footerbar />
      <Footer />
    </div>
  );
};

export default UserProfile;