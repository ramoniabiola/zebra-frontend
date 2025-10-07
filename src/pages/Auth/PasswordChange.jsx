import { useState, useRef, useEffect } from "react";
import { Eye, EyeOff, Lock, ArrowRight, Shield, Mail, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PasswordChangeVerificationPage from "./PasswordChangeVerificationPage";
import { sendVerificationCodeApi } from "../../api/auth";

const PasswordChange = () => {
    const [formData, setFormData] = useState({
        email: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [focusedField, setFocusedField] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});
    const [shakingFields, setShakingFields] = useState({}); // Track which fields shoulds
    const [showVerificationPage, setShowVerificationPage] = useState(false);
    const navigate =  useNavigate();


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
        const requiredFields = ['email', 'newPassword', 'confirmPassword'];

        requiredFields.forEach(field => {
          if (!formData[field].trim()) {
            errors[field] = `${field.replace('_', ' ')} is required`;   
          }
        });

        // Email validation
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
          errors.email = "Please enter a valid email address";
        }

        // New password validation
        if (formData.newPassword && formData.newPassword.length < 6) {
          errors.newPassword = "New password must be at least 6 characters";
        }

        // Confirm password validation
        if (formData.confirmPassword && formData.confirmPassword.length < 6) {
          errors.confirmPassword = "Confirm password must match new password";
        }

        // Password match validation
        if (formData.newPassword && formData.confirmPassword && 
            formData.newPassword !== formData.confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }

        return errors;
    }



    // Create refs for each input field
    const inputRefs = {
        email: useRef(null),
        newPassword: useRef(null),
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

    
    const sendVerificationCode = async () => {
        setIsLoading(true);
        setError(null)

        try{

            const userEmail = {
                email: formData.email
            }

            const response = await sendVerificationCodeApi(userEmail);
            if(response.status >= 200 && response.status < 300) {
                setError(null);
                setIsLoading(false);

            } else {
                // If the response status is not in the success range, handle the error
                throw new Error(response.data.error);
            }
        }catch(error){
            setIsLoading(false)
            setError(error.response?.data?.error || "Failed to send verification code, please try again by clicking the resend button")
        }
    }



    const handlePasswordChange = async (e) => {
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


        //Invoke send-verification-code function and navigate to the passwordchange-verification-page
        sendVerificationCode();
        setShowVerificationPage(true);
    };



    if (showVerificationPage) {
        return (
            <PasswordChangeVerificationPage
                formData={formData}
                sendVerificationCode={sendVerificationCode}
                sendVerificationCodeError={error}
                setSendVerificationCodeError={setError}
            />
        );
    }

    
   


    const PasswordField = ({ name, placeholder, value, show, setShow, icon: Icon = Lock }) => {
        const hasError = fieldErrors[name];
        const shouldShake = shakingFields[name];

        return (
            <div className={`relative group ${shouldShake ? 'animate-shake' : ''}`}>
                <div className="relative group">
                    <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 z-10 ${
                            hasError ? 'text-rose-500' :
                            focusedField === name ? 'text-cyan-500' : 'text-gray-400'
                        }`}
                    >
                        <Icon size={18} />
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
                            e.preventDefault(); // Prevent input from losing focus
                            setShow(!show);
                        }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-500 transition-colors duration-300"
                    >
                        {show ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
                {hasError && (
                    <p className={`text-rose-500 text-xs mt-1 ${shouldShake ? 'animate-slideDown' : ''}`}>{hasError}</p>
                )}
            </div>
        )   
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
                        }`}
                    >
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
                        className={`w-full pl-12 pr-12 py-3 bg-gray-50 border rounded-xl text-gray-800 font-medium transition-all duration-300 focus:outline-none focus:bg-white ${
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




    return (
        <>
            <div className="min-h-screen bg-white flex flex-col justify-center px-6 py-10">
                {/* App Name */}
                <h1 
                    className="text-[2rem] text-slate-900 font-extrabold cursor-pointer text-center mb-2 tracking-tight text-shadow-lg">zebr
                    <span className="text-cyan-600">a</span>
                </h1>
                {/* Welcome message */}
                <h2 className="text-lg text-center font-semibold text-gray-400 mb-1 tracking-wider">Change Your Password</h2>
                <p className="text-center text-sm text-gray-500 mb-8 italic">Enter registered email and your new password to secure your account</p>

                {/* Form */}
                <div className="space-y-6 max-w-md mx-auto w-full">
                    <InputField
                        icon={Mail}
                        type="text"
                        name="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        required
                    />

                    <PasswordField
                        name="newPassword"
                        placeholder="Enter new password"
                        value={formData.newPassword}
                        show={showNewPassword}
                        setShow={setShowNewPassword}
                        icon={Lock}
                    />

                    <PasswordField 
                        name="confirmPassword"
                        placeholder="Confirm new password"
                        value={formData.confirmPassword}
                        show={showConfirmPassword}
                        setShow={setShowConfirmPassword}
                        icon={Shield}
                    />

                    {/* Password Match Indicator */}
                    {formData.newPassword && formData.confirmPassword && (
                        <div className={`text-sm font-medium ${
                            formData.newPassword === formData.confirmPassword 
                                ? 'text-green-600' 
                                : 'text-red-600'
                        }`}>
                            {formData.newPassword === formData.confirmPassword 
                                ? '✓ Passwords match' 
                                : '✗ Passwords do not match'
                            }
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        id="submit-btn"
                        type="submit"
                        disabled={isLoading} 
                        onClick={handlePasswordChange}
                        className="w-full bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-white py-3 rounded-xl text-base font-bold transition-all duration-300 transform hover:scale-[1.01] hover:shadow-lg shadow-cyan-500/25 focus:outline-none focus:ring-4 focus:ring-cyan-500/30 flex items-center justify-center space-x-2 group cursor-pointer"
                    >
                        {isLoading ? (
                            <>
                              <Loader2 className="w-5 h-5 text-white animate-spin" />
                              <span>Updating Password...</span>
                            </>
                        ) : (
                            <>
                              <span>Update Password</span>
                              <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                            </>
                        )}
                    </button>
                </div>

                {/* Back to Login Link */}
                <div className="text-center mt-8 text-sm">
                    <p className="text-gray-600">
                        Remember your password?{" "}
                        <span onClick={() => navigate("/login")} className="text-cyan-600 font-semibold hover:text-cyan-700 transition-colors duration-300 hover:underline cursor-pointer">
                            Back to Login
                        </span>
                    </p>
                </div>


                {/* Custom Styles */}
                <style jsx="true">{
                  `
                    @keyframes shake {
                      0%, 100% { transform: translateX(0); }
                      25% { transform: translateX(-5px); }
                      75% { transform: translateX(5px); }
                    }
                    @keyframes slideDown {
                      from { transform: translateY(-10px); opacity: 0; }
                      to { transform: translateY(0); opacity: 1; }
                    }
                    .animate-shake {
                      animation: shake 0.5s ease-in-out;
                    }
                    .animate-slideDown {
                      animation: slideDown 0.3s ease-out;
                    }
                  `}
                </style>
            </div>
        </>
    );
};

export default PasswordChange;