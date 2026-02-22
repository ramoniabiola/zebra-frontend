import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { AlertCircle, AlertTriangle, ArrowLeft, CheckCircle, Key, Loader2, LogOut, LogOutIcon, X, MoreVertical, Settings, ImagePlus, User, Mail, Phone, MapPin, Calendar, Users } from 'lucide-react';
import { useSelector } from "react-redux";
import { useLogout } from "../hooks/auth";
import { useUpdateUser } from "../hooks/user";


const fieldIcons = {
  username: User,
  full_name: User,
  email: Mail,
  gender: Users,
  date_of_birth: Calendar,
  phone_no: Phone,
  address: MapPin,
};

const UserProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSecurityDropdownOpen, setIsSecurityDropdownOpen] = useState(false);
  const securityDropdownRef = useRef(null);
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (securityDropdownRef.current && !securityDropdownRef.current.contains(event.target)) {
        setIsSecurityDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDateOfBirth = (dateString) => {
    if (!dateString) return "Not Provided";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Not Provided";
      return date.toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch {
      return "Not Provided";
    }
  };

  const displayOrFallback = (value, fallback = "Not Provided", fieldName = null) => {
    if (!value) return fallback;
    if (fieldName === 'date_of_birth') return formatDateOfBirth(value);
    return value;
  };

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

  useEffect(() => {
    if (success) {
      setEditMode(false);
      setFile(null);
      setPreviewUrl(null);
      clearStatus();
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
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  const handleUpdateUser = async () => {
    setShowSubmitModal(true);
    await updateUser(user?.email, inputs, file);
  };

  const handleUserLogOut = async () => {
    await handleLogout();
    setShowConfirmModal(false);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setFile(null);
    setPreviewUrl(null);
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

  const handleRetry = () => {
    clearStatus();
    handleUpdateUser();
  };

  // Reusable InfoCard for each field
  const InfoCard = ({ name, label }) => {
    const Icon = fieldIcons[name] || User;
    return (
      <div className="flex items-center gap-3 p-4 rounded-xl bg-stone-100/60 border border-stone-200 hover:border-stone-300/50 hover:bg-stone-100/90 transition-all duration-200 group">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-800 to-cyan-700 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
          <Icon className="w-5 h-5 text-white/90" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs md:text-sm lg:text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
          {editMode ? (
            <input
              type={name === "date_of_birth" ? "date" : "text"}
              name={name}
              value={
                name === "date_of_birth" && inputs[name]
                  ? new Date(inputs[name]).toISOString().split("T")[0]
                  : inputs[name] || ""
              }
              onChange={handleChange}
              className="w-full text-base md:text-lg lg:text-lg font-semibold text-slate-800 bg-white border border-stone-200 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          ) : (
            <p className="text-base md:text-lg lg:text-lg font-semibold text-slate-800 truncate">
              {displayOrFallback(inputs[name], "Not Provided", name)}
            </p>
          )}
        </div>
      </div>
    );
  };

  const ConfirmModal = () => {
    if (!showConfirmModal) return null;
    return (
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-gradient-to-r from-rose-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogOutIcon className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Confirm Logout</h3>
            <p className="text-gray-600 text-base">Are you sure you want to log out of your account?</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowConfirmModal(false)} className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200 cursor-pointer">Cancel</button>
            <button onClick={handleUserLogOut} className="flex-1 px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 text-white font-semibold rounded-xl transition-all duration-200 cursor-pointer">Log Out</button>
          </div>
        </div>
      </div>
    );
  };

  const SubmitModal = () => {
    if (!showSubmitModal) return null;
    return (
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative">
          {!isLoading && (
            <button onClick={() => setShowSubmitModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          )}
          <div className="text-center">
            {isLoading && (
              <>
                <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Loader2 className="w-8 h-8 text-sky-600 animate-spin" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Updating Your Profile</h3>
                <p className="text-gray-600 text-base">Please wait while we update your profile information...</p>
              </>
            )}
            {success && (
              <>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Profile Updated Successfully!</h3>
                <p className="text-gray-600 text-base">Your profile information has been updated successfully.</p>
              </>
            )}
            {error && (
              <>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Update Failed</h3>
                <p className="text-gray-600 mb-4 text-base">
                  We couldn't update your profile. Please try again.
                  <br />
                  <span className="text-sm text-gray-500 mt-2 block">Error: <b>{error}</b></span>
                </p>
                <button onClick={handleRetry} className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold tracking-widest rounded-lg transition-colors duration-200 cursor-pointer">Retry</button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="w-full h-full flex flex-col items-start justify-start lg:mt-20">
        <div className="w-full h-full flex flex-col items-start justify-center gap-4 mb-12">

          {/* HEADING AND BACK ICON */}
          <div className="w-full h-16 flex items-center justify-between px-2 bg-white">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 mt-1 flex items-center text-gray-900 justify-center rounded-full hover:bg-neutral-100 transition-colors duration-200 cursor-pointer" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-5 h-5" />
              </div>
              <h1 className="font-bold text-gray-900 text-2xl lg:text-3xl">Profile</h1>
            </div>

            {/* Security dropdown */}
            <div className="relative" ref={securityDropdownRef}>
              <div
                className={`w-10 h-10 flex items-center text-gray-900 justify-center rounded-full hover:bg-neutral-100 transition-all duration-200 cursor-pointer ${isSecurityDropdownOpen ? 'bg-neutral-100 rotate-90' : ''}`}
                onClick={() => setIsSecurityDropdownOpen(!isSecurityDropdownOpen)}
              >
                <MoreVertical className="w-5 h-5" />
              </div>
              <div className={`absolute right-0 top-12 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 ease-out transform origin-top-right z-50 ${isSecurityDropdownOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
                <div className="py-2 px-2">
                  <div className="px-2 py-2 border-b border-gray-100 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100">
                        <Settings className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 text-base lg:text-lg">Security Settings</div>
                        <div className="text-xs lg:text-sm text-gray-500">Manage your account security</div>
                      </div>
                    </div>
                  </div>
                  {!editMode && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 mb-3 mx-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 lg:w-5 lg:h-5 text-amber-600" />
                        <p className="text-amber-800 text-xs lg:text-sm font-medium">Enable edit mode to access security settings</p>
                      </div>
                    </div>
                  )}
                  <button
                    disabled={!editMode}
                    onClick={() => { navigate('/change-password'); setIsSecurityDropdownOpen(false); }}
                    className={`w-full px-2 py-3 text-left rounded-lg transition-colors duration-200 flex items-center gap-4 group ${editMode ? "text-gray-600 hover:bg-neutral-50 cursor-pointer" : "text-gray-400 cursor-not-allowed opacity-60"}`}
                  >
                    <div className={`w-6 h-6 flex items-center justify-center rounded-md transition-colors duration-200 ${editMode ? "bg-rose-100 group-hover:bg-rose-200" : "bg-gray-100"}`}>
                      <Key className={`w-3 h-3 ${editMode ? "text-rose-600" : "text-gray-400"}`} />
                    </div>
                    <div className="font-medium text-sm lg:text-base">Change Password</div>
                  </button>
                  <button
                    disabled={!editMode}
                    className={`w-full px-2 py-3 text-left rounded-lg transition-colors duration-200 flex items-center gap-4 group ${editMode ? "text-gray-600 hover:bg-neutral-50 cursor-pointer" : "text-gray-400 cursor-not-allowed opacity-60"}`}
                  >
                    <div className={`w-6 h-6 flex items-center justify-center rounded-md transition-colors duration-200 ${editMode ? "bg-red-100 group-hover:bg-red-200" : "bg-gray-100"}`}>
                      <AlertTriangle className={`w-3 h-3 ${editMode ? "text-red-600" : "text-gray-400"}`} />
                    </div>
                    <div className="font-medium text-sm lg:text-base">Deactivate Account</div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="w-full px-2 md:px-8 lg:px-8 flex flex-col gap-5 mt-4">
            {/* === PROFILE IDENTITY CARD === */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-md overflow-hidden">
              <div className="px-5 py-4 md:px-6 border-b border-stone-200 flex items-center justify-between">
                <h3 className="font-semibold text-gray-950 text-lg md:text-xl">My Profile</h3>        
              </div>

              <div className="px-4 py-5 md:px-6 md:py-12 lg:px-8 lg:py-12">
                {/* Avatar + identity row */}
                <div className="flex flex-row items-center gap-4 md:gap-7 lg:gap-10">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0 w-24 h-24 md:w-28 md:h-28  lg:w-32 lg:h-32">
                    <div className="w-full h-full rounded-full  bg-gradient-to-b from-cyan-600 to-cyan-300 p-1">
                      <div className="w-full h-full rounded-full bg-white p-1">
                        {previewUrl || user?.profile_picture ? (
                          <img src={previewUrl || user?.profile_picture} alt="Profile" className="w-full h-full rounded-full object-cover" />
                        ) : (
                          <img src="https://cdn2.vectorstock.com/i/thumb-large/28/66/profile-placeholder-image-gray-silhouette-vector-21542866.jpg" alt="Profile" className="w-full h-full rounded-full object-cover" />
                        )}
                      </div>
                    </div>
                    {editMode && (
                      <label className="absolute bottom-0 right-0 w-9 h-9 md:w-10 md:h-10 lg:w-10 lg:h-10 bg-cyan-500 hover:bg-cyan-600 border-4 border-white rounded-full flex items-center justify-center cursor-pointer transition-all">
                        <ImagePlus className="w-4 h-4 md:w-4.5 md:h-4.5 lg:w-4.5 lg:h-4.5 text-white" />
                        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                      </label>
                    )}
                  </div>

                  {/* Identity info */}
                  <div className="flex flex-col gap-1">
                    <h2 className="text-xl md:text-3xl lg:text-3xl font-bold tracking-wide text-gray-800 truncate">
                      {user?.username || "Username not set"}
                    </h2>
                    <p className="text-sm md:text-base lg:text-base text-gray-500 truncate">
                      {user?.email || "Email not available"}
                    </p>

                    {/* Role badge — w-fit prevents the flex parent from stretching it */}
                    <div className="w-fit  pt-2 first-letter:uppercase">
                      <span className={`text-xs md:text-sm px-3 py-1  rounded-full font-bold tracking-wide  ${
                        user?.role === 'tenant' ? 'bg-red-100/40 text-red-700/80 border border-red-300/60' :
                        user?.role === 'landlord' ? 'bg-yellow-100/40 text-yellow-700/80 border border-yellow-300/60' :
                        'bg-green-100/50 text-green-700/80 border border-green-300/60'
                      }`}>
                        {user?.role}
                      </span>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-2 md:gap-4 lg:gap-4 mt-4">
                      {editMode && (
                        <button
                          onClick={handleUpdateUser}
                          disabled={isLoading}
                          className="py-2 px-4 bg-teal-500 text-white text-sm md:text-base font-semibold rounded-lg hover:bg-teal-600 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer transition-all duration-200 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                        >
                          {isLoading ? 'Updating...' : 'Save Changes'}
                        </button>
                      )}
                      <button
                        onClick={() => editMode ? handleCancelEdit() : setEditMode(true)}
                        className={`text-sm md:text-base font-semibold rounded-lg cursor-pointer transition-all duration-200 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg ${
                          editMode
                            ? "py-2 px-3 bg-gray-500 text-white hover:bg-gray-600"
                            : "py-2 px-4 bg-gradient-to-br from-cyan-500 to-cyan-600 text-white hover:from-cyan-600 hover:to-cyan-700"
                        }`}
                      >
                        {editMode ? "Cancel" : "Edit Profile"}
                      </button>
                    </div>  
                  </div>
                </div>
              </div>
            </div>

            {/* === ACCOUNT INFO CARD === */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-md overflow-hidden">
              <div className="px-5 py-4 md:py-5 md:px-6 border-b border-stone-200 flex items-center justify-between">
                <h3 className="font-semibold text-gray-950 text-lg md:text-xl">Account Info</h3>
                <span className="text-xs md:text-sm bg-stone-200 text-slate-600/70 px-2.5 py-1 rounded-full font-medium">2 fields</span>
              </div>
              <div className="p-4 md:p-5 grid grid-cols-1 md:grid-cols-2 gap-2.5">
                <InfoCard name="username" label="Username" />
                <InfoCard name="full_name" label="Full Name" />
              </div>
            </div>

            {/* === PERSONAL INFO CARD === */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-md overflow-hidden">
              <div className="px-5 py-4 md:py-5 md:px-6 border-b border-stone-200 flex items-center justify-between">
                <h3 className="font-semibold text-gray-950 text-lg md:text-xl">Personal Info</h3>
                <span className="text-xs md:text-sm bg-stone-200 text-slate-600/70 px-2.5 py-1 rounded-full font-medium">2 fields</span>
              </div>
              <div className="p-4 md:p-5 grid grid-cols-1 md:grid-cols-2 gap-2.5">
                <InfoCard name="gender" label="Gender" />
                <InfoCard name="date_of_birth" label="Date of Birth" />
              </div>
            </div>

            {/* === CONTACT INFO CARD === */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-md overflow-hidden">
              <div className="px-5 py-4 md:py-5 md:px-6 border-b border-stone-200 flex items-center justify-between">
                <h3 className="font-semibold text-gray-950 text-lg md:text-xl">Contact Info</h3>
                <span className="text-xs md:text-sm bg-stone-200 text-slate-600/70 px-2.5 py-1 rounded-full font-medium">2 fields</span>
              </div>
              <div className="p-4 md:p-5 grid grid-cols-1 md:grid-cols-2 gap-2.5">
                <InfoCard name="phone_no" label="Phone Number" />
                <InfoCard name="address" label="Address" />
              </div>
            </div>

            {/* === LOGOUT CARD === */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-md overflow-hidden">
              <div className="p-4 md:p-5">
                <button
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-white bg-gradient-to-br from-cyan-800 to-cyan-700 rounded-xl text-base font-semibold transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                  onClick={() => setShowConfirmModal(true)}
                >
                  <LogOut className="w-4 h-4" />
                  Log out
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <ConfirmModal />
      <SubmitModal />
    </>
  );
};

export default UserProfile;