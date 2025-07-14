import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Footerbar from "../components/Footerbar";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from 'react-router-dom';
import { AlertCircle, AlertTriangle, CheckCircle, Key, Loader2, LogOut, LogOutIcon, X } from 'lucide-react';
import { useSelector } from "react-redux";
import { useLogout } from "../hooks/auth";
import { useUpdateUser } from "../hooks/user";




const UserProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const user = useSelector((state) => state.auth?.user)
  const { handleLogout } = useLogout();
  const { updateUser, isLoading, error, setSuccess, success, clearStatus } = useUpdateUser();

  const [inputs, setInputs] = useState({
    full_name: user?.full_name || '',
    username: user?.username || '',
    email: user?.email || '',
    gender: user?.gender || '',
    date_of_birth: user?.date_of_birth || '',
    phone_no: user?.phone_no || '',
    address: user?.address || '',
  })
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const navigate = useNavigate();

  
  // DATE OF BIRTH FORMATTING
  const formatDateOfBirth = (dateString) => {
    if (!dateString) return "Not Provided";
    
    try {
      const date = new Date(dateString);

      // Check if date is valid
      if (isNaN(date.getTime())) {
        return "Not Provided";
      }

      // Format options
      const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      };

      
      return date.toLocaleDateString('en-NG', options);
    } catch (error) {
      return "Not Provided";
    }
  };  


  // HELPER FUNCTION FOR USER INFO RENDERING
  const displayOrFallback = (value, fallback = "Not Provided", fieldName = null) => {
    if (!value) return fallback;
    
    // Special handling for date_of_birth
    if (fieldName === 'date_of_birth') {
      return formatDateOfBirth(value);
    }

    return value;
  };  


  // Update inputs when user data changes
  useEffect(() => {
    if (user) {
      setInputs({
        full_name: user.full_name || '',
        username: user.username || '',
        email: user.email || '',
        gender: user.gender || '',
        date_of_birth: user.date_of_birth || '',
        phone_no: user.phone_no || '',
        address: user.address || '',
      });
    }
  }, [user]);


  // Handle update success/error
  useEffect(() => {
    if (success) {
      setEditMode(false);
      setFile(null);
      setPreviewUrl(null);
      clearStatus();
     
      // After 4 seconds, close modal and clear status
      const timer = setTimeout(() => {
        setShowSubmitModal(false);
        setSuccess(false);
        clearStatus();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [success, clearStatus]);
  


  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Create preview URL
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };


  const handleUpdateUser = async () => {
    setShowSubmitModal(true);
  
    await updateUser(user?._id, inputs, file);
  };


  const handleUserLogOut = async () => {
    await handleLogout();
    setShowConfirmModal(false);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setFile(null);
    setPreviewUrl(null);
    // Reset inputs to original user data
    setInputs({
      full_name: user?.full_name || '',
      username: user?.username || '',
      email: user?.email || '',
      gender: user?.gender || '',
      date_of_birth: user?.date_of_birth || '',
      phone_no: user?.phone_no || '',
      address: user?.address || '',
    });
    clearStatus();
  };

  // Cleanup preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);
  
        
  const ConfirmModal = () => {
    if (!showConfirmModal) return null;
    return (
      <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-rose-400 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogOutIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Confirm Logout</h3>
            <p className="text-gray-600">
              Are you sure you want to log out of your account?
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200 focus:invisible cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleUserLogOut}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold rounded-xl transition-all duration-200 focus:invisible cursor-pointer"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    );
  };



  

  const SubmitModal = () => {
    if (!showSubmitModal) return null;

    return (
      <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative">
          {!isLoading && (
            <button
              onClick={() => setShowSubmitModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <div className="text-center">
            {isLoading && (
              <>
                <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Loader2 className="w-8 h-8 text-sky-600 animate-spin" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Updating Your Profile
                </h3>
                <p className="text-gray-600">
                  Please wait while we update your profile information...
                </p>
              </>
            )}

            {success && (
              <>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Profile Updated Successfully!
                </h3>
                <p className="text-gray-600">
                  Your profile information has been updated successfully.
                </p>
              </>
            )}

            {error && (
              <>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Update Failed
                </h3>
                <p className="text-gray-600 mb-4">
                  We couldn't update your profile. Please try again.
                  <br />
                  <span className="text-sm text-gray-500 mt-2 block">
                    Error: {error}
                  </span>
                </p>
                <button
                  onClick={() => handleUpdateUser()}
                  className="px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg transition-colors duration-200 cursor-pointer"
                >
                  Try Again
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  
        

  return (
    <>
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
          <div className="w-11/12 mx-auto mt-8  p-6 bg-white border-1 border-stone-100 rounded-xl shadow-sm">
            {/* Profile Image */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-28 h-28 mb-4">
                {previewUrl || user?.profile_picture ? (
                <img
                  src={previewUrl || user?.profile_picture}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover outline-4 p-1 outline-solid outline-cyan-500"
                />
              ) : (
                <img
                  src="https://cdn2.vectorstock.com/i/thumb-large/28/66/profile-placeholder-image-gray-silhouette-vector-21542866.jpg"
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover outline-4 p-1 outline-solid outline-cyan-500"
                />
              )}

                {/* Photo change mode */}
                {editMode && (
                  <div className="absolute inset-0  bg-black/50 opacity-60 flex items-center justify-center rounded-full cursor-pointer group">
                    <label className="cursor-pointer group">
                      <span className="text-white text-sm text-center font-medium group-hover:underline">Change Avatar</span>
                      <input 
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        />
                    </label>
                  </div>
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-700 mb-0.5">{user?.full_name || "Full Name"}</h1>
              <p className="text-gray-500 text-lg mb-4.5">{user?.email || "Email not available"}</p>
              <button
                onClick={() => editMode ? handleCancelEdit() : setEditMode(true)}
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
                        value={inputs[name]}
                        onChange={handleChange}
                        className="mt-1 block w-full border text-lg font-medium border-gray-200 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    ) : (
                      <p className="mt-1 w-full bg-gray-100 text-gray-500 border border-gray-200 text-lg font-medium p-3 rounded-md">
                        {displayOrFallback(inputs[name])}
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
                        value={inputs[name]}
                        onChange={handleChange}
                        className="mt-1 block w-full border text-lg font-medium border-gray-200 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    ) : (
                      <p className="mt-1 w-full bg-gray-100 text-gray-500 border border-gray-200 text-lg font-medium p-3 rounded-md">
                        {displayOrFallback(inputs[name], "Not Provided", name)}
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
                        value={inputs[name]}
                        onChange={handleChange}
                        className="mt-1 block w-full border text-lg font-medium border-gray-200 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    ) : (
                      <p className="mt-1 w-full bg-gray-100 text-gray-500 border border-gray-200 text-lg font-medium p-3 rounded-md">
                        {displayOrFallback(inputs[name])}
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
                  onClick={() => navigate('/change-password')}
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
                  user?.role === 'tenant' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                  user?.role === 'landlord' ? 'bg-sky-100 text-sky-800 border border-sky-200' :
                  'bg-amber-100 text-amber-800 border border-amber-200'
                }`}>
                  {user?.role}
                </span>
              </div>
            </div>

            {/* === Save Update Button === */}
            {editMode && (
              <div className="mt-16">
                <button
                  onClick={handleUpdateUser}
                  disabled={isLoading}
                  className="w-full py-3 bg-teal-600 text-white text-lg font-semibold rounded-lg hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer transition-all duration-200 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                >
                  {isLoading ? 'Updating...' : 'Save Changes'}
                </button>
              </div>
            )}

            {/* Logout button */}
            <div className="mt-8">
              <button 
                className="w-full flex items-center justify-center gap-3 py-3 bg-white text-gray-700 border-2 border-gray-300 text-lg font-semibold rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:invisible"
                onClick={() => setShowConfirmModal(true)}
              >
                <LogOut className="w-5 h-5" />
                Log out
              </button>
            </div>
          </div>
        </div>
        <Footerbar />
        <Footer />
      </div>

      {/* Modals */}
      <ConfirmModal />
      <SubmitModal />
    </>
  );
};

export default UserProfile;