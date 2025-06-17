import { useState, useRef, useEffect } from "react";
import { Eye, EyeOff, Lock, ArrowRight, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PasswordChange = () => {
    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: ""
    });
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [focusedField, setFocusedField] = useState("");
    const navigate =  useNavigate();


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    // Create refs for each input field
    const inputRefs = {
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


    const handlePasswordChange = (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        // Trigger password update API here later
        console.log("Password updated:", formData);
    };
    

    const PasswordField = ({ name, placeholder, value, show, setShow, icon: Icon = Lock }) => (
        <div className="relative group">
            <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                focusedField === name ? 'text-cyan-500' : 'text-gray-400'
            }`}>
                <Icon size={20} />
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
                className={`w-full pl-12 pr-12 py-4 bg-gray-50 border-2 rounded-xl text-gray-800 font-medium transition-all duration-300 focus:outline-none focus:bg-white ${
                    focusedField === name 
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
                {show ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-white flex flex-col justify-center px-6 py-10">
            {/* App Name */}
            <h1 
                className="text-4xl text-slate-900 font-extrabold text-center mb-4">zebr
                <span className="text-cyan-600">a</span>
            </h1>

            {/* Welcome message */}
            <h2 className="text-xl text-center font-bold text-gray-600 mb-1">Change Your Password</h2>
            <p className="text-center text-gray-600 mb-8">Enter your new password to secure your account</p>
                
            {/* Form */}
            <div className="space-y-6 max-w-md mx-auto w-full">
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
                    type="button"
                    onClick={handlePasswordChange}
                    className="w-full bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-white py-4 rounded-xl text-lg font-bold transition-all duration-300 transform hover:scale-[1.01] hover:shadow-lg shadow-cyan-500/25 focus:outline-none focus:ring-4 focus:ring-cyan-500/30 flex items-center justify-center space-x-2 group cursor-pointer"
                >
                    <span>Update Password</span>
                    <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                </button>
            </div>

            {/* Back to Login Link */}
            <div className="text-center mt-8">
                <p className="text-gray-600">
                    Remember your password?{" "}
                    <span onClick={() => navigate("/login")} className="text-cyan-600 font-semibold hover:text-cyan-700 transition-colors duration-300 hover:underline cursor-pointer">
                        Back to Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default PasswordChange;