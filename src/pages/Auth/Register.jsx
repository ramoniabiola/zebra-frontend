import { useState, useRef, useEffect } from "react";
import { Eye, EyeOff, User, Mail, Phone, Lock, UserCheck, Loader2 } from "lucide-react";
// import { sendVerificationCodeApi } from "../../api/auth";
// import RegistrationVerificationPage from "./RegistrationVerificationPage";
import { useNavigate } from "react-router-dom";
import { useRegisterUser } from "../../hooks/auth";
import { useDispatch } from "react-redux";


const Register = () => {
    const [formData, setFormData] = useState({
        full_name: "",
        username: "",
        email: "",
        phone_no: "",
        password: "",
        confirmPassword: "",
        role: "",
    });
    // const [error, setError] = useState(null);
    // const [isLoading, setIsLoading] = useState(false)

    const { registerUser,  error, setSuccess, success, isLoading } = useRegisterUser();
    const [showSubmitModal, setShowSubmitModal] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [focusedField, setFocusedField] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});
    // const [showVerificationPage, setShowVerificationPage] = useState(false);
    const [shakingFields, setShakingFields] = useState({}); // Track which fields should shake
    const  navigate = useNavigate();
    const dispatch = useDispatch();
    
    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        // Clear field error when user starts typing
        if (fieldErrors[e.target.name]) {
            setFieldErrors(prev => ({...prev, [e.target.name]: ""}));
        }

        // Clear shaking state when user starts typing
        if (shakingFields[e.target.name]) {
            setShakingFields(prev => ({...prev, [e.target.name]: false}));
        }
    };

    // Validation function
    const validateForm = () => {
        const errors = {};
        const requiredFields = ['full_name', 'username', 'email', 'phone_no', 'password', 'confirmPassword', 'role'];
        
        requiredFields.forEach(field => {
            if (!formData[field].trim()) {
                errors[field] = field === 'role' 
                    ? 'Please select a role' 
                    : `${field.replace('_', ' ')} is required`;
            }
        });

        // Email validation
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Please enter a valid email address";
        }

         // Password validation
        if (formData.password && formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        // Confirm password validation
        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }

        return errors;
    }



    // const sendVerificationCode = async () => {
    //     setIsLoading(true);
    //     setError(null)

    //     try{

    //         const userEmail = {
    //             email: formData.email
    //         }

    //         const response = await sendVerificationCodeApi(userEmail);
    //         if(response.status >= 200 && response.status < 300) {
    //             setError(null);
    //             setIsLoading(false);
    //         } else {
    //             // If the response status is not in the success range, handle the error
    //             throw new Error(response.data.error);
    //         }
    //     }catch(error){
    //         setIsLoading(false)
    //         setError(error.response?.data?.error || "Failed to send verification code, please try again by clicking the resend button")
    //     }
    // }


    const handleUserRegistration = async (e) => {
        e.preventDefault();

        const errors = validateForm();

        if(Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            
            // Set shaking state for fields with errors
            const newShakingFields = {};
            Object.keys(errors).forEach(field => {
                newShakingFields[field] = true;
            });
            setShakingFields(newShakingFields);
            
            // Clear shaking state after animation completes
            setTimeout(() => {
                setShakingFields({});
            }, 500);
            
            // Shake animation for submit button
            const submitBtn = document.getElementById('submit-btn');
            submitBtn?.classList.add('animate-shake');
            setTimeout(() => submitBtn?.classList.remove('animate-shake'), 500);
            
            return;
        }
       
        setFieldErrors({});
        setShakingFields({});
      

        //Invoke send-verification-code function and navigate to the registration-verification-page
        // sendVerificationCode();
        // setShowVerificationPage(true);


        // ----- Temporary user registration for testing without user email verification operation
        setShowSubmitModal(true)

        // Perform registerUser action
        await registerUser(dispatch, formData);  
    };

    
    // Create refs for each input field
    const inputRefs = {
        full_name: useRef(null),
        username: useRef(null),
        email: useRef(null),
        phone_no: useRef(null),
        password: useRef(null),
        confirmPassword: useRef(null),
    };

    // Effect to maintain focus when focusedField changes
    useEffect(() => {
        if (focusedField && inputRefs[focusedField]?.current) {
            const inputElement = inputRefs[focusedField].current;
            inputElement.focus();
            
            // Set cursor to end of text
            const length = inputElement.value.length;
            inputElement.setSelectionRange(length, length);
        }
    }, [focusedField, formData]); // Re-run when formData changes to maintain focus


    
    // if (showVerificationPage) {
    //     return (
    //         <RegistrationVerificationPage
    //             formData={formData}
    //             sendVerificationCode={sendVerificationCode}
    //             sendVerificationCodeError={error}
    //             setSendVerificationCodeError={setError}
    //         />
    //     );
    // }



    useEffect(() => {
      if (success) {

        // After 4 seconds, close modal
        const timer = setTimeout(() => {
          setSuccess(false);
          setShowSubmitModal(false)
          navigate('/login');
        }, 4000);
      
        return () => clearTimeout(timer);
      }
    }, [success, navigate]);


    
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
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Creating Your Account
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Please wait while we set up your new account...
                    </p>
                  </>
                )}

                {success && (
                  <>
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Account Created Successfully!
                    </h3>
                    <p className="text-gray-600 text-sm">
                      🎉 Welcome! Your account has been created successfully. You can now log in with your credentials.
                    </p>
                  </>
                )}

              
                {error && (
                  <>
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertCircle className="w-8 h-8 text-red-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Registration Failed
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      We couldn't create your account. Please check your information and try again.
                      <br />
                      <span className="text-sm text-gray-500 mt-2 block">
                        Error:  <b className="text-gray-700">{error}</b>
                      </span>
                    </p>
                    <button
                      onClick={handleSubmit}
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 cursor-pointer"
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



    const InputField = ({ icon: Icon, type, name, placeholder, value, required = false }) => {
        const hasError = fieldErrors[name];
        const shouldShake = shakingFields[name];
        
        return (
            <div className={`relative group ${shouldShake ? 'animate-shake' : ''}`}>
                <div className="relative">
                    <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 z-10 ${
                        hasError ? 'text-rose-500' :
                        focusedField === name ? 'text-cyan-500' : 'text-gray-400'
                    }`}>
                        <Icon size={18} />
                    </div>
                    <input
                        ref={inputRefs[name]}
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        value={value}
                        onChange={handleChange}
                        onFocus={() => setFocusedField(name)}
                        onBlur={() => setFocusedField("")}
                        required={required}
                        className={`w-full pl-12 pr-4 py-3 bg-gray-50 border rounded-xl text-gray-800 font-medium transition-all duration-300 focus:outline-none focus:bg-white ${
                            hasError 
                                ? 'border-rose-500 shadow-md shadow-rose-500/20' 
                                : focusedField === name 
                                    ? 'border-cyan-500 shadow-lg shadow-cyan-500/20' 
                                    : 'border-gray-200 hover:border-gray-300'
                        } placeholder-gray-400`}
                    />
                </div>
                {hasError && (
                    <p className={`text-rose-500 text-xs mt-1 ${shouldShake ? 'animate-slideDown' : ''}`}>{hasError}</p>
                )}
            </div>
        );
    };


    const PasswordField = ({ name, placeholder, value, show, setShow }) => {
        const hasError = fieldErrors[name];
        const shouldShake = shakingFields[name];
        
        return (
            <div className={`relative group ${shouldShake ? 'animate-shake' : ''}`}>
                <div className="relative">
                    <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 z-10 ${
                        hasError ? 'text-rose-500' :
                        focusedField === name ? 'text-cyan-500' : 'text-gray-400'
                    }`}>
                        <Lock size={18} />
                    </div>
                    <input
                        ref={inputRefs[name]}
                        type={show ? "text" : "password"}
                        name={name}
                        placeholder={placeholder}
                        value={value}
                        onChange={handleChange}
                        onFocus={() => setFocusedField(name)}
                        onBlur={() => setFocusedField("")}
                        required
                        className={`w-full pl-12 pr-12 py-3 bg-gray-50 border rounded-xl text-gray-800 font-medium transition-all duration-300 focus:outline-none focus:bg-white ${
                            hasError 
                                ? 'border-rose-500 shadow-md shadow-rose-500/20' 
                                : focusedField === name 
                                    ? 'border-cyan-500 shadow-lg shadow-cyan-500/20' 
                                    : 'border-gray-200 hover:border-gray-300'
                        } placeholder-gray-400`}
                    />
                    <button
                        type="button"
                        onMouseDown={(e) => {
                            e.preventDefault();
                            setShow(!show);
                        }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-500 transition-colors duration-300 z-10"
                    >
                        {show ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
                {hasError && (
                    <p className={`text-red-500 text-xs mt-1 ${shouldShake ? 'animate-slideDown' : ''}`}>{hasError}</p>
                )}
            </div>
        );
    };


    return (
        <>
            <div className="w-full min-h-screen bg-white flex flex-col items-center px-4 py-6">

                {/* App Name / Logo */}
                <h1 
                  className="text-[2rem] text-slate-900 font-extrabold cursor-pointer text-center mb-1 tracking-tight text-shadow-lg">zebr
                  <span className="text-cyan-600">a</span>
                </h1>

                {/* Welcome Message */} 
                <h2 className="text-lg font-semibold text-center text-gray-400 tracking-wider mb-1">Create Your Account</h2>
                <h3 className="text-xs text-center font-normal italic text-gray-400 mb-3">The hub of property renting...</h3>
                <p className="text-gray-600 text-center text-sm">Join thousands of users finding their perfect home</p>

                {/* Form */}
                <div className="w-full max-w-md space-y-6 mt-8">
                    <InputField
                        icon={User}
                        type="text"
                        name="full_name"
                        placeholder="Full Name"
                        value={formData.full_name}
                        required
                    />

                    <InputField
                        icon={UserCheck}
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        required
                    />

                    <InputField
                        icon={Mail}
                        type="text"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        required
                    />

                    <InputField
                        icon={Phone}
                        type="text"
                        name="phone_no"
                        placeholder="Phone Number"
                        value={formData.phone_no}
                    />

                    <PasswordField
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        show={showPassword}
                        setShow={setShowPassword}
                    />
                    
                    <PasswordField
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        show={showConfirmPassword}
                        setShow={setShowConfirmPassword}
                    />

                    {/* Role Selector */}
                    <div className="space-y-3">
                        <label className="block text-sm font-semibold mb-3 text-gray-600">
                            Register as:
                        </label>
                        <div className={`grid grid-cols-3 gap-3 ${shakingFields.role ? 'animate-shake' : ''}`}>
                            {["tenant", "landlord", "agent"].map((roleOption) => (
                                <label 
                                    key={roleOption} 
                                    className={`relative flex flex-col items-center p-2 rounded-xl border cursor-pointer transition-all duration-300 ${
                                        fieldErrors.role
                                            ? 'border-rose-500 hover:border-rose-600'
                                            : formData.role === roleOption
                                                ? 'border-cyan-500 bg-cyan-50 shadow-md'
                                                : 'border-gray-200 hover:border-cyan-300 hover:bg-gray-50'
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="role"
                                        value={roleOption}
                                        checked={formData.role === roleOption}
                                        onChange={handleChange}
                                        className="sr-only"
                                    />
                                    <div className={`w-3 h-3 rounded-full border mb-2 transition-all duration-300 ${
                                        fieldErrors.role
                                            ? 'border-rose-500'
                                            : formData.role === roleOption
                                                ? 'border-cyan-500 bg-cyan-500'
                                                : 'border-gray-300'
                                    }`}>
                                        {formData.role === roleOption && (
                                            <div className="w-full h-full rounded-full bg-white scale-50"></div>
                                        )}
                                    </div>
                                    <span className={`text-xs font-medium capitalize ${
                                        fieldErrors.role
                                            ? 'text-rose-600'
                                            : formData.role === roleOption 
                                                ? 'text-cyan-700' 
                                                : 'text-gray-600'
                                    }`}>
                                        {roleOption}
                                    </span>
                                </label>
                            ))}
                        </div>
                        {fieldErrors.role && (
                            <p className="text-rose-500 text-xs mt-1 animate-slideDown">{fieldErrors.role}</p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        id="submit-btn"
                        type="submit"
                        disabled={isLoading}
                        onClick={handleUserRegistration}
                        className={`w-full py-3 rounded-xl text-base font-semibold transition-all duration-300 transform shadow-lg flex items-center justify-center space-x-2 focus:invisible ${
                            isLoading 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 hover:scale-101 hover:shadow-xl cursor-pointer'
                        } text-white`}
                    >
                       {isLoading ? (
                            <>
                                <Loader2 className="w-4.5 h-4.5 text-white animate-spin" />
                                <span>Creating Account...</span>
                            </>
                        ) : (
                            <span>Create Account</span>
                        )}
                    </button>
                </div>

                {/* Login Link */}
                <div className="text-center mt-6 mb-24">
                    <p className="text-gray-600 text-sm">
                        Already have an account?{" "}
                        <span onClick={() => navigate("/login")} className="text-cyan-600 font-semibold hover:text-cyan-700 transition-colors duration-300 hover:underline cursor-pointer">
                            Sign in here
                        </span>
                    </p>
                </div>

                {/* Custom Styles */}
                <style jsx="true">{`
                    @keyframes shake {
                        0%, 100% { transform: translateX(0); }
                        25% { transform: translateX(-5px); }
                        75% { transform: translateX(5px); }
                    }

                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }

                    @keyframes slideUp {
                        from { transform: translateY(20px); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }

                    @keyframes slideDown {
                        from { transform: translateY(-10px); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }

                    @keyframes slideInRight {
                        from { transform: translateX(100%); opacity: 0; }
                        to { transform: translateX(0); opacity: 1; }
                    }

                    .animate-shake {
                        animation: shake 0.5s ease-in-out;
                    }

                    .animate-fadeIn {
                        animation: fadeIn 0.3s ease-out;
                    }

                    .animate-slideUp {
                        animation: slideUp 0.4s ease-out;
                    }

                    .animate-slideDown {
                        animation: slideDown 0.3s ease-out;
                    }

                    .animate-slideInRight {
                        animation: slideInRight 0.4s ease-out;
                    }
                `}</style>
            </div>

            <SubmitModal />
        </>
    );  
};  

export default Register;